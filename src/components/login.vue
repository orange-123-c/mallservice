<template>
  <div class="auth-container">
    <!-- 主卡片 -->
    <div class="auth-card" v-if="!showSuccessPage">
      <!-- 标题区域 -->
      <div class="auth-header">
        <div class="logo">
          <span>盾芽双翼</span>
        </div>
        <h1>{{ isLogin ? '账户登录' : '创建账户' }}</h1>
        <p class="sub-title">
          {{ isLogin ? '请输入您的账号信息' : '注册后即可享受完整服务' }}
        </p>
      </div>

      <!-- 角色选择器 -->
      <div class="role-selector">
        <button :class="role === 'user' ? 'role-btn active' : 'role-btn'" @click="handleRoleChange('user')">
          <span class="icon">👤</span>
          <span>用户</span>
        </button>
        <button :class="role === 'merchant' ? 'role-btn active' : 'role-btn'" @click="handleRoleChange('merchant')">
          <span class="icon">🏪</span>
          <span>商家</span>
        </button>
      </div>

      <!-- 表单区域 -->
      <form class="auth-form" @submit.prevent="handleSubmit">
        <!-- 用户名 -->
        <div class="form-group">
          <label for="username">用户名</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input type="text" id="username" v-model="form.username" :class="{ error: formErrors.username }"
              placeholder="请输入用户名" required>
          </div>
          <p class="error-text" v-if="formErrors.username">{{ formErrors.username }}</p>
        </div>

        <!-- 密码 -->
        <div class="form-group">
          <label for="password">密码</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password"
              :class="{ error: formErrors.password }" placeholder="请输入密码" required>
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <p class="error-text" v-if="formErrors.password">{{ formErrors.password }}</p>
        </div>

        <!-- 确认密码（注册） -->
        <div class="form-group" v-if="!isLogin">
          <label for="confirmPassword">确认密码</label>
          <div class="input-wrapper">
            <span class="input-icon">🔄</span>
            <input :type="showPassword ? 'text' : 'password'" id="confirmPassword" v-model="form.confirmPassword"
              :class="{ error: formErrors.confirmPassword }" placeholder="请再次输入密码" required>
          </div>
          <p class="error-text" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</p>
        </div>

        <!-- 图形验证码 -->
        <div class="form-group captcha-group">
          <label for="captcha">验证码</label>
          <div class="captcha-wrapper">
            <div class="input-wrapper">
              <span class="input-icon">🔢</span>
              <input type="text" id="captcha" v-model="form.captcha" :class="{ error: formErrors.captcha }"
                placeholder="请输入右侧验证码" required>
            </div>
            <div class="captcha-image" @click="generateCaptcha">
              <span>{{ captchaCode }}</span>
              <span class="refresh-icon">↺</span>
            </div>
          </div>
          <p class="error-text" v-if="formErrors.captcha">{{ formErrors.captcha }}</p>
        </div>

        <!-- 记住密码 & 忘记密码（登录） -->
        <div class="form-actions" v-if="isLogin">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>记住密码</span>
          </label>
          <button type="button" class="forgot-password" @click="showForgotModal = true">
            忘记密码?
          </button>
        </div>

        
        <button type="submit" class="submit-btn">
          {{ isLogin ? '登录' : '注册' }}
          <span class="btn-icon">→</span>
        </button>
      </form>



      <!-- 切换登录/注册 -->
      <div class="toggle-auth">
        <span>
          {{ isLogin ? '还没有账号?' : '已有账号?' }}
          <button type="button" @click="toggleAuthMode">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </button>
        </span>
      </div>
    </div>

    <!-- 忘记密码弹窗 -->
    <div class="modal-backdrop" v-if="showForgotModal">
      <div class="modal">
        <div class="modal-header">
          <h3>找回密码</h3>
          <button class="close-modal" @click="showForgotModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="resetUsername">用户名</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input type="text" id="resetUsername" v-model="resetForm.username" placeholder="请输入用户名" required>
            </div>
          </div>
          <div class="form-group captcha-group">
            <label for="resetCaptcha">验证码</label>
            <div class="captcha-wrapper">
              <div class="input-wrapper">
                <span class="input-icon">🔢</span>
                <input type="text" id="resetCaptcha" v-model="resetForm.captcha" placeholder="请输入右侧验证码" required>
              </div>
              <div class="captcha-image" @click="generateResetCaptcha">
                <span>{{ resetCaptchaCode }}</span>
                <span class="refresh-icon">↺</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="newPassword">新密码</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input :type="showResetPassword ? 'text' : 'password'" id="newPassword" v-model="resetForm.newPassword"
                placeholder="请输入新密码" required>
              <button type="button" class="toggle-password" @click="showResetPassword = !showResetPassword">
                {{ showResetPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showForgotModal = false">取消</button>
          <button class="confirm-btn" @click="resetPassword">确认重置</button>
        </div>
      </div>
    </div>

    <!-- 成功页面 -->
    <div class="success-page" v-if="showSuccessPage">
      <div class="success-container">
        <div class="success-icon">✓</div>
        <h1 class="success-title">
          {{ successType === 'login' ? '登录成功' : '注册成功' }}
        </h1>
        <p class="success-role">
          {{ role === 'user' ? '用户账户' : '商家账户' }}
        </p>
        <p class="success-message">
          {{ successType === 'login'
            ? `欢迎回来，${successUsername}`
            : `账号注册成功，${successUsername}` }}
        </p>
        <button class="success-btn" @click="goToDashboard">
          进入{{ role === 'user' ? '用户中心' : '商家后台' }}
        </button>
      </div>
    </div>

    <!-- 提示框 -->
    <div class="toast" v-if="showToast">
      <div class="toast-icon">{{ toastType === 'success' ? '✓' : '!' }}</div>
      <div class="toast-content">
        <h4>{{ toastTitle }}</h4>
        <p>{{ toastMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '../utils/eventBus'; // 引入事件总线
import { registerUser, loginUser, checkUsernameExists, resetUserPassword } from '../utils/userStorage'; // 引入用户存储工具

const router = useRouter();

// 状态管理
const isLogin = ref(true);
const role = ref('user');
const showPassword = ref(false);
const rememberMe = ref(false);
const showForgotModal = ref(false);
const showResetPassword = ref(false);
const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('success');
const showSuccessPage = ref(false);
const successType = ref('login');
const successUsername = ref('');

// 表单数据
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: ''
});

// 找回密码表单
const resetForm = reactive({
  username: '',
  captcha: '',
  newPassword: ''
});

// 图形验证码生成
const generateRandomCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const captchaCode = ref(generateRandomCode());
const resetCaptchaCode = ref(generateRandomCode());

const generateCaptcha = () => {
  captchaCode.value = generateRandomCode();
};

const generateResetCaptcha = () => {
  resetCaptchaCode.value = generateRandomCode();
};

// 表单验证错误
const formErrors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: ''
});

