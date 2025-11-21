<template>
  <div class="dashboard">
    <!-- 顶部标题与描述 -->
    <header class="dashboard-header">
      <h1>智能商场数据驾驶舱</h1>
      <p>实时监控商场运营状况、客流分析、销售数据及客户反馈，助力精准决策</p>
    </header>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <select v-model="timeRange" class="filter-select">
        <option value="today">今日</option>
        <option value="week">本周</option>
        <option value="month" selected>本月</option>
        <option value="quarter">本季度</option>
        <option value="year">本年</option>
      </select>
      
      <select v-model="mallArea" class="filter-select">
        <option value="all" selected>全部区域</option>
        <option value="east">东区</option>
        <option value="west">西区</option>
        <option value="south">南区</option>
        <option value="north">北区</option>
      </select>
      
      <select v-model="dataType" class="filter-select">
        <option value="all" selected>全部数据</option>
        <option value="traffic">客流数据</option>
        <option value="sales">销售数据</option>
        <option value="service">服务数据</option>
      </select>
    </div>

    <!-- 核心指标卡片 -->
    <div class="kpi-cards">
      <div class="kpi-card">
        <div class="kpi-title">总客流量</div>
        <div class="kpi-value">12,589</div>
        <div class="kpi-trend up">
          <span>↑ 12.3%</span>
          <span class="trend-desc">较昨日</span>
        </div>
      </div>
      
      <div class="kpi-card">
        <div class="kpi-title">销售额(万元)</div>
        <div class="kpi-value">328</div>
        <div class="kpi-trend down">
          <span>↓ 3.2%</span>
          <span class="trend-desc">较昨日</span>
        </div>
      </div>
      
      <div class="kpi-card">
        <div class="kpi-title">客户满意度</div>
        <div class="kpi-value">4.7/5</div>
        <div class="kpi-trend up">
          <span>↑ 0.3</span>
          <span class="trend-desc">较上月</span>
        </div>
      </div>
      
      <div class="kpi-card">
        <div class="kpi-title">商铺出租率</div>
        <div class="kpi-value">98.2%</div>
        <div class="kpi-trend up">
          <span>↑ 1.5%</span>
          <span class="trend-desc">较上月</span>
        </div>
      </div>
    </div>

    <!-- 图表区域第一部分（仅容器） -->
    <div class="charts-grid">
      <!-- 客流趋势图容器 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>客流趋势分析</h3>
          <span>近30天</span>
        </div>
        <div class="chart-placeholder" id="trafficChartContainer">
<VisitorChart></VisitorChart>
        </div>
      </div>
      
      <!-- 销售趋势图容器 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>销售趋势分析</h3>
          <span>近30天</span>
        </div>
        <div class="chart-placeholder" id="salesChartContainer">
<SaleChart></SaleChart>       </div>
      </div>
      
      <!-- 业态分布图容器 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>业态类型分布</h3>
          <span>占比情况</span>
        </div>
        <div class="chart-placeholder" id="categoryChartContainer">
        <BusinessType/>
        </div>
      </div>
      
      <!-- 热门商铺图容器 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>热门商铺排名</h3>
          <span>客流量占比</span>
        </div>
        <div class="chart-placeholder" id="topShopsChartContainer">
<PopularStoresRankingChart/>        </div>
      </div>

    <!-- 新增：用户满意度趋势和热门话题容器 -->
      <!-- 用户满意度趋势容器 -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>用户满意度趋势</h3>
          <span>近6个月</span>
        </div>
        <div class="chart-placeholder" id="satisfactionChartContainer">
 <UserSatisfactionTrendChart/>
        </div>
      </div>
      
      <!-- 热门话题反映容器 -->
      <div class="chart-card topic-card">
        <div class="chart-header">
          <h3>热门话题反映</h3>
          <span>用户关注焦点</span>
        </div>
             <div class="chart-placeholder" id="hottopic">
 <HotTopicsRadarChart/>
        </div>
      </div>
    </div>

    <!-- 服务质量画像（独占容器） -->
    <div class="service-profile-container">
      <h3 class="section-title">服务质量画像</h3>
      <div class="service-profile">
        <table class="service-table">
          <thead>
            <tr>
              <th>商家名称</th>
              <th>响应速度</th>
              <th>好评率</th>
              <th>问题触发率</th>
              <th>综合评分</th>
              <th>排名趋势</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="merchant-name">
                <div class="merchant-icon">蓝</div>
                <span>蓝巴克</span>
              </td>
              <td>
                <div class="stars">★★★★★</div>
                <span>5.0</span>
              </td>
              <td>
                <div class="stars">★★★★★</div>
                <span>98%</span>
              </td>
              <td>
                <div class="stars stars-negative">★★★★★</div>
                <span>2%</span>
              </td>
              <td>4.9</td>
              <td class="trend up">↑ 上升</td>
            </tr>
            <tr>
              <td class="merchant-name">
                <div class="merchant-icon">优</div>
                <span>优衣库</span>
              </td>
              <td>
                <div class="stars">★★★★☆</div>
                <span>4.5</span>
              </td>
              <td>
                <div class="stars">★★★★★</div>
                <span>95%</span>
              </td>
              <td>
                <div class="stars stars-negative">★★★★☆</div>
                <span>3%</span>
              </td>
              <td>4.7</td>
              <td class="trend up">↑ 上升</td>
            </tr>
            <tr>
              <td class="merchant-name">
                <div class="merchant-icon">西</div>
                <span>西西弗书店</span>
              </td>
              <td>
                <div class="stars">★★★★☆</div>
                <span>4.0</span>
              </td>
              <td>
                <div class="stars">★★★★☆</div>
                <span>92%</span>
              </td>
              <td>
                <div class="stars stars-negative">★★★★☆</div>
                <span>5%</span>
              </td>
              <td>4.5</td>
              <td class="trend down">↓ 下降</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分析建议 -->
    <div class="analysis-section">
      <h3 class="section-title">数据分析与建议</h3>
      <div class="analysis-cards">
        <div class="analysis-card">
          <h4>客流高峰分析</h4>
          <p>周末10:00-12:00及16:00-20:00为客流高峰，建议增加临时导购人员，优化高峰期服务效率。</p>
        </div>
        
        <div class="analysis-card">
          <h4>销售转化建议</h4>
          <p>女装区客流转化率较低，建议调整陈列方式，增加促销活动，提升购买转化率。</p>
        </div>
        
        <div class="analysis-card">
          <h4>客户反馈改进</h4>
          <p>近期关于餐饮区等待时间过长的反馈增加20%，建议优化叫号系统，协调商户增加人手。</p>
        </div>
      </div>
    </div>

    <Slide5></slide5>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VisitorChart from './datatool/VisitorChart.vue';
