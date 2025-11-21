<template>
  <section class="about-container">
    <!-- 背景装饰层 -->
    <div class="bg-decoration"></div>
    <div class="grid-pattern"></div>

    <!-- 标题区域 -->
    <header class="about-header">
      <div class="header-glow"></div>
      <h1>关于我们 · 盾芽双翼</h1>
      <div class="header-line"></div>
    </header>

    <!-- 内容容器 -->
    <div class="content-wrapper">
      <!-- 平台愿景 -->
      <div class="card vision-card">
        <div class="card-icon blue">
          <div class="icon-pulse"></div>
          <span>✦</span>
        </div>
        <h2 class="hx">平台愿景</h2>
        <p>
          以AI为翼，以实践为根，构建“商业服务数字化、青年实践价值化、公共服务精准化”的协同生态，让商圈成为城市治理的微单元、青年成长的练兵场、美好生活的服务站。
        </p>
      </div>

      <!-- 双列内容区 - 核心使命与团队理念 -->
      <div class="dual-card">
        <!-- 核心使命 -->
        <div class="card mission-card">
          <div class="card-icon green">
            <div class="icon-pulse"></div>
            <span>🎯</span>
          </div>
          <h2 class="hx">核心使命</h2>
          <ul class="ul1">
            <li>
              <span class="mission-label">为商圈赋能</span>：打造智慧治理数字化底座，提升服务效率与运营效能
            </li>
            <li>
              <span class="mission-label">为青年筑梦</span>：搭建安全可信的实践平台，实现学以致用与全面发展
            </li>
            <li>
              <span class="mission-label">为城市添彩</span>：响应数字化转型战略，助力国际消费中心城市建设
            </li>
          </ul>
        </div>

        <!-- 团队理念 -->
        <div class="card concept-card">
          <div class="card-icon purple">
            <div class="icon-pulse"></div>
            <span>🤝</span>
          </div>
          <h2 class="hx">团队理念</h2>
          <p>
            我们是一群扎根上海、兼具技术视野与社会责任感的青年创业者。秉持“科技向善、协同共赢”的理念，将专业能力转化为解决社会问题的实际力量，用创新实践诠释当代青年的家国情怀与时代担当。
          </p>
        </div>
      </div>

      <!-- 生态架构 -->
      <div class="card ecosystem-card">
        <div class="section-header">
          <div class="section-icon yellow">
            <div class="icon-pulse"></div>
            <span>📊</span>
          </div>
          <h2 class="hx">生态架构</h2>
        </div>
        <div class="ecosystem-grid">
          <div class="ecosystem-item">
            <div class="item-icon blue">
              <div class="icon-pulse"></div>
              <span>⚙️</span>
            </div>
            <div class="item-content">
              <h3>智慧服务</h3>
              <p>AI驱动的反馈响应、数据决策与空间导览体系</p>
            </div>
          </div>
          <div class="ecosystem-item">
            <div class="item-icon green">
              <div class="icon-pulse"></div>
              <span>💼</span>
            </div>
            <div class="item-content">
              <h3>灵工实践</h3>
              <p>精准匹配的专业兼职与可信实践信用档案</p>
            </div>
          </div>
          <div class="ecosystem-item">
            <div class="item-icon red">
              <div class="icon-pulse"></div>
              <span>❤️</span>
            </div>
            <div class="item-content">
              <h3>公益驿站</h3>
              <p>连接社会需求的志愿服务与责任教育平台</p>
            </div>
          </div>
          <div class="ecosystem-item">
            <div class="item-icon purple">
              <div class="icon-pulse"></div>
              <span>🚀</span>
            </div>
            <div class="item-content">
              <h3>创意集市</h3>
              <p>低成本、高价值的青年创新创业孵化空间</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="card contact-card">
        <div class="section-header">
          <div class="section-icon red">
            <div class="icon-pulse"></div>
            <span>✉️</span>
          </div>
          <h2 class="hx">联系我们</h2>
        </div>
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon blue">
              <div class="icon-pulse"></div>
              <span>🤝</span>
            </div>
            <div class="contact-content">
              <h3>合作咨询</h3>
              <p>dunyashuangyi@123.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon green">
              <div class="icon-pulse"></div>
              <span>🎓</span>
            </div>
            <div class="contact-content">
              <h3>高校对接</h3>
              <p>school@123.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon yellow">
              <div class="icon-pulse"></div>
              <span>💬</span>
            </div>
            <div class="contact-content">
              <h3>意见反馈</h3>
              <p>feedback@123.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon purple">
              <div class="icon-pulse"></div>
              <span>📍</span>
            </div>
            <div class="contact-content">
              <h3>地址</h3>
              <p>上海市[XX区XX路XX号]青年创新孵化中心</p>
            </div>
          </div>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          © 2025 盾芽双翼 版权所有 | 沪ICP备XXXXXXXX号
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 组件交互逻辑可在此添加
</script>

