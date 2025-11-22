<template>
  <header class="navbar-container">
    <div class="navbar">
      <!-- 品牌标识 -->
      <div class="brand">
        <div class="logo">
          <img src="../assets/logo.png" alt="盾芽双翼logo" class="logo-img">
        </div>
        <h1 class="brand-name">
          盾芽双翼
          <span class="brand-tagline">AI协同生态平台</span>
        </h1>
      </div>

      <!-- 右侧内容区 -->
      <div class="right-content">
        <!-- 桌面端导航菜单 -->
        <nav class="main-nav">
          <ul class="nav-links">
            <!-- 未登录/已登录 均显示的菜单项 - 首页激活判断：匹配 / 和 /homepage -->
            <li class="nav-item" :class="{ active: currentPath === '/homepage' || currentPath === '/' }">
              <router-link to="/homepage">首页</router-link>
            </li>

            <!-- 用户登录后显示（排除数据驾驶舱） -->
            <template v-if="isLogin && userRole === 'user'">
              <li class="nav-item" :class="{ active: currentPath === '/aiznfk' }">
                <a href="javascript:;" @click="handleNavClick('/aiznfk')">AI智能反馈</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/ar' }">
                <a href="javascript:;" @click="handleNavClick('/ar')">AR智能导览</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/opinion' }">
                <a href="javascript:;" @click="handleNavClick('/opinion')">意见公示</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/merchant-rank' }">
                <a href="javascript:;" @click="handleNavClick('/merchant-rank')">商家排行</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/flex' }">
                <a href="javascript:;" @click="handleNavClick('/flex')">灵工资源池</a>
              </li>
            </template>

            <!-- 商家登录后显示（全部菜单） -->
            <template v-if="isLogin && userRole === 'merchant'">
              <li class="nav-item" :class="{ active: currentPath === '/aiznfk' }">
                <a href="javascript:;" @click="handleNavClick('/aiznfk')">AI智能反馈</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/ar' }">
                <a href="javascript:;" @click="handleNavClick('/ar')">AR智能导览</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/opinion' }">
                <a href="javascript:;" @click="handleNavClick('/opinion')">意见公示</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/merchant-rank' }">
                <a href="javascript:;" @click="handleNavClick('/merchant-rank')">商家排行</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/data-cockpit' }">
                <a href="javascript:;" @click="handleNavClick('/data-cockpit')">数据驾驶舱</a>
              </li>
              <li class="nav-item" :class="{ active: currentPath === '/flex' }">
                <a href="javascript:;" @click="handleNavClick('/flex')">灵工资源池</a>
              </li>
            </template>

            <!-- 未登录/已登录 均显示的菜单项 -->
            <li class="nav-item" :class="{ active: currentPath === '/about' }">
              <router-link to="/about">关于我们</router-link>
            </li>
          </ul>
        </nav>

        <!-- 用户操作区 -->
        <div class="user-actions">
          <!-- AI智能入口 -->
          <div class="ai-entry" @click="goToAICenter">
            <i class="icon-ai">🤖</i>
            <span class="ai-text">AI智能中心</span>
          </div>
          
          <!-- 会员状态显示（仅商家登录状态） -->
          <div class="membership-status" v-if="isLogin && userRole === 'merchant'">
            <button class="membership-btn" @click="goToMembershipPage">
              <span class="membership-icon">🏆</span>
              <span class="membership-text">我的会员：</span>
              <span class="membership-level" :class="`level-${currentMembershipLevel}`">
                {{ getMembershipText(currentMembershipLevel) }}
              </span>
            </button>
          </div>
          
          <!-- 登录/注册按钮（未登录状态） -->
          <button class="btn-primary" v-if="!isLogin">
            <router-link to="/login">登录/注册</router-link>
          </button>
          
          <!-- 用户菜单（已登录状态） -->
          <div class="user-menu" v-else>
            <div class="user-info" @click="toggleDropdown">
              <img src="https://picsum.photos/id/237/45/45" alt="用户头像" class="user-avatar" />
              <span class="user-name">{{ username }}</span>
            </div>
            <ul class="user-dropdown" v-if="showDropdown">
              <li @click="handleLogout">退出登录</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 登录提示弹窗（仅AI智能中心需要） -->
    <div class="login-toast" v-if="showLoginToast">
      <p>请先登录以访问该功能</p>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import eventBus from '../utils/eventBus'; // 引入事件总线

