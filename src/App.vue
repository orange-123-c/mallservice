

<template>
  <div class="app-container">
    <!-- 顶部导航栏（固定定位） -->
    <Topmenu />
    
    <!-- 主内容区（自适应填充，避开导航栏高度） -->
    <main class="main-content">
      <!-- 路由视图：根据导航切换显示对应页面 -->
      <router-view />
    </main>
    
    <!-- 可选：页脚 -->
    <!-- <footer class="app-footer">
      <div class="footer-content">
        <p>© 2025 盾芽双翼AI协同生态平台 - 版权所有</p>
   
      </div>
    </footer> -->
  </div>
</template>

<script>
import Topmenu from './components/topmenu.vue';

export default {
  name: 'App',
  components: { Topmenu }
};
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f9fafb;
  line-height: 1.6;
}

/* 应用容器 */
.app-container {
  /* 确保内容区在导航栏下方 */
  padding-top: 90px; /* 与导航栏高度一致（你的导航栏高度是90px） */
  min-height: 100vh; /* 最小高度占满屏幕 */
  display: flex;
  flex-direction: column;
}

/* 主内容区 */
.main-content {
  max-width:1620px; /* 与导航栏最大宽度一致，保持居中 */
  width: 100%;
  margin: -5px auto;
  /* padding: 30px 35px; 左右内边距与导航栏对齐 */
}

/* 页脚样式 */
.app-footer {
  height: 40px;
background-color: #fff;  border-top: 1px solid #eee;
}

.footer-content {
  height: 40px;
  max-width: 1500px;
  margin: 0 auto;
  padding: 25px 35px;
  text-align: center;
  font-size: 0.9rem;
  position: relative;
  top: -16px;
  color: #666;
}

.footer-links {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #165DFF;
}

/* 路由页面过渡动画（可选，增强体验） */
.router-view {
  transition: opacity 0.3s ease;
}

.router-view-enter {
  opacity: 0;
}

.router-view-enter-active {
  opacity: 1;
}
</style>
