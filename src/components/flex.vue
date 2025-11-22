<template>
  <div class="dashboard-container">
    <!-- 顶部导航 -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1>商场灵工实践平台</h1>
        <div class="header-actions">
          <!-- 当前位置显示 -->
          <div class="location-display">
            <svg class="location-icon" viewBox="0 0 1024 1024" width="16" height="16">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#409eff"/>
              <path d="M512 232c-154.6 0-280 125.4-280 280s125.4 280 280 280 280-125.4 280-280-125.4-280-280-280zm0 498c-120.7 0-218-97.3-218-218s97.3-218 218-218 218 97.3 218 218-97.3 218-218 218z" fill="#409eff"/>
            </svg>
            <span class="location-text">当前位置：{{ cityNames[selectedCity] }}</span>
            <button class="change-location-btn" @click="showLocationSelector = !showLocationSelector">
              <svg class="icon" viewBox="0 0 1024 1024" width="14" height="14">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#8c8c8c"/>
                <path d="M505.8 355.7l189.9 189.9c4.1 4.1 4.1 10.8 0 14.9l-42.4 42.4c-4.1 4.1-10.8 4.1-14.9 0L480 429.9 369.2 540.7c-4.1 4.1-10.8 4.1-14.9 0l-42.4-42.4c-4.1-4.1-4.1-10.8 0-14.9l190-189.8c4.1-4.2 10.8-4.2 14.9 0.1z" fill="#8c8c8c"/>
              </svg>
            </button>
          </div>
          
          <!-- 位置选择器弹窗 -->
          <div class="location-selector" v-if="showLocationSelector">
            <div class="location-option" v-for="(name, value) in cityNames" :key="value" @click="changeCity(value)">
              {{ name }}
            </div>
          </div>
          
          <!-- 用户信息和操作按钮 -->
          <div class="user-actions">
            <!-- 只有商家能看到发布兼职按钮 -->
            <button v-if="userRole === 'merchant'" class="publish-btn" @click="showPublishModal = true">
              <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 128c-212.8 0-384 171.2-384 384s171.2 384 384 384 384-171.2 384-384-171.2-384-384-384zm0 704c-176 0-320-144-320-320s144-320 320-320 320 144 320 320-144 320-320 320z" fill="#fff"/>
                <path d="M512 224c-8.8 0-16 7.2-16 16v256H240c-8.8 0-16 7.2-16 16s7.2 16 16 16h256v256c0 8.8 7.2 16 16 16s16-7.2 16-16V512h256c8.8 0 16-7.2 16-16s-7.2-16-16-16H528V240c0-8.8-7.2-16-16-16z" fill="#fff"/>
              </svg>
              发布兼职
            </button>
            
            <!-- 用户角色显示 -->
            <div class="user-profile">
              <div class="avatar">{{ userRole === 'user' ? '用' : '商' }}</div>
              <span class="username">{{ userRole === 'user' ? '用户登录' : '商家登录' }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 核心指标卡片 -->
    <div class="stats-cards">
      <div class="stat-card" :class="{ 'up-trend': totalJobsTrend === 'up' }">
        <div class="card-header">
          <div class="stat-title">总兼职岗位数</div>
          <div class="card-icon job-icon"></div>
        </div>
        <div class="stat-value">{{ totalJobs }}</div>
        <div class="stat-trend">
          <span class="trend-icon">{{ totalJobsTrend === 'up' ? '↑' : '↓' }}</span>
          <span class="trend-text">较上周增长 {{ totalJobsChange }}%</span>
        </div>
      </div>

      <div class="stat-card" :class="{ 'up-trend': avgDailyWageTrend === 'up' }">
        <div class="card-header">
          <div class="stat-title">平均日薪</div>
          <div class="card-icon salary-icon"></div>
        </div>
        <div class="stat-value">¥{{ avgDailyWage }}/天</div>
        <div class="stat-trend">
          <span class="trend-icon">{{ avgDailyWageTrend === 'up' ? '↑' : '↓' }}</span>
          <span class="trend-text">较上月增长 {{ avgDailyWageChange }}%</span>
        </div>
      </div>

      <div class="stat-card" :class="{ 'down-trend': urgentJobsTrend === 'down' }">
        <div class="card-header">
          <div class="stat-title">急聘岗位</div>
          <div class="card-icon urgent-icon"></div>
        </div>
        <div class="stat-value">{{ urgentJobs }}</div>
        <div class="stat-trend">
          <span class="trend-icon">{{ urgentJobsTrend === 'up' ? '↑' : '↓' }}</span>
          <span class="trend-text">较上周减少 {{ urgentJobsChange }}%</span>
        </div>
      </div>

      <div class="stat-card" :class="{ 'up-trend': successRateTrend === 'up' }">
        <div class="card-header">
          <div class="stat-title">申请成功率</div>
          <div class="card-icon success-icon"></div>
        </div>
        <div class="stat-value">{{ successRate }}%</div>
        <div class="stat-trend">
          <span class="trend-icon">{{ successRateTrend === 'up' ? '↑' : '↓' }}</span>
          <span class="trend-text">较上月增长 {{ successRateChange }}%</span>
        </div>
      </div>
    </div>

    <!-- 图表内容区域 -->
    <div class="charts-content">
      <div class="charts-grid">
        <!-- 岗位分类分布 -->
        <div class="chart-card c1" >
          <div class="chart-header">
            <h2>岗位分类分布</h2>
            <div class="chart-actions">
              <button class="export-btn" @click="exportChart('category')">
                <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                  <path d="M854.6 370.6c-12.5-12.5-32.8-12.5-45.3 0l-179.2 179.2V182.4c0-17.7-14.3-32-32-32s-32 14.3-32 32v367.4L214.7 370.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l256 256c12.5 12.5 32.8 12.5 45.3 0l256-256c12.5-12.5 12.5-32.8 0-45.3z" fill="#409eff"/>
                </svg>
                导出
              </button>
              <button class="refresh-btn" @click="refreshChart('category')">
                <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                  <path d="M716.8 512c0-4.4-3.6-8-8-8H592c-4.4 0-8 3.6-8 8v192c0 17.7-14.3-32-32-32s-32 14.3-32 32V352c0-17.7 14.3-32 32-32s32 14.3 32 32v56.9l186.1-186.1c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L650.7 512H716.8zM512 736c-123.5 0-224-100.5-224-224s100.5-224 224-224c42.1 0 81.4 12.4 114 35.3l-27.7 27.7C581.9 338.5 550.2 320 512 320c-88.4 0-160 71.6-160 160s71.6 160 160 160c38.2 0 69.9-18.5 90.3-48l27.7 27.7C593.4 723.6 554.1 736 512 736z" fill="#409eff"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="chart-container">
            <bar-chart 
              :data="jobCategoryData" 
              :x-axis="jobCategories" 
              :max-value="1" 
              :format="(value) => (value * 100).toFixed(0) + '%'"
            />
          </div>
        </div>

        <!-- 岗位申请热度 -->
        <div class="chart-card c1">
          <div class="chart-header">
            <h2>岗位申请热度</h2>
            <button class="refresh-btn" @click="refreshHeatData">
              <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M716.8 512c0-4.4-3.6-8-8-8H592c-4.4 0-8 3.6-8 8v192c0 17.7-14.3-32-32-32s-32 14.3-32 32V352c0-17.7 14.3-32 32-32s32 14.3 32 32v56.9l186.1-186.1c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L650.7 512H716.8zM512 736c-123.5 0-224-100.5-224-224s100.5-224 224-224c42.1 0 81.4 12.4 114 35.3l-27.7 27.7C581.9 338.5 550.2 320 512 320c-88.4 0-160 71.6-160 160s71.6 160 160 160c38.2 0 69.9-18.5 90.3-48l27.7 27.7C593.4 723.6 554.1 736 512 736z" fill="#409eff"/>
              </svg>
            </button>
          </div>
          <div class="chart-container heatmap-container">
            <table class="heat-table">
              <tbody>
                <tr v-for="(item, index) in applicationHeatData" :key="index">
                  <td class="category-cell">{{ item.category }}</td>
                  <td>
                    <div class="progress-container">
                      <div 
                        class="progress-bar" 
                        :style="{ width: item.percentage + '%', backgroundColor: item.color }"
                      ></div>
                      <span class="progress-text">{{ item.percentage }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 薪资趋势分析 -->
        <div class="chart-card c2" >
          <div class="chart-header">
            <h2>薪资趋势分析</h2>
            <div class="chart-controls">
              <select class="period-select" v-model="salaryTrendPeriod" @change="updateSalaryTrend">
                <option value="7">近7天</option>
                <option value="30">近30天</option>
                <option value="90">近90天</option>
              </select>
              <button class="export-btn" @click="exportChart('salary')">
                <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16">
                  <path d="M854.6 370.6c-12.5-12.5-32.8-12.5-45.3 0l-179.2 179.2V182.4c0-17.7-14.3-32-32-32s-32 14.3-32 32v367.4L214.7 370.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l256 256c12.5 12.5 32.8 12.5 45.3 0l256-256c12.5-12.5 12.5-32.8 0-45.3z" fill="#409eff"/>
                </svg>
                导出
              </button>
            </div>
          </div>
          <div class="chart-container">
            <line-chart 
              :data="salaryTrendData" 
              :x-axis="salaryTrendDates" 
              :y-label="'日薪 (¥)'"
            />
          </div>
        </div>

        <!-- 最新发布岗位 -->
        <div class="chart-card c2 c3">
          <div class="chart-header">
            <h2>最新发布岗位</h2>
            <button class="view-all-btn" @click="viewAllJobs">
              查看全部
            </button>
          </div>
          <div class="latest-jobs">
            <div class="timeline">
              <div v-for="(job, index) in latestJobs" :key="index" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="timeline-time">{{ job.publishTime }}</div>
                  <div class="job-card">
                    <div class="job-title">{{ job.title }}</div>
                    <div class="job-company">{{ job.company }}</div>
                    <div class="job-salary">{{ job.salary }}</div>
                    <button 
                      class="apply-btn" 
                      @click="userRole === 'user' ? applyJob(job) : viewApplications(job)"
                      :class="{ 'view-apply-btn': userRole === 'merchant' }"
                    >
                      {{ userRole === 'user' ? '立即申请' : '查看申请' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 兼职岗位列表区域 (独占一行) -->
    <div class="job-list-container">
      <JobListComponent 
        :user-role="userRole"
        @view-detail="handleViewDetail"
      />
    </div>

    <!-- 发布兼职弹窗 -->
    <div class="modal-overlay" v-if="showPublishModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>发布兼职岗位</h3>
          <button class="close-btn" @click="showPublishModal = false">×</button>
        </div>
        <div class="modal-body">
          <form class="publish-form">
            <div class="form-group">
              <label>岗位标题</label>
              <input type="text" class="form-input" placeholder="请输入岗位标题">
            </div>
            <div class="form-group">
              <label>公司名称</label>
              <input type="text" class="form-input" placeholder="请输入公司名称">
            </div>
            <div class="form-group">
              <label>薪资范围</label>
              <input type="text" class="form-input" placeholder="例如：¥200-300/天">
            </div>
            <div class="form-group">
              <label>工作地点</label>
              <input type="text" class="form-input" placeholder="请输入详细工作地点">
            </div>
            <div class="form-group">
              <label>岗位类型</label>
              <select class="form-select">
                <option value="">请选择岗位类型</option>
                <option value="餐饮服务">餐饮服务</option>
                <option value="技术维修">技术维修</option>
                <option value="设计创意">设计创意</option>
                <option value="活动策划">活动策划</option>
              </select>
            </div>
            <div class="form-group">
              <label>岗位描述</label>
              <textarea class="form-textarea" placeholder="请详细描述岗位要求和职责"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showPublishModal = false">取消</button>
          <button class="submit-btn" @click="publishJob">发布</button>
        </div>
      </div>
    </div>

    <!-- 岗位详情/申请列表弹窗 -->
    <div class="modal-overlay" v-if="showDetailModal">
      <div class="modal-content" :style="{ width: detailModalWidth }">
        <div class="modal-header">
          <h3>{{ userRole === 'user' ? '岗位详情' : '申请列表' }}</h3>
          <button class="close-btn" @click="showDetailModal = false">×</button>
        </div>
        <div class="modal-body">
          <!-- 用户看到的岗位详情 -->
          <div v-if="userRole === 'user' && currentJob">
            <div class="job-detail">
              <h4>{{ currentJob.title }}</h4>
              <div class="detail-section">
                <p><strong>公司：</strong>{{ currentJob.company }}</p>
                <p><strong>薪资：</strong>{{ currentJob.salary }}</p>
                <p><strong>地点：</strong>{{ currentJob.location || '未知' }}</p>
                <p><strong>发布时间：</strong>{{ currentJob.publishTime || '未知' }}</p>
              </div>
              <div class="detail-section">
                <h5>岗位描述</h5>
                <p>{{ currentJob.description || '该岗位暂无详细描述' }}</p>
              </div>
              <div class="apply-section">
                <button class="apply-now-btn" @click="submitApplication">立即申请</button>
                <p class="apply-note">申请后我们会将您的简历发送至商家邮箱</p>
              </div>
            </div>
          </div>

          <!-- 商家看到的申请列表 -->
          <div v-if="userRole === 'merchant' && currentJob">
            <div class="applications-list">
              <h4>{{ currentJob.title }} - 申请列表</h4>
              <div class="applications-stats">
                <div class="stat-item">
                  <span class="stat-number">{{ applicationsData.total }}</span>
                  <span class="stat-label">总申请人数</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ applicationsData.reviewed }}</span>
                  <span class="stat-label">已查看</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ applicationsData.approved }}</span>
                  <span class="stat-label">已通过</span>
                </div>
              </div>
              
              <table class="applications-table">
                <thead>
                  <tr>
                    <th>申请人</th>
                    <th>申请时间</th>
                    <th>联系方式</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(app, index) in applicationsData.list" :key="index">
                    <td>
                      <div class="applicant-info">
                        <div class="applicant-avatar">{{ app.name.charAt(0) }}</div>
                        <span>{{ app.name }}</span>
                      </div>
                    </td>
                    <td>{{ app.time }}</td>
                    <td>{{ app.contact }}</td>
                    <td>
                      <span class="status-tag" :class="app.status">{{ app.status }}</span>
                    </td>
                    <td>
                      <button class="action-btn view-resume" @click="viewResume(app)">查看简历</button>
                      <button class="action-btn approve" @click="approveApplication(app)">通过</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="showDetailModal = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// 这里假设你已经有了这些组件
