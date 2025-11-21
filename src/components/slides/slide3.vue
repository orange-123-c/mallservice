<template>
  <div class="slide slide-platform-advantage">
    <!-- 视频背景（延续科技感风格） -->
    <!-- <video class="slide-video" autoplay muted loop playsinline>
      <source src="../../assets/WeChat_20251118135923.mp4" type="video/mp4">
    </video> -->
    
    <div class="slide-bg">
      <div class="slide-overlay"></div>
      <!-- 科技网格背景（增强科技氛围） -->
      <div class="tech-grid"></div>
      
      <div class="slide-content">
        <h2 class="slide-title">平台优势</h2>
        
        <div class="advantage-cards">
          <!-- 高效响应卡片 -->
          <div class="advantage-card">
            <div class="card-icon">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="url(#gearGradient)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
                <path d="M50 10L50 30M50 70L50 90M10 50L30 50M70 50L90 50M22 22L38 38M22 78L38 62M78 22L62 38M78 78L62 62" 
                      stroke="rgba(255,255,255,0.8)" stroke-width="3" stroke-linecap="round"/>
                <path d="M50 25L65 35L55 55L40 45Z" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
              </svg>
              <defs>
                <linearGradient id="gearGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#00f0ff"/>
                  <stop offset="100%" stop-color="#0077ff"/>
                </linearGradient>
              </defs>
            </div>
            <h3 class="card-title">高效响应</h3>
            <p class="card-desc">智能AI驱动，问题响应速度提升300%，平均解决时效缩短至2小时内</p>
          </div>
          
          <!-- 透明追踪卡片 -->
          <div class="advantage-card">
            <div class="card-icon">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 50L80 50" stroke="url(#trackGradient)" stroke-width="6" stroke-linecap="round"/>
                <path d="M40 30L60 70" stroke="url(#trackGradient)" stroke-width="6" stroke-linecap="round"/>
                <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
              </svg>
              <defs>
                <linearGradient id="trackGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#40bfff"/>
                  <stop offset="100%" stop-color="#0091ff"/>
                </linearGradient>
              </defs>
            </div>
            <h3 class="card-title">透明追踪</h3>
            <p class="card-desc">全流程可视化追踪，用户可实时查看服务进度，透明率达100%</p>
          </div>
          
          <!-- 服务提升卡片 -->
          <div class="advantage-card">
            <div class="card-icon">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="40" width="15" height="30" fill="url(#serviceGradient)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
                <rect x="45" y="30" width="15" height="40" fill="url(#serviceGradient)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
                <rect x="60" y="20" width="15" height="50" fill="url(#serviceGradient)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
                <path d="M45 30L60 20" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
                <circle cx="38" cy="25" r="8" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
                <circle cx="63" cy="15" r="8" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
              </svg>
              <defs>
                <linearGradient id="serviceGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#80d4ff"/>
                  <stop offset="100%" stop-color="#00aaff"/>
                </linearGradient>
              </defs>
            </div>
            <h3 class="card-title">服务提升</h3>
            <p class="card-desc">AI智能分析用户需求，个性化服务推荐，满意度提升至98%</p>
          </div>
        </div>
        
        <!-- 数据指标 -->
        <div class="data-metrics">
          <div class="metric-item">
            <span class="metric-value">98%</span>
            <span class="metric-label">问题解决率</span>
          </div>
          <div class="metric-item">
            <span class="metric-value">5000+</span>
            <span class="metric-label">用户好评</span>
          </div>
        </div>
        
        <!-- 科技机器人装饰 -->
        <div class="tech-robot">
          <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="url(#robotGradient)" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
            <circle cx="70" cy="80" r="15" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
            <circle cx="130" cy="80" r="15" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
            <circle cx="70" cy="80" r="8" fill="rgba(0,255,128,0.8)" stroke="rgba(0,255,128,0.9)" stroke-width="2"/>
            <circle cx="130" cy="80" r="8" fill="rgba(0,191,255,0.8)" stroke="rgba(0,191,255,0.9)" stroke-width="2"/>
            <rect x="80" y="110" width="40" height="20" fill="rgba(255,255,255,0.8)" stroke="rgba(255,255,255,0.9)" stroke-width="2" rx="5"/>
            <path d="M90 130L100 150L110 130" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <defs>
            <linearGradient id="robotGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#b3e5ff"/>
              <stop offset="100%" stop-color="#0088ff"/>
            </linearGradient>
          </defs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无逻辑代码，仅样式和结构
</script>

<style scoped>
.slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
}

/* 视频背景 */
.slide-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.slide-bg {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
    background: url('../../assets/wechat2.jpg') center/cover no-repeat;

}

/* 科技感遮罩 + 网格背景 */
.slide-platform-advantage .slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, rgba(10, 30, 80, 0.8) 0%, rgba(20, 60, 150, 0.7) 100%);
  z-index: 1;
}

.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(100, 243, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 243, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 2;
  pointer-events: none;
}

/* 内容容器 */
.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 90%;
  max-width: 1400px;
  padding: 40px;
  z-index: 3;
  opacity: 0;
  animation: fadeIn 1.2s forwards 0.3s;
  text-align: center;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

/* 标题样式 */
.slide-title {
  font-weight: 800;
  font-size: 56px;
  letter-spacing: 8px;
  margin-bottom: 60px;
  text-shadow: 
    0 0 15px rgba(255, 255, 255, 0.8),
    0 0 25px rgba(100, 180, 255, 0.6);
  position: relative;
  display: inline-block;
}

.slide-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 6px;
  background: linear-gradient(90deg, transparent, #00f0ff, transparent);
  border-radius: 3px;
}

/* 优势卡片容器 */
.advantage-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 80px;
}

/* 单个优势卡片 */
.advantage-card {
  width: 300px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 240, 255, 0.2);
}

.card-icon {
  margin-bottom: 20px;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #00f0ff;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
}

.card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* 数据指标 */
.data-metrics {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 60px;
}

.metric-item {
  text-align: center;
}

.metric-value {
  font-size: 48px;
  font-weight: 800;
  color: #64f3ff;
  text-shadow: 0 0 10px rgba(100, 243, 255, 0.6);
  display: block;
  margin-bottom: 10px;
}

.metric-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

/* 科技机器人装饰 */
.tech-robot {
  position: absolute;
  bottom: 20px;
  right: 40px;
  z-index: 4;
  opacity: 0.8;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .slide-title {
    font-size: 48px;
  }
  
  .advantage-cards {
    gap: 30px;
  }
  
  .advantage-card {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 36px;
    letter-spacing: 5px;
  }
  
  .advantage-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .advantage-card {
    width: 100%;
    max-width: 320px;
  }
  
  .data-metrics {
    gap: 40px;
  }
  
  .metric-value {
    font-size: 36px;
  }
  
  .tech-robot {
    width: 80px;
    height: 80px;
    bottom: 10px;
    right: 20px;
  }
}

@media (max-width: 480px) {
  .slide-content {
    padding: 20px;
  }
  
  .slide-title {
    font-size: 28px;
  }
  
  .data-metrics {
    flex-direction: column;
    gap: 20px;
  }
}
</style>