<template>
  <div class="slide slide-ai-mall-integration">
    <!-- 视频背景 -->
    <video class="slide-video" autoplay muted loop playsinline>
      <source src="../../assets/WeChat_20251118135923.mp4" type="video/mp4">
    </video>

    <!-- 网格背景覆盖层 -->
    <div class="grid-overlay"></div>
    
    <div class="slide-bg">
      <div class="slide-overlay"></div>
      
      <!-- 新增：动态科技光效 -->
      <div class="tech-glow top-left"></div>
      <div class="tech-glow bottom-right"></div>

      <!-- 科技感装饰元素 -->
      <div class="tech-decoration left"></div>
      <div class="tech-decoration right"></div>
      <div class="tech-decoration bottom"></div>

      <!-- 二进制数据流装饰 -->
      <div class="binary-flow top"></div>
      <div class="binary-flow bottom"></div>

      <!-- 新增：扫描线效果 -->
      <div class="scan-line"></div>

      <div class="slide-content">
        <h2 class="slide-title">AI智能与商场服务深入融合</h2>

        <!-- 城市天际线全息投影 -->
        <div class="city-hologram tech-border">
          <div class="hologram-base"></div>
          <!-- 边角装饰 -->
          <div class="corner corner-tl"></div>
          <div class="corner corner-tr"></div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
        </div>

        <!-- 四大功能模块 -->
        <div class="modules-container">
          <div class="module-card tech-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="module-icon purple">
              <div class="icon-inner">🔹</div>
            </div>
            <div class="module-title">AI智能反馈模块</div>
            <div class="module-stats">AI响应速度 <span class="highlight">0.8秒</span></div>
            <div class="module-desc">AI门户响应系统</div>
          </div>

          <div class="module-card tech-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="module-icon blue">
              <div class="icon-inner">🔷</div>
            </div>
            <div class="module-title">AR智能导览模块</div>
            <div class="module-stats">AR导航准确率 <span class="highlight">99.2%</span></div>
            <div class="module-desc">室内导航精准引擎</div>
          </div>

          <div class="module-card tech-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="module-icon gold">
              <div class="icon-inner">🔶</div>
            </div>
            <div class="module-title">数据驾驶舱</div>
            <div class="module-stats">AR导航效率 <span class="highlight">52秒</span></div>
            <div class="module-desc">商场智能决策系统</div>
          </div>

          <div class="module-card tech-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="module-icon cyan">
              <div class="icon-inner">🔵</div>
            </div>
            <div class="module-title">灵工支援</div>
            <div class="module-stats">AI匹配率 <span class="highlight">93.5%</span></div>
            <div class="module-desc">高效人才调度系统</div>
          </div>
        </div>

        <!-- 机器人形象 -->
        <div class="robot-avatar">🤖</div>

        <!-- 数据图表区域 -->
        <div class="data-charts">
          <div class="chart-card tech-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="chart-title">用户互动热力</div>
            <div class="chart-visualization heatmap">
              <yonghu></yonghu>
            </div>
          </div>

          <div class="chart-card tech-border">
            <div class="corner corner-tl"></div>
            <div class="corner corner-tr"></div>
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <div class="chart-title">服务时段分布</div>
            <div class="chart-visualization heatmap">
              <fuwu></fuwu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Yonghu from './echart/yonghu.vue';
import Fuwu from './echart/fuwu.vue'; // 修复组件导入大写规范
</script>

<style scoped>
.slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
}

/* 视频背景增强 */
.slide-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(0.5) contrast(1.2) saturate(0.8); /* 增强科技感色调 */
}

/* 新增：网格覆盖层 */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 1;
  pointer-events: none;
}

/* 新增：动态科技光效 */
.tech-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  z-index: 1;
  opacity: 0.6;
  animation: pulse 15s infinite alternate;
}

.tech-glow.top-left {
  top: -200px;
  left: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(100, 50, 255, 0.3), transparent 70%);
}

.tech-glow.bottom-right {
  bottom: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(50, 150, 255, 0.3), transparent 70%);
}

/* 新增：扫描线效果 */
.scan-line {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.8), transparent);
  z-index: 2;
  animation: scan 8s linear infinite;
}

.slide-bg {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 8s ease;
  z-index: 1;
}

.slide:hover .slide-bg {
  transform: scale(1.03);
}

/* 科技感遮罩增强 */
.slide-ai-mall-integration .slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(0, 10, 30, 0.92) 0%, rgba(0, 20, 60, 0.88) 100%),
    radial-gradient(circle at 50% 60%, rgba(0, 120, 255, 0.25) 0%, transparent 70%);
  z-index: 1;
}

/* 科技装饰元素优化 */
.tech-decoration {
  position: absolute;
  filter: blur(120px);
  z-index: 1;
  transition: all 8s ease;
}