// 处理角色切换
const handleRoleChange = (newRole) => {
  if (role.value !== newRole) {
    role.value = newRole;
    Object.keys(form).forEach(key => form[key] = '');
    Object.keys(formErrors).forEach(key => formErrors[key] = '');
    generateCaptcha();
  }
};

// 切换登录/注册模式
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
  Object.keys(form).forEach(key => form[key] = '');
  Object.keys(formErrors).forEach(key => formErrors[key] = '');
  generateCaptcha();
};

// 表单验证
const validateForm = () => {
  let isValid = true;
  const errors = { ...formErrors };

  // 用户名验证
  if (!form.username.trim()) {
    errors.username = '请输入用户名';
    isValid = false;
  } else if (form.username.length < 4) {
    errors.username = '用户名至少4个字符';
    isValid = false;
  } else if (isLogin.value && !checkUsernameExists(form.username, role.value)) {
    // 登录时检查用户名是否存在
    errors.username = '用户名不存在';
    isValid = false;
  }

  // 密码验证
  if (!form.password) {
    errors.password = '请输入密码';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = '密码至少6个字符';
    isValid = false;
  }

  // 确认密码验证（注册）
  if (!isLogin.value && form.password !== form.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致';
    isValid = false;
  }

  // 验证码验证
  if (!form.captcha) {
    errors.captcha = '请输入验证码';
    isValid = false;
  } else if (form.captcha !== captchaCode.value) {
    errors.captcha = '验证码不正确';
    isValid = false;
  }

  Object.assign(formErrors, errors);
  return isValid;
};

