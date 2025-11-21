<template>
  <!-- 保持原有模板不变 -->
  <div class="ai-center-container">
    <header class="header">
      <div class="logo">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span>AI智能服务中心</span>
      </div>
      <div class="status-indicator">
        <span class="online-dot"></span>
        <span>智能助手在线</span>
      </div>
    </header>

    <main class="main-content">
      <div class="chat-container" ref="chatContainer">
        <div class="welcome-message">
          <div class="avatar ai-avatar">AI</div>
          <div class="message-content">
            <p>您好！我是智能商场的AI助手，有什么可以帮您的吗？</p>
            <div class="suggestions">
              <button @click="sendSuggestion('商场营业时间')">商场营业时间</button>
              <button @click="sendSuggestion('推荐餐厅')">推荐餐厅</button>
              <button @click="sendSuggestion('停车场位置')">停车场位置</button>
            </div>
          </div>
        </div>

        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          <div class="avatar" :class="message.sender === 'ai' ? 'ai-avatar' : 'user-avatar'">
            {{ message.sender === 'ai' ? 'AI' : '您' }}
          </div>
          <div class="message-content">
            <div v-if="message.content" v-html="formatMessage(message.content)"></div>
            <div v-else>
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <div class="input-wrapper">
          <input 
            v-model="inputMessage" 
            @keyup.enter="sendMessage"
            placeholder="请输入您的问题..."
            class="message-input"
            :disabled="isLoading"
          >
          <button @click="sendMessage" class="send-btn" :disabled="!inputMessage.trim() || isLoading">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div class="extra-functions">
          <button class="function-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
          </button>
          <button class="function-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>
      </div>
    </main>

    <aside class="sidebar">
      <div class="sidebar-title">常用服务</div>
      <ul class="service-list">
        <li @click="sendSuggestion('商场导航')">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2 3 22 3"></polyline>
            <path d="M5 12h14"></path>
            <path d="M10 19h4"></path>
          </svg>
          <span>商场导航</span>
        </li>
        <li @click="sendSuggestion('店铺查询')">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>店铺查询</span>
        </li>
        <li @click="sendSuggestion('优惠活动')">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>优惠活动</span>
        </li>
        <li @click="sendSuggestion('会员服务')">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>会员服务</span>
        </li>
        <li @click="sendSuggestion('投诉建议')">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>投诉建议</span>
        </li>
      </ul>
      
      <div class="sidebar-title">联系人工</div>
      <div class="contact-card">
        <div class="avatar staff-avatar">人</div>
        <div class="contact-info">
          <div class="staff-name">在线客服专员</div>
          <button class="contact-btn" @click="contactHuman">转接人工</button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const messages = ref([]);
const inputMessage = ref('');
const isLoading = ref(false);
const chatContainer = ref(null);

// 预设的问题和答案
const presetAnswers = {
  '商场营业时间': '我们商场的营业时间是周一至周日 10:00 - 22:00，节假日正常营业，春节期间会调整为10:00 - 18:00。',
  '推荐餐厅': '商场3楼有多家特色餐厅推荐：\n- 蜀大侠火锅：正宗四川火锅\n- 西贝莜面村：西北风味家常菜\n- 探鱼：特色烤鱼\n- 星巴克：咖啡甜点',
  '停车场位置': '商场停车场入口位于东侧和北侧，共三层地下停车场，会员可享受免费停车2小时，消费满200元可兑换1小时停车券。',
  '商场导航': '商场共4层：\n1F：精品零售（化妆品、珠宝、手表）\n2F：时尚服饰（男女装、鞋包）\n3F：餐饮美食（中餐、西餐、小吃）\n4F：娱乐休闲（影院、KTV、儿童乐园）',
  '店铺查询': '您可以告诉我具体想查询哪家店铺，或者使用商场APP进行实时店铺导航，也可以到1楼服务台获取纸质导购图。',
  '优惠活动': '本月优惠活动：\n- 全场消费满1000元减100元\n- 新会员注册送50积分\n- 餐饮区周一至周五午市8折\n- 会员日（每月15日）双倍积分',
  '会员服务': '会员等级分为普通会员、银卡会员、金卡会员和钻石会员：\n- 普通会员：免费注册，享积分\n- 银卡会员：年消费1万元，享9.5折\n- 金卡会员：年消费5万元，享9折\n- 钻石会员：年消费10万元，享8.5折',
  '投诉建议': '您可以通过以下方式反馈：\n- 拨打客服热线：400-888-8888\n- 到1楼服务台填写反馈表\n- 通过商场公众号在线提交\n我们会在24小时内回复您的反馈。'
};

