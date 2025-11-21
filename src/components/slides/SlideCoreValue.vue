<template>
  <div class="slide slide-core-value">
    <!-- 视频背景 -->
    <video class="slide-video" autoplay muted loop playsinline>
      <source src="../../assets/WeChat_20251118135923.mp4" type="video/mp4">
    </video>
    
    <div class="slide-bg">
      <div class="slide-overlay"></div>
      <!-- 科技感装饰元素 -->
      <div class="tech-decoration left"></div>
      <div class="tech-decoration right"></div>
      
      <div class="slide-content">
        <h2 class="slide-title">盾芽双翼</h2>
        <p class="p1">AI驱动的商场服务与青年实践协同生态平台</p>
        
<div class="slide-features">
  <div class="feature-item">
    <i class="icon">📊</i>
    <span>智能预测</span>
  </div>
  <div class="feature-item">
    <i class="icon">🔍</i>
    <span>精准分析</span>
  </div>
  <div class="feature-item">
    <i class="icon">💡</i>
    <span>多维赋能</span>
  </div>
  <div class="feature-item">
    <i class="icon">🤝</i>
    <span>生态共赢</span>
  </div>
  <div class="feature-item">
    <i class="icon">🚀</i>
    <span>智领未来</span>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 移除背景图引用，改用视频
</script>

<style scoped>
.slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
}

/* 视频背景样式 */
.slide-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持视频比例并覆盖全屏 */
  z-index: 0; /* 视频在最底层 */
}

.slide-bg {
  width: 100%;
  height: 100%;
  position: relative; /* 确保子元素能正常定位 */
  transition: transform 8s ease;
  z-index: 1; /* 背景层在视频上方 */
}

.slide:hover .slide-bg {
  transform: scale(1.05);
}

/* 科技感遮罩 - 保持原有视觉效果 */
.slide-core-value .slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: 
    linear-gradient(135deg, rgba(10, 30, 80, 0.85) 0%, rgba(20, 60, 150, 0.7) 100%),
    radial-gradient(circle at 70% 60%, rgba(50, 120, 255, 0.3) 0%, transparent 60%); */
  z-index: 1;
}

/* 科技装饰元素 - 增强未来感 */
.tech-decoration {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 1;
}

.tech-decoration.left {
  top: 30%;
  left: -100px;
  background: rgba(50, 150, 255, 0.2);
}

.tech-decoration.right {
  bottom: -50px;
  right: 10%;
  background: rgba(100, 200, 255, 0.15);
}

/* 内容容器 - 保持在最上层并水平居中 */
.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  color: white;
  max-width: 900px;
  width: 90%;
  padding: 0 20px;
  z-index: 2; /* 内容在最上层 */
  opacity: 0;
  animation: fadeIn 1.2s forwards 0.3s;
  text-align: center; /* 整体内容水平居中 */
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translate(-50%, -60%);
  }
}

/* 主标题样式 - 水平居中调整 */
.slide-title {
  font-weight: 800;
  font-size: 67px;
  letter-spacing: 15px;
  margin-bottom: 15px;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(100, 180, 255, 0.6);
  position: relative;
  /* 移除左右偏移，改为自动居中 */
  left: 0;
  top: 14px;
  padding-left: 15px; /* 抵消letter-spacing首字符偏移 */
  display: inline-block; /* 确保居中生效 */
}

/* 副标题样式 - 水平居中调整 */
.p1 {
  color: rgba(255, 255, 255, 0.9);
  font-family: 'SimSun', '宋体', serif;
  margin-bottom: 30px;
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(0, 100, 255, 0.5);
  position: relative;
  /* 移除左右偏移，改为自动居中 */
  top: 30px;
  left: 0;
  font-weight: 800;
  font-size: 32px;
  color: white;
}

/* 描述文字 - 水平居中调整 */
.slide-desc {
  margin-bottom: 40px;
  line-height: 1.8;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
  /* 移除左右偏移，改为自动居中 */
  top: -40px;
  left: 0;
  font-weight: 800;
  font-size: 27px;
  font-family: 'SimSun', '宋体', serif;
}

/* 特性项容器 - 水平居中 */
.slide-features {
width: 800px;  position: relative;
  top: 67px;
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center; /* 确保特性项水平居中 */
  margin: 0 auto; /* 容器自身居中 */
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.15rem;
  padding: 15px 23px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  transition: all 0.3s;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.feature-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(50, 150, 255, 0.2);
}

.feature-item .icon {
  font-size: 1.6rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .slide-title {
    font-size: 50px;
    letter-spacing: 10px;
  }
  
  .p1 {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 35px;
    letter-spacing: 5px;
  }
  
  .p1 {
    font-size: 16px;
  }
  
  .slide-desc {
    font-size: 15px;
    margin-bottom: 25px;
  }
  
  .slide-features {
    gap: 1rem;
  }
  
  .feature-item {
    font-size: 1rem;
    padding: 8px 15px;
  }
}

@media (max-width: 480px) {
  .slide-title {
    font-size: 28px;
    letter-spacing: 3px;
  }
  
  .slide-features {
    flex-direction: column;
    align-items: center;
  }
}
</style>