import BarChart from './echart/Barchart.vue';
import LineChart from './echart/Linechart.vue';
import JobListComponent from './JobListComponent.vue';

// 从localStorage获取用户角色（登录后存储的）
const userRole = ref('user'); // 默认用户，实际应该从登录状态获取

// 城市名称映射
const cityNames = ref({
  shanghai: '上海市',
  beijing: '北京市',
  guangzhou: '广州市',
  shenzhen: '深圳市'
});

// 当前选择的城市
const selectedCity = ref('shanghai');
const showLocationSelector = ref(false);
const showPublishModal = ref(false);
const showFilterPanel = ref(false);

// 详情弹窗相关
const showDetailModal = ref(false);
const currentJob = ref(null);
const detailModalWidth = ref('500px');

// 核心指标数据
const totalJobs = ref(128);
const totalJobsTrend = ref('up');
const totalJobsChange = ref(12.5);

const avgDailyWage = ref(245);
const avgDailyWageTrend = ref('up');
const avgDailyWageChange = ref(5.2);

const urgentJobs = ref(32);
const urgentJobsTrend = ref('down');
const urgentJobsChange = ref(3.8);

const successRate = ref(68.5);
const successRateTrend = ref('up');
const successRateChange = ref(8.3);

// 岗位分类数据
const jobCategories = ref([
  '餐饮服务', '技术维修', '设计创意', '活动策划', 
  '零售销售', '客服支持', '市场推广', '行政助理', 
  '安保服务', '保洁服务'
]);