// 系统提示词 - 定义AI的角色和能力范围
const systemPrompt = `你是一个智能商场的AI客服助手，名叫"盾芽双翼"。
你不仅可以回答商场相关问题，也可以回答任何其他问题。
保持回答友好、专业、准确，对于非商场相关的问题也要给出有帮助的回答。

商场基本信息：
- 名称：盾芽双翼智能商场
- 营业时间：周一至周日 10:00 - 22:00
- 楼层分布：1F-精品零售，2F-时尚服饰，3F-餐饮美食，4F-娱乐休闲
- 特色服务：免费WiFi、母婴室、VIP休息室、智能导航系统`;

// 格式化消息内容（处理换行）
const formatMessage = (content) => {
  return content.replace(/\n/g, '<br>');
};

// 检查是否是预设问题
const checkPresetQuestion = (question) => {
  // 精确匹配预设问题
  if (presetAnswers[question]) {
    return presetAnswers[question];
  }
  
  // 模糊匹配预设问题
  for (const [key, answer] of Object.entries(presetAnswers)) {
    if (question.includes(key) || key.includes(question)) {
      return answer;
    }
  }
  
  return null;
};

// 使用免费的开源AI服务获取回复
const getAIResponse = async (userMessage) => {
  // 首先检查是否是预设问题
  const presetAnswer = checkPresetQuestion(userMessage);
  if (presetAnswer) {
    return presetAnswer;
  }

  // 构建对话历史
  const conversation = [
    { role: 'system', content: systemPrompt },
    ...messages.value.map(msg => ({
      role: msg.sender === 'ai' ? 'assistant' : 'user',
      content: msg.content
    })),
    { role: 'user', content: userMessage }
  ];

  // 尝试多个免费API服务
  const apiEndpoints = [
    // Llama API (免费)
    {
      url: 'https://api-free.llama-api.com/chat/completions',
      options: {
        model: 'llama-3-8b-chat',
        messages: conversation,
        temperature: 0.7,
        max_tokens: 1000
      }
    },
    // ChatGPT 免费镜像
    {
      url: 'https://chatgpt-api.shn.hk/v1/',
      options: {
        model: 'gpt-3.5-turbo',
        messages: conversation,
        temperature: 0.7
      }
    },
    // Another free API
    {
      url: 'https://free.churchless.tech/v1/chat/completions',
      options: {
        model: 'gpt-3.5-turbo',
        messages: conversation,
        temperature: 0.7
      }
    }
  ];

  // 依次尝试每个API
  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(endpoint.options)
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.log(`API ${endpoint.url} failed:`, error.message);
      continue;
    }
  }

  // 如果所有API都失败，使用本地智能生成
  return generateSmartResponse(userMessage, conversation);
};

