<template>
  <div class="merchant-ranking-page">
    <!-- 页面头部 -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-title">商场商家排行榜</h1>
        <p class="page-description">基于消费者评价和服务质量，展示商场内各商家的排名情况</p>
      </div>
    </header>

    <!-- 筛选区域 -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-container">
          <div class="filter-row">
            <div class="filter-item">
              <label>排名类型</label>
              <select v-model="filters.rankType" @change="filterMerchants">
                <option value="rating">好评率</option>
                <option value="popularity">人气指数</option>
                <option value="service">服务质量</option>
                <option value="price">性价比</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>商场</label>
              <select v-model="filters.mall" @change="filterMerchants">
                <option value="all">全部商场</option>
                <option value="central">中央商场</option>
                <option value="east">东方广场</option>
                <option value="time">时代天街</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>商家类型</label>
              <select v-model="filters.category" @change="filterMerchants">
                <option value="all">全部类型</option>
                <option value="electronics">数码电子</option>
                <option value="food">餐饮美食</option>
                <option value="clothing">服装服饰</option>
                <option value="entertainment">休闲娱乐</option>
              </select>
            </div>
            
            <div class="filter-item">
              <label>时间范围</label>
              <select v-model="filters.timeRange" @change="filterMerchants">
                <option value="quarter">本季度</option>
                <option value="month">本月</option>
                <option value="week">本周</option>
                <option value="year">全年</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据概览 -->
    <section class="stats-section">
      <div class="container">
        <h2 class="section-title">商家评分分布</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">★</div>
            <div class="stat-info">
              <p class="stat-label">平均评分</p>
              <p class="stat-value">{{ stats.averageRating.toFixed(1) }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🏪</div>
            <div class="stat-info">
              <p class="stat-label">参与商家</p>
              <p class="stat-value">{{ stats.totalMerchants }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">💬</div>
            <div class="stat-info">
              <p class="stat-label">评价总数</p>
              <p class="stat-value">{{ stats.totalReviews }}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-info">
              <p class="stat-label">环比提升</p>
              <p class="stat-value">{{ stats.ratingIncrease }}%</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 排行榜区域 -->
    <section class="ranking-section">
      <div class="container">
        <div class="ranking-header">
          <h2 class="section-title">商家排行</h2>
          <button class="refresh-btn" @click="refreshRanking">
            🔄 刷新排行
          </button>
        </div>
        
        <!-- 排行榜表格 -->
        <div class="ranking-table">
          <!-- 表头 -->
          <div class="table-header">
            <div class="table-cell rank-cell">排名</div>
            <div class="table-cell info-cell">商家信息</div>
            <div class="table-cell rating-cell">评分</div>
            <div class="table-cell review-cell">评价数</div>
            <div class="table-cell trend-cell">趋势</div>
            <div class="table-cell action-cell">操作</div>
          </div>
          
          <!-- 表内容 -->
          <div 
            class="table-row" 
            v-for="(merchant, index) in displayedMerchants" 
            :key="merchant.id"
            :class="{ 'hover': hoverRow === merchant.id }"
            @mouseenter="hoverRow = merchant.id"
            @mouseleave="hoverRow = null"
          >
            <div class="table-cell rank-cell">
              <div class="rank-badge" :class="getRankClass(index)">
                {{ index + 1 }}
              </div>
            </div>
            
            <div class="table-cell info-cell">
              <div class="merchant-info">
                <img :src="merchant.logo" alt="商家logo" class="merchant-logo">
                <div class="merchant-details">
                  <p class="merchant-name">{{ merchant.name }}</p>
                  <p class="merchant-meta">{{ merchant.categoryName }} | {{ merchant.mallName }}</p>
                </div>
              </div>
            </div>
            
            <div class="table-cell rating-cell">
              <div class="rating-display">
                <div class="stars">
                  <span v-for="star in 5" :key="star" :class="{ 'filled': star <= Math.floor(merchant.rating) }">★</span>
                </div>
                <span class="rating-value">{{ merchant.rating.toFixed(1) }}</span>
              </div>
            </div>
            
            <div class="table-cell review-cell">
              {{ merchant.reviewCount }}
            </div>
            
            <div class="table-cell trend-cell">
              <div class="trend-indicator" :class="getTrendClass(merchant.trend)">
                <span>{{ getTrendSymbol(merchant.trend) }}</span>
                {{ Math.abs(merchant.trend) }}位
              </div>
            </div>
            
            <div class="table-cell action-cell">
              <button class="detail-btn" @click="viewDetails(merchant.id)">详情</button>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-if="displayedMerchants.length === 0" class="empty-state">
            暂无符合条件的商家数据
          </div>
        </div>
        
        <!-- 加载更多 -->
        <div class="load-more">
          <button 
            v-if="hasMore"
            class="load-more-btn"
            @click="loadMore"
          >
            查看更多
          </button>
          <p v-else class="no-more">已显示全部商家</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// 筛选条件
const filters = reactive({
  rankType: 'rating',
  mall: 'all',
  category: 'all',
  timeRange: 'quarter'
});

// 分页控制
const pageSize = 5;
const currentPage = ref(1);

// 状态管理
const hoverRow = ref(null);
const allMerchants = ref([]);

// 统计数据
const stats = reactive({
  averageRating: 0,
  totalMerchants: 0,
  totalReviews: 0,
  ratingIncrease: 0
});

// 商家数据 - 更完整的示例数据
const merchantData = [
  {
    id: 1,
    name: "科技数码旗舰店",
    logo: "https://picsum.photos/seed/tech1/60/60",
    category: "electronics",
    categoryName: "数码电子",
    mall: "central",
    mallName: "中央商场",
    rating: 4.8,
    reviewCount: 1256,
    trend: 2
  },
  {
    id: 2,
    name: "智能设备体验店",
    logo: "https://picsum.photos/seed/tech2/60/60",
    category: "electronics",
    categoryName: "数码电子",
    mall: "east",
    mallName: "东方广场",
    rating: 4.7,
    reviewCount: 987,
    trend: -1
  },
  {
    id: 3,
    name: "未来家电生活馆",
    logo: "https://picsum.photos/seed/tech3/60/60",
    category: "electronics",
    categoryName: "数码电子",
    mall: "time",
    mallName: "时代天街",
    rating: 4.6,
    reviewCount: 842,
    trend: 3
  },
  {
    id: 4,
    name: "手机数码专区",
    logo: "https://picsum.photos/seed/tech4/60/60",
    category: "electronics",
    categoryName: "数码电子",
    mall: "central",
    mallName: "中央商场",
    rating: 4.5,
    reviewCount: 753,
    trend: 0
  },
  {
    id: 5,
    name: "电脑设备专营店",
    logo: "https://picsum.photos/seed/tech5/60/60",
    category: "electronics",
    categoryName: "数码电子",
    mall: "east",
    mallName: "东方广场",
    rating: 4.4,
    reviewCount: 621,
    trend: -2
  },
  {
    id: 6,
    name: "海底捞火锅",
    logo: "https://picsum.photos/seed/food1/60/60",
    category: "food",
    categoryName: "餐饮美食",
    mall: "central",
    mallName: "中央商场",
    rating: 4.9,
    reviewCount: 2345,
    trend: 1
  },
  {
    id: 7,
    name: "星巴克咖啡",
    logo: "https://picsum.photos/seed/food2/60/60",
    category: "food",
    categoryName: "餐饮美食",
    mall: "time",
    mallName: "时代天街",
    rating: 4.7,
    reviewCount: 1876,
    trend: 0
  },
  {
    id: 8,
    name: "优衣库",
    logo: "https://picsum.photos/seed/cloth1/60/60",
    category: "clothing",
    categoryName: "服装服饰",
    mall: "east",
    mallName: "东方广场",
    rating: 4.6,
    reviewCount: 1567,
    trend: -1
  },
  {
    id: 9,
    name: "万达影城",
    logo: "https://picsum.photos/seed/ent1/60/60",
    category: "entertainment",
    categoryName: "休闲娱乐",
    mall: "central",
    mallName: "中央商场",
    rating: 4.5,
    reviewCount: 1234,
    trend: 2
  },
  {
    id: 10,
    name: "电玩城",
    logo: "https://picsum.photos/seed/ent2/60/60",
    category: "entertainment",
    categoryName: "休闲娱乐",
    mall: "time",
    mallName: "时代天街",
    rating: 4.3,
    reviewCount: 987,
    trend: -3
  }
];

// 计算属性 - 筛选后的商家列表
const filteredMerchants = computed(() => {
  let result = [...allMerchants.value];
  
  // 商场筛选
  if (filters.mall !== 'all') {
    result = result.filter(m => m.mall === filters.mall);
  }
  
  // 类别筛选
  if (filters.category !== 'all') {
    result = result.filter(m => m.category === filters.category);
  }
  
  // 排序逻辑
  switch(filters.rankType) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'service':
      result.sort((a, b) => (b.rating * 0.7 + b.reviewCount * 0.3) - (a.rating * 0.7 + a.reviewCount * 0.3));
      break;
    case 'price':
      result.sort((a, b) => b.rating - a.rating); // 简化处理
      break;
  }
  
  return result;
});

// 计算属性 - 当前页显示的商家
const displayedMerchants = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredMerchants.value.slice(start, end);
});

