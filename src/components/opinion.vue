<template>
  <div class="feedback-board">
    <!-- 页面标题区 -->
    <div class="board-header">
      <h1>意见公示台</h1>
      <p>查看其他消费者的建议和意见，共同参与商场服务的改进</p>
      
      <!-- 快捷统计 -->
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number">{{ totalCount }}</span>
          <span class="stat-label">累计意见</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ resolvedRate }}%</span>
          <span class="stat-label">解决率</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ avgResponse }}h</span>
          <span class="stat-label">平均响应</span>
        </div>
      </div>
    </div>
    
    <!-- 功能区 -->
    <div class="action-bar">
      <div class="filters">
        <select v-model="activeType" class="filter-select">
          <option value="all">全部类型</option>
          <option value="suggestion">建议</option>
          <option value="praise">表扬</option>
          <option value="complaint">投诉</option>
        </select>
        
        <select v-model="activeStatus" class="filter-select">
          <option value="all">全部状态</option>
          <option value="pending">待处理</option>
          <option value="processing">处理中</option>
          <option value="resolved">已解决</option>
        </select>
      </div>
      
      <button class="post-btn" @click="showPostModal = true">
        <span class="icon-add">+</span> 发表意见
      </button>
    </div>
    
    <!-- 意见列表 -->
    <div class="feedback-list">
      <div 
        class="feedback-item" 
        v-for="(item, index) in filteredFeedbacks" 
        :key="index"
      >
        <div class="feedback-header">
          <div class="user-info">
            <div class="avatar" :style="{ backgroundColor: getAvatarColor(item.author) }">
              {{ item.author.charAt(0) }}
            </div>
            <div>
              <span class="username">{{ item.author }}</span>
              <span class="date">{{ item.date }}</span>
            </div>
          </div>
          <span class="type-tag" :class="`type-${item.type}`">{{ typeMap[item.type] }}</span>
        </div>
        
        <div class="feedback-content">
          <h3 class="feedback-title">{{ item.title }}</h3>
          <p class="feedback-text">{{ item.content }}</p>
          
          <div class="feedback-meta">
            <div class="actions">
              <button class="action-btn" @click="toggleLike(index)">
                <span class="icon-heart" :class="{ active: item.liked }"></span>
                <span class="action-count">{{ item.likes }}</span>
              </button>
              <button class="action-btn" @click="item.showComments = !item.showComments">
                <span class="icon-comment"></span>
                <span class="action-count">{{ item.comments.length }}</span>
              </button>
            </div>
            
            <div class="status">
              <span class="status-tag" :class="`status-${item.status}`">{{ statusMap[item.status] }}</span>
              <span v-if="item.handler" class="handler">· {{ item.handler }}</span>
            </div>
          </div>
          
          <!-- 评论区 -->
          <div class="comments" v-if="item.showComments">
            <div class="comment-item" v-for="(comment, cIndex) in item.comments" :key="cIndex">
              <div class="comment-avatar" :style="{ backgroundColor: getAvatarColor(comment.author) }">
                {{ comment.author.charAt(0) }}
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-time">{{ comment.date }}</span>
                  <span v-if="comment.isOfficial" class="official-tag">官方</span>
                </div>
                <p>{{ comment.content }}</p>
              </div>
            </div>
            
            <div class="add-comment">
              <textarea 
                v-model="item.newComment" 
                placeholder="发表你的看法..."
                rows="2"
              ></textarea>
              <button @click="addComment(index)" class="comment-submit">回复</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 加载更多 -->
    <button class="load-more" @click="loadMore" v-if="hasMore">
      查看更多意见
    </button>
    
    <!-- 发表意见弹窗 -->
    <div class="modal-overlay" v-if="showPostModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>发表意见</h3>
          <button class="close-btn" @click="showPostModal = false">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>类型</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" name="type" value="suggestion" v-model="newFeedback.type"> 建议
              </label>
              <label class="radio-label">
                <input type="radio" name="type" value="praise" v-model="newFeedback.type"> 表扬
              </label>
              <label class="radio-label">
                <input type="radio" name="type" value="complaint" v-model="newFeedback.type"> 投诉
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>标题</label>
            <input 
              type="text" 
              v-model="newFeedback.title" 
              placeholder="请输入标题"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label>内容</label>
            <textarea 
              v-model="newFeedback.content" 
              placeholder="请详细描述..."
              rows="4"
              class="form-textarea"
            ></textarea>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn-cancel" @click="showPostModal = false">取消</button>
          <button 
            @click="submitFeedback" 
            :disabled="!newFeedback.title || !newFeedback.content"
            class="btn-submit"
          >
            提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 状态与类型映射