<style scoped>
/* 基础样式优化 */
.about-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: #e6eaf2;
  background: linear-gradient(180deg, #0a0f1f 0%, #111a35 100%);
  padding: 40px 20px; /* 优化内边距 */
}

/* 内容容器居中限制宽度 */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-top: 30px; /* 与标题保持距离 */
}

/* 背景装饰优化 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 30%, rgba(70, 40, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(40, 120, 255, 0.15) 0%, transparent 40%);
  z-index: 0;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 200, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.07) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 1;
  pointer-events: none;
}

/* 标题区域优化 */
.about-header {
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 20px 0 30px; /* 增加底部间距 */
  margin: 0 auto;
  max-width: 800px;
}

.about-header h1 {
  font-size: clamp(2rem, 5vw, 2.8rem); /* 响应式字体 */
  font-weight: 800;
  margin: 0 0 15px;
  letter-spacing: 1.5px;
  text-shadow:
    0 0 10px rgba(0, 200, 255, 0.6),
    0 0 20px rgba(0, 200, 255, 0.3);
}

.header-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 120px;
  background: radial-gradient(ellipse, rgba(0, 200, 255, 0.2) 0%, transparent 70%);
  z-index: -1;
}

.header-line {
  width: 220px;
  height: 3px;
  margin: 0 auto;
  background: linear-gradient(90deg,
      transparent,
      rgba(0, 200, 255, 0.8),
      transparent);
  position: relative;
}

.header-line::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 200, 255, 0.8);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
}

/* 卡片样式优化 */
.card {
  background:
    linear-gradient(180deg, rgba(30, 40, 80, 0.6) 0%, rgba(15, 25, 60, 0.8) 100%),
    linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 30px 30px;
  border-radius: 12px;
  padding: 30px; /* 统一内边距 */
  position: relative;
  z-index: 2;
  border: 1px solid rgba(0, 200, 255, 0.15);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(0, 200, 255, 0.05) inset;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  margin-bottom: 30px; /* 优化卡片间距 */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.35),
    0 0 40px rgba(0, 200, 255, 0.1) inset;
}

/* 标题样式优化 */
.card h2 {
  font-size: 1.5rem;
  margin: 0 0 20px;
  color: #fff;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.card h2::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background: currentColor;
}

/* 文本样式优化 */
.card p {
  line-height: 1.8;
  margin: 0;
  color: #d1d9e6;
  font-size: 16px;
}

/* 图标样式统一优化 */
.card-icon, .section-icon, .item-icon, .contact-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: relative;
  color: #fff;
  flex-shrink: 0;
  margin-right: 12px; /* 图标与文字间距 */
}

/* 脉冲动画优化 */
.icon-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
  70% { transform: scale(1.3); opacity: 0; box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
  100% { transform: scale(1); opacity: 0; }
}

/* 颜色样式优化 */
.blue {
  background: rgba(50, 150, 255, 0.2);
  border: 1px solid rgba(50, 150, 255, 0.3);
  color: rgba(50, 150, 255, 0.9);
}

.green {
  background: rgba(50, 255, 150, 0.2);
  border: 1px solid rgba(50, 255, 150, 0.3);
  color: rgba(50, 255, 150, 0.9);
}