.slide:hover .tech-decoration.left {
  transform: translateX(-50px) scale(1.1);
}

.slide:hover .tech-decoration.right {
  transform: translateX(50px) scale(1.1);
}

.tech-decoration.left {
  top: 20%;
  left: 10%;
  width: 500px;
  height: 500px;
  background: rgba(100, 50, 255, 0.2);
}

.tech-decoration.right {
  top: 40%;
  right: 15%;
  width: 400px;
  height: 400px;
  background: rgba(50, 150, 255, 0.2);
}

.tech-decoration.bottom {
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: rgba(0, 200, 255, 0.15);
}

/* 二进制数据流效果增强 */
.binary-flow {
  position: absolute;
  width: 100%;
  height: 120px;
  background-image:
    linear-gradient(to bottom, rgba(0, 255, 255, 0.15) 1px, transparent 1px),
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.08) 2px);
  background-size: 100% 20px;
  z-index: 1;
  opacity: 0.7;
  animation: flow 15s linear infinite;
}

@keyframes flow {
  0% { background-position: 0 0; }
  100% { background-position: 0 400px; }
}

.binary-flow.top {
  top: 15%;
}

.binary-flow.bottom {
  bottom: 15%;
  transform: rotate(180deg);
}

/* 内容容器 */
.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  max-width: 1400px;
  width: 90%;
  padding: 0 20px;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 1.5s forwards 0.3s;
  text-align: center;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

/* 标题样式增强 */
.slide-title {
  letter-spacing: 1.5px;
  left: 50%;
  top: 0.5%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 55px;
  padding-bottom: 15px;
  position: absolute;
  text-shadow:
    0 0 15px rgba(0, 200, 255, 0.9),
    0 0 30px rgba(0, 100, 255, 0.6),
    0 0 45px rgba(0, 100, 255, 0.3);
  background: linear-gradient(90deg, #fff, rgba(180, 220, 255, 0.8), #fff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: textShine 5s linear infinite;
}

@keyframes textShine {
  to { background-position: 200% center; }
}

.slide-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.8), transparent);
  animation: linePulse 3s infinite alternate;
}

@keyframes linePulse {
  0% { width: 150px; opacity: 0.7; }
  100% { width: 250px; opacity: 1; }
}

/* 城市全息投影 */
.city-hologram {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 100px;
  z-index: 2;
  background: rgba(10, 20, 50, 0.3);
  box-shadow: 0 0 30px rgba(0, 150, 255, 0.2);
}

.hologram-base {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0.8) drop-shadow(0 0 15px rgba(0, 150, 255, 0.6));
  opacity: 0.8;
  animation: hologramPulse 4s infinite alternate;
}

@keyframes hologramPulse {
  0% { filter: brightness(0.8) drop-shadow(0 0 15px rgba(0, 150, 255, 0.6)); }
  100% { filter: brightness(1) drop-shadow(0 0 25px rgba(0, 150, 255, 0.8)); }
}

/* 功能模块容器 */
.modules-container {
  display: flex;
  justify-content: center;
  gap: 5rem;
  margin-top: 20px;
  position: relative;
  z-index: 3;
}

/* 科技感边框核心样式 */
.tech-border {
  position: relative;
  border-radius: 12px;
  z-index: 1;
  overflow: hidden;
}

/* 霓虹发光边框 */
.tech-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: 14px;
  background: linear-gradient(
    45deg,
    rgba(0, 200, 255, 0.3),
    rgba(150, 50, 255, 0.3),
    rgba(50, 150, 255, 0.3),
    rgba(50, 255, 200, 0.3)
  );
  background-size: 400%;
  animation: borderGlow 8s linear infinite;
  filter: blur(1px);
}

/* 内部网格装饰 */
.tech-border::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: 
    linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

/* 边角发光点缀 */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 2;
  pointer-events: none;
}

.corner-tl {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(0, 200, 255, 0.8);
  border-left: 2px solid rgba(0, 200, 255, 0.8);
  border-radius: 4px 0 0 0;
}

.corner-tr {
  top: -1px;
  right: -1px;
  border-top: 2px solid rgba(150, 50, 255, 0.8);
  border-right: 2px solid rgba(150, 50, 255, 0.8);
  border-radius: 0 4px 0 0;
}

.corner-bl {
  bottom: -1px;
  left: -1px;
  border-bottom: 2px solid rgba(50, 255, 200, 0.8);
  border-left: 2px solid rgba(50, 255, 200, 0.8);
  border-radius: 0 0 0 4px;
}

.corner-br {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid rgba(50, 150, 255, 0.8);
  border-right: 2px solid rgba(50, 150, 255, 0.8);
  border-radius: 0 0 4px 0;
}

