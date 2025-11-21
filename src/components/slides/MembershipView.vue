<template>
  <div class="membership-container">
    <!-- 页面头部 -->
    <div class="membership-header">
      <div class="container">
        <h1 class="page-title">会员中心</h1>
        <p class="page-subtitle">解锁更多专属功能与服务</p>
      </div>
    </div>

    <!-- 当前会员状态 -->
    <div class="current-membership">
      <div class="container">
        <div class="membership-card">
          <div class="current-status">
            <div class="status-icon" :class="`icon-${currentMembership}`">
              {{ getMembershipIcon(currentMembership) }}
            </div>
            <div class="status-info">
              <h2>当前会员等级</h2>
              <div class="level-display">
                <span class="level-text">{{ getMembershipText(currentMembership) }}</span>
                <span class="level-badge" :class="`badge-${currentMembership}`">
                  {{ getMembershipText(currentMembership) }}
                </span>
              </div>
              <p class="membership-desc">{{ getMembershipDescription(currentMembership) }}</p>
            </div>
          </div>
          
          <div class="membership-actions">
            <button 
              v-if="currentMembership !== 'diamond'" 
              class="upgrade-btn primary-btn"
              @click="showUpgradeModal = true">
              立即升级会员
            </button>
            <button 
              v-else 
              class="upgrade-btn primary-btn disabled">
              已是最高等级
            </button>
            <button class="manage-btn" @click="showBenefits = !showBenefits">
              查看会员权益
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 会员权益展示 -->
    <div class="membership-benefits" v-if="showBenefits">
      <div class="container">
        <h2 class="section-title">会员权益详情</h2>
        
        <div class="benefits-table">
          <div class="benefits-header">
            <div class="benefit-item header-item">会员权益</div>
            <div class="benefit-item header-item">非会员</div>
            <div class="benefit-item header-item">普通会员</div>
            <div class="benefit-item header-item">白银会员</div>
            <div class="benefit-item header-item">黄金会员</div>
            <div class="benefit-item header-item">钻石会员</div>
          </div>
          
          <div class="benefits-row" v-for="(benefit, index) in membershipBenefits" :key="index">
            <div class="benefit-item">{{ benefit.name }}</div>
            <div class="benefit-item" :class="getBenefitClass(benefit.non_member)">{{ getBenefitIcon(benefit.non_member) }}</div>
            <div class="benefit-item" :class="getBenefitClass(benefit.regular)">{{ getBenefitIcon(benefit.regular) }}</div>
            <div class="benefit-item" :class="getBenefitClass(benefit.silver)">{{ getBenefitIcon(benefit.silver) }}</div>
            <div class="benefit-item" :class="getBenefitClass(benefit.gold)">{{ getBenefitIcon(benefit.gold) }}</div>
            <div class="benefit-item" :class="getBenefitClass(benefit.diamond)">{{ getBenefitIcon(benefit.diamond) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 会员套餐展示 -->
    <div class="membership-plans">
      <div class="container">
        <h2 class="section-title">选择适合您的会员套餐</h2>
        
        <div class="plans-grid">
          <div class="plan-card" v-for="(plan, index) in membershipPlans" :key="index" :class="{ current: currentMembership === plan.level }">
            <div class="plan-header" :class="`header-${plan.level}`">
              <h3 class="plan-title">{{ plan.title }}</h3>
              <div class="plan-price">
                <span class="price">{{ plan.price }}</span>
                <span class="period">{{ plan.period }}</span>
              </div>
            </div>
            
            <div class="plan-features">
              <ul>
                <li v-for="(feature, i) in plan.features" :key="i">
                  <span class="feature-icon">✓</span>
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <div class="plan-actions">
              <button 
                v-if="currentMembership !== plan.level"
                class="select-plan-btn"
                @click="selectPlan(plan.level)">
                {{ getPlanButtonText(plan.level) }}
              </button>
              <span v-else class="current-plan-tag">当前套餐</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 升级会员弹窗 -->
    <div class="modal-overlay" v-if="showUpgradeModal">
      <div class="upgrade-modal">
        <div class="modal-header">
          <h3>升级会员</h3>
          <button class="close-modal" @click="showUpgradeModal = false">×</button>
        </div>
        
        <div class="modal-body">
          <div class="upgrade-options">
            <div 
              class="upgrade-option" 
              v-for="(option, index) in upgradeOptions" 
              :key="index"
              :class="{ selected: selectedUpgradeLevel === option.level }"
              @click="selectedUpgradeLevel = option.level">
              <div class="option-info">
                <h4>{{ option.title }}</h4>
                <p class="option-price">{{ option.price }}</p>
                <p class="option-benefits">{{ option.benefits }}</p>
              </div>
              <div class="option-selector" v-if="selectedUpgradeLevel === option.level">✓</div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="showUpgradeModal = false">取消</button>
          <button 
            class="confirm-upgrade-btn" 
            @click="confirmUpgrade"
            :disabled="!selectedUpgradeLevel">
            确认升级
          </button>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div class="toast" v-if="showToast">
      <div class="toast-content">
        <span class="toast-icon">{{ toastType === 'success' ? '✓' : '!' }}</span>
        <div class="toast-message">
          <h4>{{ toastTitle }}</h4>
          <p>{{ toastMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted ,onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '../../utils/eventBus';
import { updateMembershipLevel, getUserMembership } from '../../utils/userStorage';

const router = useRouter();

// 当前用户信息
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
const currentMembership = ref('non_member');
const showBenefits = ref(false);
const showUpgradeModal = ref(false);
const selectedUpgradeLevel = ref('');
const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('success');

// 会员等级中文显示
const getMembershipText = (level) => {
  const membershipTexts = {
    'non_member': '非会员',
    'regular': '普通会员',
    'silver': '白银会员',
    'gold': '黄金会员',
    'diamond': '钻石会员'
  };
  return membershipTexts[level] || '非会员';
};

// 会员等级图标
const getMembershipIcon = (level) => {
  const icons = {
    'non_member': '👤',
    'regular': '⭐',
    'silver': '🥈',
    'gold': '🥇',
    'diamond': '💎'
  };
  return icons[level] || '👤';
};

// 会员等级描述
const getMembershipDescription = (level) => {
  const descriptions = {
    'non_member': '基础功能体验，部分高级功能受限',
    'regular': '享受基础会员权益，解锁更多功能',
    'silver': '白银会员专享，更多高级功能与服务',
    'gold': '黄金会员尊享，优先体验新功能与专属服务',
    'diamond': '钻石会员顶级权益，全方位尊享服务'
  };
  return descriptions[level] || '基础功能体验';
};

// 会员权益配置
const membershipBenefits = ref([
  {
    name: 'AI智能反馈次数',
    non_member: '每日5次',
    regular: '每日20次',
    silver: '每日50次',
    gold: '每日100次',
    diamond: '无限次'
  },
  {
    name: 'AR智能导览',
    non_member: '基础版',
    regular: '标准版',
    silver: '高级版',
    gold: '专业版',
    diamond: '旗舰版'
  },
  {
    name: '数据驾驶舱',
    non_member: '❌',
    regular: '基础数据',
    silver: '标准数据',
    gold: '高级数据',
    diamond: '全部数据'
  },
  {
    name: '灵工资源池',
    non_member: '❌',
    regular: '❌',
    silver: '基础访问',
    gold: '高级访问',
    diamond: '全部访问'
  },
  {
    name: '专属客服',
    non_member: '❌',
    regular: '❌',
    silver: '工作日',
    gold: '7×12小时',
    diamond: '7×24小时'
  },
  {
    name: '新功能优先体验',
    non_member: '❌',
    regular: '❌',
    silver: '❌',
    gold: '✅',
    diamond: '✅'
  }
]);

// 会员套餐配置
const membershipPlans = ref([
  {
    level: 'regular',
    title: '普通会员',
    price: '¥19.9',
    period: '/月',
    features: [
      '每日20次AI智能反馈',
      '标准版AR智能导览',
      '数据驾驶舱基础数据',
      '会员专属标识'
    ]
  },
  {
    level: 'silver',
    title: '白银会员',
    price: '¥49.9',
    period: '/月',
    features: [
      '每日50次AI智能反馈',
      '高级版AR智能导览',
      '数据驾驶舱标准数据',
      '灵工资源池基础访问',
      '工作日专属客服',
      '会员专属标识'
    ]
  },
  {
    level: 'gold',
    title: '黄金会员',
    price: '¥99.9',
    period: '/月',
    features: [
      '每日100次AI智能反馈',
      '专业版AR智能导览',
      '数据驾驶舱高级数据',
      '灵工资源池高级访问',
      '7×12小时专属客服',
      '新功能优先体验',
      '会员专属标识'
    ]
  },
  {
    level: 'diamond',
    title: '钻石会员',
    price: '¥199.9',
    period: '/月',
    features: [
      '无限次AI智能反馈',
      '旗舰版AR智能导览',
      '数据驾驶舱全部数据',
      '灵工资源池全部访问',
      '7×24小时专属客服',
      '新功能优先体验',
      '专属客户经理',
      '会员专属标识'
    ]
  }
]);

// 升级选项（显示所有更高等级的选项）
const upgradeOptions = computed(() => {
  return membershipPlans.value.filter((plan) => {
    return plan.level !== currentMembership.value;
  }).map(plan => {
    const levelTexts = {
      'regular': '普通会员',
      'silver': '白银会员',
      'gold': '黄金会员',
      'diamond': '钻石会员'
    };
    
    return {
      level: plan.level,
      title: `升级至${levelTexts[plan.level]}`,
      price: `${plan.price}${plan.period}`,
      benefits: plan.features[0] + '，' + plan.features[1]
    };
  });
});

// 获取权益显示样式
const getBenefitClass = (value) => {
  return value === '❌' ? 'no-benefit' : 'has-benefit';
};

// 获取权益图标
const getBenefitIcon = (value) => {
  return value === '❌' ? '❌' : value;
};

// 获取套餐按钮文本
const getPlanButtonText = (level) => {
  return currentMembership.value < level ? `升级至${getMembershipText(level)}` : `切换至${getMembershipText(level)}`;
};

// 选择套餐
const selectPlan = (level) => {
  selectedUpgradeLevel.value = level;
  showUpgradeModal.value = true;
};

// 确认升级
const confirmUpgrade = () => {
  if (!selectedUpgradeLevel.value || !currentUser.value) return;
  
  // 调用用户存储工具更新会员等级
  const result = updateMembershipLevel(
    currentUser.value.username,
    currentUser.value.role,
    selectedUpgradeLevel.value
  );
  
  if (result.success) {
    // 更新当前会员状态
    currentMembership.value = selectedUpgradeLevel.value;
    
    // 更新localStorage中的用户信息
    currentUser.value.membershipLevel = selectedUpgradeLevel.value;
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
    localStorage.setItem('userMembership', selectedUpgradeLevel.value);
    
    // 通知其他组件更新会员状态
    eventBus.emit('membershipUpdated', selectedUpgradeLevel.value);
    
    // 显示成功提示
    showToastNotification(
      '操作成功',
      `恭喜您已成功${currentMembership.value < selectedUpgradeLevel.value ? '升级为' : '切换至'}${getMembershipText(selectedUpgradeLevel.value)}`,
      'success'
    );
    
    // 关闭弹窗
    showUpgradeModal.value = false;
    selectedUpgradeLevel.value = '';
  } else {
    // 显示失败提示
    showToastNotification(
      '操作失败',
      result.message || '会员等级变更过程中出现错误，请重试',
      'error'
    );
  }
};

// 显示提示消息
const showToastNotification = (title, message, type = 'success') => {
  toastTitle.value = title;
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 页面初始化
onMounted(() => {
  // 检查用户是否登录
  if (!currentUser.value) {
    router.push('/login');
    return;
  }
  
  // 优先从localStorage获取会员状态
  const savedMembership = localStorage.getItem('userMembership');
  if (savedMembership) {
    currentMembership.value = savedMembership;
  } else if (currentUser.value.membershipLevel) {
    currentMembership.value = currentUser.value.membershipLevel;
    localStorage.setItem('userMembership', currentUser.value.membershipLevel);
  } else {
    // 从用户存储中获取
    const membership = getUserMembership(currentUser.value.username, currentUser.value.role);
    if (membership.success) {
      currentMembership.value = membership.membershipLevel;
      localStorage.setItem('userMembership', membership.membershipLevel);
    }
  }
  
  // 监听会员状态更新事件
  const handleMembershipUpdate = (newLevel) => {
    currentMembership.value = newLevel;
  };
  eventBus.on('membershipUpdated', handleMembershipUpdate);
  
  // 组件卸载时移除监听
  onUnmounted(() => {
    eventBus.off('membershipUpdated', handleMembershipUpdate);
  });
});
</script>
<style scoped>
/* 全局样式 */
.membership-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background-color: #165DFF;
  margin: 15px auto 0;
  border-radius: 2px;
}

/* 页面头部 */
.membership-header {
  background: linear-gradient(135deg, #165DFF 0%, #0E4CD1 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* 当前会员状态 */
.current-membership {
  padding: 40px 0;
  background-color: white;
}

.membership-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.current-status {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.status-icon {
  font-size: 60px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f0f5ff;
}

.status-icon.icon-non_member {
  background-color: #f8f9fa;
}

.status-icon.icon-regular {
  background-color: #fff8e1;
}

.status-icon.icon-silver {
  background-color: #e8eaf6;
}

.status-icon.icon-gold {
  background-color: #fff3e0;
}

.status-icon.icon-diamond {
  background-color: #e0f7fa;
}

.status-info h2 {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 10px;
}

.level-display {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.level-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
}

.level-badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.badge-non_member {
  background-color: #e9ecef;
  color: #666;
}

.badge-regular {
  background-color: #fff8e1;
  color: #ffb300;
}

.badge-silver {
  background-color: #e8eaf6;
  color: #5c6bc0;
}

.badge-gold {
  background-color: #fff3e0;
  color: #f57c00;
}

.badge-diamond {
  background-color: #e0f7fa;
  color: #00acc1;
}

.membership-desc {
  color: #666;
  font-size: 1rem;
}

.membership-actions {
  display: flex;
  gap: 15px;
}

.upgrade-btn, .manage-btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.primary-btn {
  background-color: #165DFF;
  color: white;
}

.primary-btn:hover {
  background-color: #0E4CD1;
  transform: translateY(-2px);
}

.primary-btn.disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.manage-btn {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
}

.manage-btn:hover {
  background-color: #e9ecef;
}

/* 会员权益展示 */
.membership-benefits {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.benefits-table {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.benefits-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  background-color: #165DFF;
  color: white;
}

.header-item {
  padding: 15px;
  font-weight: 600;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.header-item:last-child {
  border-right: none;
}

.benefits-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid #eee;
}

.benefits-row:last-child {
  border-bottom: none;
}

.benefit-item {
  padding: 15px;
  text-align: center;
  border-right: 1px solid #eee;
}

.benefit-item:first-child {
  text-align: left;
  font-weight: 500;
  color: #333;
}

.benefit-item:last-child {
  border-right: none;
}

.no-benefit {
  color: #999;
}

.has-benefit {
  color: #165DFF;
  font-weight: 500;
}

/* 会员套餐展示 */
.membership-plans {
  padding: 60px 0;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.plan-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.plan-card.current {
  border: 2px solid #165DFF;
}

.plan-header {
  padding: 20px;
  text-align: center;
  color: white;
}

.header-non_member {
  background-color: #6c757d;
}

.header-regular {
  background-color: #ffb300;
}

.header-silver {
  background-color: #5c6bc0;
}

.header-gold {
  background-color: #f57c00;
}

.header-diamond {
  background-color: #00acc1;
}

.plan-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.plan-price {
  font-size: 1.8rem;
  font-weight: 700;
}

.period {
  font-size: 1rem;
  font-weight: normal;
  opacity: 0.9;
}

.plan-features {
  padding: 20px;
}

.plan-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-features li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.plan-features li:last-child {
  border-bottom: none;
}

.feature-icon {
  color: #165DFF;
  margin-right: 10px;
}

.plan-actions {
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
}

.select-plan-btn {
  width: 100%;
  padding: 10px;
  background-color: #165DFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.select-plan-btn:hover {
  background-color: #0E4CD1;
}

.select-plan-btn.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.current-plan-tag {
  display: inline-block;
  padding: 8px 20px;
  background-color: #e8f4ea;
  color: #28a745;
  border-radius: 5px;
  font-weight: 600;
}

/* 升级会员弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.upgrade-modal {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.close-modal:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.upgrade-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.upgrade-option {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upgrade-option.selected {
  border-color: #165DFF;
  background-color: #f0f5ff;
}

.option-info h4 {
  margin: 0 0 5px;
  color: #333;
}

.option-price {
  font-weight: 700;
  color: #165DFF;
  margin-bottom: 5px;
}

.option-benefits {
  color: #666;
  font-size: 0.9rem;
}

.option-selector {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #165DFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.cancel-btn {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.confirm-upgrade-btn {
  padding: 8px 20px;
  background-color: #165DFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
}

.confirm-upgrade-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 提示框 */
.toast {
  position: fixed;
  top: 15%;
  left: 50%;
  height: 100px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1001;
  animation: slideIn 0.3s ease-out;
}

.toast-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e8f4ea;
  color: #28a745;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.toast-icon.error {
  background-color: #fef7fb;
  color: #dc3545;
}

.toast-message h4 {
  margin: 0 0 5px;
  color: #333;
}

.toast-message p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .membership-card {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .current-status {
    flex-direction: column;
    text-align: center;
  }
  
  .level-display {
    justify-content: center;
  }
  
  .membership-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .benefits-header, .benefits-row {
    grid-template-columns: 1fr;
  }
  
  .header-item, .benefit-item {
    border-right: none;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  
  .header-item:last-child, .benefit-item:last-child {
    border-bottom: none;
  }
}
</style>