// 路由相关
const router = useRouter();
const route = useRoute();
const currentPath = ref(route.path);

// 监听路由变化，实时更新currentPath（修复部署后路由同步问题）
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  },
  { immediate: true } // 初始加载时立即执行
);

// 登录状态管理
const isLogin = ref(false);
const username = ref('');
const userRole = ref(''); // 存储用户角色（user/merchant）
const showLoginToast = ref(false);
const showDropdown = ref(false);

// 会员状态管理 - 移除non_member，默认普通用户
const currentMembershipLevel = ref('regular'); // regular, silver, gold, diamond

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 点击其他区域关闭下拉菜单
onMounted(() => {
  const handleClickOutside = (e) => {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu && !userMenu.contains(e.target)) {
      showDropdown.value = false;
    }
  };
  document.addEventListener('click', handleClickOutside);
  
  // 组件卸载时移除事件监听（修复原代码监听移除时机问题）
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});

// 处理导航点击（已通过角色控制显示，直接跳转）
const handleNavClick = (path) => {
  router.push(path);
  showDropdown.value = false; // 跳转时关闭下拉菜单
};

// 前往AI智能中心（需要登录验证）
const goToAICenter = () => {
  if (isLogin.value) {
    router.push('/aifriend');
    showDropdown.value = false;
  } else {
    showLoginToast.value = true;
    setTimeout(() => {
      showLoginToast.value = false;
    }, 2000);
  }
};

// 前往会员页面
const goToMembershipPage = () => {
  router.push('/MembershipView');
  showDropdown.value = false; // 跳转时关闭下拉菜单
};

// 获取会员状态文本 - 移除非会员，更新普通会员为普通用户
const getMembershipText = (level) => {
  const membershipTexts = {
    'regular': '普通用户',
    'silver': '白银会员',
    'gold': '黄金会员',
    'diamond': '钻石会员'
  };
  return membershipTexts[level] || '普通用户';
};

// 退出登录
const handleLogout = () => {
  isLogin.value = false;
  username.value = '';
  userRole.value = ''; // 清空角色
  currentMembershipLevel.value = 'regular'; // 退出登录后仍保持普通用户基础等级
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userMembership');
  router.push('/homepage');
  showDropdown.value = false;
  eventBus.emit('userLoggedOut');
};

// 更新登录状态（包含角色存储）
const updateUserState = (user) => {
  isLogin.value = true;
  username.value = user.username;
  userRole.value = user.role; // 保存用户角色

  // 恢复会员状态 - 确保不会出现non_member
  const savedMembership = localStorage.getItem('userMembership');
  if (savedMembership) {
    currentMembershipLevel.value = savedMembership;
    user.membershipLevel = savedMembership;
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else if (user.membershipLevel) {
    // 如果用户有会员等级但本地没有存储，使用用户的等级
    currentMembershipLevel.value = user.membershipLevel;
    localStorage.setItem('userMembership', user.membershipLevel);
  } else {
    // 默认普通用户
    currentMembershipLevel.value = 'regular';
    localStorage.setItem('userMembership', 'regular');
  }
};

// 初始化登录状态
onMounted(() => {
  // 1. 恢复会员状态 - 处理旧数据中的non_member
  const savedMembership = localStorage.getItem('userMembership');
  if (savedMembership === 'non_member') {
    // 将原非会员转换为普通用户
    currentMembershipLevel.value = 'regular';
    localStorage.setItem('userMembership', 'regular');
  } else if (savedMembership) {
    currentMembershipLevel.value = savedMembership;
  } else {
    currentMembershipLevel.value = 'regular';
  }

  // 2. 恢复用户状态（含角色）
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    const userData = JSON.parse(savedUser);
    // 处理用户数据中的旧会员等级
    if (userData.membershipLevel === 'non_member') {
      userData.membershipLevel = 'regular';
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('userMembership', 'regular');
    }
    updateUserState(userData);
  }

  // 3. 监听登录成功事件
  const handleLogin = (userInfo) => {
    // 确保登录用户不会有non_member状态
    if (userInfo.membershipLevel === 'non_member') {
      userInfo.membershipLevel = 'regular';
    }
    updateUserState(userInfo);
  };
  eventBus.on('userLoggedIn', handleLogin);

  // 4. 监听退出事件
  const handleLogoutEvent = () => {
    isLogin.value = false;
    username.value = '';
    userRole.value = '';
    currentMembershipLevel.value = 'regular'; // 退出后保持普通用户
    localStorage.setItem('userMembership', 'regular');
  };
  eventBus.on('userLoggedOut', handleLogoutEvent);

  // 5. 监听会员状态更新事件
  const handleMembershipUpdate = (newLevel) => {
    // 确保不会设置为non_member
    if (!['regular', 'silver', 'gold', 'diamond'].includes(newLevel)) {
      newLevel = 'regular';
    }
    currentMembershipLevel.value = newLevel;
    localStorage.setItem('userMembership', newLevel);
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData.membershipLevel = newLevel;
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
  };
  eventBus.on('membershipUpdated', handleMembershipUpdate);

  // 组件卸载时移除所有事件监听
  onUnmounted(() => {
    eventBus.off('userLoggedIn', handleLogin);
    eventBus.off('userLoggedOut', handleLogoutEvent);
    eventBus.off('membershipUpdated', handleMembershipUpdate);
  });
});
</script>
<style scoped>
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 30px;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
}

