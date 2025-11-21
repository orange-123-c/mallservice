<template>
  <div class="slide slide-core-value">
    <div class="slide-bg">
      <div class="slide-overlay"></div>
      <div class="tech-decoration left"></div>
      <div class="tech-decoration right"></div>

      <div class="slide-content">
        <div class="mall-service-page">
          <!-- 头部标题区域 -->
          <div class="header">
            <h1>遇到商场服务问题？我们帮你解决！</h1>
            <p>15分钟响应，24小时内处理，让您的购物体验更愉悦</p>
            <div class="btn-group">
              <button class="feedback-btn" @click="openFeedbackModal">我要反馈</button>
              <button class="faq-btn" @click="openFaqModal">常见问题</button>
            </div>
          </div>

          <!-- 服务类型分类 -->
          <div class="service-categories">
            <h3>服务类型</h3>
            <div class="category-grid">
              <div class="category-item" v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
                <div class="category-icon">
                  <svg :viewBox="category.icon.viewBox" width="24" height="24">
                    <path :d="category.icon.path" />
                  </svg>
                </div>
                <h4>{{ category.name }}</h4>
                <p>{{ category.desc }}</p>
              </div>
            </div>
          </div>

          <!-- 服务流程区域 -->
          <div class="service-process">
            <h3>服务流程</h3>
            <div class="process-steps">
              <span class="step-num">17060+</span>
              <div class="step-item" v-for="(step, index) in processSteps" :key="index">
                <div class="step-icon">
                  <svg :viewBox="step.icon.viewBox" width="36" height="36">
                    <path :d="step.icon.path" />
                  </svg>
                </div>
                <p>{{ step.name }}</p>
              </div>
              <span class="step-num">98.6%</span>
            </div>
          </div>

          <!-- 实时数据统计 -->
          <div class="realtime-stats">
            <h3>实时服务数据</h3>
            <div class="stats-grid">
              <div class="stat-card" v-for="(stat, index) in statsDataArray" :key="index">
                <div class="stat-value" :class="{ 'number-animation': true }">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- 满意度数据区域 -->
          <div class="satisfaction-data">
            <h3>满意度数据</h3>
            <div class="data-card">
              <div class="chart-group">
                <!-- 引入柱状图组件 -->
                <ServiceSatisfactionBar title="服务类型满意度" />
                <!-- 引入饼图组件 -->
                <MonthlySatisfactionPie title="月度满意度趋势" />
              </div>
            </div>
          </div>

          <!-- 用户评价与3D轮放区域 -->
          <div class="reviews-showcase">
            <div class="user-reviews">
              <h3>用户评价轮播</h3>
              <div class="review-group">
                <div class="review-item" v-for="(review, index) in reviews" :key="index">
                  <img :src="review.avatar" alt="用户头像">
                  <div class="review-content">
                    <h4>{{ review.name }}</h4>
                    <p>{{ review.content }}</p>
                    <div class="stars">
                      <svg viewBox="0 0 24 24" width="20" height="20" v-for="star in 5" :key="star">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <p>{{ review.time }}</p>
                  </div>
                </div>
              </div>
              <button class="more-reviews-btn" @click="showMoreReviews">查看更多评价</button>
            </div>
            <div class="showcase-3d">
              <h3>服务案例展示</h3>
              <div class="showcase-group">
                <div class="showcase-item" v-for="(caseItem, index) in caseStudies" :key="index" @click="openCaseDetail(caseItem)">
                  <img :src="caseItem.image" alt="服务案例">
                  <div class="showcase-content">
                    <h4>{{ caseItem.title }}</h4>
                    <p>{{ caseItem.desc }}</p>
                    <div class="case-meta">{{ caseItem.meta }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 常见问题 -->
          <div class="common-questions">
            <h3>常见问题</h3>
            <div class="faq-list">
              <div class="faq-item" v-for="(faq, index) in faqs" :key="index" @click="openFaqDetail(faq)">
                <div class="faq-question">{{ faq.question }}</div>
                <div class="faq-answer">{{ faq.answer }}</div>
              </div>
            </div>
          </div>

          <!-- 在线客服与紧急服务 -->
          <div class="service-entries">
            <div class="online-service">
              <div class="wechat-icon">
                <svg viewBox="0 0 24 24" width="90" height="90">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.5 6c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-10 0c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zm1.81 11.96c-.83-.2-1.53-.76-1.96-1.46-.11-.19-.17-.4-.17-.62 0-.67.33-1.27.8-1.64.08-.07.17-.14.26-.21.04-.03.2-.2.51-.4.31-.2.59-.48.82-.83.23-.36.35-.76.35-1.21 0-.46-.14-.87-.41-1.24-.27-.36-.65-.66-1.14-.9-.49-.24-1.07-.36-1.74-.36-.68 0-1.26.12-1.73.36-.49.24-.87.54-1.14.9-.27.36-.41.78-.41 1.24 0 .45.12.85.35 1.21.23.36.51.57.82.83.31.2.47.37.51.4.09.07.18.14.26.21.47.37 1.13.97 1.96 1.46.35.18.67.27 1.03.27.36 0 .68-.09 1.03-.27zM12 6.8c.81 0 1.48.27 2.03.82.55.55.82 1.22.82 2.03 0 .81-.27 1.48-.82 2.03-.55.55-1.22.82-2.03.82-.81 0-1.48-.27-2.03-.82-.55-.55-.82-1.22-.82-2.03 0-.81.27-1.48.82-2.03.55-.55 1.22-.82 2.03-.82z" />
                </svg>
              </div>
              <p>扫码咨询在线客服</p>
            </div>
            <button class="emergency-btn" @click="callEmergencyService">
              <svg viewBox="0 0 24 24" width="24" height="24" style="margin-right:8px">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              紧急服务热线
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗区域：相对于轮播项定位，而非全局定位 -->
    <div class="slide-modals">
      <!-- 反馈表单弹窗 -->
      <div class="modal-overlay" v-if="showFeedbackModal" @click="closeFeedbackModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>服务反馈</h2>
            <button class="modal-close" @click="closeFeedbackModal">×</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitFeedback">
              <div class="form-group">
                <label>问题类型</label>
                <select v-model="feedbackForm.type" required>
                  <option value="">请选择问题类型</option>
                  <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>联系方式</label>
                <input type="text" v-model="feedbackForm.contact" placeholder="请输入您的手机号或微信号" required>
              </div>
              <div class="form-group">
                <label>问题描述</label>
                <textarea v-model="feedbackForm.description" placeholder="请详细描述您遇到的问题" rows="4" required></textarea>
              </div>
              <div class="form-group">
                <label>上传图片（可选）</label>
                <div class="upload-area" @click="triggerFileInput">
                  <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="handleFileUpload">
                  <span v-if="!feedbackForm.image">点击上传图片或拖拽至此处</span>
                  <span v-else>已选择文件: {{ feedbackForm.image.name }}</span>
                </div>
              </div>
              <button type="submit" class="submit-btn">提交反馈</button>
            </form>
          </div>
        </div>
      </div>

      <!-- FAQ详情弹窗 -->
      <div class="modal-overlay" v-if="showFaqModal" @click="closeFaqModal">
        <div class="modal-content faq-modal" @click.stop>
          <div class="modal-header">
            <h2>常见问题解答</h2>
            <button class="modal-close" @click="closeFaqModal">×</button>
          </div>
          <div class="modal-body">
            <div class="faq-detail-list">
              <div class="faq-detail-item" v-for="(faq, index) in faqs" :key="index">
                <h3>{{ faq.question }}</h3>
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 案例详情弹窗 -->
      <div class="modal-overlay" v-if="showCaseModal" @click="closeCaseModal">
        <div class="modal-content case-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ currentCase.title }}</h2>
            <button class="modal-close" @click="closeCaseModal">×</button>
          </div>
          <div class="modal-body">
            <div class="case-detail-content">
              <img :src="currentCase.image" alt="案例图片">
              <div class="case-detail-text">
                <p>{{ currentCase.detail }}</p>
                <div class="case-detail-meta">{{ currentCase.meta }}</div>
                <div class="case-stats">
                  <div class="stat-item">
                    <span class="stat-label">处理时间</span>
                    <span class="stat-value">{{ currentCase.stats.time }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">客户满意度</span>
                    <span class="stat-value">{{ currentCase.stats.satisfaction }}</span>
                  </div>
                </div>
              </div>
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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import MonthlySatisfactionPie from './echart/MonthlySatisfactionPie.vue';
import ServiceSatisfactionBar from './echart/ServiceSatisfactionBar.vue';

// 状态管理
const currentBannerIndex = ref(0);
let bannerTimer = null;

// 弹窗控制
const showFeedbackModal = ref(false);
const showFaqModal = ref(false);
const showCaseModal = ref(false);
const showSuccessModal = ref(false);

// 当前选中的数据
const selectedCategory = ref(null);
const currentCase = ref({});
const successMessage = ref({
  title: '提交成功',
  content: '您的反馈已提交，我们将尽快处理并与您联系。'
});

// 表单数据
const feedbackForm = ref({
  type: '',
  contact: '',
  description: '',
  image: null
});

// 数据定义
const categories = ref([
  {
    name: '设施维护',
    desc: '公共设施故障报修',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
    }
  },
  {
    name: '商户服务',
    desc: '店铺相关问题投诉',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M18 4h2v16h-2zM4 4h14v2H4zM4 8h14v2H4zM4 12h14v2H4zM4 16h10v2H4zM4 20h14v2H4z'
    }
  },
  {
    name: '导航指引',
    desc: '店铺位置与路线咨询',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
    }
  },
  {
    name: '应急帮助',
    desc: '紧急情况协助处理',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M15 11V5l-3-3-3 3v6H5v12h14V11h-4zm-8 8H6v-4h1v4zm2 0H8v-4h1v4zm2 0h-1v-4h1v4zm2 0h-1V9h1v10zm2 0h-1v-4h1v4zm2 0h-1v-4h1v4zm2 0h-1v-4h1v4zm1-5H6v-2h10v2z'
    }
  }
]);