// 计算属性 - 是否有更多数据
const hasMore = computed(() => {
  return currentPage.value * pageSize < filteredMerchants.value.length;
});

// 初始化
onMounted(() => {
  // 模拟API请求加载数据
  setTimeout(() => {
    allMerchants.value = merchantData;
    calculateStats();
  }, 300);
});

// 计算统计数据
function calculateStats() {
  if (allMerchants.value.length === 0) return;
  
  const totalRating = allMerchants.value.reduce((sum, m) => sum + m.rating, 0);
  stats.averageRating = totalRating / allMerchants.value.length;
  stats.totalMerchants = allMerchants.value.length;
  stats.totalReviews = allMerchants.value.reduce((sum, m) => sum + m.reviewCount, 0);
  stats.ratingIncrease = 8.3; // 模拟数据
}

// 筛选商家
function filterMerchants() {
  currentPage.value = 1; // 重置分页
}

// 加载更多
function loadMore() {
  currentPage.value++;
}

// 刷新排行榜
function refreshRanking() {
  // 模拟刷新效果
  allMerchants.value = [];
  
  setTimeout(() => {
    allMerchants.value = merchantData;
    calculateStats();
    currentPage.value = 1;
  }, 500);
}

// 查看详情
function viewDetails(id) {
  console.log(`查看商家ID: ${id} 的详情`);
  // 实际项目中可以使用路由跳转
  // router.push(`/merchant/${id}`);
}