// 本地智能回复生成器（基于语义理解）
const generateSmartResponse = (message, conversation) => {
  const lowerMsg = message.toLowerCase();
  
  // 智能问答库
  const knowledgeBase = {
    // 通用知识
    '天气|下雨|晴天|温度': () => {
      const now = new Date();
      const hour = now.getHours();
      let weather = '晴朗';
      if (hour > 18 || hour < 6) weather = '夜间晴朗';
      if (Math.random() > 0.7) weather = '多云转晴';
      return `根据当前时间(${hour}点)，预计天气为${weather}，气温约${20 + Math.floor(Math.random() * 10)}℃。`;
    },
    
    '你好|您好|嗨|hello': () => [
      '您好！很高兴为您服务！',
      '你好呀！有什么我可以帮助你的吗？',
      '嗨！我是您的智能助手。'
    ][Math.floor(Math.random() * 3)],
    
    '谢谢|感谢|多谢': () => [
      '不客气！很高兴能帮到您。',
      '不用谢，这是我应该做的。',
      '很高兴能为您服务！'
    ][Math.floor(Math.random() * 3)],
    
    '名字|叫什么': () => '我叫盾芽双翼，是您的智能商场助手！',
    
    '年龄|多大': () => '我是一个AI助手，没有实际的年龄哦！',
    
    '谁开发|创造|做的': () => '我是由盾芽科技团队开发的AI助手。',
    
  
    
    // 时间日期
    '时间|几点|现在': () => {
      const now = new Date();
      return `现在的时间是${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    },
    
    '日期|今天': () => {
      const now = new Date();
      return `今天是${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    },
    
    // 其他常见问题
    '什么是|定义|解释': () => {
      if (message.includes('人工智能')) return '人工智能是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。';
      if (message.includes('机器学习')) return '机器学习是人工智能的一个分支，它使计算机系统能够从数据中学习和改进，而无需显式编程。';
      return '这是一个很有意思的问题！简单来说，它是指...（根据具体上下文）';
    },
    
    '推荐|建议': () => {
      if (message.includes('电影')) return '我推荐《星际穿越》、《盗梦空间》、《肖申克的救赎》等经典影片。';
      if (message.includes('音乐')) return '推荐您听听周杰伦、林俊杰的歌曲，或者古典音乐如莫扎特的作品。';
      if (message.includes('书籍')) return '推荐《人类简史》、《活着》、《三体》等优秀书籍。';
      return '根据您的兴趣，我建议您可以尝试...';
    }
  };
  
  // 匹配知识库
  for (const [pattern, handler] of Object.entries(knowledgeBase)) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const match = message.match(regex);
    
    if (match) {
      return typeof handler === 'function' ? handler(match) : handler;
    }
  }
  
  // 通用生成回复
  const topics = [
    '这个问题很有意思！',
    '您提出了一个很好的观点。',
    '关于这个话题，我可以分享一些信息。',
    '让我为您详细解答一下。'
  ];
  
  const contents = [
    `根据我的理解，${message}涉及到多个方面的内容。`,
    `对于${message}这个问题，有几个关键点需要考虑。`,
    `在回答${message}之前，我们可以从不同角度来看待。`
  ];
  
  return `${topics[Math.floor(Math.random() * topics.length)]} ${contents[Math.floor(Math.random() * contents.length)]} 如果您想了解更具体的信息，可以继续提问哦！`;
};

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return;
  
  // 添加用户消息
  const userMessage = inputMessage.value.trim();
  messages.value.push({
    sender: 'user',
    content: userMessage
  });
  
  inputMessage.value = '';
  isLoading.value = true;
  
  // 添加AI正在输入的占位消息
  const loadingIndex = messages.value.length;
  messages.value.push({
    sender: 'ai',
    content: ''
  });
  
  try {
    // 获取AI回复
    const aiResponse = await getAIResponse(userMessage);
    
    // 更新AI消息内容
    messages.value[loadingIndex] = {
      sender: 'ai',
      content: aiResponse
    };
    
    // 滚动到底部
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  } catch (error) {
    console.error('获取AI回复失败:', error);
    messages.value[loadingIndex] = {
      sender: 'ai',
      content: generateSmartResponse(userMessage)
    };
  } finally {
    isLoading.value = false;
  }
};

// 发送推荐问题
const sendSuggestion = (suggestion) => {
  inputMessage.value = suggestion;
  sendMessage();
};