const processSteps = ref([
  {
    name: '问题提交',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 2 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'
    }
  },
  {
    name: '客服受理',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 2 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'
    }
  },
  {
    name: '处理中',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
    }
  },
  {
    name: '完成',
    icon: {
      viewBox: '0 0 24 24',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'
    }
  }
]);

const statsData = ref({
  requests: 1284,
  responseTime: 8.2,
  resolutionRate: 96.3,
  satisfaction: 4.8
});

const statsDataArray = computed(() => [
  { value: statsData.value.requests.toLocaleString(), label: '今日服务请求' },
  { value: `${statsData.value.responseTime}分钟`, label: '平均响应时间' },
  { value: `${statsData.value.resolutionRate}%`, label: '问题解决率' },
  { value: `${statsData.value.satisfaction}/5`, label: '平均满意度' }
]);

const reviews = ref([
  {
    avatar: 'https://via.placeholder.com/70',
    name: '张女士',
    content: '卫生间设施损坏反馈后，不到半小时就有人来维修了，效率很高！',
    time: '2小时前'
  },
  {
    avatar: 'https://via.placeholder.com/70',
    name: '李先生',
    content: '客服很耐心地指引我找到了停车场，还帮我联系了商户预留商品，非常贴心',
    time: '昨天'
  }
]);