const jobCategoryData = ref([0.95, 0.85, 0.75, 0.65, 0.8, 0.5, 0.45, 0.6, 0.35, 0.7]);

// 申请热度数据
const applicationHeatData = ref([
  { category: '餐饮服务', percentage: 85, color: '#409eff' },
  { category: '零售销售', percentage: 72, color: '#67c23a' },
  { category: '技术维修', percentage: 65, color: '#e6a23c' },
  { category: '设计创意', percentage: 58, color: '#f56c6c' },
  { category: '活动策划', percentage: 45, color: '#909399' }
]);

// 薪资趋势数据
const salaryTrendPeriod = ref('30');
const salaryTrendDates = ref(Array.from({length: 30}, (_, i) => `${i+1}日`));
const salaryTrendData = ref(
  Array.from({length: 30}, (_, i) => 230 + Math.floor(Math.random() * 10) + i * 0.5)
);

// 最新岗位数据
const latestJobs = ref([
  {
    id: 1,
    title: '宣传海报设计',
    company: '优衣库 - 静安区交通路中心',
    salary: '¥250-300/天',
    publishTime: '2小时前发布',
    description: '负责商场活动宣传海报设计，要求熟练使用PS、AI等设计软件，有相关经验优先。'
  },
  {
    id: 2,
    title: '餐饮服务生',
    company: '文通冰室 - 浦东新区世纪汇商城',
    salary: '¥180-220/天',
    publishTime: '1天前发布',
    description: '负责顾客点餐、上菜、餐桌清理等工作，要求形象良好，有餐饮服务经验。'
  },
  {
    id: 3,
    title: '手机维修技术员',
    company: '苹果授权服务中心',
    salary: '¥300-400/天',
    publishTime: '2天前发布',
    description: '负责手机维修工作，要求有相关维修经验，持有电工证优先。'
  },
  {
    id: 4,
    title: '周末促销员',
    company: '可口可乐上海分公司',
    salary: '¥200-250/天',
    publishTime: '3天前发布',
    description: '负责商场内产品促销推广，要求沟通能力强，有销售经验优先。'
  }
]);