// 处理提交（登录/注册）
const handleSubmit = () => {
  if (!validateForm()) return;

  if (isLogin.value) {
    // 登录逻辑
    const loginResult = loginUser(form.username, form.password, role.value);

    if (loginResult.success) {
      // 登录成功
      const userInfo = {
        username: form.username,
        role: role.value
      };

      // 保存到localStorage
      if (rememberMe.value) {
        localStorage.setItem('rememberedUser', JSON.stringify(userInfo));
      } else {
        localStorage.removeItem('rememberedUser');
      }

      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      eventBus.emit('userLoggedIn', userInfo);

      successType.value = 'login';
      successUsername.value = form.username;
      showSuccessPage.value = true;
    } else {
      // 登录失败
      showToastMessage('登录失败', loginResult.message, 'error');
    }
  } else {
    // 注册逻辑
    const registerResult = registerUser({
      username: form.username,
      password: form.password,
      role: role.value
    });

    if (registerResult.success) {
      // 注册成功
      showToastMessage('注册成功', '账号创建成功，请登录', 'success');

      // 自动填充用户名到登录表单
      setTimeout(() => {
        toggleAuthMode();
        form.username = form.username; // 保留用户名
      }, 1500);
    } else {
      // 注册失败
      showToastMessage('注册失败', registerResult.message, 'error');
    }
  }
};

// 重置密码
const resetPassword = () => {
  if (!resetForm.username || !resetForm.captcha || !resetForm.newPassword) {
    showToastMessage('重置失败', '请填写完整信息', 'error');
    return;
  }

  if (resetForm.captcha !== resetCaptchaCode.value) {
    showToastMessage('重置失败', '验证码不正确', 'error');
    return;
  }

  if (resetForm.newPassword.length < 6) {
    showToastMessage('重置失败', '新密码至少6个字符', 'error');
    return;
  }

  // 调用重置密码方法
  const resetResult = resetUserPassword(resetForm.username, resetForm.newPassword, role.value);

  if (resetResult.success) {
    showToastMessage('重置成功', resetResult.message, 'success');
    showForgotModal.value = false;
  } else {
    showToastMessage('重置失败', resetResult.message, 'error');
  }

  // 清空表单
  resetForm.username = '';
  resetForm.captcha = '';
  resetForm.newPassword = '';
  generateResetCaptcha();
};

// 前往首页（无刷新跳转）
const goToDashboard = () => {
  router.push('/homepage');
};

// 显示提示消息
const showToastMessage = (title, message, type = 'success') => {
  toastTitle.value = title;
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 组件挂载时检查记住的用户
import { onMounted } from 'vue';
onMounted(() => {
  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser) {
    const user = JSON.parse(rememberedUser);
    form.username = user.username;
    role.value = user.role;
    rememberMe.value = true;
  }
});
</script>
<style scoped>
/* 基础样式 - 更明亮的配色 */
.auth-container {
  width: 100%;
  height: 90vh;
  ;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
  color: #334155;
  overflow: hidden;
}

/* 背景装饰 */
.bg-blur {
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 180, 255, 0.2) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  filter: blur(60px);
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(100, 180, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 180, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
  pointer-events: none;
}

/* 主卡片 - 加宽尺寸 */
.auth-card {
  width: 100%;
  max-width: 600px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%),
    linear-gradient(rgba(100, 180, 255, 0.03) 1px, transparent 1px);
  background-size: 100% 100%, 30px 30px;
  border-radius: 16px;
  padding: 45px 50px;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(100, 180, 255, 0.2);
  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.08),
    0 0 30px rgba(100, 180, 255, 0.05) inset;
  height: 780px;
}

/* 标题区域 */
.auth-header {
  text-align: center;
  position: relative;
  top: -23px;
}

.logo {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 15px;
  color: #2563eb;
  text-shadow: 0 0 10px rgba(100, 180, 255, 0.3);
  position: relative;
  display: inline-block;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 40px;
  background: radial-gradient(ellipse, rgba(100, 180, 255, 0.2) 0%, transparent 70%);
  z-index: -1;
}

.auth-header h1 {
  font-size: 28px;
  margin: 0 0 10px;
  color: #1e293b;
}

.sub-title {
  color: #64748b;
  margin: 0;
  font-size: 15px;
}

/* 角色选择器 */
.role-selector {
  display: flex;
  gap: 15px;
  margin-bottom: 35px;
  position: relative;
  top: -10px;
}

.role-btn {
  flex: 1;
  padding: 14px;
  background: rgba(240, 248, 255, 0.8);
  border: 1px solid rgba(100, 180, 255, 0.2);
  border-radius: 10px;
  color: #334155;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.role-btn.active {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #2563eb;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.1);
}

.role-btn:hover:not(.active) {
  background: rgba(240, 248, 255, 1);
}

/* 表单样式 */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
  top: -20px;
}