const caseStudies = ref([
  {
    image: 'https://via.placeholder.com/120x80',
    title: '紧急医疗协助',
    desc: '快速响应顾客突发不适情况',
    meta: '处理时间: 5分钟',
    detail: '一位顾客在商场内突然感到不适，服务台接到通知后立即联系商场医务室，并安排安保人员护送顾客到医务室休息。同时联系了顾客家属，并提供了饮用水和急救药品，整个过程仅用5分钟完成应急处理。',
    stats: {
      time: '5分钟',
      satisfaction: '5/5'
    }
  },
  {
    image: 'https://via.placeholder.com/120x80',
    title: '设施抢修',
    desc: '电梯故障紧急维修处理',
    meta: '处理时间: 45分钟',
    detail: '商场内一部电梯突发故障，导致3名顾客被困。客服中心立即启动应急预案，通知维保单位并安抚被困顾客情绪，技术人员在15分钟内到达现场，45分钟内成功解救并修复电梯，恢复正常运行。',
    stats: {
      time: '45分钟',
      satisfaction: '4.8/5'
    }
  }
]);

const faqs = ref([
  {
    question: '如何申请轮椅服务？',
    answer: '可通过客服热线或现场服务台申请，我们将在10分钟内送达指定地点。轮椅服务免费提供，需出示有效证件并登记使用信息，使用完毕后请归还至服务台或联系工作人员取回。'
  },
  {
    question: '停车场缴费异常怎么办？',
    answer: '可联系现场管理员或通过"我要反馈"提交问题，我们将在15分钟内处理。如遇缴费系统故障，可先记录停车时间并拍照留证，离场时告知出口工作人员核实后即可通行，后续费用将通过线上方式补收或退还。'
  },
  {
    question: '如何投诉商户服务？',
    answer: '通过反馈渠道提交详细情况，我们将在24小时内给出处理结果。投诉需包含具体商户名称、事发时间、问题描述及相关证据，商场客服部将进行调查核实，并协调商户给出解决方案，确保顾客权益得到保障。'
  },
  {
    question: '商场内物品遗失如何处理？',
    answer: '可前往服务台登记遗失物品信息，或拨打客服热线报备。商场安保部会协助调取监控并在失物招领处查找，找到后将第一时间联系失主认领。贵重物品需出示身份证明及物品特征描述方可领取。'
  }
]);