// 模拟申请数据
const applicationsData = ref({
  total: 28,
  reviewed: 15,
  approved: 8,
  list: [
    { name: '张三', time: '2025-11-18 09:23', contact: '138****5678', status: '待审核', resume: '张三-简历.pdf' },
    { name: '李四', time: '2025-11-18 10:15', contact: '139****1234', status: '已查看', resume: '李四-简历.pdf' },
    { name: '王五', time: '2025-11-17 16:40', contact: '137****8765', status: '已通过', resume: '王五-简历.pdf' },
    { name: '赵六', time: '2025-11-17 14:30', contact: '136****4321', status: '已拒绝', resume: '赵六-简历.pdf' },
    { name: '孙七', time: '2025-11-16 11:20', contact: '135****9876', status: '已通过', resume: '孙七-简历.pdf' }
  ]
});

// 组件挂载时获取用户角色
onMounted(() => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const userInfo = JSON.parse(currentUser);
    userRole.value = userInfo.role || 'user';
  }
});

// 方法定义
const changeCity = (city) => {
  selectedCity.value = city;
  showLocationSelector.value = false;
};

const updateSalaryTrend = () => {
  const days = parseInt(salaryTrendPeriod.value);
  salaryTrendDates.value = Array.from({length: days}, (_, i) => `${i+1}日`);
  salaryTrendData.value = Array.from({length: days}, (_, i) => 230 + Math.floor(Math.random() * 10) + i * 0.5);
};

