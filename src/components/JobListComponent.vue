<template>
  <div class="job-platform-container">
    <!-- 页面标题 -->
    
    <!-- 兼职岗位列表容器 -->
    <div class="job-list-container">
      <!-- 标题栏 -->
      <div class="header-bar">
        <h2 class="header-title">
          <i class="icon-briefcase"></i>兼职岗位列表
        </h2>
        <div class="header-right">
          <div class="location-selector">
            <i class="icon-map-marker"></i>上海市
          </div>
          <button class="publish-btn">发布兼职</button>
        </div>
      </div>
      
      <!-- 筛选区域 -->
      <div class="filter-section">
        <!-- 岗位分类 -->
        <div class="filter-group">
          <h3 class="filter-title">岗位分类</h3>
          <div class="filter-options">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="['filter-btn', category.active ? 'active' : '']"
              @click="toggleCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        
        <!-- 薪资范围 -->
        <div class="filter-group">
          <h3 class="filter-title">薪资范围</h3>
          <div class="filter-options">
            <button 
              v-for="salary in salaries" 
              :key="salary.id"
              :class="['filter-btn', salary.active ? 'active' : '']"
              @click="toggleSalary(salary.id)"
            >
              {{ salary.name }}
            </button>
          </div>
        </div>
        
        <!-- 排序方式 -->
        <div class="filter-group">
          <h3 class="filter-title">排序方式</h3>
          <div class="filter-options">
            <button 
              v-for="sort in sorts" 
              :key="sort.id"
              :class="['filter-btn', sort.active ? 'active' : '']"
              @click="toggleSort(sort.id)"
            >
              {{ sort.name }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 列表头部 -->
      <div class="list-header">
        <div class="header-item">岗位名称</div>
        <div class="header-item">公司</div>
        <div class="header-item">薪资</div>
        <div class="header-item">工作地点</div>
        <div class="header-item">发布时间</div>
        <div class="header-item">距离</div>
        <div class="header-item">标签</div>
        <div class="header-item">操作</div>
      </div>
      
      <!-- 岗位列表 -->
      <div class="job-items">
        <div 
          v-for="job in filteredJobs" 
          :key="job.id"
          class="job-item"
        >
          <div class="item-cell title-cell">{{ job.title }}</div>
          <div class="item-cell company-cell">{{ job.company }}</div>
          <div class="item-cell salary-cell">{{ job.salary }}</div>
          <div class="item-cell location-cell">{{ job.location }}</div>
          <div class="item-cell date-cell">{{ job.publishDate }}</div>
          <div class="item-cell distance-cell">{{ job.distance }}</div>
          <div class="item-cell tags-cell">
            <span 
              v-for="tag in job.tags" 
              :key="tag.id"
              class="tag"
              :style="{ backgroundColor: tag.color }"
            >
              {{ tag.name }}
            </span>
          </div>
          <div class="item-cell action-cell">
            <button class="detail-btn" @click="openDetailModal(job)">查看详情</button>
          </div>
        </div>
      </div>
      
      <!-- 无数据状态 -->
      <div v-if="filteredJobs.length === 0" class="empty-state">
        <i class="icon-search"></i>
        <p>暂无符合条件的岗位</p>
      </div>
    </div>
  </div>
  
  <!-- 详情弹窗 - 移到组件根元素外，使用teleport传送至body -->
  <teleport to="body">
    <!-- 详情弹窗 -->
    <div v-if="visibleModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <div class="job-info">
            <h3 class="job-title">{{ currentJob.title }}</h3>
            <p class="job-company">{{ currentJob.company }} · {{ currentJob.categoryText }}</p>
          </div>
          <div class="salary-publish">
            <span class="salary">{{ currentJob.salary }}</span>
            <span class="publish-date">{{ currentJob.publishDate }}发布</span>
          </div>
          <button class="close-btn" @click="closeDetailModal">×</button>
        </div>
        
        <div class="modal-body">
          <!-- 岗位标签 -->
          <div class="section">
            <h4 class="section-title">岗位标签</h4>
            <div class="tag-group">
              <span 
                v-for="tag in currentJob.tags" 
                :key="tag.id"
                class="tag"
                :style="{ backgroundColor: tag.color }"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
          
          <!-- 工作地点 -->
          <div class="section">
            <h4 class="section-title">工作地点</h4>
            <p class="location-detail">
              <i class="icon-location"></i> {{ currentJob.locationDetail }}
            </p>
            <p class="distance">
              <i class="icon-distance"></i> 距离您约 {{ currentJob.distance }} 公里
            </p>
          </div>
          
          <!-- 工作描述 -->
          <div class="section">
            <h4 class="section-title">工作描述</h4>
            <p class="description">{{ currentJob.description }}</p>
          </div>
          
          <!-- 任职要求 -->
          <div class="section">
            <h4 class="section-title">任职要求</h4>
            <p class="requirement">{{ currentJob.requirement }}</p>
          </div>
          
          <!-- 福利待遇 -->
          <div class="section">
            <h4 class="section-title">福利待遇</h4>
            <p class="welfare">{{ currentJob.welfare }}</p>
          </div>
          
          <!-- 联系方式 -->
          <div class="section">
            <h4 class="section-title">联系方式</h4>
            <p class="contact">{{ currentJob.contact }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button 
            class="collect-btn" 
            :class="{ 'collected': currentJob.collected }"
            @click="toggleCollect"
          >
            <i class="icon-star"></i> {{ currentJob.collected ? '已收藏' : '收藏' }}
          </button>
          <button class="apply-btn" @click="applyJob">立即申请</button>
        </div>
      </div>
    </div>
    
    <!-- 提示弹窗 -->
    <div v-if="showToast" class="toast">
      {{ toastMessage }}
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue';

// 岗位分类数据
const categories = ref([
  { id: 'all', name: '全部', active: true },
  { id: 'food', name: '餐饮服务', active: false, text: '餐饮服务' },
  { id: 'retail', name: '零售销售', active: false, text: '零售销售' },
  { id: 'service', name: '客服支持', active: false, text: '客服支持' },
  { id: 'tech', name: '技术维修', active: false, text: '技术维修' },
  { id: 'design', name: '设计创意', active: false, text: '设计创意' },
  { id: 'marketing', name: '市场推广', active: false, text: '市场推广' },
  { id: 'activity', name: '活动策划', active: false, text: '活动策划' },
  { id: 'admin', name: '行政助理', active: false, text: '行政助理' }
]);

// 薪资范围数据
const salaries = ref([
  { id: 'all', name: '全部', active: true },
  { id: 'below200', name: '200元以下', active: false },
  { id: '200-300', name: '200-300元', active: false },
  { id: '300-400', name: '300-400元', active: false },
  { id: 'above400', name: '400元以上', active: false }
]);

// 排序方式数据
const sorts = ref([
  { id: 'latest', name: '最新发布', active: true },
  { id: 'salaryHigh', name: '薪资从高到低', active: false },
  { id: 'salaryLow', name: '薪资从低到高', active: false },
  { id: 'distance', name: '距离最近', active: false }
]);

// 岗位数据（新增详情字段）
const jobs = ref([
  {
    id: 1,
    title: '餐饮服务生',
    company: '文通冰室',
    salary: '¥180-220/天',
    location: '浦东新区招商花园城',
    locationDetail: '上海市浦东新区陆家嘴西路166号招商花园城5楼',
    publishDate: '2025-11-17',
    distance: '0.8',
    tags: [
      { id: 1, name: '学生可做', color: '#52c41a' },
      { id: 2, name: '包餐', color: '#fa8c16' },
      { id: 3, name: '就近分配', color: '#1890ff' },
      { id: 4, name: '短期', color: '#faad14' },
      { id: 5, name: '急聘', color: '#f5222d' }
    ],
    category: 'food',
    categoryText: '餐饮服务',
    description: '负责餐厅点餐、送餐、餐桌清洁等工作，工作环境轻松，同事友好，包工作餐。',
    requirement: '18-30岁，形象良好，沟通能力强，能吃苦耐劳，有餐饮行业经验者优先。',
    welfare: '包工作餐，灵活排班，就近分配，节日福利',
    contact: '李经理 13812345678',
    collected: false
  },
  {
    id: 2,
    title: '商场电力维修',
    company: '苏宁电器',
    salary: '¥350-400/天',
    location: '徐汇区港汇广场',
    locationDetail: '上海市徐汇区虹桥路1号港汇广场6楼',
    publishDate: '2025-11-16',
    distance: '2.3',
    tags: [
      { id: 6, name: '技术员', color: '#722ed1' },
      { id: 7, name: '持证优先', color: '#389e0d' },
      { id: 8, name: '长期', color: '#13c2c2' },
      { id: 9, name: '高薪', color: '#eb2f96' }
    ],
    category: 'tech',
    categoryText: '技术维修',
    description: '负责商场电力设备的日常检查、维护和故障排除，确保电力系统正常运行。',
    requirement: '男性，20-45岁，持有电工证，有2年以上相关工作经验，能适应紧急抢修。',
    welfare: '五险一金，高温补贴，节日福利，定期培训',
    contact: '王主管 13987654321',
    collected: false
  },
  {
    id: 3,
    title: '宣传海报设计',
    company: '优衣库',
    salary: '¥250-300/天',
    location: '静安区静安嘉里中心',
    locationDetail: '上海市静安区南京西路1515号静安嘉里中心3楼',
    publishDate: '2025-11-18',
    distance: '3.5',
    tags: [
      { id: 10, name: '设计师', color: '#0084ff' },
      { id: 11, name: '远程办公', color: '#8c8c8c' },
      { id: 12, name: '短期', color: '#faad14' },
      { id: 13, name: '急聘', color: '#f5222d' }
    ],
    category: 'design',
    categoryText: '设计创意',
    description: '负责品牌宣传海报的设计与制作，包括线下海报、线上宣传图等，需配合市场活动时间节点。',
    requirement: '设计相关专业，熟练使用PS、AI等设计软件，有服装行业设计经验者优先，需提供作品集。',
    welfare: '设计软件补贴，免费服装福利，灵活工作时间',
    contact: '张设计 13765432109',
    collected: false
  },
  {
    id: 4,
    title: '商场活动策划运营实习生',
    company: '万达百货',
    salary: '¥200-250/天',
    location: '杨浦区五角场万达广场',
    locationDetail: '上海市杨浦区邯郸路600号五角场万达广场2楼',
    publishDate: '2025-11-15',
    distance: '4.2',
    tags: [
      { id: 14, name: '实习生', color: '#1890ff' },
      { id: 15, name: '学生可做', color: '#52c41a' },
      { id: 16, name: '包餐', color: '#fa8c16' },
      { id: 17, name: '长期', color: '#13c2c2' }
    ],
    category: 'activity',
    categoryText: '活动策划',
    description: '协助策划并执行商场各类促销活动，包括活动方案撰写、物料准备、现场执行等。',
    requirement: '在校大学生，市场营销、广告相关专业优先，有活动策划经验者优先，每周可实习3天以上。',
    welfare: '实习证明，包工作餐，商业保险，节日福利',
    contact: '刘经理 13698765432',
    collected: false
  },
  {
    id: 5,
    title: '导购员',
    company: 'H&M',
    salary: '¥220-260/天',
    location: '黄浦区外滩金融中心',
    locationDetail: '上海市黄浦区中山东二路600号外滩金融中心B1楼',
    publishDate: '2025-11-14',
    distance: '1.5',
    tags: [
      { id: 18, name: '销售员', color: '#ff7d00' },
      { id: 19, name: '提成', color: '#faad14' },
      { id: 20, name: '就近分配', color: '#1890ff' },
      { id: 21, name: '短期', color: '#faad14' }
    ],
    category: 'retail',
    categoryText: '零售销售',
    description: '负责门店顾客接待、服装推荐、试穿服务及收银等工作，达成销售目标。',
    requirement: '18-35岁，形象气质佳，沟通能力强，有服装销售经验者优先，能适应早晚班。',
    welfare: '销售提成，员工折扣，节日福利，定期团建',
    contact: '陈店长 13587654321',
    collected: false
  },
  {
    id: 6,
    title: '客服专员',
    company: '苹果专卖店',
    salary: '¥200-240/天',
    location: '浦东新区陆家嘴正大广场',
    locationDetail: '上海市浦东新区陆家嘴西路168号正大广场4楼',
    publishDate: '2025-11-13',
    distance: '0.5',
    tags: [
      { id: 22, name: '客服岗', color: '#722ed1' },
      { id: 23, name: '培训', color: '#1890ff' },
      { id: 24, name: '长期', color: '#13c2c2' },
      { id: 25, name: '包餐', color: '#fa8c16' }
    ],
    category: 'service',
    categoryText: '客服支持',
    description: '负责门店顾客咨询解答、产品介绍、售后处理等工作，维护顾客满意度。',
    requirement: '18-30岁，普通话标准，沟通能力强，有客服经验者优先，需熟悉苹果产品。',
    welfare: '包工作餐，定期培训，节日福利，晋升空间',
    contact: '吴主管 13476543210',
    collected: false
  }
]);

// 当前选中的筛选条件
const activeCategory = ref('all');
const activeSalary = ref('all');
const activeSort = ref('latest');

// 切换岗位分类
const toggleCategory = (categoryId) => {
  activeCategory.value = categoryId;
  categories.value.forEach(cat => {
    cat.active = cat.id === categoryId;
  });
};

// 切换薪资范围
const toggleSalary = (salaryId) => {
  activeSalary.value = salaryId;
  salaries.value.forEach(sal => {
    sal.active = sal.id === salaryId;
  });
};

// 切换排序方式
const toggleSort = (sortId) => {
  activeSort.value = sortId;
  sorts.value.forEach(srt => {
    srt.active = srt.id === sortId;
  });
};

// 根据筛选条件和排序方式过滤岗位
const filteredJobs = computed(() => {
  // 1. 先进行筛选
  let result = jobs.value.filter(job => {
    // 分类筛选
    if (activeCategory.value !== 'all' && job.category !== activeCategory.value) {
      return false;
    }
    
    // 薪资筛选
    if (activeSalary.value !== 'all') {
      const salaryRange = job.salary.match(/\d+/g).map(Number);
      const minSalary = salaryRange[0];
      
      switch(activeSalary.value) {
        case 'below200':
          if (minSalary >= 200) return false;
          break;
        case '200-300':
          if (minSalary < 200 || minSalary >= 300) return false;
          break;
        case '300-400':
          if (minSalary < 300 || minSalary >= 400) return false;
          break;
        case 'above400':
          if (minSalary < 400) return false;
          break;
      }
    }
    
    return true;
  });
  
  // 2. 再进行排序
  return result.sort((a, b) => {
    switch(activeSort.value) {
      case 'salaryHigh':
        const salAHigh = parseInt(a.salary.match(/\d+/g)[1] || a.salary.match(/\d+/g)[0]);
        const salBHigh = parseInt(b.salary.match(/\d+/g)[1] || b.salary.match(/\d+/g)[0]);
        return salBHigh - salAHigh;
      case 'salaryLow':
        const salALow = parseInt(a.salary.match(/\d+/g)[0]);
        const salBLow = parseInt(b.salary.match(/\d+/g)[0]);
        return salALow - salBLow;
      case 'distance':
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      case 'latest':
      default:
        return new Date(b.publishDate) - new Date(a.publishDate);
    }
  });
});

// 详情弹窗相关状态
const visibleModal = ref(false);
const currentJob = ref(null);
const showToast = ref(false);
const toastMessage = ref('');

// 打开详情弹窗
const openDetailModal = (job) => {
  currentJob.value = { ...job };
  visibleModal.value = true;
};

// 关闭详情弹窗
const closeDetailModal = () => {
  visibleModal.value = false;
};

// 切换收藏状态
const toggleCollect = () => {
  currentJob.value.collected = !currentJob.value.collected;
  toastMessage.value = currentJob.value.collected ? '收藏成功' : '取消收藏成功';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};

// 申请岗位
const applyJob = () => {
  toastMessage.value = '申请成功，请等待企业联系';
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
    closeDetailModal();
  }, 2000);
};
</script>