/* 模块卡片样式 */
.module-card {
  background: linear-gradient(180deg, rgba(30, 40, 80, 0.7) 0%, rgba(10, 20, 50, 0.9) 100%);
  width: 240px;
  padding: 2rem 1.2rem;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: inherit;
  opacity: 0.7;
}

.module-card:hover {
  transform: translateY(-15px) scale(1.03);
  box-shadow: 0 20px 40px rgba(0, 150, 255, 0.3), 0 0 30px rgba(0, 150, 255, 0.1) inset;
}

/* 模块图标增强 */
.module-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 150, 255, 0.1) inset;
}

.module-icon::before {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  background: conic-gradient(transparent 0deg, rgba(255, 255, 255, 0.15) 360deg);
  animation: rotate 6s linear infinite;
}

.icon-inner {
  position: relative;
  font-size: 2.5rem;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
  animation: iconPulse 3s infinite alternate;
}

@keyframes iconPulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

/* 图标颜色优化 */
.purple {
  background: linear-gradient(135deg, rgba(100, 50, 255, 0.3), rgba(150, 50, 255, 0.2));
  border: 1px solid rgba(150, 50, 255, 0.4);
}

.blue {
  background: linear-gradient(135deg, rgba(50, 100, 255, 0.3), rgba(50, 150, 255, 0.2));
  border: 1px solid rgba(50, 150, 255, 0.4);
}

.gold {
  background: linear-gradient(135deg, rgba(200, 150, 50, 0.3), rgba(255, 200, 50, 0.2));
  border: 1px solid rgba(255, 200, 50, 0.4);
}

.cyan {
  background: linear-gradient(135deg, rgba(50, 200, 255, 0.3), rgba(50, 255, 200, 0.2));
  border: 1px solid rgba(50, 255, 200, 0.4);
}

.module-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.module-stats {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.highlight {
  color: rgba(0, 200, 255, 0.9);
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 200, 255, 0.7);
  animation: highlightPulse 2s infinite alternate;
}

@keyframes highlightPulse {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

.module-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

/* 机器人形象增强 */
.robot-avatar {
  position: absolute;
  right: 3%;
  top: 55%;
  font-size: 6rem;
  text-shadow: 0 0 30px rgba(0, 200, 255, 0.7), 0 0 60px rgba(0, 200, 255, 0.3);
  z-index: 3;
  animation: float 6s ease-in-out infinite, glow 4s infinite alternate;
}

@keyframes glow {
  0% { text-shadow: 0 0 20px rgba(0, 200, 255, 0.6), 0 0 40px rgba(0, 200, 255, 0.2); }
  100% { text-shadow: 0 0 30px rgba(0, 200, 255, 0.8), 0 0 60px rgba(0, 200, 255, 0.4); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* 数据图表区域 */
.data-charts {
  display: flex;
  justify-content: center;
  gap: 4rem;
  position: relative;
  z-index: 3;
}

.chart-card {
  margin-top: 20px;
  background: linear-gradient(180deg, rgba(30, 40, 80, 0.6) 0%, rgba(10, 20, 50, 0.8) 100%);
  width: 470px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.chart-title {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.chart-visualization {
  height: 220px;
  position: relative;
}

/* 热力图样式 */
.heatmap {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 200, 255, 0.1);
}

/* 动画关键帧 */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes borderGlow {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

@keyframes scan {
  0% { top: -10%; }
  100% { top: 110%; }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.2); opacity: 0.8; }
}

/* 响应式调整 */
@media (max-width: 1400px) {
  .robot-avatar {
    font-size: 5rem;
    right: 5%;
  }
  .city-hologram {
    width: 700px;
    height: 180px;
  }
}

@media (max-width: 1200px) {
  .slide-title {
    font-size: 45px;
  }
  .modules-container {
    gap: 2rem;
  }
  .module-card {
    width: 200px;
    padding: 1.5rem 1rem;
  }
  .data-charts {
    gap: 2rem;
  }
  .chart-card {
    width: 350px;
  }
  .robot-avatar {
    display: none;
  }
}

@media (max-width: 992px) {
  .modules-container {
    flex-wrap: wrap;
  }
  .module-card {
    width: 250px;
    margin-bottom: 2rem;
  }
  .data-charts {
    flex-direction: column;
    align-items: center;
  }
  .chart-card {
    width: 100%;
    max-width: 500px;
  }
  .city-hologram {
    width: 600px;
    height: 150px;
  }
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 35px;
    margin-bottom: 50px;
  }
  .city-hologram {
    width: 450px;
    height: 120px;
  }
  .module-icon {
    width: 60px;
    height: 60px;
  }
  .icon-inner {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .slide-title {
    font-size: 28px;
  }
  .city-hologram {
    width: 300px;
    height: 100px;
  }
  .modules-container {
    gap: 1rem;
  }
  .module-card {
    width: 100%;
    max-width: 280px;
  }
}
</style>