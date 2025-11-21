// 事件总线：用于组件间通信
export default {
  // 存储事件监听函数
  events: {},

  // 监听事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },

  // 触发事件
  emit(eventName, data) {
    if (this.events[eventName]) {
      // 执行所有监听该事件的回调函数
      this.events[eventName].forEach(callback => callback(data));
    }
  },

  // 移除事件监听
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
};