.form-group {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 15px;
  color: #334155;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 10px;
  color: #1e293b;
  font-size: 16px;
  transition: all 0.3s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-wrapper input.error {
  border-color: rgba(239, 68, 68, 0.5);
}

.input-icon {
  position: absolute;
  left: 15px;
  font-size: 18px;
  color: #64748b;
}

.toggle-password {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #3b82f6;
}

/* 图形验证码样式 */
.captcha-group {

}

.captcha-wrapper {
  display: flex;
  gap: 15px;
}

.captcha-wrapper .input-wrapper {
  flex: 1;
}

.captcha-image {
  min-width: 120px;
  padding: 0 15px;
  background: #f8fafc;
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  color: #334155;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

}

.captcha-image:hover {
  background: #f1f5f9;
  border-color: rgba(59, 130, 246, 0.4);
}

.refresh-icon {
  font-size: 14px;
  color: #64748b;
  margin-left: 5px;
}

/* 表单操作区 */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: #64748b;
  margin-top: 5px;
  cursor: pointer;
}

.remember-me input {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.forgot-password {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 15px;
  cursor: pointer;
  padding: 5px 0;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* 提交按钮 */
.submit-btn {
  width: 42%;
  padding: 15px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  gap: 8px;
  margin: 10px auto;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 19px;
  transition: transform 0.3s ease;
}

.submit-btn:hover .btn-icon {
  transform: translateX(3px);
}

/* 切换登录 / 注册 */
.toggle-auth {
  position: absolute;
  bottom: 15px;
  text-align: center;
  margin-top: 30px;
  font-size: 15px;
  color: #64748b;
}

.toggle-auth button {
  position: relative;
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 15px;
  padding: 0;
  font-weight: 600;
}

.toggle-auth button:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

/* 错误提示 */
.error-text {
  margin: 0;
  font-size: 13px;
  color: #ef4444;
  /* 移除默认的padding-top */
  /* padding-top: 2px; */
  
  /* 关键修改：使用绝对定位 */
  position: absolute;
  left: 0;
  bottom: -18px; /* 定位到输入框下方 */
  height: 16px; /* 固定高度 */
  line-height: 16px;
  white-space: nowrap; /* 防止换行 */
}


/* 弹窗样式 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(3px);
}

.modal {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(100, 180, 255, 0.2);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: 20px 25px;
  border-bottom: 1px solid rgba(100, 180, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 19px;
}

.close-modal {
  background: none;
  border: none;
  color: #64748b;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-modal:hover {
  color: #ef4444;
}

.modal-body {
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.modal-footer {
  padding: 15px 25px;
  border-top: 1px solid rgba(100, 180, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.cancel-btn {
  padding: 10px 20px;
  background: #f1f5f9;
  border: 1px solid rgba(100, 180, 255, 0.2);
  border-radius: 8px;
  color: #64748b;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #e2e8f0;
}

.confirm-btn {
  padding: 10px 20px;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn:hover {
  background: #2563eb;
}

/* 提示框 */
.toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 10px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 500px;
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from {
    top: -100px;
    opacity: 0;
  }

  to {
    top: 30px;
    opacity: 1;
  }
}

.toast-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.toast-icon.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.toast-icon.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.toast-content h4 {
  margin: 0 0 5px;
  color: #1e293b;
  font-size: 16px;
}

.toast-content p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
}

/* 成功页面样式 */
.success-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
  position: relative;
  z-index: 10;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.success-container {
  text-align: center;
  padding: 60px 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  position: relative;
  overflow: hidden;
}

.success-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
}

.success-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 0 auto 30px;
  border: 3px solid rgba(16, 185, 129, 0.3);
}

.success-title {
  font-size: 32px;
  color: #1e293b;
  margin: 0 0 15px;
}

.success-role {
  font-size: 20px;
  color: #3b82f6;
  margin: 0 0 25px;
  font-weight: 500;
  padding: 10px 0;
  border-bottom: 1px solid rgba(100, 180, 255, 0.1);
}

.success-message {
  font-size: 16px;
  color: #64748b;
  margin: 0 0 40px;
  line-height: 1.6;
}

.success-btn {
  padding: 16px 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.success-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .auth-card {
    max-width: 90%;
    padding: 35px 25px;
  }

  .logo {
    font-size: 28px;
  }

  .auth-header h1 {
    font-size: 24px;
  }

  .input-wrapper input {
    padding: 14px 15px 14px 45px;
    font-size: 15px;
  }

  .submit-btn {
    padding: 14px;
    font-size: 16px;
  }

  .modal {
    width: 90%;
  }

  .toast {
    width: 90%;
    min-width: auto;
  }

  .success-title {
    font-size: 26px;
  }

  .success-role {
    font-size: 18px;
  }
}
</style>