/* 品牌标识 */
.brand {
  position: absolute;
  left: 80px;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.logo-img {
  width: 50px;
  height: 50px;
}

.brand-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: #165DFF;
  margin: 0;
  white-space: nowrap;
}

.brand-tagline {
  display: inline-block;
  font-size: 0.75rem;
  color: #666;
  margin-left: 6px;
  font-weight: 500;
}

/* 右侧内容区 */
.right-content {
  position: absolute;
  right: 75px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 0 1 auto;
}

/* 导航菜单 */
.main-nav {
  display: flex;
  align-items: center;
}

.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2px;
}

.nav-item a {
  display: block;
  padding: 0 14px;
  height: 55px;
  line-height: 55px;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s;
  white-space: nowrap;
  cursor: pointer;
}

.nav-item a:hover,
.nav-item.active a {
  color: #165DFF;
  background-color: rgba(22, 93, 255, 0.07);
  border-radius: 4px;
}

/* 用户操作区 */
.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
}

/* AI智能入口 */
.ai-entry {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #165DFF;
  cursor: pointer;
  transition: all 0.3s;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
}

.icon-ai {
  font-size: 18px;
}

.ai-text {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 会员状态样式 */
.membership-status {
  display: flex;
  align-items: center;
}

.membership-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.membership-btn:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
}

.membership-icon {
  font-size: 16px;
}

.membership-text {
  color: #666;
}

.membership-level {
  font-weight: 600;
}

/* 不同会员等级颜色 - 移除non_member样式 */
.level-regular {
  color: #333;
}

.level-silver {
  color: #94a3b8;
}

.level-gold {
  color: #f59e0b;
}

.level-diamond {
  color: #06b6d4;
}

/* 登录/注册按钮样式 */
.btn-primary {
  background-color: #165DFF;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-primary:hover {
  background-color: #0E4CD1;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.15);
}

.btn-primary a {
  color: white;
  text-decoration: none;
}

/* 已登录用户样式 */
.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.user-avatar:hover {
  border-color: #165DFF;
  transform: translateY(-1px);
}

.user-name {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

.user-dropdown {
  position: absolute;
  top: 50px;
  right: -53px;
  min-width: 180px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: all 0.3s;
  z-index: 999;
}

.user-menu:hover .user-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.user-dropdown li {
  list-style: none;
}

.user-dropdown li {
  display: block;
  padding: 9px 20px;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.user-dropdown li:hover {
  background-color: rgba(22, 93, 255, 0.07);
}

/* 登录提示弹窗 */
.login-toast {
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #165DFF;
  color: #165DFF;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(22, 93, 255, 0.15);
  z-index: 1001;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(-10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}

/* 响应式调整 */
@media (max-width: 1366px) {
  .navbar {
    padding: 0 20px;
  }
  
  .nav-item a {
    padding: 0 12px;
    font-size: 0.9rem;
  }
  
  .brand-name {
    font-size: 1.5rem;
  }
  
  .membership-text {
    display: none;
  }
}

@media (max-width: 1200px) {
  .nav-item a {
    padding: 0 9px;
    font-size: 0.85rem;
  }
  
  .right-content {
    gap: 12px;
  }
  
  .user-name {
    display: none; /* 屏幕较小时隐藏用户名，只显示头像 */
  }
}
</style>