const typeMap = { suggestion: '建议', praise: '表扬', complaint: '投诉' };
const statusMap = { pending: '待处理', processing: '处理中', resolved: '已解决' };

// 筛选条件
const activeType = ref('all');
const activeStatus = ref('all');

// 模态框状态
const showPostModal = ref(false);

// 模拟数据
const feedbacks = ref([
  {
    author: '张先生',
    date: '2023-07-15',
    title: '关于增加休息座椅的建议',
    content: '建议在商场各楼层增加更多休息座椅，特别是在餐饮区附近，方便顾客用餐后休息。目前的座椅数量不足，经常需要排队等待。',
    type: 'suggestion',
    status: 'resolved',
    handler: '商场管理部',
    likes: 42,
    liked: false,
    showComments: false,
    newComment: '',
    comments: [
      { author: '李女士', date: '2023-07-16', content: '非常同意这个建议，经常看到老人家站着休息，很不方便。', isOfficial: false },
      { author: '商场管理部', date: '2023-07-17', content: '感谢您的建议，我们已计划在本月底前在各楼层新增休息座椅，敬请期待。', isOfficial: true }
    ]
  },
  {
    author: '李女士',
    date: '2023-07-10',
    title: '表扬客服中心的优质服务',
    content: '昨天在客服中心咨询时，工作人员非常耐心地解答了我的问题，并帮助我找到了想要的店铺。服务态度非常好，值得表扬！',
    type: 'praise',
    status: 'resolved',
    handler: '客服管理部',
    likes: 56,
    liked: false,
    showComments: false,
    newComment: '',
    comments: [
      { author: '客服管理部', date: '2023-07-11', content: '感谢您的认可，我们会继续努力提升服务质量！', isOfficial: true }
    ]
  },
  {
    author: '王先生',
    date: '2023-07-05',
    title: '关于停车场收费问题的投诉',
    content: '昨天在停车场停车时，发现收费系统存在问题，多收了我的停车费。虽然工作人员已经处理，但希望能尽快修复系统。',
    type: 'complaint',
    status: 'resolved',
    handler: '停车场管理部',
    likes: 18,
    liked: false,
    showComments: false,
    newComment: '',
    comments: [
      { author: '停车场管理部', date: '2023-07-06', content: '抱歉给您带来不便，系统已修复，感谢您的反馈！', isOfficial: true }
    ]
  }
]);

// 统计数据
const totalCount = ref(126);
const resolvedRate = ref(89);
const avgResponse = ref(5.2);
const hasMore = ref(true);

// 新意见表单数据
const newFeedback = ref({
  type: 'suggestion',
  title: '',
  content: ''
});

// 筛选后的列表
const filteredFeedbacks = computed(() => {
  return feedbacks.value.filter(item => {
    const typeMatch = activeType.value === 'all' || item.type === activeType.value;
    const statusMatch = activeStatus.value === 'all' || item.status === activeStatus.value;
    return typeMatch && statusMatch;
  });
});

