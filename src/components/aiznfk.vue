<template>
  <div class="feedback-platform">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="container">
        <div class="logo-section">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h1 class="logo-text">商场AI智能反馈平台</h1>
        </div>
        <div class="nav-actions">
          <button class="nav-btn" @click="toggleModal('history')">
            <i class="fa fa-history"></i>
            <span>我的反馈</span>
          </button>
          <button class="nav-btn" @click="toggleModal('notifications')">
            <img src="../assets/notice.png" class="notice"></img>
            <span class="notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h2>{{ pageTitle }}</h2>
          <p>请选择反馈类型并详细描述您遇到的问题，我们将尽快处理并回复</p>
        </div>

        <!-- 反馈进度步骤 -->
        <div class="progress-steps">
          <div class="progress-step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">选择商场</div>
          </div>
          <div class="progress-line" :class="{ active: currentStep > 1 }"></div>
          <div class="progress-step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">选择类型</div>
          </div>
          <div class="progress-line" :class="{ active: currentStep > 2 }"></div>
          <div class="progress-step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
            <div class="step-number">3</div>
            <div class="step-label">填写信息</div>
          </div>
          <div class="progress-line" :class="{ active: currentStep > 3 }"></div>
          <div class="progress-step" :class="{ active: currentStep === 4, completed: currentStep > 4 }">
            <div class="step-number">4</div>
            <div class="step-label">提交确认</div>
          </div>
        </div>
        
        <!-- 商场选择区域 -->
        <div class="section" v-if="currentStep === 1">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <svg viewBox="0 0 24 24" class="title-icon">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                选择商场
              </h3>
            </div>
            <div class="card-body">
              <div class="mall-grid">
                <div 
                  class="mall-option" 
                  v-for="mall in malls" 
                  :key="mall.id"
                  :class="{ selected: selectedMall?.id === mall.id }"
                  @click="selectMall(mall)"
                >
                  <div class="mall-icon" :style="{ backgroundColor: mall.colorLight, color: mall.color }">
                    <i class="fa fa-building"></i>
                  </div>
                  <div class="mall-info">
                    <h4 class="mall-name">{{ mall.name }}</h4>
                    <p class="mall-address">{{ mall.address }}</p>
                  </div>
                </div>
              </div>
              
              <div class="action-buttons">
                <button 
                  class="btn btn-primary" 
                  @click="goToNextStep()"
                  :disabled="!selectedMall"
                >
                  <span>下一步：选择反馈类型</span>
                  <i class="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 反馈表单区域 -->
        <div class="form-section" v-if="currentStep >= 2">
          <div class="form-container">
            <!-- 左侧：反馈类型选择 -->
            <div class="type-selection">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">
                    <svg viewBox="0 0 24 24" class="title-icon">
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <line x1="16" y1="8" x2="2" y2="22" />
                      <line x1="17.5" y1="15" x2="9" y2="15" />
                    </svg>
                    选择反馈类型
                  </h3>
                </div>
                <div class="card-body">
                  <div 
                    class="feedback-type-option" 
                    v-for="type in feedbackTypes" 
                    :key="type.id"
                    :class="{ selected: selectedType?.id === type.id }"
                    @click="selectFeedbackType(type)"
                  >
                    <div class="type-icon" :style="{ backgroundColor: type.colorLight, color: type.color }">
                      <i :class="type.icon"></i>
                    </div>
                    <div class="type-info">
                      <h4 class="type-name">{{ type.name }}</h4>
                      <p class="type-desc">{{ type.description }}</p>
                    </div>
                  </div>
                  
                  <!-- 返回上一步按钮 -->
                  <div class="action-buttons" style="margin-top: 20px;">
                    <button 
                      class="btn btn-outline" 
                      @click="goToPrevStep()"
                    >
                      <i class="fa fa-arrow-left"></i>
                      <span>返回上一步</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧：反馈内容填写 -->
            <div class="form-content">
              <div class="card" v-if="selectedType?.id !== 'ai-assistant'">
                <div class="card-header">
                  <h3 class="card-title">
                    <svg viewBox="0 0 24 24" class="title-icon">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    填写反馈内容
                  </h3>
                </div>
                <div class="card-body">
                  <form @submit.prevent="submitFeedback">
                    <div class="form-group">
                      <label class="form-label">反馈标题</label>
                      <input 
                        type="text" 
                        class="form-input" 
                        placeholder="请简要描述您的反馈内容"
                        v-model="feedbackForm.title"
                        required
                      >
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">反馈分类</label>
                      <select class="form-select" v-model="feedbackForm.category" required>
                        <option value="">请选择分类</option>
                        <option value="service">服务态度</option>
                        <option value="facility">设施维护</option>
                        <option value="environment">环境卫生</option>
                        <option value="safety">安全问题</option>
                        <option value="price">价格问题</option>
                        <option value="promotion">促销活动</option>
                        <option value="other">其他问题</option>
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">反馈地点</label>
                      <select class="form-select" v-model="feedbackForm.location" required>
                        <option value="">请选择商场区域</option>
                        <option value="floor1">1楼 - 时尚服饰区</option>
                        <option value="floor2">2楼 - 美妆护肤区</option>
                        <option value="floor3">3楼 - 儿童游乐区</option>
                        <option value="floor4">4楼 - 餐饮美食区</option>
                        <option value="floor5">5楼 - 运动休闲区</option>
                        <option value="parking">地下停车场</option>
                        <option value="entrance">商场入口</option>
                        <option value="other">其他区域</option>
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">详细描述</label>
                      <textarea 
                        rows="5" 
                        class="form-textarea" 
                        placeholder="请详细描述您遇到的问题或提出的建议..."
                        v-model="feedbackForm.description"
                        required
                      ></textarea>
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">上传图片（可选）</label>
                      <div 
                        class="upload-area" 
                        @click="triggerFileInput"
                        @dragover.prevent="handleDragOver"
                        @dragleave.prevent="handleDragLeave"
                        @drop.prevent="handleDrop"
                        :class="{ dragover: isDragover }"
                      >
                        <i class="fa fa-cloud-upload"></i>
                        <p>点击或拖拽图片到此处上传</p>
                        <p class="upload-hint">支持 JPG、PNG 格式，最多 5 张</p>
                        <input 
                          type="file" 
                          ref="fileInput" 
                          class="file-input" 
                          accept="image/*" 
                          multiple
                          @change="handleFileChange"
                        >
                      </div>
                      
                      <div class="image-previews" v-if="previewImages.length">
                        <p class="preview-label">已上传图片：</p>
                        <div class="preview-container">
                          <div class="image-preview" v-for="(image, index) in previewImages" :key="index">
                            <img :src="image" alt="Preview">
                            <div class="preview-remove" @click="removeImage(index)">
                              <i class="fa fa-times"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">联系方式（可选）</label>
                      <input 
                        type="text" 
                        class="form-input" 
                        placeholder="请留下您的手机号或邮箱，以便我们联系您"
                        v-model="feedbackForm.contact"
                      >
                    </div>
                    
                    <div class="form-footer">
                      <div class="checkbox-container">
                        <input type="checkbox" id="anonymous" v-model="feedbackForm.anonymous">
                        <label for="anonymous">匿名提交</label>
                      </div>
                      
                      <div style="display: flex; gap: 10px;">
                        <!-- 返回上一步按钮 -->
                        <button type="button" class="btn btn-outline" @click="goToPrevStep()">
                          <i class="fa fa-arrow-left"></i>
                          返回
                        </button>
                        <button type="submit" class="btn btn-primary">
                          <i class="fa fa-paper-plane"></i>
                          提交反馈
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              <!-- AI智能助手区域 -->
              <div class="card ai-chat" v-if="selectedType?.id === 'ai-assistant'">
                <div class="card-header">
                  <h3 class="card-title">
                    <svg viewBox="0 0 24 24" class="title-icon">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    AI智能助手
                  </h3>
                </div>
                <div class="chat-messages">
                  <div class="message ai-message" v-for="(msg, index) in chatMessages" :key="index">
                    <div class="message-avatar ai-avatar">
                      <i class="fa fa-robot"></i>
                    </div>
                    <div class="message-content" v-html="msg.content"></div>
                  </div>
                </div>
                <div class="chat-input">
                  <input 
                    type="text" 
                    v-model="aiInput" 
                    placeholder="请输入您的问题..."
                    @keyup.enter="sendAiMessage"
                  >
                  <button class="btn btn-primary" @click="sendAiMessage">
                    <i class="fa fa-paper-plane"></i>
                  </button>
                </div>
                <!-- AI区域的返回按钮 -->
                <div style="padding: 16px; border-top: 1px solid #f1f5f9;">
                  <button class="btn btn-outline" @click="goToPrevStep()">
                    <i class="fa fa-arrow-left"></i>
                    返回选择类型
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 我的反馈历史弹窗 -->
    <div class="modal" v-if="showModal === 'history'" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>我的反馈历史</h3>
          <button class="modal-close" @click="closeModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- 筛选标签 -->
          <div class="filter-tags">
            <button 
              class="filter-tag" 
              :class="{ active: activeFilter === 'all' }"
              @click="setFilter('all')"
            >
              全部
            </button>
            <button 
              class="filter-tag" 
              :class="{ active: activeFilter === 'pending' }"
              @click="setFilter('pending')"
            >
              待处理
            </button>
            <button 
              class="filter-tag" 
              :class="{ active: activeFilter === 'processing' }"
              @click="setFilter('processing')"
            >
              处理中
            </button>
            <button 
              class="filter-tag" 
              :class="{ active: activeFilter === 'completed' }"
              @click="setFilter('completed')"
            >
              已完成
            </button>
            <button 
              class="filter-tag" 
              :class="{ active: activeFilter === 'rejected' }"
              @click="setFilter('rejected')"
            >
              已驳回
            </button>
          </div>
          
          <!-- 反馈列表 -->
          <div class="feedback-list">
            <div 
              class="feedback-item" 
              v-for="item in filteredFeedbackHistory" 
              :key="item.id"
            >
              <div class="feedback-header">
                <div class="feedback-tags">
                  <span class="tag" :style="{ backgroundColor: getTagColor(item.type).light, color: getTagColor(item.type).normal }">
                    {{ getTypeName(item.type) }}
                  </span>
                  <span class="tag" :style="{ backgroundColor: getStatusColor(item.status).light, color: getStatusColor(item.status).normal }">
                    {{ getStatusName(item.status) }}
                  </span>
                </div>
                <div class="feedback-date">
                  {{ item.date }}
                </div>
              </div>
              <h4 class="feedback-title">{{ item.title }}</h4>
              <p class="feedback-desc">{{ item.description }}</p>
              <button class="view-details">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知弹窗 -->
    <div class="modal" v-if="showModal === 'notifications'" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>通知中心</h3>
          <button class="modal-close" @click="closeModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body notifications-list">
          <div class="notification-item" v-for="(notification, index) in notifications" :key="index">
            <div class="notification-icon" :style="{ backgroundColor: notification.color }"></div>
            <div class="notification-content">
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
              <span class="notification-time">{{ notification.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交成功弹窗 -->
    <div class="modal" v-if="showModal === 'success'" @click="closeModal">
      <div class="modal-content success-modal" @click.stop>
        <div class="success-icon">
          <i class="fa fa-check"></i>
        </div>
        <h3>反馈提交成功</h3>
        <p>感谢您的反馈，我们将尽快处理并回复您。</p>
        <p class="feedback-id">反馈编号：<span>{{ feedbackId }}</span></p>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="viewFeedback">查看反馈</button>
          <button class="btn btn-primary" @click="closeModal">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 引入Font Awesome图标库
// 确保在HTML中引入：<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

// 状态管理
const currentStep = ref(1);
const selectedMall = ref(null);
const selectedType = ref(null);
const showModal = ref(null);
const activeFilter = ref('all');
const isDragover = ref(false);
const previewImages = ref([]);
const aiInput = ref('');
const feedbackId = ref('');

// 页面标题计算属性
const pageTitle = computed(() => {
  return selectedMall.value ? `向 ${selectedMall.value.name} 提交反馈` : '提交反馈';
});

// 商场数据
const malls = ref([
  { id: 'central', name: '中央商场', address: '市中心人民路128号', color: '#3b82f6', colorLight: '#eff6ff' },
  { id: 'east', name: '东方广场', address: '东区建设路56号', color: '#10b981', colorLight: '#ecfdf5' },
  { id: 'west', name: '西区购物中心', address: '西区和平路89号', color: '#8b5cf6', colorLight: '#f5f3ff' },
  { id: 'north', name: '北区商业中心', address: '北区新区大道158号', color: '#f59e0b', colorLight: '#fffbeb' },
  { id: 'south', name: '南区广场', address: '南区南湖路236号', color: '#ef4444', colorLight: '#fef2f2' }
]);

// 反馈类型数据
const feedbackTypes = ref([
  { id: 'complaint', name: '投诉', description: '对商场服务、设施等不满', icon: 'fa fa-exclamation-circle', color: '#ef4444', colorLight: '#fef2f2' },
  { id: 'suggestion', name: '建议', description: '对商场改进的意见和建议', icon: 'fa fa-lightbulb-o', color: '#3b82f6', colorLight: '#eff6ff' },
  { id: 'praise', name: '表扬', description: '对商场服务、设施等表扬', icon: 'fa fa-thumbs-up', color: '#10b981', colorLight: '#ecfdf5' },
  { id: 'report', name: '举报', description: '举报商场内违规行为', icon: 'fa fa-flag', color: '#f59e0b', colorLight: '#fffbeb' },
  { id: 'ai-assistant', name: 'AI智能助手', description: '智能解答常见问题', icon: 'fa fa-robot', color: '#8b5cf6', colorLight: '#f5f3ff' }
]);

// 反馈表单数据
const feedbackForm = ref({
  title: '',
  category: '',
  location: '',
  description: '',
  contact: '',
  anonymous: false
});

// 聊天消息数据
const chatMessages = ref([
  { role: 'ai', content: '您好！我是商场AI智能助手，有什么可以帮您解决的问题吗？<br><small>常见问题：营业时间、停车场位置、优惠活动</small>' }
]);

// FAQ回答数据
const faqAnswers = ref({
  '营业时间': '商场的营业时间为：<br>周一至周四：10:00 - 22:00<br>周五至周日：10:00 - 22:30<br>节假日可能会有调整，请关注商场公告。',
  '停车场': '商场地下停车场位于B1-B3层，凭当日消费小票可免费停车2小时，超过2小时后每小时收费5元。',
  '优惠活动': '目前商场正在进行冬季促销活动，全场商品低至5折，部分品牌还有额外满减优惠。详情可查看商场一楼服务台的活动海报。',
  '客服中心': '商场客服中心位于2楼中庭位置，提供咨询、投诉、失物招领等服务，服务电话：400-123-4567。',
  '卫生间': '商场各楼层均设有卫生间，具体位置可查看商场内的指示牌或使用商场APP查询。',
  '母婴室': '母婴室位于3楼儿童区附近，提供 diaper 更换台、哺乳室等设施，为带宝宝的顾客提供便利。',
  'WiFi': '商场提供免费WiFi服务，连接 "Mall-Free-WiFi" 无需密码即可使用。',
  '退税': '商场支持境外游客退税服务，在指定店铺消费满500元可在1楼服务台办理退税手续，请携带护照等有效证件。'
});

// 反馈历史数据
const feedbackHistory = ref([
  {
    id: 1,
    type: 'complaint',
    status: 'processing',
    title: '卫生间设施损坏',
    description: '4楼男卫生间多个水龙头损坏，无法正常使用',
    date: '2025-11-17'
  },
  {
    id: 2,
    type: 'suggestion',
    status: 'completed',
    title: '增加休息座椅',
    description: '建议在3楼儿童区附近增加更多休息座椅，方便家长等候',
    date: '2025-11-15'
  },
  {
    id: 3,
    type: 'praise',
    status: 'completed',
    title: '服务态度良好',
    description: '表扬2楼客服中心的工作人员，服务态度热情周到',
    date: '2025-11-10'
  }
]);

// 通知数据
const notifications = ref([
  {
    title: '反馈处理进度更新',
    message: '您提交的"卫生间设施损坏"反馈已进入处理阶段，预计24小时内修复。',
    time: '10分钟前',
    color: '#3b82f6'
  },
  {
    title: '反馈已完成',
    message: '您提交的"增加休息座椅"建议已完成，感谢您的宝贵意见！',
    time: '2小时前',
    color: '#10b981'
  },
  {
    title: '商场活动通知',
    message: '本周末将举办冬季促销活动，全场商品低至5折，欢迎参加！',
    time: '昨天',
    color: '#f59e0b'
  }
]);

// 计算属性：筛选后的反馈历史
const filteredFeedbackHistory = computed(() => {
  if (activeFilter.value === 'all') return feedbackHistory.value;
  return feedbackHistory.value.filter(item => item.status === activeFilter.value);
});

// 方法：选择商场
const selectMall = (mall) => {
  selectedMall.value = mall;
};

// 方法：进入下一步
const goToNextStep = () => {
  if (selectedMall.value) {
    currentStep.value = 2;
  }
};

// 方法：返回上一步
const goToPrevStep = () => {
  if (currentStep.value > 1) {
    if (currentStep.value === 3) {
      selectedType.value = null; // 清除选择的类型
    }
    currentStep.value -= 1;
  }
};

// 方法：选择反馈类型
const selectFeedbackType = (type) => {
  selectedType.value = type;
  if (type.id !== 'ai-assistant') {
    currentStep.value = 3;
  }
};

// 方法：提交反馈
const submitFeedback = () => {
  currentStep.value = 4;
  
  // 生成反馈ID
  feedbackId.value = `FB${new Date().getTime().toString().slice(-8)}`;
  
  // 模拟API提交
  setTimeout(() => {
    showModal.value = 'success';
    
    // 重置表单
    feedbackForm.value = {
      title: '',
      category: '',
      location: '',
      description: '',
      contact: '',
      anonymous: false
    };
    previewImages.value = [];
  }, 800);
};

// 方法：触发文件选择
const triggerFileInput = () => {
  const fileInput = document.querySelector('.file-input');
  if (fileInput) {
    fileInput.click();
  }
};

// 方法：处理文件上传
const handleFileChange = (e) => {
  const files = e.target.files;
  handleFiles(files);
};

// 方法：处理拖拽事件
const handleDragOver = () => {
  isDragover.value = true;
};

const handleDragLeave = () => {
  isDragover.value = false;
};

const handleDrop = (e) => {
  isDragover.value = false;
  const files = e.dataTransfer.files;
  handleFiles(files);
};

// 方法：处理文件
const handleFiles = (files) => {
  if (files.length > 0) {
    Array.from(files).forEach(file => {
      if (!file.type.match('image.*')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
};

// 方法：移除图片
const removeImage = (index) => {
  previewImages.value.splice(index, 1);
};

// 方法：发送AI消息
const sendAiMessage = () => {
  const message = aiInput.value.trim();
  if (!message) return;
  
  // 添加用户消息
  chatMessages.value.push({ role: 'user', content: message });
  
  // 清空输入框
  aiInput.value = '';
  
  // 查找回答
  let answer = '很抱歉，我暂时无法回答这个问题。请尝试更换关键词或联系客服中心获取帮助。';
  
  for (const keyword in faqAnswers.value) {
    if (message.includes(keyword)) {
      answer = faqAnswers.value[keyword];
      break;
    }
  }
  
  // 模拟AI响应延迟
  setTimeout(() => {
    chatMessages.value.push({ role: 'ai', content: answer });
    
    // 滚动到底部
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }, 800);
};

// 方法：打开弹窗
const toggleModal = (modalType) => {
  showModal.value = modalType;
};

// 方法：关闭弹窗
const closeModal = () => {
  // 如果是成功弹窗，重置到第一步
  if (showModal.value === 'success') {
    currentStep.value = 1;       // 回到第一步
    selectedMall.value = null;   // 清空选中的商场
    selectedType.value = null;   // 清空选中的类型
    feedbackForm.value = {       // 重置表单
      title: '',
      category: '',
      location: '',
      description: '',
      contact: '',
      anonymous: false
    };
    previewImages.value = [];    // 清空图片
  }
  
  showModal.value = null;
};

// 方法：设置筛选条件
const setFilter = (filter) => {
  activeFilter.value = filter;
};

// 方法：查看反馈
const viewFeedback = () => {
  closeModal();
  toggleModal('history');
};

// 方法：获取标签颜色
const getTagColor = (type) => {
  const typeObj = feedbackTypes.value.find(t => t.id === type);
  return typeObj ? { normal: typeObj.color, light: typeObj.colorLight } : { normal: '#64748b', light: '#f1f5f9' };
};

// 方法：获取类型名称
const getTypeName = (type) => {
  const typeObj = feedbackTypes.value.find(t => t.id === type);
  return typeObj ? typeObj.name : '未知类型';
};

// 方法：获取状态颜色
const getStatusColor = (status) => {
  const colors = {
    pending: { normal: '#64748b', light: '#f1f5f9' },
    processing: { normal: '#f59e0b', light: '#fffbeb' },
    completed: { normal: '#10b981', light: '#ecfdf5' },
    rejected: { normal: '#ef4444', light: '#fef2f2' }
  };
  return colors[status] || colors.pending;
};

// 方法：获取状态名称
const getStatusName = (status) => {
  const names = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    rejected: '已驳回'
  };
  return names[status] || '未知状态';
};

// 组件挂载后执行
onMounted(() => {
  // 初始化聊天容器滚动
  setTimeout(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, 100);
});
</script>

<style scoped>
/* 全局样式 */


.feedback-platform {

  background-image: url('../assets/beijing.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
overflow-y: auto;
height: 100%;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #334155;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部样式 */
.header {
  height:50px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0px;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
}

.logo-section {
  position: absolute;
  left:5%;
  top: 1%;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
    position: relative;
  top: 14px;
  width: 32px;
  height: 32px;
  color: #3b82f6;
}

.logo-text {
  position: relative;
  top: 14px;
  font-size: 23px;
  font-weight: 600;
  color: black;
  letter-spacing: 1.5px;
  margin: 0;
  
}

.nav-actions {

  position: absolute;
  right: 3%;
  display: flex;
  gap: 20px;
    top: 13px;

}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #64748b;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-btn:hover {
  color: #3b82f6;
  background-color: #eff6ff;
}

.notification-badge {
  position: relative;
  top: -8px;
  right: -4px;
  background-color: #ef4444;
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主要内容样式 - 修改部分 */
.main-content {
  padding: 30px 0;
margin-top: 39px;
}
.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.page-header p {
  color: #64748b;
  margin: 0;
}

/* 进度步骤样式 */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  max-width: 800px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e2e8f0;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.step-label {
  font-size: 14px;
  color: #94a3b8;
  transition: all 0.3s;
}

.progress-step.active .step-number {
  background-color: #3b82f6;
  color: white;
}

.progress-step.active .step-label {
  color: #3b82f6;
  font-weight: 500;
}

.progress-step.completed .step-number {
  background-color: #10b981;
  color: white;
}

.progress-step.completed .step-label {
  color: #10b981;
}

.progress-line {
  flex: 1;
  height: 2px;
  background-color: #e2e8f0;
  margin: 0 10px;
  transition: all 0.3s;
}

.progress-line.active {
  background-color: #3b82f6;
}

/* 卡片样式 */
.card {
  background-color: white;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
}

.title-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: #3b82f6;
}

.card-body {
  padding: 20px;
}

/* 商场选择样式 */
.mall-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}

.mall-option {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.mall-option:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.mall-option.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.mall-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.mall-info {
  flex: 1;
}

.mall-name {
  font-weight: 600;
  margin: 0 0 4px 0;
}

.mall-address {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

/* 按钮样式 */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-primary:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.btn-outline {
  background-color: white;
  color: #64748b;

  border: 1px solid #e2e8f0;
}

.btn-outline:hover {
  background-color: #f8fafc;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}

/* 表单区域样式 */
.form-section {
  display: block;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

/* 反馈类型选择样式 */
.feedback-type-option {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 10px;
}

.feedback-type-option:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.feedback-type-option.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.type-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-info {
  flex: 1;
}

.type-name {
  font-weight: 600;
  margin: 0 0 4px 0;
}

.type-desc {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

/* 表单样式 */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #334155;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.form-textarea {
  resize: vertical;
}

/* 文件上传样式 */
.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  border-color: #93c5fd;
  background-color: #f8fafc;
}

.upload-area.dragover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.upload-area i {
  font-size: 40px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.upload-area p {
  color: #64748b;
  margin: 0 0 8px 0;
}

.upload-hint {
  font-size: 12px;
  color: #94a3b8;
}

.file-input {
  display: none;
}

.image-previews {
  margin-top: 16px;
}

.preview-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-preview {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-remove {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

/* 表单页脚样式 */
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-container input {
  width: auto;
}

/* AI聊天样式 */
.ai-chat {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
}

.ai-message {
  align-self: flex-start;
}

.user-message {
  align-self: flex-end;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-avatar {
  background-color: #f5f3ff;
  color: #8b5cf6;
}

.user-avatar {
  background-color: #e2e8f0;
  color: #64748b;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
}

.ai-message .message-content {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px 16px 16px 4px;
}

.user-message .message-content {
  background-color: #3b82f6;
  color: white;
  border-radius: 16px 16px 4px 16px;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 16px;
  border-top: 1px solid #f1f5f9;
}

.chat-input input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
}

.chat-input input:focus {
  outline: none;
  border-color: #3b82f6;
}

/* 弹窗样式 */
.modal {
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
  padding: 20px;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 16px;
}

.modal-close:hover {
  color: #64748b;
}

.modal-body {
  padding: 20px;
}

/* 反馈历史样式 */
.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.filter-tag {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  background-color: #f1f5f9;
  color: #64748b;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tag:hover {
  background-color: #e2e8f0;
}

.filter-tag.active {
  background-color: #3b82f6;
  color: white;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feedback-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;
}

.feedback-item:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.feedback-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.feedback-date {
  font-size: 12px;
  color: #94a3b8;
}

.feedback-title {
  font-weight: 600;
  margin: 0 0 8px 0;
}

.feedback-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 12px 0;
}

.view-details {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
}

.view-details:hover {
  text-decoration: underline;
}

/* 通知列表样式 */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-item {
  border-left: 4px solid;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 0 8px 8px 0;
}

.notification-icon {
  width: 4px;
  height: 40px;
  border-radius: 2px;
}

.notification-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.notification-content p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #64748b;
}

.notification-time {
  font-size: 12px;
  color: #94a3b8;
}

/* 成功弹窗样式 */
.success-modal {
  max-width: 500px;
  text-align: center;
  padding: 30px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 20px;
}

.success-modal h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.success-modal p {
  color: #64748b;
  margin: 0 0 8px 0;
}

.feedback-id {
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
  
  .progress-steps {
    overflow-x: auto;
    padding-bottom: 10px;
    justify-content: flex-start;
    gap: 20px;
  }
  
  .progress-step {
    min-width: 80px;
  }
  
  .progress-line {
    margin: 0 5px;
  }
  
  .mall-grid {
    grid-template-columns: 1fr;
  }
  
  .logo-text {
    font-size: 16px;
  }
  
  .nav-btn span {
    display: none;
  }
}

.notice{
  position: relative;
  width: 27px;
  left: 5px;
  top: -2px;
  height: 27px;
}
</style>