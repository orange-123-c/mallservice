<template>
  <div class="slide slide-core-value">
    <div class="slide-bg">
      <div class="slide-overlay"></div>
      <!-- 科技感装饰元素 -->
      <div class="tech-decoration left"></div>
      <div class="tech-decoration right"></div>
      
      <div class="slide-content">
        <!-- 通知公告内容 -->
        <div class="notification-container">
          <!-- 顶部推荐公告轮播 -->
          <div class="recommended-banner">
            <!-- 科技感装饰元素（避免与外层冲突，重命名类名） -->
            <div class="banner-tech-decoration left"></div>
            <div class="banner-tech-decoration right"></div>
            
            <div class="banner-slides" :style="{ transform: `translateX(-${currentBannerIndex * 100}%)` }">
              <div class="banner-slide" v-for="(banner, index) in banners" :key="index">
                <div class="banner-content">
                  <div class="banner-header">
                    <span class="banner-tag">{{ banner.tag }}</span>
                    <h2 class="banner-title">{{ banner.title }}</h2>
                  </div>
                  <p class="banner-desc">{{ banner.description }}</p>
                  <button class="banner-btn" @click="openBannerDetail(banner)">
                    {{ banner.buttonText }}
                  </button>
                </div>
                <div class="banner-icon">
                  <!-- 使用emoji替代字体图标，避免依赖 -->
                  <span v-if="banner.icon === 'shopping-bag'">🛍️</span>
                  <span v-if="banner.icon === 'member-card'">🎫</span>
                  <span v-if="banner.icon === 'new-store'">🏬</span>
                </div>
                <button class="banner-next" @click="nextBanner">
                  <i class="arrow-right">→</i>
                </button>
              </div>
            </div>
            <!-- 轮播指示器 -->
            <div class="banner-dots">
              <span 
                v-for="(dot, index) in banners.length" 
                :key="index"
                :class="{ active: currentBannerIndex === index }"
                @click="goToBanner(index)"
              ></span>
            </div>
          </div>

          <!-- 底部通知公告列表 -->
          <div class="notification-section">
            <div class="notification-header">
              <h2 class="section-title">通知公告</h2>
              <div class="filter-tabs">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.value"
                  :class="{ active: activeTab === tab.value }"
                  @click="switchTab(tab.value)"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>

            <div class="notification-list">
              <div 
                class="notification-item" 
                v-for="(item, index) in filteredNotifications" 
                :key="item.id"
                :class="{ unread: !item.read }"
                @click="openNotificationDetail(item)"
              >
                <div class="notification-text">
                  <h3 class="notification-title">{{ item.title }}</h3>
                  <p class="notification-desc">{{ item.description }}</p>
                </div>
                <div class="notification-date">
                  {{ formatDate(item.date) }}
                  <span class="unread-dot" v-if="!item.read"></span>
                </div>
              </div>
            </div>

            <div class="view-more">
              <a href="#" @click.prevent="loadMore">查看更多通知</a>
            </div>
          </div>
        </div>

        <!-- 新增的三个容器 -->
        <div class="three-containers">
          <!-- 商场活动情报 -->
          <div class="info-container event-container">
            <div class="container-header">
              <span class="icon">🏬</span>
              <h3>商场活动情报</h3>
            </div>
            <div class="container-content">
              <div class="event-item" v-for="(event, index) in mallEvents" :key="index" @click="openEventDetail(event)">
                <div class="event-status" :class="event.status">{{ event.statusText }}</div>
                <h4 class="event-title">{{ event.title }}</h4>
                <div class="event-date">📅 {{ event.date }}</div>
                <div class="event-location">📍 {{ event.location }}</div>
                <p class="event-desc">{{ event.description }}</p>
                <a href="#" class="view-details" @click.prevent="openEventDetail(event)">查看详情</a>
              </div>
              <a href="#" class="view-more-link" @click.prevent="viewMoreEvents">查看更多活动</a>
            </div>
          </div>

          <!-- 公益服务与创意小摊 -->
          <div class="info-container public-service-container">
            <div class="container-header">
              <span class="icon">❤️</span>
              <h3>公益服务与创意小摊</h3>
            </div>
            <div class="container-content">
              <div class="service-title">公益服务活动</div>
              <div class="service-item" v-for="(service, index) in publicServices" :key="index" @click="openServiceDetail(service)">
                <h4 class="service-name">{{ service.name }}</h4>
                <p class="service-desc">{{ service.description }}</p>
                <div class="service-meta">
                  <span class="service-date">📅 {{ service.date }}</span>
                  <span class="service-location" v-if="service.location">📍 {{ service.location }}</span>
                </div>
              </div>
              
              <div class="stall-section">
                <div class="service-title">创意小摊招募</div>
                <p class="stall-desc">{{ stallRecruitment.description }}</p>
                <div class="stall-benefits">
                  <div class="benefit-item" v-for="(benefit, index) in stallRecruitment.benefits" :key="index">
                    <span class="benefit-check">✓</span> {{ benefit }}
                  </div>
                </div>
                <button class="apply-btn" @click="openStallApplication">立即申请</button>
              </div>
            </div>
          </div>

          <!-- 商场兼职信息 -->
          <div class="info-container part-time-container">
            <div class="container-header">
              <span class="icon">💼</span>
              <h3>商场兼职信息</h3>
            </div>
            <div class="container-content">
              <div class="job-item" v-for="(job, index) in partTimeJobs" :key="index" @click="openJobDetail(job)">
                <div class="job-header">
                  <h4 class="job-title">{{ job.title }}</h4>
                  <span class="job-salary">{{ job.salary }}</span>
                </div>
                <div class="job-meta">
                  <span class="job-tag" v-for="(tag, tIndex) in job.tags" :key="tIndex">{{ tag }}</span>
                </div>
                <p class="job-desc">{{ job.description }}</p>
                <a href="#" class="view-details" @click.prevent="openJobDetail(job)">查看详情</a>
              </div>
              <a href="#" class="view-more-link" @click.prevent="viewMoreJobs">查看更多兼职</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗区域 -->
    <div class="slide-modals">
      <!-- 公告详情弹窗 -->
      <div class="modal-overlay" v-if="showBannerModal" @click="closeBannerModal">
        <div class="modal-content banner-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ currentBanner.title }}</h2>
            <button class="modal-close" @click="closeBannerModal">×</button>
          </div>
          <div class="modal-body">
            <div class="banner-detail">
              <div class="banner-icon-large">
                <span v-if="currentBanner.icon === 'shopping-bag'">🛍️</span>
                <span v-if="currentBanner.icon === 'member-card'">🎫</span>
                <span v-if="currentBanner.icon === 'new-store'">🏬</span>
              </div>
              <div class="banner-tag-large">{{ currentBanner.tag }}</div>
              <p class="banner-detail-desc">{{ currentBanner.description }}</p>
              <div class="banner-detail-info">
                <div class="info-item">
                  <span class="info-label">活动时间</span>
                  <span class="info-value">{{ currentBanner.date || '长期有效' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">参与方式</span>
                  <span class="info-value">{{ currentBanner.participation || '到店参与' }}</span>
                </div>
              </div>
              <button class="modal-action-btn">立即参与</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 通知详情弹窗 -->
      <div class="modal-overlay" v-if="showNotificationModal" @click="closeNotificationModal">
        <div class="modal-content notification-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ currentNotification.title }}</h2>
            <button class="modal-close" @click="closeNotificationModal">×</button>
          </div>
          <div class="modal-body">
            <div class="notification-detail">
              <div class="detail-meta">
                <span class="detail-date">{{ formatDate(currentNotification.date) }}</span>
                <span class="detail-type" :class="currentNotification.type">{{ currentNotification.type === 'notice' ? '通知' : '活动' }}</span>
              </div>
              <div class="detail-content">
                <p>{{ currentNotification.description }}</p>
                <div v-if="currentNotification.additionalInfo" class="additional-info">
                  <h4>补充说明</h4>
                  <p>{{ currentNotification.additionalInfo }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 活动详情弹窗 -->
      <div class="modal-overlay" v-if="showEventModal" @click="closeEventModal">
        <div class="modal-content event-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ currentEvent.title }}</h2>
            <button class="modal-close" @click="closeEventModal">×</button>
          </div>
          <div class="modal-body">
            <div class="event-detail">
              <div class="event-status-badge" :class="currentEvent.status">{{ currentEvent.statusText }}</div>
              <div class="event-gallery">
                <img v-for="(img, index) in currentEvent.images || ['https://picsum.photos/id/'+(20+index)+'/800/400']" :key="index" :src="img" alt="活动图片">
              </div>
              <div class="event-info">
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">活动时间</span>
                    <span class="info-value">{{ currentEvent.date }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">活动地点</span>
                    <span class="info-value">{{ currentEvent.location }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">参与方式</span>
                    <span class="info-value">{{ currentEvent.participation || '免费入场' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">联系方式</span>
                    <span class="info-value">{{ currentEvent.contact || '021-12345678' }}</span>
                  </div>
                </div>
              </div>
              <div class="event-description">
                <h4>活动详情</h4>
                <p>{{ currentEvent.description }}</p>
                <p v-if="currentEvent.details">{{ currentEvent.details }}</p>
              </div>
              <button class="modal-action-btn">立即报名</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 创意小摊申请弹窗 -->
      <div class="modal-overlay" v-if="showStallModal" @click="closeStallModal">
        <div class="modal-content stall-modal" @click.stop>
          <div class="modal-header">
            <h2>创意小摊申请表</h2>
            <button class="modal-close" @click="closeStallModal">×</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitStallApplication">
              <div class="form-row">
                <div class="form-group">
                  <label>摊主姓名</label>
                  <input type="text" v-model="stallForm.name" required placeholder="请输入您的姓名">
                </div>
                <div class="form-group">
                  <label>联系电话</label>
                  <input type="tel" v-model="stallForm.phone" required placeholder="请输入您的手机号码">
                </div>
              </div>
              <div class="form-group">
                <label>摊位类型</label>
                <select v-model="stallForm.type" required>
                  <option value="">请选择摊位类型</option>
                  <option value="handcraft">手工艺品</option>
                  <option value="food">特色小吃</option>
                  <option value="creative">文创产品</option>
                  <option value="other">其他类型</option>
                </select>
              </div>
              <div class="form-group">
                <label>摊位名称</label>
                <input type="text" v-model="stallForm.stallName" required placeholder="请为您的摊位命名">
              </div>
              <div class="form-group">
                <label>经营内容描述</label>
                <textarea v-model="stallForm.description" required rows="4" placeholder="请详细描述您的经营内容"></textarea>
              </div>
              <div class="form-group">
                <label>预计经营时间</label>
                <select v-model="stallForm.duration" required>
                  <option value="">请选择经营时长</option>
                  <option value="weekend">仅周末</option>
                  <option value="month">一个月</option>
                  <option value="quarter">三个月</option>
                  <option value="longterm">长期经营</option>
                </select>
              </div>
              <div class="form-group">
                <label>上传作品/产品图片（可选）</label>
                <div class="upload-area" @click="triggerFileInput">
                  <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="handleFileUpload">
                  <span v-if="!stallForm.image">点击上传图片或拖拽至此处</span>
                  <span v-else>已选择文件: {{ stallForm.image.name }}</span>
                </div>
              </div>
              <button type="submit" class="submit-btn">提交申请</button>
            </form>
          </div>
        </div>
      </div>

      <!-- 兼职详情弹窗 -->
      <div class="modal-overlay" v-if="showJobModal" @click="closeJobModal">
        <div class="modal-content job-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ currentJob.title }}</h2>
            <button class="modal-close" @click="closeJobModal">×</button>
          </div>
          <div class="modal-body">
            <div class="job-detail">
              <div class="job-salary-large">{{ currentJob.salary }}</div>
              <div class="job-tags">
                <span class="job-tag" v-for="(tag, index) in currentJob.tags" :key="index">{{ tag }}</span>
              </div>
              <div class="job-description">
                <h4>职位描述</h4>
                <p>{{ currentJob.description }}</p>
                <div v-if="currentJob.requirements">
                  <h4>任职要求</h4>
                  <ul>
                    <li v-for="(req, index) in currentJob.requirements" :key="index">{{ req }}</li>
                  </ul>
                </div>
              </div>
              <div class="job-info">
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">工作地点</span>
                    <span class="info-value">{{ currentJob.location || '商场内指定区域' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">工作时间</span>
                    <span class="info-value">{{ currentJob.time || '排班制' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">福利待遇</span>
                    <span class="info-value">{{ currentJob.benefits || '餐补+提成' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">联系方式</span>
                    <span class="info-value">{{ currentJob.contact || 'hr@mall.com' }}</span>
                  </div>
                </div>
              </div>
              <button class="modal-action-btn" @click="openJobApplication">立即申请</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 成功提示弹窗 -->
      <div class="modal-overlay" v-if="showSuccessModal" @click="closeSuccessModal">
        <div class="modal-content success-modal" @click.stop>
          <div class="success-icon">
            <svg viewBox="0 0 24 24" width="60" height="60">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#4CAF50" />
            </svg>
          </div>
          <h2>{{ successMessage.title }}</h2>
          <p>{{ successMessage.content }}</p>
          <button class="confirm-btn" @click="closeSuccessModal">确 定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 顶部轮播公告数据
const banners = ref([
  {
    tag: '2025年"五五购物节"',
    title: '上海购物节',
    description: '盛大开启，全场低至5.5折！',
    buttonText: '立即参与',
    icon: 'shopping-bag',
    date: '2025年5月5日-5月15日',
    participation: '到店消费即可参与'
  },
  {
    tag: '会员专享',
    title: '夏日会员礼遇',
    description: '积分兑换双倍礼，满额即赠停车券',
    buttonText: '了解详情',
    icon: 'member-card',
    date: '2025年6月1日-8月31日',
    participation: '会员专享'
  },
  {
    tag: '新店开业',
    title: '国际品牌入驻',
    description: '首周消费满1000减300，限量赠品',
    buttonText: '前往选购',
    icon: 'new-store',
    date: '2025年6月18日开业',
    participation: '到店消费'
  }
]);

// 轮播状态
const currentBannerIndex = ref(0);
let bannerTimer = null;

// 通知分类
const tabs = [
  { label: '全部', value: 'all' },
  { label: '通知', value: 'notice' },
  { label: '活动', value: 'activity' }
];

// 通知数据
const notifications = ref([
  {
    id: 1,
    title: '关于商场停车场系统升级的通知',
    description: '为提供更好的停车体验，商场停车场系统将于7月25日凌晨2:00-5:00进行升级维护，期间停车场将暂停使用。给您带来不便，敬请谅解。',
    date: '2023-07-20',
    type: 'notice',
    read: false,
    additionalInfo: '升级完成后将支持无感支付和预约停车功能，敬请期待！'
  },
  {
    id: 2,
    title: '[周末活动] 亲子DIY手工坊',
    description: '本周末将举办亲子DIY手工坊活动，欢迎各位家长带小朋友参加。活动时间：7月22日-23日 14:00-17:00，地点：商场3楼中庭。',
    date: '2023-07-18',
    type: 'activity',
    read: false,
    additionalInfo: '活动免费参与，无需预约，现场报名即可。每场限20组家庭，建议提前到场。'
  },
  {
    id: 3,
    title: '商场空调系统检修通知',
    description: '为确保夏季空调系统正常运行，商场将于7月21日进行空调系统全面检修，期间部分区域空调可能会暂停使用，预计当天18:00前恢复正常。',
    date: '2023-07-15',
    type: 'notice',
    read: true
  }
]);

// 新增：商场活动数据
const mallEvents = ref([
  {
    title: '夏季时装秀',
    date: '6月15日 - 6月20日',
    location: '国金中心1楼中央大厅',
    description: '一场精彩绝伦的夏季时装秀，展示最新潮流服饰，现场还有互动抽奖环节。',
    details: '本次时装秀将邀请知名设计师和模特团队，展示2023夏季最新潮流单品。每天下午2点和晚上7点各一场，观众可免费入场观看。',
    status: 'ongoing',
    statusText: '进行中',
    participation: '免费入场',
    contact: '021-88888888',
    images: ['https://picsum.photos/id/21/800/400', 'https://picsum.photos/id/22/800/400']
  },
  {
    title: '美食节',
    date: '6月25日 - 6月30日',
    location: '招商花园城3楼美食区',
    description: '汇集各地特色美食，让您一站式品尝全球美味，更有厨师现场烹饪表演。',
    details: '本次美食节汇聚了来自全国各地的50多家特色美食摊位，包括川菜、粤菜、湘菜、西餐、甜点等。每天上午10点至晚上9点开放，消费满100元可参与抽奖。',
    status: 'upcoming',
    statusText: '即将开始',
    participation: '免费入场',
    contact: '021-99999999'
  },
  {
    title: '亲子嘉年华',
    date: '7月5日 - 7月10日',
    location: '上海万象城2楼儿童区',
    description: '专为家庭设计的亲子活动，包括手工制作、游戏互动、儿童剧表演等。',
    details: '亲子嘉年华包含多个互动区域：手工DIY区、亲子游戏区、儿童剧场、科普体验区等。适合3-12岁儿童参与，家长可免费陪同。',
    status: 'upcoming',
    statusText: '即将开始',
    participation: '需提前预约',
    contact: '021-77777777'
  }
]);

// 新增：公益服务数据
const publicServices = ref([
  {
    name: '环保宣传日',
    description: '通过展览、讲座等形式向公众普及环保知识',
    date: '6月20日',
    location: '商场中庭'
  },
  {
    name: '爱心捐赠活动',
    description: '收集旧衣物、书籍等物品捐赠给需要的人',
    date: '6月25日 - 6月30日',
    location: '商场1楼服务台'
  }
]);

// 新增：创意小摊招募数据
const stallRecruitment = ref({
  description: '商场现招募创意小摊贩主，欢迎手工艺品、特色小吃、文创产品等类型的摊主加入我们！',
  benefits: [
    '免摊位费',
    '提供基础设备',
    '商场统一宣传推广'
  ]
});

// 新增：兼职信息数据
const partTimeJobs = ref([
  {
    title: '商场导购员',
    salary: '¥18/小时',
    tags: ['置顶', '服装区'],
    description: '负责商品销售、陈列整理、客户咨询等工作，要求热情开朗，有相关经验者优先。',
    requirements: [
      '年龄18-35岁，形象气质佳',
      '具备良好的沟通能力和服务意识',
      '有零售行业经验者优先',
      '能适应轮班制'
    ],
    location: '商场2楼服装区',
    time: '周末及节假日',
    benefits: '时薪+提成+餐补'
  },
  {
    title: '美食区服务员',
    salary: '¥16/小时',
    tags: ['美食区'],
    description: '负责点餐、送餐、餐具整理等工作，要求吃苦耐劳，有服务意识。',
    requirements: [
      '年龄18-40岁',
      '身体健康，持有健康证',
      '有餐饮服务经验者优先',
      '能适应快节奏工作环境'
    ],
    location: '商场5楼美食区',
    time: '排班制',
    benefits: '时薪+包餐'
  },
  {
    title: '儿童区辅导员',
    salary: '¥17/小时',
    tags: ['儿童区'],
    description: '负责儿童活动引导、安全监护等工作，要求有耐心，喜欢小朋友，有相关经验者优先。',
    requirements: [
      '年龄20-35岁，女性优先',
      '有幼教或相关专业背景',
      '有爱心和责任心',
      '擅长与儿童沟通互动'
    ],
    location: '商场3楼儿童区',
    time: '周末为主',
    benefits: '时薪+节日福利'
  },
  {
    title: '保洁员',
    salary: '¥15/小时',
    tags: ['全场'],
    description: '负责商场公共区域的清洁工作，要求认真负责，能吃苦耐劳。',
    requirements: [
      '年龄不限，身体健康',
      '有保洁工作经验者优先',
      '工作认真负责',
      '能适应轮班'
    ],
    location: '商场各区域',
    time: '排班制',
    benefits: '时薪+劳保用品'
  }
]);

// 状态管理
const activeTab = ref('all');

// 弹窗控制
const showBannerModal = ref(false);
const showNotificationModal = ref(false);
const showEventModal = ref(false);
const showStallModal = ref(false);
const showJobModal = ref(false);
const showSuccessModal = ref(false);

// 当前选中的数据
const currentBanner = ref({});
const currentNotification = ref({});
const currentEvent = ref({});
const currentJob = ref({});

// 成功提示信息
const successMessage = ref({
  title: '操作成功',
  content: '您的申请已提交成功，我们将尽快与您联系。'
});

// 创意小摊申请表单
const stallForm = ref({
  name: '',
  phone: '',
  type: '',
  stallName: '',
  description: '',
  duration: '',
  image: null
});

// 文件上传引用
const fileInput = ref(null);

// 轮播控制
const startBannerTimer = () => {
  bannerTimer = setInterval(() => {
    nextBanner();
  }, 5000);
};

const nextBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
};

const goToBanner = (index) => {
  currentBannerIndex.value = index;
};

// 通知筛选
const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') return notifications.value;
  return notifications.value.filter(item => item.type === activeTab.value);
});

// 切换标签
const switchTab = (tabValue) => {
  activeTab.value = tabValue;
};

// 标记已读
const markAsRead = (id) => {
  const item = notifications.value.find(i => i.id === id);
  if (item) item.read = true;
};

// 加载更多通知
const loadMore = () => {
  successMessage.value = {
    title: '更多通知',
    content: '所有通知已加载完毕，您可以查看历史通知档案。'
  };
  showSuccessModal.value = true;
};

// 新增：查看详情
const viewDetails = (type, index) => {
  if (type === 'event') {
    openEventDetail(mallEvents.value[index]);
  } else if (type === 'job') {
    openJobDetail(partTimeJobs.value[index]);
  }
};

// 新增：查看更多活动
const viewMoreEvents = () => {
  successMessage.value = {
    title: '更多活动',
    content: '更多精彩活动即将上线，敬请期待！'
  };
  showSuccessModal.value = true;
};

// 新增：查看更多兼职
const viewMoreJobs = () => {
  successMessage.value = {
    title: '更多兼职',
    content: '更多兼职岗位正在更新中，请关注我们的招聘公告。'
  };
  showSuccessModal.value = true;
};

// 弹窗操作方法
const openBannerDetail = (banner) => {
  currentBanner.value = banner;
  showBannerModal.value = true;
};

const closeBannerModal = () => {
  showBannerModal.value = false;
};

const openNotificationDetail = (notification) => {
  currentNotification.value = notification;
  markAsRead(notification.id);
  showNotificationModal.value = true;
};

const closeNotificationModal = () => {
  showNotificationModal.value = false;
};

const openEventDetail = (event) => {
  currentEvent.value = event;
  showEventModal.value = true;
};

const closeEventModal = () => {
  showEventModal.value = false;
};

const openServiceDetail = (service) => {
  successMessage.value = {
    title: service.name,
    content: service.description + '\n\n时间：' + service.date + '\n地点：' + service.location
  };
  showSuccessModal.value = true;
};

const openStallApplication = () => {
  showStallModal.value = true;
};

const closeStallModal = () => {
  showStallModal.value = false;
  // 重置表单
  stallForm.value = {
    name: '',
    phone: '',
    type: '',
    stallName: '',
    description: '',
    duration: '',
    image: null
  };
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  if (event.target.files.length > 0) {
    stallForm.value.image = event.target.files[0];
  }
};

const submitStallApplication = () => {
  // 模拟表单提交
  console.log('提交创意小摊申请:', stallForm.value);
  
  // 关闭弹窗
  closeStallModal();
  
  // 显示成功提示
  successMessage.value = {
    title: '申请提交成功',
    content: '您的创意小摊申请已提交，我们将在3个工作日内审核并与您联系。'
  };
  showSuccessModal.value = true;
};

const openJobDetail = (job) => {
  currentJob.value = job;
  showJobModal.value = true;
};

const closeJobModal = () => {
  showJobModal.value = false;
};

const openJobApplication = () => {
  closeJobModal();
  successMessage.value = {
    title: '申请通道',
    content: '请将您的简历发送至：hr@mall.com，邮件主题注明"应聘-' + currentJob.value.title + '"。我们将尽快筛选并安排面试。'
  };
  showSuccessModal.value = true;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

// 日期格式化
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN');
};

// 重置方法（供父组件调用）
const reset = () => {
  // 关闭所有弹窗
  showBannerModal.value = false;
  showNotificationModal.value = false;
  showEventModal.value = false;
  showStallModal.value = false;
  showJobModal.value = false;
  showSuccessModal.value = false;
  
  // 重置滚动位置
  const slideContent = document.querySelector('.slide-content');
  if (slideContent) {
    slideContent.scrollTop = 0;
  }
};

// 生命周期
onMounted(() => {
  startBannerTimer();
});

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer);
});

// 暴露重置方法给父组件
defineExpose({ reset });
</script>

<style scoped>
.slide {
  flex: 0 0 100%;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.slide-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 8s ease;
}


/* 科技感遮罩 */
.slide-core-value .slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, rgba(10, 30, 80, 0.9) 0%, rgba(20, 60, 150, 0.8) 100%),
    radial-gradient(circle at 70% 60%, rgba(50, 120, 255, 0.3) 0%, transparent 60%);
}

/* 外层科技装饰元素 */
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

/* 内容容器 - 居中显示并添加滚动功能 */
.slide-content {
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 90%;
  max-width: 1590px;
  padding: 20px;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 1.2s forwards 0.3s;
  height: 740px;
  overflow-y: auto; /* 添加垂直滚动 */
  /* 滚动条美化 */
  scrollbar-width: 6px; /* Firefox */
  scrollbar-color: rgba(100, 243, 255, 0.5) transparent; /* Firefox */
}

/* Chrome/Safari 滚动条美化 */
.slide-content::-webkit-scrollbar {
  width: 6px; /* 滚动条宽度 */
}

.slide-content::-webkit-scrollbar-track {
  background: transparent; /* 轨道透明 */
  border-radius: 3px;
}

.slide-content::-webkit-scrollbar-thumb {
  background-color: rgba(100, 243, 255, 0.5); /* 科技蓝滑块 */
  border-radius: 3px;
  transition: background-color 0.3s;
}

.slide-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 243, 255, 0.8);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

/* 通知公告容器 */
.notification-container {
  width: 100%;
  padding: 0;
  margin: 0 0 30px 0;
  background: transparent;
}

/* 顶部推荐公告样式 */
.recommended-banner {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
  background: 
    linear-gradient(135deg, rgba(10, 30, 80, 0.7) 0%, rgba(20, 60, 150, 0.6) 100%),
    radial-gradient(circle at 70% 60%, rgba(50, 120, 255, 0.2) 0%, transparent 60%);
}

/* 轮播内部的科技装饰 */
.banner-tech-decoration {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.banner-tech-decoration.left {
  top: 20%;
  left: -80px;
  background: rgba(50, 150, 255, 0.15);
}

.banner-tech-decoration.right {
  bottom: -40px;
  right: 5%;
  background: rgba(100, 200, 255, 0.1);
}

.banner-slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.banner-slide {
  position: relative;
  min-width: 100%;
  height: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.banner-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  max-width: 70%;
  z-index: 2;
}

.banner-tag {
  display: inline-block;
  font-size: 0.85rem;
  padding: 3px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-bottom: 10px;
  backdrop-filter: blur(4px);
}

.banner-title {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
  font-weight: 800;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(100, 180, 255, 0.6);
}

.banner-desc {
  font-size: 1rem;
  margin: 0 0 15px 0;
  opacity: 0.9;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.banner-btn {
  padding: 8px 20px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}

.banner-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(50, 150, 255, 0.2);
}

.banner-icon {
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 6rem;
  opacity: 0.2;
  z-index: 2;
}

.banner-next {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
  z-index: 2;
}

.banner-next:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 5px 15px rgba(50, 150, 255, 0.2);
}

.banner-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.banner-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.banner-dots span.active {
  width: 24px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* 底部通知公告列表样式 */
.notification-section {
  min-height: 360px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 1.25rem;
  color: #64f3ff;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.filter-tabs {
  display: flex;
  gap: 5px;
}

.filter-tabs button {
  padding: 5px 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}

.filter-tabs button.active {
  background-color: #165DFF;
  color: white;
  border-color: #165DFF;
  box-shadow: 0 0 10px rgba(22, 93, 255, 0.3);
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  transform: translateX(5px);
}

.notification-item:hover .notification-title {
  color: #8ab4f8;
}

.notification-text {
  flex: 1;
}

.notification-title {
  font-size: 1rem;
  color: white;
  margin: 0 0 5px 0;
  font-weight: 500;
  transition: color 0.3s;
}

.notification-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.notification-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.unread-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #40a9ff;
  box-shadow: 0 0 5px rgba(64, 169, 255, 0.8);
}

.view-more {
  text-align: center;
  margin-top: 20px;
}

.view-more a {
  color: #8ab4f8;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s;
  padding: 5px 10px;
  border-radius: 4px;
}

.view-more a:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

/* 三个容器的样式 - 解决溢出问题的核心调整 */
.three-containers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
  width: 100%;
}

.info-container {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: white;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

/* 每个容器的特色颜色 */
.event-container {
  border-top: 3px solid #165DFF;
}

.public-service-container {
  border-top: 3px solid #6B7280;
}

.part-time-container {
  border-top: 3px solid #FF7D00;
}

.container-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.container-header .icon {
  font-size: 1.5rem;
  color: #64f3ff;
}

.container-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #64f3ff;
}

.container-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* 内部滚动条美化 */
  scrollbar-width: 4px;
  scrollbar-color: rgba(100, 243, 255, 0.3) transparent;
}

.container-content::-webkit-scrollbar {
  width: 4px;
}

.container-content::-webkit-scrollbar-track {
  background: transparent;
}

.container-content::-webkit-scrollbar-thumb {
  background-color: rgba(100, 243, 255, 0.3);
  border-radius: 2px;
}

/* 商场活动样式 */
.event-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.event-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.event-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.event-status.ongoing {
  background-color: rgba(12, 184, 12, 0.2);
  color: #00e676;
}

.event-status.upcoming {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ffd740;
}

.event-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: white;
}

.event-date, .event-location {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 4px 0;
}

.event-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 8px 0;
  line-height: 1.4;
}