const refreshHeatData = () => {
  applicationHeatData.value.forEach(item => {
    item.percentage = Math.floor(Math.random() * 40) + 40;
  });
};

const refreshChart = (type) => {
  console.log(`刷新${type}图表数据`);
};

const exportChart = (type) => {
  console.log(`导出${type}图表`);
  alert(`已导出${type === 'category' ? '岗位分类' : '薪资趋势'}图表数据`);
};

const exportJobList = () => {
  alert('岗位列表已导出');
};

const viewAllJobs = () => {
  console.log('查看全部岗位');
};

const applyJob = (job) => {
  currentJob.value = job;
  detailModalWidth.value = '500px';
  showDetailModal.value = true;
};

const viewApplications = (job) => {
  currentJob.value = job;
  detailModalWidth.value = '800px';
  showDetailModal.value = true;
};

const handleViewDetail = (job) => {
  if (userRole.value === 'user') {
    applyJob(job); // 用户查看详情
  } else {
    viewApplications(job); // 商家查看申请
  }
};

const submitApplication = () => {
  alert('申请已提交！我们会将您的简历发送至商家邮箱。');
  showDetailModal.value = false;
};

const viewResume = (app) => {
  alert(`查看简历：${app.resume}`);
};

const approveApplication = (app) => {
  if (app.status !== '已通过') {
    app.status = '已通过';
    applicationsData.value.approved++;
    if (app.status === '待审核') applicationsData.value.reviewed++;
    alert(`已通过 ${app.name} 的申请！`);
  }
};