// 文件上传引用
const fileInput = ref(null);

// 方法定义
const selectCategory = (category) => {
  selectedCategory.value = category;
  feedbackForm.value.type = category.name;
  openFeedbackModal();
};

const openFeedbackModal = () => {
  showFeedbackModal.value = true;
};

const closeFeedbackModal = () => {
  showFeedbackModal.value = false;
  // 重置表单
  feedbackForm.value = {
    type: selectedCategory.value ? selectedCategory.value.name : '',
    contact: '',
    description: '',
    image: null
  };
};

const openFaqModal = () => {
  showFaqModal.value = true;
};

const closeFaqModal = () => {
  showFaqModal.value = false;
};

const openFaqDetail = (faq) => {
  // 滚动到FAQ区域并高亮
  const faqElement = document.querySelector(`.faq-item:nth-child(${faqs.value.indexOf(faq) + 1})`);
  if (faqElement) {
    faqElement.scrollIntoView({ behavior: 'smooth' });
    faqElement.classList.add('highlight');
    setTimeout(() => faqElement.classList.remove('highlight'), 2000);
  }
};

const openCaseDetail = (caseItem) => {
  currentCase.value = caseItem;
  showCaseModal.value = true;
};

const closeCaseModal = () => {
  showCaseModal.value = false;
};

const showMoreReviews = () => {
  successMessage.value = {
    title: '更多评价',
    content: '您可以通过扫码查看完整的用户评价列表和满意度报告。'
  };
  showSuccessModal.value = true;
};

const callEmergencyService = () => {
  successMessage.value = {
    title: '紧急服务',
    content: '紧急服务热线：400-888-9999，我们将立即为您提供帮助。'
  };
  showSuccessModal.value = true;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  if (event.target.files.length > 0) {
    feedbackForm.value.image = event.target.files[0];
  }
};

const submitFeedback = () => {
  // 模拟表单提交
  console.log('提交反馈:', feedbackForm.value);
  
  // 关闭反馈弹窗
  closeFeedbackModal();
  
  // 显示成功提示
  showSuccessModal.value = true;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

// 重置方法（供父组件调用）
const reset = () => {
  // 关闭所有弹窗
  showFeedbackModal.value = false;
  showFaqModal.value = false;
  showCaseModal.value = false;
  showSuccessModal.value = false;
  
  // 重置表单
  feedbackForm.value = {
    type: '',
    contact: '',
    description: '',
    image: null
  };
  
  // 重置滚动位置
  const slideContent = document.querySelector('.slide-content');
  if (slideContent) {
    slideContent.scrollTop = 0;
  }
};

// 实时数据更新
onMounted(() => {
  const updateStats = () => {
    const newResponseTime = Number(statsData.value.responseTime) + (Math.random() * 0.4 - 0.2);
    statsData.value = {
      ...statsData.value,
      requests: Math.floor(statsData.value.requests + Math.random() * 5),
      responseTime: Number(newResponseTime.toFixed(1))
    };
  };

  bannerTimer = setInterval(updateStats, 5000);
});

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer);
});

// 暴露重置方法给父组件
defineExpose({ reset });
</script>

<style scoped>
/* 基础样式保持不变 */
.slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
  min-height: calc(100vh - 90px);
  overflow: hidden;
}

.slide-bg {
  width: 100%;
  height: 100%;
  background: url('https://picsum.photos/id/1/1600/900') center/cover no-repeat;
  transition: transform 8s ease;
}

.slide-core-value .slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.9) 0%, rgba(20, 60, 150, 0.8) 100%);
}

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