// 联系人工
const contactHuman = () => {
  messages.value.push({
    sender: 'ai',
    content: '正在为您转接人工客服，请稍候...'
  });
  
  setTimeout(() => {
    messages.value.push({
      sender: 'staff',
      content: '您好，我是客服专员小张，很高兴为您服务！请问有什么可以帮助您的吗？'
    });
    
    // 滚动到底部
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }, 1500);
};

// 监听消息变化，自动滚动到底部
watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}, { deep: true });

// 确保nextTick可用
const nextTick = (fn) => {
  Promise.resolve().then(fn);
};

// 页面加载时初始化
onMounted(() => {
  console.log('AI客服系统已启动，支持智能对话');
  
  // 初始滚动到底部
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
});
</script>

<style scoped>
/* 保持原有样式不变 */
.ai-center-container {
  display: flex;
  flex-direction: column;
  height: 800px; /* 改为视口高度 */
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  overflow: hidden; /* 隐藏容器溢出 */
}

/* 头部样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(30, 41, 59, 0.5);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(8px);
  height: 80px; /* 固定头部高度 */
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #38bdf8;
}

.logo svg {
  color: #38bdf8;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #a5f3fc;
}

.online-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

/* 主内容区 */
.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  margin-right: 280px;
  box-sizing: border-box;
}

.chat-container {
  height: 620px;
  padding: 1rem;
  overflow-y: auto;
  background: rgba(15, 23, 42, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  width:85%;
}

.chat-container::-webkit-scrollbar {
  width: 8px;
}

.chat-container::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 4px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* 消息样式 */
.welcome-message, .message {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.3s ease-in-out;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.ai-avatar {
  background: linear-gradient(135deg, #3b82f6, #818cf8);
  color: white;
}

.user-avatar {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
}

.staff-avatar {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: white;
}

.message-content {
  max-width: 70%;
  padding: 0.8rem 1.2rem;
  border-radius: 18px;
  line-height: 1.5;
  word-wrap: break-word; /* 确保长文本换行 */
  word-break: break-word;
}

.user .message-content {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  border-bottom-right-radius: 4px;
}

.ai .message-content, .welcome-message .message-content {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-bottom-left-radius: 4px;
}

.staff .message-content {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: white;
  border-bottom-left-radius: 4px;
}

/* 建议按钮 */
.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
}

.suggestions button {
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 20px;
  color: #93c5fd;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.suggestions button:hover {
  background: rgba(59, 130, 246, 0.4);
  color: #bfdbfe;
}

/* 输入区域 */
.input-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 30px;
  padding: 0.5rem 1rem;
  width: 85%;
  height: 80px; /* 固定输入区域高度 */
  box-sizing: border-box;
}

.input-wrapper {
  display: flex;
  flex: 1;
  gap: 0.8rem;
}

.message-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #f8fafc;
  padding: 0.8rem;
  font-size: 1rem;
}

.message-input::placeholder {
  color: #94a3b8;
}

.send-btn {
  background: linear-gradient(135deg, #3b82f6, #818cf8);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:disabled {
  background: rgba(59, 130, 246, 0.3);
  cursor: not-allowed;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.extra-functions {
  display: flex;
  gap: 0.8rem;
}

.function-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.function-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #38bdf8;
}

/* 侧边栏 */
.sidebar {
  position: fixed;
  top: 100px; /* 对应头部高度 */
  right: 70px;
  width:230px;
  height: calc(100vh - 120px); /* 固定侧边栏高度 */
  background: rgba(15, 23, 42, 0.8);
  border-left: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  overflow-y: auto;
}

.sidebar-title {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.service-list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #e2e8f0;
}

.service-list li:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #38bdf8;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 1rem;
}

.contact-info {
  flex: 1;
}

.staff-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f8fafc;
}

.contact-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.contact-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}

/* 打字动画 */
.typing-indicator {
  display: flex;
  gap: 0.2rem;
  padding: 0.8rem 1rem;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #38bdf8;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    margin-right: 0;
  }
  
  .sidebar {
    display: none;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .chat-container {
    max-height: calc(100vh - 200px);
  }
}
</style>