// 生成头像颜色
const getAvatarColor = (name) => {
  const colors = ['#42b983', '#3498db', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// 切换点赞
const toggleLike = (index) => {
  const item = feedbacks.value[index];
  item.liked ? item.likes-- : item.likes++;
  item.liked = !item.liked;
};

// 添加评论
const addComment = (index) => {
  const item = feedbacks.value[index];
  if (item.newComment.trim()) {
    item.comments.push({
      author: '访客',
      date: new Date().toISOString().split('T')[0],
      content: item.newComment.trim(),
      isOfficial: false
    });
    item.newComment = '';
  }
};

// 加载更多
const loadMore = () => {
  // 模拟加载更多数据
  feedbacks.value.push(
    {
      author: '赵女士',
      date: '2023-06-30',
      title: '建议增加母婴室设施',
      content: '商场的母婴室数量太少，建议增加并配备更完善的设施。带宝宝出门很不方便，希望能重视这个问题。',
      type: 'suggestion',
      status: 'processing',
      handler: '商场管理部',
      likes: 34,
      liked: false,
      showComments: false,
      newComment: '',
      comments: [
        { author: '商场管理部', date: '2023-07-01', content: '您好，我们正在规划新增母婴室，预计8月份完成。', isOfficial: true }
      ]
    }
  );
  
  // 控制加载更多按钮显示
  if (feedbacks.value.length > 6) hasMore.value = false;
};

// 提交新意见
const submitFeedback = () => {
  feedbacks.value.unshift({
    author: '访客',
    date: new Date().toISOString().split('T')[0],
    title: newFeedback.value.title,
    content: newFeedback.value.content,
    type: newFeedback.value.type,
    status: 'pending',
    handler: '',
    likes: 0,
    liked: false,
    showComments: false,
    newComment: '',
    comments: []
  });
  
  totalCount.value++;
  newFeedback.value = { type: 'suggestion', title: '', content: '' };
  showPostModal.value = false;
};
</script>

<style scoped>
.feedback-board {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.board-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.board-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 600;
}

.board-header p {
  color: #7f8c8d;
  margin-bottom: 20px;
  font-size: 16px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  min-width: 120px;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 5px;
}

.stat-label {
  color: #7f8c8d;
  font-size: 14px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.filters {
  display: flex;
  gap: 15px;
}

.filter-select {
  padding: 8px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #3498db;
}

.post-btn {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.icon-add {
  background: rgba(255,255,255,0.2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feedback-item {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feedback-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.username {
  font-weight: 500;
  color: #2c3e50;
  font-size: 15px;
}

.date {
  color: #bdc3c7;
  font-size: 13px;
  margin-left: 8px;
}

.type-tag {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.type-suggestion {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.type-praise {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.type-complaint {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.feedback-title {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
}

.feedback-text {
  color: #34495e;
  line-height: 1.6;
  margin: 0 0 18px 0;
  font-size: 15px;
}

.feedback-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f1f1f1;
}

.actions {
  display: flex;
  gap: 20px;
}

.action-btn {
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: color 0.2s;
  padding: 5px 0;
}

.action-btn:hover {
  color: #3498db;
}

.icon-heart::before {
  content: '♥';
  font-size: 16px;
  color: #bdc3c7;
  transition: color 0.2s;
}

.icon-heart.active::before {
  color: #e74c3c;
}

.icon-comment::before {
  content: '💬';
  font-size: 16px;
  color: #bdc3c7;
}

.action-count {
  font-size: 14px;
}

.status {
  display: flex;
  align-items: center;
}

.status-tag {
  font-size: 13px;
  font-weight: 500;
}

.status-pending {
  color: #f39c12;
}

.status-processing {
  color: #3498db;
}

.status-resolved {
  color: #2ecc71;
}

.handler {
  color: #95a5a6;
  font-size: 13px;
  margin-left: 8px;
}

.comments {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #e0e0e0;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f9f9f9;
}

.comment-item:last-child {
  margin-bottom: 20px;
  padding-bottom: 0;
  border-bottom: none;
}

.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  font-weight: bold;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.comment-author {
  font-weight: 500;
  font-size: 14px;
  color: #2c3e50;
}

.comment-time {
  color: #bdc3c7;
  font-size: 12px;
}

.official-tag {
  background: #3498db;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.comment-item p {
  margin: 0;
  font-size: 14px;
  color: #34495e;
  line-height: 1.5;
}

.add-comment {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.add-comment textarea {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 10px 12px;
  resize: none;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.add-comment textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.comment-submit {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.comment-submit:hover {
  background: #2980b9;
}

.load-more {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #3498db;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.2s;
}

.load-more:hover {
  background-color: #f8f9fa;
  border-color: #3498db;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 550px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #95a5a6;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f1f1f1;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
  font-size: 14px;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #34495e;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #f1f1f1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancel {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  border: 1px solid #e0e0e0;
  color: #34495e;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background-color: #f8f9fa;
}

.btn-submit {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  background: #3498db;
  color: white;
  border: none;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #2980b9;
}

.btn-submit:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats {
    gap: 20px;
  }
  
  .action-bar {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .filters {
    width: 100%;
    justify-content: center;
  }
  
  .post-btn {
    width: 100%;
    justify-content: center;
  }
  
  .feedback-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}</style>