<style scoped>
/* 全局容器样式 - 充满父容器 */
.job-platform-container {
  width: 100%;
  height: 100%;
  min-width: 800px;
  min-height: 600px;
  padding: 20px;
  background-color: #f5f7fa;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* 移除relative定位，避免影响子元素的绝对定位 */
}

/* 页面标题 */
.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  flex-shrink: 0;
}

/* 岗位列表容器 - 填充剩余空间 */
.job-list-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0; /* 解决flex容器中overflow的问题 */
  /* 移除relative定位 */
}

/* 标题栏 */
.header-bar {
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.header-title i {
  color: #1890ff;
  margin-right: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.location-selector {
  color: #666;
  display: flex;
  align-items: center;
}

.location-selector i {
  color: #1890ff;
  margin-right: 5px;
}

.publish-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.publish-btn:hover {
  background-color: #096dd9;
}

/* 筛选区域 */
.filter-section {
  padding: 15px 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
  overflow-y: auto;
  max-height: 250px;
}

.filter-group {
  margin-bottom: 12px;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.filter-btn.active {
  background-color: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

/* 列表头部 */
.list-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 2fr 1fr 1fr 1fr;
  padding: 8px 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.header-item {
  font-size: 12px;
  color: #999;
  font-weight: 600;
  display: flex;
  align-items: center;
}

/* 岗位列表 - 填充剩余空间并滚动 */
.job-items {
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0;
}

.job-item {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 2fr 1fr 1fr 1fr;
  padding: 12px 20px;
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.2s;
}

.job-item:hover {
  background-color: #f9f9f9;
}

.item-cell {
  display: flex;
  align-items: center;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-cell {
  font-weight: 600;
  color: #333;
}

.company-cell, .location-cell {
  color: #666;
}

.salary-cell {
  color: #1890ff;
  font-weight: 600;
}

.date-cell, .distance-cell {
  color: #999;
  font-size: 13px;
}

.tags-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.tag {
  padding: 2px 6px;
  border-radius: 3px;
  color: #fff;
  font-size: 11px;
}

.action-cell {
  display: flex;
  justify-content: center;
}

.detail-btn {
  color: #1890ff;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.detail-btn:hover {
  color: #096dd9;
}

/* 无数据状态 */
.empty-state {
  padding: 40px 0;
  text-align: center;
  color: #999;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 10px;
  color: #ddd;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .list-header, .job-item {
    grid-template-columns: 2fr 2fr 1fr 2fr 1fr 1fr;
  }
  
  /* 隐藏发布时间和距离列 */
  .list-header .header-item:nth-child(5),
  .list-header .header-item:nth-child(6),
  .job-item .item-cell:nth-child(5),
  .job-item .item-cell:nth-child(6) {
    display: none;
  }
}
</style>

<!-- 弹窗样式需要放在scoped样式外，或者使用deep选择器 -->
<style>
/* 详情弹窗样式 - 全局样式 */
.modal-overlay {
  position: fixed; /* 使用fixed而不是absolute，相对于视口定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 提高z-index确保在最上层 */
}

.modal-content {
  background-color: #fff;
  width: 600px;
  max-height: 80vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-info {
  flex-grow: 1;
}

.job-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.job-company {
  font-size: 14px;
  color: #666;
}

.salary-publish {
  text-align: right;
  min-width: 150px;
}

.salary {
  font-size: 16px;
  font-weight: 600;
  color: #36c;
  margin-right: 10px;
}

.publish-date {
  font-size: 13px;
  color: #999;
}

.close-btn {
  font-size: 20px;
  color: #999;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f0f0f0;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 2px 6px;
  border-radius: 3px;
  color: #fff;
  font-size: 11px;
}

.location-detail, .distance, .description, .requirement, .welfare, .contact {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.location-detail i, .distance i {
  color: #1890ff;
  margin-right: 5px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.collect-btn {
  background-color: #fff;
  color: #999;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.collect-btn i {
  margin-right: 5px;
}

.collect-btn.collected {
  background-color: #fff1f0;
  color: #f5222d;
  border-color: #ffa39e;
}

.collect-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.collect-btn.collected:hover {
  background-color: #fef0f0;
  color: #d91e0f;
  border-color: #ff7b6b;
}

.apply-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.apply-btn:hover {
  background-color: #096dd9;
}

/* 提示弹窗 */
.toast {
  position: fixed; /* 使用fixed定位 */
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10000;
}
</style>