.slide-content {
  height: 100%;
  max-height: calc(100vh - 90px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  width: 90%;
  max-width: 1600px;
  padding: 20px;
  margin: 0 auto;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 1.2s forwards 0.3s;
  overflow-y: auto;
  scrollbar-width: 6px; /* Firefox */
  scrollbar-color: rgba(100, 243, 255, 0.5) transparent; /* Firefox */
}

/* Chrome/Safari 滚动条美化 */
.slide-content::-webkit-scrollbar {
  width: 6px;
}

.slide-content::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.slide-content::-webkit-scrollbar-thumb {
  background-color: rgba(100, 243, 255, 0.5);
  border-radius: 3px;
  transition: background-color 0.3s;
}

.slide-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 243, 255, 0.8);
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.mall-service-page {
  background: transparent;
  color: #fff;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 头部样式调整 */
.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.header h1 {
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: #64f3ff;
  text-shadow: 0 0 10px rgba(100, 243, 255, 0.8);
}

.header p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  background: rgba(0, 119, 255, 0.2);
  padding: 12px 24px;
  border-radius: 20px;
  display: inline-block;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.feedback-btn,
.faq-btn,
.emergency-btn,
.submit-btn,
.confirm-btn,
.more-reviews-btn {
  background: linear-gradient(to right, #00f0ff, #0077ff);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-btn:hover,
.faq-btn:hover,
.emergency-btn:hover,
.submit-btn:hover,
.confirm-btn:hover,
.more-reviews-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 240, 255, 0.7);
}

.more-reviews-btn {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
}

/* 服务类型分类样式 */
.service-categories {
  margin-bottom: 35px;
  padding: 0 20px;
}

.service-categories h3 {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #64f3ff;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  padding-bottom: 10px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.category-item {
  background: rgba(0, 119, 255, 0.1);
  padding: 20px 15px;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2);
}

.category-icon {
  margin-bottom: 12px;
}

.category-icon svg {
  fill: #00f0ff;
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5));
}

.category-item h4 {
  margin: 0 0 8px 0;
  color: #fff;
  font-size: 1.1rem;
}

.category-item p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 服务流程样式调整 */
.service-process {
  margin-bottom: 35px;
  padding: 0 20px;
}

.service-process h3 {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #64f3ff;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  padding-bottom: 10px;
}

.process-steps {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 80px;
}

.step-icon svg {
  fill: #00f0ff;
  margin-bottom: 8px;
  filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.5));
}