.purple {
  background: rgba(150, 50, 255, 0.2);
  border: 1px solid rgba(150, 50, 255, 0.3);
  color: rgba(150, 50, 255, 0.9);
}

.red {
  background: rgba(255, 80, 80, 0.2);
  border: 1px solid rgba(255, 80, 80, 0.3);
  color: rgba(255, 80, 80, 0.9);
}

.yellow {
  background: rgba(255, 200, 50, 0.2);
  border: 1px solid rgba(255, 200, 50, 0.3);
  color: rgba(255, 200, 50, 0.9);
}

/* 双列布局优化 */
.dual-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px; /* 增加列间距 */
  margin-bottom: 30px;
}

/* 使命列表样式优化 */
.ul1 {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ul1 li {
  margin-bottom: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid currentColor;
  transition: transform 0.3s ease;
}

.ul1 li:last-child {
  margin-bottom: 0;
}

.ul1 li:hover {
  transform: translateX(5px);
}

.mission-label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #fff;
}

/* 生态架构样式优化 */
.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 10px;
}

.section-header:after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
  margin-left: 20px;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px; /* 增加网格间距 */
}

.ecosystem-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 22px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.ecosystem-item:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255,  255, 0.08);
}

.ecosystem-item h3 {
  margin: 0 0 10px 0;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ecosystem-item p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #b9c3d4;
}

.item-content {
  flex: 1;
}

/* 联系我们样式优化 */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.contact-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 22px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.contact-item:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
}

.contact-content {
  flex: 1;
}

.contact-item h3 {
  margin: 0 0 10px 0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.contact-item p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #b9c3d4;
  word-break: break-all;
}

/* 版权信息样式优化 */
.copyright {
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  color: #8a9bb0;
  text-align: center;
  letter-spacing: 0.5px;
}

/* 平台愿景卡片特殊优化 */
.vision-card {
  padding: 35px;
}

.vision-card p {
  font-size: 17px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  color: #c9d1e0;
}

/* 团队理念卡片文本优化 */
.concept-card p {
  line-height: 1.9;
  color: #c9d1e0;
  padding-top: 5px;
}

/* 响应式深度优化 */
@media (max-width: 1200px) {
  .ecosystem-grid, .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .content-wrapper {
    padding: 20px 15px 0;
  }
}

@media (max-width: 900px) {
  .dual-card {
    grid-template-columns: 1fr;
  }
  
  .card {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .ecosystem-grid, .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  
  .section-header:after {
    display: none;
  }
  
  .ecosystem-item, .contact-item {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding: 18px;
  }
  
  .item-icon, .contact-icon {
    margin-bottom: 0;
    margin-right: 12px;
  }
  
  .about-header {
    padding: 15px 0 20px;
  }
  
  .about-container {
    padding: 20px 10px;
  }
}

@media (max-width: 480px) {
  .card h2 {
    font-size: 1.3rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .card-icon, .section-icon {
    margin-bottom: 8px;
    margin-right: 0;
  }
  
  .ecosystem-item, .contact-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .item-icon, .contact-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .vision-card p {
    text-align: left;
  }
}

/* 卡片特殊样式修正 */
.ecosystem-card, .contact-card {
  background-image: 
    linear-gradient(180deg, rgba(30, 40, 80, 0.6) 0%, rgba(15, 25, 60, 0.8) 100%),
    linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 100% 100%, 20px 20px, 20px 20px;
}

/* 图标脉冲效果增强 */
.section-icon .icon-pulse {
  border: 2px solid currentColor;
  animation-duration: 2.5s;
}

.item-icon .icon-pulse, .contact-icon .icon-pulse {
  border: 2px solid currentColor;
  animation-duration: 3s;
}

.card-icon .icon-pulse {
  border: 2px solid currentColor;
  animation-duration: 3.5s;
}

/* 交互反馈强化 */
.ecosystem-item:active, .contact-item:active, .ul1 li:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}
</style>