// 获取排名样式类
function getRankClass(index) {
  if (index === 0) return 'rank-1';
  if (index === 1) return 'rank-2';
  if (index === 2) return 'rank-3';
  return 'rank-other';
}

// 获取趋势样式类
function getTrendClass(trend) {
  if (trend > 0) return 'trend-up';
  if (trend < 0) return 'trend-down';
  return 'trend-stable';
}

// 获取趋势符号
function getTrendSymbol(trend) {
  if (trend > 0) return '↑';
  if (trend < 0) return '↓';
  return '→';
}
</script>

<style scoped>
.merchant-ranking-page {
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #333;
  background-color: #f5f7fa;
height: 100%;  margin: 0;
  padding: 0;
     background-image: url('../assets/beijing.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
overflow-y: auto;
}

.container {
width: 80%;  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

/* 页面头部 */
.page-header {
width: 80%;
text-align: center;
margin:auto;
margin-top: 20px;
  background-color: #fff;
  padding: 2rem 0;
  margin-bottom: 2rem;
    border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #1f2329;
  text-align: center;
}

.page-description {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin: 0;
}

/* 筛选区域 */
.filter-section {
  margin-bottom: 2rem;
}

.filter-container {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.filter-item {
  flex: 1;
  min-width: 180px;
}

.filter-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.filter-item select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: #fff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

.filter-item select:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 统计区域 */
.stats-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: #1f2329;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #f0f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #409eff;
  font-size: 1.2rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 0.3rem 0;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2329;
  margin: 0;
}

/* 排行榜区域 */
.ranking-section {
  margin-bottom: 3rem;
}

.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.refresh-btn {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.refresh-btn:hover {
  background-color: #2e8ae6;
}

.ranking-table {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  background-color: #f5f7fa;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #eee;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.hover {
  background-color: #fafafa;
}

.table-cell {
  padding: 1rem;
  display: flex;
  align-items: center;
}

.rank-cell {
  width: 80px;
  justify-content: center;
}

.info-cell {
  flex: 2;
  min-width: 200px;
}

.rating-cell {
  width: 120px;
  justify-content: center;
}

.review-cell {
  width: 100px;
  justify-content: center;
}

.trend-cell {
  width: 120px;
  justify-content: center;
}

.action-cell {
  width: 100px;
  justify-content: center;
}

.rank-badge {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: #fff;
}

.rank-1 { background-color: #ff4d4f; }
.rank-2 { background-color: #faad14; }
.rank-3 { background-color: #13c2c2; }
.rank-other { background-color: #8c8c8c; }

.merchant-info {
  display: flex;
  align-items: center;
}

.merchant-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 1rem;
  object-fit: cover;
}

.merchant-name {
  font-weight: 600;
  margin: 0 0 0.3rem 0;
}

.merchant-meta {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.rating-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stars {
  color: #ddd;
  font-size: 1rem;
  letter-spacing: 2px;
}

.stars .filled {
  color: #faad14;
}

.rating-value {
  margin-top: 0.3rem;
  font-weight: 600;
  color: #faad14;
  font-size: 0.9rem;
}

.trend-indicator {
  font-size: 0.9rem;
}

.trend-up { color: #52c41a; }
.trend-down { color: #ff4d4f; }
.trend-stable { color: #666; }

.detail-btn {
  color: #409eff;
  background: transparent;
  border: none;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.detail-btn:hover {
  text-decoration: underline;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #666;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.load-more-btn {
  background-color: transparent;
  color: #409eff;
  border: 1px solid #409eff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.load-more-btn:hover {
  background-color: #f0f7ff;
}

.no-more {
  color: #666;
  font-size: 0.9rem;
}

/* 页脚 */
.page-footer {
  background-color: #1f2329;
  color: #fff;
  padding: 2rem 0;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .trend-cell {
    display: none;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .review-cell {
    display: none;
  }
  
  .filter-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .table-cell {
    padding: 0.7rem 0.5rem;
  }
  
  .merchant-logo {
    width: 40px;
    height: 40px;
    margin-right: 0.7rem;
  }
}
</style>