import SaleChart from './datatool/saleChart.vue';
import BusinessType from './datatool/BusinessType.vue';
import PopularStoresRankingChart from './datatool/PopularStoresRankingChart.vue';
import UserSatisfactionTrendChart from './datatool/UserSatisfactionTrendChart.vue';
import HotTopicsRadarChart from './datatool/HotTopicsRadarChart.vue';
import Slide5 from './slides/slide5.vue';

// 筛选条件响应式数据
const timeRange = ref('month');
const mallArea = ref('all');
const dataType = ref('all');
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Segoe UI', Roboto, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dashboard-header h1 {
  color: #1e293b;
  margin-bottom: 10px;
  font-size: 28px;
}

.dashboard-header p {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}

.filter-section {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  padding: 15px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.filter-select {
  padding: 8px 15px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  color: #334155;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.kpi-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid #3b82f6;
}

.kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.kpi-title {
  color: #64748b;
  font-size: 16px;
  margin-bottom: 10px;
}

.kpi-value {
  font-size: 28px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 10px;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.up {
  color: #10b981;
}

.down {
  color: #ef4444;
}

.trend-desc {
  color: #64748b;
  font-size: 12px;
}

/* 核心修改：合并后的图表网格布局 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 强制每行3列 */
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: 350px;
  transition: box-shadow 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
}

.chart-header h3 {
  color: #1e293b;
  font-size: 18px;
  margin: 0;
}

.chart-header span {
  color: #64748b;
  font-size: 14px;
  background: #f1f5f9;
  padding: 3px 10px;
  border-radius: 12px;
}

/* 图表占位容器样式 */
.chart-placeholder {
  width: 100%;
  height: calc(100% - 40px);
  background-color: #f8fafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cbd5e1;
}

.chart-placeholder-text {
  color: #94a3b8;
  font-size: 14px;
}

.section-title {
  color: #1e293b;
  margin-bottom: 20px;
  font-size: 20px;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 3px;
  background-color: #3b82f6;
}

/* 热门话题样式 */
.topic-card {
  display: flex;
  flex-direction: column;
}

.topics-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.topic-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

.topic-label {
  width: 120px;
  font-size: 14px;
  color: #334155;
  font-weight: 500;
}

.topic-bar {
  flex: 1;
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 5px;
  overflow: hidden;
}

.topic-fill {
  height: 100%;
  background-color: #3b82f6;
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

.topic-percent {
  width: 50px;
  text-align: right;
  font-size: 14px;
  color: #64748b;
}

/* 服务质量画像样式 */
.service-profile-container {
  margin-bottom: 30px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.service-profile {
  overflow-x: auto;
}

.service-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.service-table th,
.service-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}

.service-table th {
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
}

.service-table td {
  color: #1e293b;
  font-size: 14px;
}

.merchant-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.merchant-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.stars {
  color: #f59e0b;
  margin-bottom: 5px;
  font-size: 14px;
}

.stars-negative {
  color: #e2e8f0;
  position: relative;
}

.stars-negative::before {
  content: '★★★★★';
  position: absolute;
  color: #ef4444;
  overflow: hidden;
}

.stars-negative[data-rating="2"]::before { width: 20%; }
.stars-negative[data-rating="3"]::before { width: 30%; }
.stars-negative[data-rating="5"]::before { width: 50%; }

.trend {
  font-size: 14px;
  font-weight: 500;
}

/* 分析建议样式 */
.analysis-section {
  margin-bottom: 30px;
}

.analysis-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.analysis-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3b82f6;
  transition: transform 0.3s ease;
}

.analysis-card:hover {
  transform: translateX(5px);
}

.analysis-card h4 {
  color: #1e293b;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
}

.analysis-card p {
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  font-size: 14px;
}

/* 响应式调整：适配不同屏幕尺寸 */
@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: repeat(2, 1fr); /* 中等屏幕每行2列 */
  }
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr; /* 小屏幕每行1列 */
  }
  
  .chart-card {
    height: 300px;
  }
  
  .kpi-cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .kpi-cards {
    grid-template-columns: 1fr;
  }
  
  .filter-section {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>