.step-item p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.step-num {
  color: #00f0ff;
  font-weight: bold;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 实时数据统计样式 */
.realtime-stats {
  margin-bottom: 35px;
  padding: 0 20px;
}

.realtime-stats h3 {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #64f3ff;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  padding-bottom: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.stat-card {
  background: rgba(0, 119, 255, 0.1);
  padding: 20px 15px;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #00f0ff, #0077ff);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #64f3ff;
  text-shadow: 0 0 5px rgba(100, 243, 255, 0.5);
  transition: all 0.5s ease;
}

.number-animation {
  animation: numberChange 0.5s ease-out;
}

@keyframes numberChange {
  0% { opacity: 0.5; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 满意度数据样式调整 */
.satisfaction-data {
  margin-bottom: 35px;
  padding: 0 20px;
}

.satisfaction-data h3 {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #64f3ff;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  padding-bottom: 10px;
}

.data-card {
  background: rgba(0, 119, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-group {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 350px;
}

.chart-group > * {
  flex: 1;
  min-width: 300px;
}

@media (max-width: 768px) {
  .chart-group {
    flex-direction: column;
    gap: 30px;
  }
  
  .chart-group > * {
    width: 100%;
    min-height: 300px;
  }
}

/* 用户评价与案例展示样式调整 */
.reviews-showcase {
  display: flex;
  gap: 20px;
  margin-bottom: 35px;
  padding: 0 20px;
  flex-wrap: wrap;
}

.user-reviews,
.showcase-3d {
  flex: 1;
  min-width: 300px;
}

.user-reviews h3,
.showcase-3d h3 {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #64f3ff;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  padding-bottom: 10px;
}

.review-group,
.showcase-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.review-item,
.showcase-item {
  background: rgba(0, 119, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-item:hover {
  transform: translateY(-3px);
}

.showcase-item {
  cursor: pointer;
}

.showcase-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2);
}

.review-item img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid rgba(100, 243, 255, 0.3);
  flex-shrink: 0;
}

.showcase-item img {
  width: 120px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  border: 2px solid rgba(100, 243, 255, 0.3);
  flex-shrink: 0;
}

.review-content h4,
.showcase-content h4 {
  margin: 0 0 8px 0;
  color: #fff;
  font-size: 1.05rem;
}

.review-content p,
.showcase-content p {
  margin: 0 0 10px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.4;
}

.stars {
  display: flex;
  gap: 3px;
  margin-bottom: 5px;
}

.stars svg {
  fill: gold;
  filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
}

.review-content p:last-child,
.case-meta {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0;
}

/* 常见问题样式 */
.common-questions {
  margin-bottom: 35px;
  padding: 0 20px;
}

.common-questions h3 {
  font-size: 1.5rem;
  margin-bottom: 18px;
  color: #64f3ff;
  border-bottom: 1px solid rgba(100, 243, 255, 0.2);
  padding-bottom: 10px;
}

.faq-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.faq-item {
  background: rgba(0, 119, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border-left: 3px solid #00f0ff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.1);
}

.faq-item.highlight {
  animation: highlight 2s ease;
}

@keyframes highlight {
  0% { background: rgba(0, 119, 255, 0.2); }
  100% { background: rgba(0, 119, 255, 0.1); }
}

.faq-question {
  font-weight: bold;
  margin-bottom: 8px;
  color: #fff;
  font-size: 1.05rem;
}

.faq-answer {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

/* 在线客服与紧急服务样式调整 */
.service-entries {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding: 0 20px;
  flex-wrap: wrap;
  gap: 30px;
}

.online-service {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wechat-icon svg {
  fill: #00f0ff;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.3));
  transition: transform 0.3s ease;
}

.wechat-icon:hover svg {
  transform: scale(1.05) rotate(5deg);
}

.online-service p {
  color: #64f3ff;
  font-weight: 500;
  margin: 0;
  font-size: 1.05rem;
}

/* 弹窗容器：相对于轮播项定位 */
.slide-modals {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100; /* 确保在轮播内容之上，但低于轮播控制器 */
  pointer-events: none; /* 默认不拦截事件 */
}

/* 弹窗样式优化 */
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
  pointer-events: auto; /* 显示时拦截事件 */
  z-index: 101;
}

.modal-content {
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.95), rgba(20, 60, 150, 0.95));
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
  border: 1px solid rgba(100, 243, 255, 0.2);
  animation: slideUp 0.4s ease;
  margin: 20px;
}

.success-modal {
  color: white;
  max-width: 400px;
  text-align: center;
  padding: 30px;
}

.case-modal {
  max-width: 800px;
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

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #64f3ff;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(100, 243, 255, 0.3);
  border-radius: 8px;
  background: rgba(0, 30, 80, 0.5);
  color: #fff;
  font-size: 1rem;
  backdrop-filter: blur(5px);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.form-group textarea {
  resize: vertical;
}

.upload-area {
  border: 2px dashed rgba(100, 243, 255, 0.3);
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  color: rgba(255, 255, 255, 0.7);
}

.upload-area:hover {
  border-color: #00f0ff;
  background: rgba(0, 30, 80, 0.3);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
}

/* FAQ详情样式 */
.faq-detail-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-detail-item h3 {
  color: #64f3ff;
  margin-bottom: 10px;
}

.faq-detail-item p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

/* 案例详情样式 */
.case-detail-content {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.case-detail-content img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  border: 2px solid rgba(100, 243, 255, 0.3);
}

.case-detail-text {
  flex: 1;
  min-width: 300px;
}

.case-detail-text p {
  line-height: 1.6;
  margin-bottom: 20px;
}

.case-detail-meta {
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
}

.case-stats {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  background: rgba(0, 30, 80, 0.5);
  padding: 10px 15px;
  border-radius: 8px;
  border-left: 3px solid #00f0ff;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.stat-value {
  font-weight: bold;
  color: #64f3ff;
}

/* 成功弹窗样式 */
.success-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.success-icon svg {
  fill: #4CAF50;
  filter: drop-shadow(0 0 10px rgba(76, 175, 80, 0.5));
}

.confirm-btn {
  margin-top: 20px;
  width: 100%;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .header h1 {
    font-size: 1.9rem;
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-content {
    max-width: 80%;
  }
}

@media (max-width: 768px) {
  .reviews-showcase {
    flex-direction: column;
  }

  .process-steps {
    flex-direction: column;
    gap: 25px;
  }

  .chart-group {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .faq-list {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 1.6rem;
  }

  .header p {
    font-size: 1rem;
    padding: 10px 15px;
  }
  
  .modal-content {
    max-width: 95%;
    max-height: 90vh;
  }
  
  .case-modal {
    max-width: 95%;
  }
  
  .case-detail-content {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .category-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .user-reviews,
  .showcase-3d {
    min-width: 100%;
  }

  .service-entries {
    flex-direction: column;
    align-items: center;
  }

  .emergency-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .modal-content {
    margin: 10px;
    padding: 10px;
  }
  
  .modal-header {
    padding: 15px;
  }
  
  .modal-body {
    padding: 15px;
  }
}
</style>