/* 公益服务样式 */
.service-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64f3ff;
  margin: 0 0 10px 0;
  padding-bottom: 5px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.service-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: transform 0.3s;
}

.service-item:hover {
  transform: translateY(-3px);
}

.service-name {
  margin: 0 0 5px 0;
  font-size: 0.95rem;
  color: white;
}

.service-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.service-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.stall-section {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stall-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.stall-benefits {
  margin: 0 0 12px 0;
}

.benefit-item {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 5px 0;
}

.benefit-check {
  color: #00e676;
  font-weight: bold;
}

.apply-btn {
  background-color: yellowgreen;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.apply-btn:hover {
  background-color: rgba(107, 114, 128, 0.5);
}

/* 兼职信息样式 */
.job-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: transform 0.3s;
}

.job-item:hover {
  transform: translateY(-3px);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.job-title {
  margin: 0;
  font-size: 0.95rem;
  color: white;
}

.job-salary {
  font-size: 0.9rem;
  font-weight: 600;
  color: #FF7D00;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 8px;
}

.job-tag {
  display: inline-block;
  padding: 1px 6px;
  background-color: rgba(255, 125, 0, 0.2);
  color: #FFB74D;
  border-radius: 3px;
  font-size: 0.75rem;
}

.job-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

/* 查看详情和更多链接样式 */
.view-details {
  font-size: 0.85rem;
  color: #8ab4f8;
  text-decoration: none;
  transition: color 0.3s;
}

.view-details:hover {
  color: #bbdefb;
  text-decoration: underline;
}

.view-more-link {
  text-align: center;
  font-size: 0.9rem;
  color: #8ab4f8;
  text-decoration: none;
  padding: 8px;
  margin-top: 10px;
  display: block;
  transition: all 0.3s;
  border-radius: 4px;
}

.view-more-link:hover {
  color: #bbdefb;
  background-color: rgba(255, 255, 255, 0.05);
  text-decoration: underline;
}

/* 弹窗样式 */
.slide-modals {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  pointer-events: none;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.3s ease;
  pointer-events: auto;
  z-index: 101;
}

.modal-content {
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.95), rgba(20, 60, 150, 0.95));
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
  border: 1px solid rgba(100, 243, 255, 0.2);
  animation: slideUp 0.4s ease;
  margin: 20px;
  pointer-events: auto;
    color:white;

}

