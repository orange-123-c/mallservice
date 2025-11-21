/**
 * 用户数据本地存储工具
 * 使用 localStorage 进行持久化
 */
const STORAGE_KEY = 'auth_platform_users';

// 初始化用户数据
function initUsers() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user: [],     // 用户账户
      merchant: []  // 商家账户
    }));
  } else {
    // 为现有用户添加会员状态（向后兼容）
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY));
    let updated = false;
    
    // 为user角色用户添加会员状态
    if (users.user) {
      users.user = users.user.map(user => {
        if (!user.hasOwnProperty('membershipLevel')) {
          updated = true;
          return { ...user, membershipLevel: 'non_member' };
        }
        return user;
      });
    }
    
    // 为merchant角色用户添加会员状态
    if (users.merchant) {
      users.merchant = users.merchant.map(user => {
        if (!user.hasOwnProperty('membershipLevel')) {
          updated = true;
          return { ...user, membershipLevel: 'non_member' };
        }
        return user;
      });
    }
    
    // 如果有更新，保存回localStorage
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }
}

// 获取所有用户（按角色分类）
export function getAllUsers() {
  initUsers();
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"user": [], "merchant": []}');
}

// 注册新用户
export function registerUser(userData) {
  const users = getAllUsers();
  const roleUsers = users[userData.role] || [];
  
  // 检查用户名是否已存在
  const userExists = roleUsers.some(user => user.username === userData.username);
  if (userExists) {
    return { success: false, message: '用户名已存在' };
  }
  
  // 添加新用户（默认非会员）
  roleUsers.push({
    username: userData.username,
    password: userData.password,
    createdAt: new Date().toISOString(),
    membershipLevel: 'non_member' // 默认非会员
  });
  
  users[userData.role] = roleUsers;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { success: true, message: '注册成功' };
}

// 用户登录验证
export function loginUser(username, password, role) {
  const users = getAllUsers();
  const roleUsers = users[role] || [];
  const user = roleUsers.find(user => user.username === username && user.password === password);
  
  if (user) {
    return { 
      success: true, 
      message: '登录成功', 
      user: {
        username: user.username,
        role: role,
        membershipLevel: user.membershipLevel,
        createdAt: user.createdAt
      } 
    };
  } else {
    return { success: false, message: '用户名或密码错误' };
  }
}

// 检查用户名是否存在
export function checkUsernameExists(username, role) {
  const users = getAllUsers();
  const roleUsers = users[role] || [];
  return roleUsers.some(user => user.username === username);
}

// 重置密码
export function resetUserPassword(username, newPassword, role) {
  const users = getAllUsers();
  const roleUsers = users[role] || [];
  
  const userIndex = roleUsers.findIndex(user => user.username === username);
  if (userIndex === -1) {
    return { success: false, message: '用户名不存在' };
  }
  
  roleUsers[userIndex].password = newPassword;
  users[role] = roleUsers;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return { success: true, message: '密码重置成功' };
}

// 更新会员等级
export function updateMembershipLevel(username, role, newLevel) {
  // 验证会员等级是否有效
  const validLevels = ['non_member', 'regular', 'silver', 'gold', 'diamond'];
  if (!validLevels.includes(newLevel)) {
    return { success: false, message: '无效的会员等级' };
  }
  
  const users = getAllUsers();
  const roleUsers = users[role] || [];
  
  const userIndex = roleUsers.findIndex(user => user.username === username);
  if (userIndex === -1) {
    return { success: false, message: '用户名不存在' };
  }
  
  // 更新会员等级
  roleUsers[userIndex].membershipLevel = newLevel;
  users[role] = roleUsers;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  
  return { 
    success: true, 
    message: '会员等级更新成功',
    membershipLevel: newLevel
  };
}

// 获取用户会员信息
export function getUserMembership(username, role) {
  const users = getAllUsers();
  const roleUsers = users[role] || [];
  
  const user = roleUsers.find(user => user.username === username);
  if (!user) {
    return { success: false, message: '用户名不存在' };
  }
  
  return { 
    success: true, 
    membershipLevel: user.membershipLevel 
  };
}

// 获取会员等级的中文显示名称
export function getMembershipDisplayName(level) {
  const displayNames = {
    'non_member': '非会员',
    'regular': '普通会员',
    'silver': '白银会员',
    'gold': '黄金会员',
    'diamond': '钻石会员'
  };
  
  return displayNames[level] || '非会员';
}