const viewJobDetail = (job) => {
  console.log('查看岗位详情', job);
};

const publishJob = () => {
  alert('岗位发布成功！');
  showPublishModal.value = false;
};

const applyFilters = () => {
  showFilterPanel.value = false;
  alert('筛选条件已应用');
};

const resetFilters = () => {
  alert('筛选条件已重置');
};

// 切换用户角色的方法（用于测试）
const toggleUserRole = () => {
  userRole.value = userRole.value === 'user' ? 'merchant' : 'user';
};
</script>

<style scoped>
/* 基础样式 */
.dashboard-container {
    background-image: url('../assets/beijing.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
overflow-y: auto;
  padding: 24px;
height: 100%;  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 顶部导航 */
.dashboard-header {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  color: #1f2937;
  font-size: 24px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 位置显示 */
.location-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #e6f4ff;
  position: relative;
}

.location-text {
  font-size: 14px;
  color: #303133;
}

.change-location-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.change-location-btn:hover {
  opacity: 1;
}

.location-selector {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 160px;
  z-index: 100;
}

.location-option {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.location-option:hover {
  background-color: #f0f7ff;
}

/* 用户信息 */
.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.username {
  font-size: 14px;
  color: #303133;
}

/* 发布按钮 */
.publish-btn {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.publish-btn:hover {
  background-color: #3a8ee6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
}

/* 核心指标卡片 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #409eff, #67c23a);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border-color: #e6f4ff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-icon {
  background-color: #e6f4ff;
}

.job-icon::after {
  content: '💼';
  font-size: 16px;
}

.salary-icon {
  background-color: #f0f9ff;
}

.salary-icon::after {
  content: '💰';
  font-size: 16px;
}

.urgent-icon {
  background-color: #fef0f0;
}

.urgent-icon::after {
  content: '🚨';
  font-size: 16px;
}

.success-icon {
  background-color: #f0f9ff;
}

.success-icon::after {
  content: '✅';
  font-size: 16px;
}

.stat-title {
  color: #606266;
  font-size: 14px;
  font-weight: 500;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #303133;
  line-height: 1.2;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.trend-icon {
  margin-right: 4px;
  font-size: 14px;
}

.up-trend .trend-icon,
.up-trend .trend-text {
  color: #67c23a;
}

.down-trend .trend-icon,
.down-trend .trend-text {
  color: #f56c6c;
}

/* 图表内容区域 */
.charts-content {
  width: 100%;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
}

.chart-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.chart-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border-color: #e6f4ff;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.chart-header h2 {
  font-size: 16px;
  color: #303133;
  margin: 0;
  font-weight: 600;
}

.chart-actions {
  display: flex;
  gap: 8px;
}

.export-btn {
  color: #409eff;
  background-color: #f0f7ff;
  border: 1px solid #e6f4ff;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.export-btn:hover {
  background-color: #e6f4ff;
}

.refresh-btn {
  color: #409eff;
  background-color: #f0f7ff;
  border: 1px solid #e6f4ff;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background-color: #e6f4ff;
}

.view-all-btn {
  color: #409eff;
  background: none;
  border: 1px solid #e6f4ff;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.view-all-btn:hover {
  background-color: #f0f7ff;
}

.chart-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.period-select {
  padding: 6px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
  background-color: #fafafa;
}

.chart-container {
  padding: 20px;
  display: flex;
  height: 370px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.heatmap-container {
  align-items: flex-start;
  padding-top: 30px;
}

.heat-table {
  width: 100%;
  border-collapse: collapse;
}

.heat-table td {
  padding: 10px 0;
}

.category-cell {
  width: 120px;
  padding-right: 10px;
  font-size: 14px;
  color: #606266;
}

.progress-container {
  position: relative;
  height: 24px;
  background-color: #f5f7fa;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6e6e6;
}

.progress-bar {
  height: 100%;
  transition: width 1s ease-in-out;
  border-radius: 12px;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
}

.progress-text {
  position: absolute;
  right: 12px;
  top: 0;
  line-height: 24px;
  font-size: 12px;
  color: #606266;
  font-weight: 500;
}

/* 最新岗位时间线 */
.latest-jobs {
  padding: 10px 20px 20px;
}

.timeline {
  position: relative;
  padding-left: 24px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #409eff, #67c23a);
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.timeline-dot {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #409eff;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.timeline-content {
  padding-bottom: 24px;
}

.timeline-time {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.job-card {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  border: 1px solid #e6e6e6;
  transition: all 0.2s;
}

.job-card:hover {
  background-color: #f0f7ff;
  border-color: #e6f4ff;
}

.job-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #303133;
  font-size: 15px;
}

.job-company {
  font-size: 12px;
  color: #606266;
  margin-bottom: 8px;
}

.job-salary {
  color: #e6a23c;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

.apply-btn {
  position: absolute;
  right: 16px;
  top: 16px;
  background-color: #409eff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.apply-btn:hover {
  background-color: #3a8ee6;
}

.view-apply-btn {
  background-color: #67c23a;
}

.view-apply-btn:hover {
  background-color: #5daf34;
}

/* 兼职岗位列表区域 */
.job-list-container {
  width: 100%;
}

.job-list-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 100%;
  border: 1px solid #f0f0f0;
}

.job-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.list-actions {
  display: flex;
  gap: 10px;
}

.filter-btn {
  color: #606266;
  background-color: #f5f7fa;
  border: 1px solid #e6e6e6;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #f0f0f0;
}

/* 筛选面板 */
.filter-panel {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 13px;
  color: #606266;
}

.filter-select {
  padding: 6px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
  min-width: 120px;
}

.filter-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.reset-btn {
  padding: 6px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
  background-color: #fff;
  cursor: pointer;
}

.confirm-btn {
  padding: 6px 12px;
  border: 1px solid #409eff;
  border-radius: 6px;
  font-size: 13px;
  color: #fff;
  background-color: #409eff;
  cursor: pointer;
}

/* 岗位列表内容 */
.job-list-content {
  padding: 16px 20px;
}

.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s;
}

.job-item:last-child {
  border-bottom: none;
}

.job-item:hover {
  background-color: #fafafa;
  border-radius: 8px;
}

.job-info {
  flex: 1;
}

.job-meta {
  display: flex;
  gap: 16px;
  margin: 8px 0;
  font-size: 12px;
  color: #909399;
}

.job-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.tag.blue {
  background-color: #e6f4ff;
  color: #409eff;
}

.tag.green {
  background-color: #f0f9ff;
  color: #67c23a;
}

.tag.yellow {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.tag.purple {
  background-color: #f9f0ff;
  color: #9370db;
}

.tag.red {
  background-color: #fef0f0;
  color: #f56c6c;
}

.tag.gray {
  background-color: #f5f5f5;
  color: #909399;
}

.job-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.salary {
  font-size: 16px;
  color: #e6a23c;
  font-weight: 600;
  min-width: 100px;
  text-align: right;
}

.detail-btn {
  padding: 6px 12px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 12px;
  color: #606266;
  background-color: #fff;
  cursor: pointer;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #909399;
}

.modal-body {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.publish-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.form-input, .form-select {
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
}

.form-textarea {
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  padding: 8px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
  color: #606266;
  background-color: #fff;
  cursor: pointer;
}

.submit-btn {
  padding: 8px 16px;
  border: 1px solid #409eff;
  border-radius: 6px;
  font-size: 14px;
  color: #fff;
  background-color: #409eff;
  cursor: pointer;
}

/* 岗位详情样式 */
.job-detail {
  line-height: 1.6;
}

.job-detail h4 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #303133;
}

.detail-section {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-section:last-child {
  border-bottom: none;
}

.detail-section h5 {
  font-size: 14px;
  margin-bottom: 10px;
  color: #303133;
}

.apply-section {
  margin-top: 20px;
  text-align: center;
}

.apply-now-btn {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.apply-note {
  font-size: 12px;
  color: #909399;
}

/* 申请列表样式 */
.applications-list {
  width: 100%;
}

.applications-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.applications-stats .stat-item {
  text-align: center;
}

.applications-stats .stat-number {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}

.applications-stats .stat-label {
  font-size: 12px;
  color: #909399;
}

.applications-table {
  width: 100%;
  border-collapse: collapse;
}

.applications-table th,
.applications-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.applications-table th {
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

.applications-table td {
  font-size: 14px;
}

.applicant-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.applicant-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.status-tag {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.待审核 {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.status-tag.已查看 {
  background-color: #e6f4ff;
  color: #409eff;
}

.status-tag.已通过 {
  background-color: #f0f9ff;
  color: #67c23a;
}

.status-tag.已拒绝 {
  background-color: #fef0f0;
  color: #f56c6c;
}

.action-btn {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  margin-right: 5px;
}

.view-resume {
  background-color: #e6f4ff;
  color: #409eff;
}

.approve {
  background-color: #f0f9ff;
  color: #67c23a;
}

/* 响应式设计 */
@media (max-width: 1440px) {
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .applications-table th:nth-child(4),
  .applications-table td:nth-child(4),
  .applications-table th:nth-child(5),
  .applications-table td:nth-child(5) {
    display: none;
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr 1fr;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .applications-stats {
    flex-wrap: wrap;
  }
  
  .applications-stats .stat-item {
    flex: 1 1 40%;
  }
}

@media (max-width: 480px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    height: 250px;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .job-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .job-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .salary {
    text-align: left;
  }
  
  .applications-stats .stat-item {
    flex: 1 1 100%;
    margin-bottom: 10px;
  }
  
  .applicant-info span {
    display: none;
  }
  
  .modal-content {
    width: 95%;
  }
}

.c1{height: 370px;}
.c2{height: 650px;}
.c3{overflow-y: auto}
</style>