.banner-modal {
  max-width: 600px;
}

.notification-modal {
  max-width: 700px;
}

.event-modal {
  max-width: 900px;
}

.stall-modal {
  max-width: 700px;
}

.job-modal {
  max-width: 700px;
}

.success-modal {
  max-width: 400px;
  text-align: center;
  padding: 30px;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #64f3ff;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 20px;
}

/* 公告详情样式 */
.banner-detail {
  text-align: center;
}

.banner-icon-large {
  font-size: 8rem;
  opacity: 0.2;
  margin-bottom: 20px;
}

.banner-tag-large {
  display: inline-block;
  font-size: 1rem;
  padding: 5px 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(4px);
}

.banner-detail-desc {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
}

.banner-detail-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

/* 通知详情样式 */
.notification-detail {
  line-height: 1.8;
}

.detail-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.detail-date {
  color: rgba(255, 255, 255, 0.7);
}

.detail-type {
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.detail-type.notice {
  background-color: rgba(64, 169, 255, 0.2);
  color: #40a9ff;
}

.detail-type.activity {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ff9000;
}

.detail-content {
  margin-bottom: 20px;
}

.additional-info {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

/* 活动详情样式 */
.event-detail {
  line-height: 1.6;
}

.event-status-badge {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.event-status-badge.ongoing {
  background-color: rgba(12, 184, 12, 0.2);
  color: #00e676;
}

.event-status-badge.upcoming {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ffd740;
}

.event-gallery {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.event-gallery img {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  object-fit: cover;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.info-value {
  font-weight: 500;
}

.event-description {
  margin-bottom: 30px;
}

.event-description h4 {
  color: #64f3ff;
  margin-bottom: 10px;
}

/* 表单样式 */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  color: #64f3ff;
}



.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(100, 243, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #64f3ff;
  box-shadow: 0 0 10px rgba(100, 243, 255, 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.upload-area {
  padding: 30px;
  border: 2px dashed rgba(100, 243, 255, 0.3);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  color: white;
  transition: border 0.3s, background 0.3s;
}

.upload-area:hover {
  border-color: #64f3ff;
  background-color: rgba(100, 243, 255, 0.05);
}

.submit-btn {
  padding: 12px 20px;
  background-color: #165DFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.submit-btn:hover {
  background-color: #0040C9;
  transform: translateY(-2px);
}

/* 兼职详情样式 */
.job-salary-large {
  font-size: 2rem;
  font-weight: 700;
  color: #FF7D00;
  margin-bottom: 10px;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.job-description h4 {
  color: #64f3ff;
  margin-top: 20px;
  margin-bottom: 10px;
}

.job-description ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.job-description li {
  margin-bottom: 5px;
}

/* 成功弹窗样式 */
.success-icon {
  margin-bottom: 20px;
}

.success-modal h2 {
  color: #4CAF50;
  margin-bottom: 15px;
}

.success-modal p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 30px;
}

.confirm-btn {
  padding: 10px 30px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.confirm-btn:hover {
  background-color: #388E3C;
}

/* 模态框操作按钮 */
.modal-action-btn {
  padding: 12px 30px;
  background-color: #165DFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  margin-top: 20px;
}

.modal-action-btn:hover {
  background-color: #0040C9;
  transform: translateY(-2px);
}

/* 响应式调整 - 增强版 */
@media (max-width: 1200px) {
  .banner-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 992px) {
  .three-containers {
    grid-template-columns: 1fr 1fr;
  }
  
  .info-container:nth-child(3) {
    grid-column: span 2;
  }
  
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .recommended-banner {
    height: 220px;
  }

  .banner-content {
    max-width: 60%;
  }

  .banner-icon {
    right: 50px;
    font-size: 4rem;
  }

  .notification-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .notification-item {
    flex-direction: column;
  }

  .notification-date {
    margin-left: 0;
    margin-top: 8px;
    align-self: flex-start;
  }
  
  .three-containers {
    grid-template-columns: 1fr;
  }
  
  .info-container:nth-child(3) {
    grid-column: span 1;
  }
  
  .banner-icon-large {
    font-size: 6rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .banner-title {
    font-size: 1.2rem;
  }

  .banner-icon {
    display: none;
  }

  .banner-content {
    max-width: 80%;
  }
  
  .filter-tabs {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-tabs button {
    padding: 5px 10px;
    font-size: 0.8rem;
  }
  
  .banner-icon-large {
    font-size: 4rem;
  }
  
  .modal-header {
    padding: 15px;
  }
  
  .modal-header h2 {
    font-size: 1.2rem;
  }
  
  .modal-body {
    padding: 15px;
  }
}

</style>