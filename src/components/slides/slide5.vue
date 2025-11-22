<template>
  <div class="membership-page">
    <!-- 头部标题区域 -->
    <div class="header">
      <h1>会员专享权益，开启智能购物新体验</h1>
      <p>成为会员，享受个性化服务与专属优惠</p>
    </div>

    <!-- 会员等级概览 -->
    <div class="membership-overview">
      <h3>会员等级</h3>
      <div class="level-grid">
        <div class="level-item" :class="{ active: currentMembership === 'regular' }">
          <div class="level-icon">📱</div>
          <h4>普通用户</h4>
          <p>免费使用，基础权益</p>
        </div>
        <div class="level-item" :class="{ active: currentMembership === 'silver' }">
          <div class="level-icon">💎</div>
          <h4>白银会员</h4>
          <p>¥49.9/月，进阶权益</p>
        </div>
        <div class="level-item featured" :class="{ active: currentMembership === 'gold' }">
          <div class="level-icon">✨</div>
          <h4>黄金会员</h4>
          <p>¥99.9/月，热门选择</p>
        </div>
        <div class="level-item" :class="{ active: currentMembership === 'diamond' }">
          <div class="level-icon">👑</div>
          <h4>钻石会员</h4>
          <p>¥199.9/月，尊享权益</p>
        </div>
      </div>
    </div>

    <!-- 新增：AI智能洞察与竞争对手分析容器 -->
    <div class="intelligence-container">
      <div class="ai-intelligence">
        <div class="section-header">
          <h2>AI智能洞察</h2>
          <div class="badges">
            <span class="badge gold-badge">黄金及以上</span>
            <span class="badge ai-badge">AI驱动</span>
          </div>
        </div>

        <!-- 客流量高峰预测 -->
        <div class="insight-card traffic-card">
          <div class="card-header">
            <span class="card-icon">🔍</span>
            <h3>客流量高峰预测</h3>
            <span class="tag suggestion-tag">运营建议</span>
          </div>
          <div class="card-content">
            <p>预计本周五18:00-20:00将出现客流量高峰，建议增加2名服务人员。</p>
            <p class="premium-info" v-if="['gold', 'diamond'].includes(currentMembership)">💎 钻石会员可查看详细的客流量预测模型和人员排班建议
            </p>
            <p class="upgrade-prompt" v-else>升级至<span class="highlight">黄金会员</span>即可查看完整洞察</p>
          </div>
        </div>

        <!-- 服务优化建议 -->
        <div class="insight-card service-card">
          <div class="card-header">
            <span class="card-icon">📈</span>
            <h3>服务优化建议</h3>
            <span class="tag flow-tag">流程优化</span>
          </div>
          <div class="card-content">
            <p>用户对"等待时间过长"的反馈增加了15%，建议优化服务流程或增加自助服务设备。</p>
            <p class="premium-info" v-if="['gold', 'diamond'].includes(currentMembership)">💎
              钻石会员可获取AI生成的详细流程优化方案和投资回报分析</p>
            <p class="upgrade-prompt" v-else>升级至<span class="highlight">黄金会员</span>即可查看完整洞察</p>
          </div>
        </div>

        <!-- 客户群体分析 -->
        <div class="insight-card customer-card">
          <div class="card-header">
            <span class="card-icon">👥</span>
            <h3>客户群体分析</h3>
            <span class="tag marketing-tag">营销建议</span>
          </div>
          <div class="card-content">
            <p>25-35岁女性客户满意度最高，但回头率低于平均水平，建议推出针对性会员活动。</p>
            <p class="premium-info" v-if="['gold', 'diamond'].includes(currentMembership)">💎 钻石会员可查看更详细的客户画像和个性化营销策略
            </p>
            <p class="upgrade-prompt" v-else>升级至<span class="highlight">黄金会员</span>即可查看完整洞察</p>
          </div>
        </div>

        <!-- 会员专属洞察 -->
        <div class="insight-card premium-card">
          <h3>会员专属洞察</h3>
          <p v-if="['gold', 'diamond'].includes(currentMembership)">升级至钻石会员，可获取更多AI驱动的经营洞察和个性化优化建议</p>
          <p v-else>升级至<span class="highlight">黄金会员</span>即可解锁AI智能洞察功能</p>
          <button class="generate-more-btn" @click="generateMoreInsights"
            :disabled="!['gold', 'diamond'].includes(currentMembership)">
            <span class="refresh-icon">🔄</span> 生成更多洞察
          </button>
        </div>
      </div>

      <div class="competitor-analysis">
        <div class="section-header">
          <h2>竞争对手对比分析</h2>
          <div class="action-buttons">
            <select class="comparison-select" @change="handleComparisonChange($event)"
              :disabled="!['gold', 'diamond'].includes(currentMembership)">
              <option value="all">全部对比</option>
              <option value="traffic">客流量对比</option>
              <option value="satisfaction">满意度对比</option>
              <option value="conversion">转化率对比</option>
              <option value="awareness">知名度对比</option>
            </select>
            <button class="export-btn" @click="exportReport"
              :disabled="!['gold', 'diamond'].includes(currentMembership)">
              <span class="export-icon">📊</span> 导出报告
            </button>
          </div>
        </div>

        <!-- 对比指标卡片 -->
        <div class="metrics-grid">
          <div class="metric-card traffic-metric">
            <p>客流量</p>
            <p class="metric-value">高于行业平均 5%</p>
          </div>
          <div class="metric-card satisfaction-metric">
            <p>用户满意度</p>
            <p class="metric-value">低于竞争对手A 3%</p>
          </div>
          <div class="metric-card conversion-metric">
            <p>转化率</p>
            <p class="metric-value">高于行业平均 2%</p>
          </div>
          <div class="metric-card awareness-metric">
            <p>品牌知名度</p>
            <p class="metric-value">低于竞争对手B 7%</p>
          </div>
        </div>

        <!-- 竞争优劣势分析 -->
        <div class="analysis-content">
          <h3>竞争优劣势分析</h3>
          <ul class="analysis-list">
            <li class="strength">
              <span class="indicator">+</span>
              <p>客流量表现优异，高于行业平均水平5%，在本地市场具有较强的吸引力</p>
            </li>
            <li class="strength">
              <span class="indicator">+</span>
              <p>客单价处于领先地位，比主要竞争对手高出10%，产品定价策略合理</p>
            </li>
            <li class="weakness">
              <span class="indicator">-</span>
              <p>用户满意度有待提升，特别是在服务响应速度方面，比竞争对手A偏低约15%</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 新增：兼职岗位管理（商家角色+黄金及以上会员可见） -->
    <div class="part-time-jobs" v-if="currentUser?.role === 'merchant' && ['gold', 'diamond'].includes(currentMembership)">
      <div class="jobs-header">
        <h2>兼职岗位管理</h2>
        <div class="jobs-actions">
          <button class="add-job-btn" @click="showAddJobModal = true">发布新岗位</button>
          <select class="job-filter">
            <option value="all">全部岗位</option>
            <option value="active">进行中</option>
            <option value="paused">已暂停</option>
          </select>
        </div>
      </div>

      <div class="jobs-table">
        <div class="jobs-table-header">
          <div class="table-col job-name">岗位名称</div>
          <div class="table-col job-type">岗位类型</div>
          <div class="table-col job-salary">薪资范围</div>
          <div class="table-col job-date">发布时间</div>
          <div class="table-col job-status">状态</div>
          <div class="table-col job-actions">操作</div>
        </div>

        <div class="jobs-table-body">
          <div class="job-row highlighted">
            <div class="table-col job-name">高级服务员</div>
            <div class="table-col job-type">全职</div>
            <div class="table-col job-salary">¥4000-6000</div>
            <div class="table-col job-date">2023-11-18</div>
            <div class="table-col job-status">
              <span class="status active">进行中</span>
            </div>
            <div class="table-col job-actions">
              <button class="action-btn edit-btn" @click="editJob(1)">✏️</button>
              <button class="action-btn delete-btn" @click="deleteJob(1)">🗑️</button>
            </div>
          </div>

          <div class="job-row highlighted">
            <div class="table-col job-name">数据分析师</div>
            <div class="table-col job-type">全职</div>
            <div class="table-col job-salary">¥3500-5000</div>
            <div class="table-col job-date">2023-11-17</div>
            <div class="table-col job-status">
              <span class="status active">进行中</span>
            </div>
            <div class="table-col job-actions">
              <button class="action-btn edit-btn" @click="editJob(2)">✏️</button>
              <button class="action-btn delete-btn" @click="deleteJob(2)">🗑️</button>
            </div>
          </div>

          <div class="job-row">
            <div class="table-col job-name">UI设计师</div>
            <div class="table-col job-type">兼职</div>
            <div class="table-col job-salary">¥15-20/小时</div>
            <div class="table-col job-date">2023-11-16</div>
            <div class="table-col job-status">
              <span class="status active">进行中</span>
            </div>
            <div class="table-col job-actions">
              <button class="action-btn edit-btn" @click="editJob(3)">✏️</button>
              <button class="action-btn delete-btn" @click="deleteJob(3)">🗑️</button>
            </div>
          </div>

          <div class="job-row">
            <div class="table-col job-name">服务员</div>
            <div class="table-col job-type">兼职</div>
            <div class="table-col job-salary">¥12-15/小时</div>
            <div class="table-col job-date">2023-11-15</div>
            <div class="table-col job-status">
              <span class="status paused">已暂停</span>
            </div>
            <div class="table-col job-actions">
              <button class="action-btn edit-btn" @click="editJob(4)">✏️</button>
              <button class="action-btn delete-btn" @click="deleteJob(4)">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 岗位推荐 -->
      <div class="job-recommendations">
        <div class="recommendation-tags">
          <span class="tag">推荐13个热门岗位，5个为置顶位</span>
          <span class="tag highlight-tag">优先展示</span>
          <span class="tag">每日10:00-12:00曝光，1个月重置</span>
          <span class="tag">智能匹配</span>
          <span class="tag">可发布8个免费岗位，无需置顶</span>
          <span class="tag">提升活跃度获曝光，黄金会员30次/日</span>
        </div>
        <button class="more-jobs-btn">查看更多</button>
      </div>
    </div>

    <!-- 会员权益对比表 -->
    <div class="benefits-comparison">
      <h3>权益对比</h3>
      <div class="comparison-table">
        <div class="table-header">
          <div class="table-cell">权益项目</div>
          <div class="table-cell">普通用户</div>
          <div class="table-cell">白银会员</div>
          <div class="table-cell">黄金会员</div>
          <div class="table-cell">钻石会员</div>
        </div>

        <div class="table-row">
          <div class="table-cell">基础数据看板</div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">客流量趋势分析</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">工单处理效率分析</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">用户满意度分析</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">热门反馈话题分析</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">AI智能洞察</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">竞争对手对比分析</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">服务类目热力图</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">高峰时段类型统计</div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">自定义报表导出</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">多门店数据对比</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">经营预测模型</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">兼职岗位发布（商家）</div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">岗位置顶权限（商家）</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">广告曝光次数</div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">广告展示位置</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">广告形式</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">专属客户经理</div>
          <div class="table-cell"><i class="check">✗</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
          <div class="table-cell"><i class="check">✓</i></div>
        </div>

        <div class="table-row">
          <div class="table-cell">价格</div>
          <div class="table-cell"><i class="check">免费使用</i></div>
          <div class="table-cell"><i class="check">¥49.9/月</i></div>
          <div class="table-cell"><i class="check">¥99.9/月</i></div>
          <div class="table-cell"><i class="check">¥199.9/月</i></div>
        </div>
      </div>
    </div>

    <!-- 会员数据统计 -->
    <div class="membership-stats">
      <h3>会员数据</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ memberStats.totalMembers.toLocaleString() }}</div>
          <div class="stat-label">总会员数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ memberStats.repurchaseRate }}%</div>
          <div class="stat-label">会员复购率</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">¥{{ memberStats.avgSpending }}</div>
          <div class="stat-label">会员平均消费</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ memberStats.satisfaction }}%</div>
          <div class="stat-label">会员满意度</div>
        </div>
      </div>
    </div>

    <!-- 会员套餐卡片 -->
    <div class="membership-plans">
      <h3>会员套餐</h3>
      <div class="plan-cards">
        <div class="plan-card" :class="{ current: currentMembership === 'silver' }">
          <div class="plan-header">
            <h4>白银会员</h4>
            <div class="plan-price">¥49.9<span>/月</span></div>
          </div>
          <div class="plan-features">
            <ul>
              <li>所有普通用户权益</li>
              <li>9折专属折扣</li>
              <li>2小时免费停车</li>
              <li>生日进阶礼遇</li>
              <li>消费数据分析报告</li>
              <li v-if="currentUser?.role === 'merchant'">岗位置顶权限</li>
              <li v-if="currentUser?.role === 'merchant'">优化广告展示位置</li>
            </ul>
          </div>
          <button class="subscribe-btn" @click="selectPlan('silver')" v-if="currentMembership !== 'silver'">立即订阅</button>
          <span class="current-plan-tag" v-else>当前套餐</span>
        </div>

        <div class="plan-card featured" :class="{ current: currentMembership === 'gold' }">
          <div class="featured-badge">最受欢迎</div>
          <div class="plan-header phhj">
            <h4>黄金会员</h4>
            <div class="plan-price">¥99.9<span>/月</span></div>
          </div>
          <div class="plan-features">
            <ul>
              <li>所有白银会员权益</li>
              <li>8.5折专属折扣</li>
              <li>3小时免费停车</li>
              <li>生日高级礼遇</li>
              <li>专属客服服务</li>
              <li>优先预约特权</li>
              <li>工单处理效率分析</li>
              <li>用户满意度分析</li>
              <li>自定义报表导出</li>
              <li v-if="currentUser?.role === 'merchant'">兼职岗位管理</li>
              <li v-if="currentUser?.role === 'merchant'">多形式广告展示</li>
              <li v-if="currentUser?.role === 'merchant'">30次/日曝光提升</li>
            </ul>
          </div>
          <button class="subscribe-btn" @click="selectPlan('gold')" v-if="currentMembership !== 'gold'">立即订阅</button>
          <span class="current-plan-tag" v-else>当前套餐</span>
        </div>

        <div class="plan-card" :class="{ current: currentMembership === 'diamond' }">
          <div class="plan-header">
            <h4>钻石会员</h4>
            <div class="plan-price">¥199.9<span>/月</span></div>
          </div>
          <div class="plan-features">
            <ul>
              <li>所有黄金会员权益</li>
              <li>8折专属折扣</li>
              <li>不限时免费停车</li>
              <li>生日豪华礼遇</li>
              <li>专属客户经理</li>
              <li>新品优先购</li>
              <li>高端活动邀请</li>
              <li>AI智能洞察分析</li>
              <li>竞争对手对比分析</li>
              <li>多门店数据对比</li>
              <li>经营预测模型</li>
              <li v-if="currentUser?.role === 'merchant'">顶级岗位推荐位</li>
              <li v-if="currentUser?.role === 'merchant'">定制化营销方案</li>
            </ul>
          </div>
          <button class="subscribe-btn" @click="selectPlan('diamond')"
            v-if="currentMembership !== 'diamond'">立即订阅</button>
          <span class="current-plan-tag" v-else>当前套餐</span>
        </div>
      </div>
    </div>

    <!-- 注册会员弹窗 -->
    <div class="modal-overlay" v-if="showJoinModal">
      <div class="join-modal">
        <div class="modal-header">
          <h3>注册成为会员</h3>
          <button class="close-modal" @click="showJoinModal = false">×</button>
        </div>

        <div class="modal-body">
          <form class="join-form">
            <div class="form-group">
              <label>用户名</label>
              <input type="text" v-model="joinForm.username" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label>用户角色</label>
              <select v-model="joinForm.role">
                <option value="user">普通用户</option>
                <option value="merchant">商家</option>
              </select>
            </div>
            <div class="form-group">
              <label>手机号</label>
              <input type="tel" v-model="joinForm.phone" placeholder="请输入手机号">
            </div>
            <div class="form-group">
              <label>验证码</label>
              <div class="code-input-group">
                <input type="text" v-model="joinForm.code" placeholder="请输入验证码">
                <button type="button" class="send-code-btn" @click="sendCode">发送验证码</button>
              </div>
            </div>
            <div class="form-group">
              <label>密码</label>
              <input type="password" v-model="joinForm.password" placeholder="请设置密码">
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="showJoinModal = false">取消</button>
          <button class="confirm-btn" @click="confirmJoin">确认注册</button>
        </div>
      </div>
    </div>

    <!-- 升级会员弹窗 -->
    <div class="modal-overlay" v-if="showUpgradeModal">
      <div class="upgrade-modal">
        <div class="modal-header">
          <h3>升级会员</h3>
          <button class="close-modal" @click="showUpgradeModal = false">×</button>
        </div>

        <div class="modal-body">
          <div class="upgrade-options">
            <div class="upgrade-option" v-for="(option, index) in upgradeOptions" :key="index"
              :class="{ selected: selectedUpgradeLevel === option.level }" @click="selectedUpgradeLevel = option.level">
              <div class="option-info">
                <h4>{{ option.title }}</h4>
                <p class="option-price">{{ option.price }}</p>
                <p class="option-benefits">{{ option.benefits }}</p>
              </div>
              <div class="option-selector" v-if="selectedUpgradeLevel === option.level">✓</div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="showUpgradeModal = false">取消</button>
          <button class="confirm-upgrade-btn" @click="confirmUpgrade" :disabled="!selectedUpgradeLevel">
            确认升级
          </button>
        </div>
      </div>
    </div>

    <!-- 添加岗位弹窗 -->
    <div class="modal-overlay" v-if="showAddJobModal">
      <div class="add-job-modal">
        <div class="modal-header">
          <h3>发布新岗位</h3>
          <button class="close-modal" @click="showAddJobModal = false">×</button>
        </div>

        <div class="modal-body">
          <form class="job-form">
            <div class="form-group">
              <label>岗位名称</label>
              <input type="text" v-model="jobForm.name" placeholder="请输入岗位名称">
            </div>
            <div class="form-group">
              <label>岗位类型</label>
              <select v-model="jobForm.type">
                <option value="全职">全职</option>
                <option value="兼职">兼职</option>
                <option value="实习">实习</option>
              </select>
            </div>
            <div class="form-group">
              <label>薪资范围</label>
              <input type="text" v-model="jobForm.salary" placeholder="请输入薪资范围">
            </div>
            <div class="form-group">
              <label>岗位职责</label>
              <textarea v-model="jobForm.description" placeholder="请输入岗位职责"></textarea>
            </div>
            <div class="form-group">
              <label>任职要求</label>
              <textarea v-model="jobForm.requirement" placeholder="请输入任职要求"></textarea>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="showAddJobModal = false">取消</button>
          <button class="confirm-btn" @click="confirmAddJob">发布岗位</button>
        </div>
      </div>
    </div>

    <!-- 操作提示弹窗 -->
    <div class="modal-overlay" v-if="showActionModal">
      <div class="action-modal">
        <div class="modal-header">
          <h3>{{ actionModalTitle }}</h3>
          <button class="close-modal" @click="showActionModal = false">×</button>
        </div>

        <div class="modal-body">
          <p class="action-message">{{ actionModalMessage }}</p>
          <div class="action-confirm" v-if="actionModalConfirm">
            <p class="confirm-text">{{ actionModalConfirmText }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" @click="showActionModal = false" v-if="actionModalShowCancel">取消</button>
          <button class="confirm-btn" @click="confirmAction">{{ actionModalBtnText }}</button>
        </div>
      </div>
    </div>

    <!-- 成功提示  v-if="showToast" -->
    <div class="toast" v-if="showToast">
      <div class="toast-content" :class="toastType">
        <span class="toast-icon">{{ toastType === 'success' ? '✓' : toastType === 'error' ? '!' : 'ℹ' }}</span>
        <div class="toast-message">
          <h4>{{ toastTitle }}</h4>
          <p>{{ toastMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '../../utils/eventBus'; // 导入事件总线
import {
  updateMembershipLevel,
  getUserMembership,
  getMembershipDisplayName,
  registerUser, // 导入注册方法
  checkUsernameExists // 导入用户名检查方法
} from '../../utils/userStorage'; // 导入用户存储工具

const router = useRouter();

// 当前用户信息
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
const currentMembership = ref('regular'); // 默认普通用户（移除non_member状态）

// 会员数据
const memberStats = ref({
  totalMembers: 128456,
  repurchaseRate: 48.2,
  avgSpending: 236,
  satisfaction: 92.7
});

// 弹窗控制
const showJoinModal = ref(false);
const showUpgradeModal = ref(false);
const showAddJobModal = ref(false);
const showActionModal = ref(false);
const showToast = ref(false);

// 表单数据
const joinForm = ref({
  username: '',
  role: 'user', // 默认普通用户角色
  phone: '',
  code: '',
  password: ''
});

const jobForm = ref({
  name: '',
  type: '全职',
  salary: '',
  description: '',
  requirement: ''
});

// 升级相关
const selectedUpgradeLevel = ref('');
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('success');

// 操作弹窗相关
const actionModalTitle = ref('');
const actionModalMessage = ref('');
const actionModalConfirm = ref(false);
const actionModalConfirmText = ref('');
const actionModalShowCancel = ref(true);
const actionModalBtnText = ref('确认');
const actionCallback = ref(null);

// 会员等级中文显示（使用工具函数）
const getMembershipText = (level) => {
  return getMembershipDisplayName(level);
};

// 会员套餐配置（移除non_member，普通用户为基础等级）
const membershipPlans = ref([
  {
    level: 'regular',
    title: '普通用户',
    price: '¥0',
    period: '/永久',
    features: [
      '基础智能购物分析',
      '9.5折专属折扣',
      '1小时免费停车',
      '生日基础礼遇',
      '兼职岗位发布（商家）'
    ]
  },
  {
    level: 'silver',
    title: '白银会员',
    price: '¥49.9',
    period: '/月',
    features: [
      '所有普通用户权益',
      '9折专属折扣',
      '2小时免费停车',
      '生日进阶礼遇',
      '消费数据分析报告',
      '服务类目热力图',
      '岗位置顶权限（商家）',
      '优化广告展示位置（商家）'
    ]
  },
  {
    level: 'gold',
    title: '黄金会员',
    price: '¥99.9',
    period: '/月',
    features: [
      '所有白银会员权益',
      '8.5折专属折扣',
      '3小时免费停车',
      'AI智能洞察分析（基础）',
      '竞争对手对比分析（基础）',
      '兼职岗位管理（商家）',
      '专属客服服务',
      '工单处理效率分析',
      '用户满意度分析',
      '自定义报表导出',
      '多形式广告展示（商家）',
      '30次/日曝光提升（商家）'
    ]
  },
  {
    level: 'diamond',
    title: '钻石会员',
    price: '¥199.9',
    period: '/月',
    features: [
      '所有黄金会员权益',
      '8折专属折扣',
      '不限时免费停车',
      '详细AI洞察报告',
      '定制化分析方案',
      '专属客户经理',
      '新品优先购特权',
      '多门店数据对比',
      '经营预测模型',
      '顶级岗位推荐位（商家）',
      '定制化营销方案（商家）'
    ]
  }
]);

// 升级选项（显示所有更高等级的选项）
const upgradeOptions = computed(() => {
  const levelOrder = { 'regular': 1, 'silver': 2, 'gold': 3, 'diamond': 4 }; // 移除non_member

  return membershipPlans.value
    .filter((plan) => levelOrder[plan.level] > levelOrder[currentMembership.value])
    .map(plan => {
      return {
        level: plan.level,
        title: `升级至${getMembershipText(plan.level)}`,
        price: `${plan.price}${plan.period}`,
        benefits: plan.features.slice(0, 2).join('，')
      };
    });
});

// 模拟数据更新
let statsUpdateTimer = null;

onMounted(() => {
  // 检查用户是否登录
  if (currentUser.value) {
    // 优先从localStorage获取会员状态
    const savedMembership = localStorage.getItem('userMembership');
    if (savedMembership) {
      currentMembership.value = savedMembership;
    } else if (currentUser.value.membershipLevel) {
      currentMembership.value = currentUser.value.membershipLevel;
      localStorage.setItem('userMembership', currentUser.value.membershipLevel);
    } else {
      // 从用户存储中获取
      const membership = getUserMembership(currentUser.value?.username, currentUser.value?.role);
      if (membership.success) {
        currentMembership.value = membership.membershipLevel;
        localStorage.setItem('userMembership', membership.membershipLevel);
      }
    }
  }

  // 每5秒更新一次数据
  statsUpdateTimer = setInterval(() => {
    memberStats.value = {
      ...memberStats.value,
      totalMembers: memberStats.value.totalMembers + Math.floor(Math.random() * 10),
      satisfaction: Number((memberStats.value.satisfaction + (Math.random() * 0.2 - 0.1)).toFixed(1))
    };
  }, 5000);

  // 监听会员状态更新事件
  const handleMembershipUpdate = (newLevel) => {
    currentMembership.value = newLevel;
    showToastNotification('更新成功', `会员等级已更新为${getMembershipText(newLevel)}`, 'success');
  };

  eventBus.on('membershipUpdated', handleMembershipUpdate);

  // 组件卸载时移除监听
  onUnmounted(() => {
    if (statsUpdateTimer) clearInterval(statsUpdateTimer);
    eventBus.off('membershipUpdated', handleMembershipUpdate);
  });
});

// 显示提示消息
const showToastNotification = (title, message, type = 'success') => {
  toastTitle.value = title;
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 显示操作确认弹窗
const showActionConfirm = (title, message, confirmText = '', showCancel = true, btnText = '确认', callback = null) => {
  actionModalTitle.value = title;
  actionModalMessage.value = message;
  actionModalConfirmText.value = confirmText;
  actionModalConfirm.value = !!confirmText;
  actionModalShowCancel.value = showCancel;
  actionModalBtnText.value = btnText;
  actionCallback.value = callback;
  showActionModal.value = true;
};

// 确认操作
const confirmAction = () => {
  if (actionCallback.value) {
    actionCallback.value();
  }
  showActionModal.value = false;
};

// 发送验证码
const sendCode = () => {
  if (!joinForm.value.phone) {
    showToastNotification('提示', '请输入手机号', 'info');
    return;
  }
  showToastNotification('成功', '验证码已发送，请注意查收', 'success');
};

// 确认注册（使用userStorage中的registerUser方法）
const confirmJoin = () => {
  if (!joinForm.value.username || !joinForm.value.role || !joinForm.value.phone || !joinForm.value.code || !joinForm.value.password) {
    showToastNotification('提示', '请填写完整信息', 'error');
    return;
  }

  // 检查用户名是否已存在
  const usernameExists = checkUsernameExists(joinForm.value.username, joinForm.value.role);
  if (usernameExists) {
    showToastNotification('提示', '该用户名已被注册', 'error');
    return;
  }

  // 调用注册方法
  const registerResult = registerUser({
    username: joinForm.value.username,
    password: joinForm.value.password,
    role: joinForm.value.role
  });

  if (registerResult.success) {
    // 注册成功，创建用户信息
    const newUser = {
      username: joinForm.value.username,
      role: joinForm.value.role,
      membershipLevel: 'regular' // 注册默认普通用户
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('userMembership', 'regular');

    currentUser.value = newUser;
    currentMembership.value = 'regular';

    showJoinModal.value = false;
    showToastNotification('注册成功', `恭喜您成为${joinForm.value.role === 'merchant' ? '商家' : '普通'}用户！`, 'success');

    // 通知其他组件
    eventBus.emit('membershipUpdated', 'regular');
  } else {
    showToastNotification('注册失败', registerResult.message, 'error');
  }
};

// 选择套餐
const selectPlan = (level) => {
  if (!currentUser.value) {
    showJoinModal.value = true;
    return;
  }

  selectedUpgradeLevel.value = level;
  showUpgradeModal.value = true;
};

// 确认升级
const confirmUpgrade = () => {
  if (!selectedUpgradeLevel.value || !currentUser.value) return;

  // 调用用户存储工具更新会员等级
  const result = updateMembershipLevel(
    currentUser.value.username,
    currentUser.value.role,
    selectedUpgradeLevel.value
  );

  if (result.success) {
    // 更新当前会员状态
    currentMembership.value = selectedUpgradeLevel.value;

    // 更新localStorage中的用户信息
    currentUser.value.membershipLevel = selectedUpgradeLevel.value;
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
    localStorage.setItem('userMembership', selectedUpgradeLevel.value);

    // 通知其他组件更新会员状态
    eventBus.emit('membershipUpdated', selectedUpgradeLevel.value);

    // 显示成功提示
    showToastNotification(
      '升级成功',
      `恭喜您已成功升级为${getMembershipText(selectedUpgradeLevel.value)}`,
      'success'
    );

    // 关闭弹窗
    showUpgradeModal.value = false;
    selectedUpgradeLevel.value = '';
  } else {
    // 显示失败提示
    showToastNotification(
      '操作失败',
      result.message || '会员等级变更过程中出现错误，请重试',
      'error'
    );
  }
};

// 确认添加岗位
const confirmAddJob = () => {
  if (!jobForm.value.name || !jobForm.value.salary) {
    showToastNotification('提示', '请填写岗位名称和薪资', 'error');
    return;
  }

  showAddJobModal.value = false;
  showToastNotification('发布成功', '岗位已成功发布', 'success');

  // 重置表单
  jobForm.value = {
    name: '',
    type: '全职',
    salary: '',
    description: '',
    requirement: ''
  };
};

// 编辑岗位
const editJob = (id) => {
  showActionConfirm('编辑岗位', `您正在编辑ID为${id}的岗位`, '请确认您要编辑此岗位信息', true, '编辑', () => {
    showToastNotification('提示', '编辑功能即将上线', 'info');
  });
};

// 删除岗位
const deleteJob = (id) => {
  showActionConfirm('删除岗位', `您正在删除ID为${id}的岗位`, '此操作不可撤销，确定要删除吗？', true, '删除', () => {
    showToastNotification('成功', '岗位已删除', 'success');
  });
};

// 生成更多洞察
const generateMoreInsights = () => {
  if (!['gold', 'diamond'].includes(currentMembership.value)) {
    showToastNotification('权限不足', '需要升级至黄金会员才能使用此功能', 'error');
    return;
  }

  showToastNotification('处理中', '正在为您生成更多AI洞察...', 'info');

  setTimeout(() => {
    showToastNotification('完成', '新的AI洞察已生成，请查看', 'success');
  }, 2000);
};

// 导出报告
const exportReport = () => {
  showToastNotification('导出中', '报告正在生成，即将下载...', 'info');

  setTimeout(() => {
    showToastNotification('导出成功', '竞争对手分析报告已导出', 'success');
  }, 1500);
};

// 处理对比变化
const handleComparisonChange = (event) => {
  const text = event.target.options[event.target.selectedIndex].text;
  showToastNotification('已更新', `已切换至${text}视图`, 'info');
};
</script>


<style scoped>
/* 基础样式 */
.membership-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* 头部样式 */
.header {
  background-color: white;

  text-align: center;
  padding: 40px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.btn-group {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.join-btn,
.upgrade-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.join-btn {
  background-color: white;
  color: #667eea;
}

.upgrade-btn {
  background-color: #ffd700;
  color: #333;
}

.upgrade-btn.disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

.join-btn:hover,
.upgrade-btn:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.current-membership-status {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.welcome-text {
  color: white;
  font-weight: bold;
}

.membership-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.badge-regular {
  background-color: #e0e0e0;
  color: #333;
}

.badge-silver {
  background-color: #c0c0c0;
  color: #333;
}

.badge-gold {
  background-color: #ffd700;
  color: #333;
}

.badge-diamond {
  background-color: #b9f2ff;
  color: #0077b6;
}

/* 会员等级概览 */
.membership-overview {
  margin-bottom: 40px;
}

.membership-overview h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.level-item {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-top: 3px solid #667eea;
}

.level-item.featured {
  border-top: 3px solid #ffd700;
  transform: scale(1.05);
}

.level-item.active {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.level-item:hover {
  transform: translateY(-5px);
}

.level-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.level-item h4 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #333;
}

.level-item p {
  color: #666;
  font-size: 0.9rem;
}

/* AI智能洞察与竞争对手分析 */
.intelligence-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.ai-intelligence,
.competitor-analysis {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.section-header h2 {
  color: #333;
  margin: 0;
}

.badges {
  display: flex;
  gap: 10px;
}

.badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.gold-badge {
  background-color: #ffd700;
  color: #333;
}

.ai-badge {
  background-color: #667eea;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.comparison-select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 0.9rem;
}

.export-btn {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #667eea;
  background-color: white;
  color: #667eea;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.export-btn:hover {
  background-color: #667eea;
  color: white;
}

.export-btn:disabled {
  background-color: #eee;
  color: #999;
  border-color: #ccc;
  cursor: not-allowed;
}

/* 洞察卡片 */
.insight-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.traffic-card {
  border-left-color: #4CAF50;
}

.service-card {
  border-left-color: #2196F3;
}

.customer-card {
  border-left-color: #FF9800;
}

.premium-card {
  border-left-color: #9C27B0;
  text-align: center;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-icon {
  font-size: 1.2rem;
}

.tag {
  padding: 3px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
  background-color: #f0f0f0;
}

.suggestion-tag {
  background-color: #e3f2fd;
  color: #1976D2;
}

.flow-tag {
  background-color: #e8f5e9;
  color: #2E7D32;
}

.marketing-tag {
  background-color: #fff8e1;
  color: #F57F17;
}

.card-content p {
  margin: 0 0 10px 0;
  color: #666;
  line-height: 1.5;
}

.premium-info {
  color: #9C27B0;
  font-weight: bold;
  font-size: 0.9rem;
}

.upgrade-prompt {
  color: #FF5722;
  font-style: italic;
}

.highlight {
  color: #FF5722;
  font-weight: bold;
}

.generate-more-btn {
  background: linear-gradient(135deg, #9C27B0 0%, #673AB7 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px auto 0;
  transition: all 0.3s;
}

.generate-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(156, 39, 176, 0.4);
}

.generate-more-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 竞争对手分析 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.metric-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.metric-card p:first-child {
  color: #666;
  margin: 0 0 5px 0;
  font-size: 0.9rem;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.traffic-metric .metric-value {
  color: #4CAF50;
}

.satisfaction-metric .metric-value {
  color: #F44336;
}

.conversion-metric .metric-value {
  color: #4CAF50;
}

.awareness-metric .metric-value {
  color: #F44336;
}

.analysis-content h3 {
  color: #333;
  margin-bottom: 15px;
}

.analysis-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.analysis-list li {
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.strength {
  background-color: #e8f5e9;
  border-left: 4px solid #4CAF50;
}

.weakness {
  background-color: #ffebee;
  border-left: 4px solid #F44336;
}

.indicator {
  font-weight: bold;
  font-size: 1.2rem;
}

.strength .indicator {
  color: #4CAF50;
}

.weakness .indicator {
  color: #F44336;
}

/* 兼职岗位管理 */
.part-time-jobs {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.jobs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.jobs-header h2 {
  color: #333;
  margin: 0;
}

.jobs-actions {
  display: flex;
  gap: 10px;
}

.add-job-btn {
  padding: 8px 16px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-job-btn:hover {
  background-color: #5a67d8;
}

.job-filter {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
}

/* 岗位表格 */
.jobs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.jobs-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  background-color: #f5f5f5;
  font-weight: bold;
}

.table-col {
  padding: 12px 15px;
}

.job-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 1px solid #eee;
}

.job-row.highlighted {
  background-color: #faf6ed;
}

.job-row:hover {
  background-color: #f9f9f9;
}

.job-status .status {
  padding: 3px 8px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.status.active {
  background-color: #e8f5e9;
  color: #2E7D32;
}

.status.paused {
  background-color: #fff8e1;
  color: #F57F17;
}

.job-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s;
}

.edit-btn {
  color: #2196F3;
}

.delete-btn {
  color: #F44336;
}

.action-btn:hover {
  background-color: #f0f0f0;
}

/* 岗位推荐 */
.job-recommendations {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
}

.recommendation-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.recommendation-tags .tag {
  background-color: #e0e0e0;
}

.highlight-tag {
  background-color: #fff8e1 !important;
  color: #F57F17 !important;
}

.more-jobs-btn {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.more-jobs-btn:hover {
  background-color: #e0e0e0;
}

/* 权益对比表 */
.benefits-comparison {
  margin-bottom: 40px;
}

.benefits-comparison h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.comparison-table {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  border-bottom: 1px solid #eee;
}

.table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.table-cell {
  padding: 15px;
  text-align: center;
}

.table-cell:first-child {
  text-align: left;
  font-weight: bold;
}

.check {
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.2rem;
}

.cross {
  color: #F44336;
  font-weight: bold;
  font-size: 1.2rem;
}

/* 会员数据统计 */
.membership-stats {
  margin-bottom: 40px;
}

.membership-stats h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #667eea;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* 会员套餐卡片 */
.membership-plans {
  margin-bottom: 40px;
}

.membership-plans h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.plan-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.plan-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-10px);
}

.plan-card.featured {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
}

.plan-card.current {
  border: 2px solid #667eea;
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: -30px;
  background-color: #ffd700;
  color: #333;
  padding: 5px 30px;
  font-weight: bold;
  transform: rotate(45deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.plan-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.phhj {
  padding-top: 40px;
}

.plan-header h4 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.plan-price {
  font-size: 2rem;
  font-weight: bold;
}

.plan-price span {
  font-size: 1rem;
  font-weight: normal;
}

.plan-features {
  padding: 20px;
}

.plan-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-features li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 10px;
}

.plan-features li:before {
  content: '✓';
  color: #4CAF50;
  font-weight: bold;
}

.subscribe-btn {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #667eea;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.subscribe-btn:hover {
  background-color: #5a67d8;
}

.plan-card.featured .subscribe-btn {
  background-color: #ffd700;
  color: #333;
}

.plan-card.featured .subscribe-btn:hover {
  background-color: #ffc107;
}

.current-plan-tag {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
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
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.join-modal,
.upgrade-modal,
.add-job-modal,
.action-modal {
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-header h3 {
  margin: 0;
}

.close-modal {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn,
.confirm-upgrade-btn {
  padding: 8px 16px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-upgrade-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 表单样式 */
.join-form,
.job-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.code-input-group {
  display: flex;
  gap: 10px;
}

.code-input-group input {
  flex: 1;
}

.send-code-btn {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 升级选项 */
.upgrade-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.upgrade-option {
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}

.upgrade-option.selected {
  border-color: #667eea;
  background-color: #f0f5ff;
}

.upgrade-option:hover {
  border-color: #ccc;
}

.option-info h4 {
  margin: 0 0 5px 0;
}

.option-price {
  font-weight: bold;
  color: #667eea;
  margin: 0 0 5px 0;
}

.option-benefits {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.option-selector {
  font-size: 1.5rem;
  color: #4CAF50;
}

/* 操作弹窗 */
.action-message {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.action-confirm {
  background-color: #ffebee;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.confirm-text {
  margin: 0;
  color: #F44336;
  font-weight: bold;
}

/* 提示消息 */
.toast {
  background-color: transparent;
  position: fixed;
  top: 75px;

  z-index: 1001;
}

.toast-content {
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  min-width: 300px;
}

.toast-content.success {
  border-left: 4px solid #4CAF50;
}

.toast-content.error {
  border-left: 4px solid #F44336;
}

.toast-content.info {
  border-left: 4px solid #2196F3;
}

.toast-icon {
  font-size: 1.5rem;
}

.success .toast-icon {
  color: #4CAF50;
}

.error .toast-icon {
  color: #F44336;
}

.info .toast-icon {
  color: #2196F3;
}

.toast-message h4 {
  margin: 0 0 5px 0;
  color: #333;
}

.toast-message p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .intelligence-container {
    grid-template-columns: 1fr;
  }

  .plan-cards {
    grid-template-columns: 1fr;
  }

  .plan-card.featured {
    transform: none;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .current-membership-status {
    position: static;
    margin-bottom: 15px;
    justify-content: center;
  }

  .table-header,
  .table-row {
    grid-template-columns: 2fr repeat(2, 1fr);
  }

  .table-cell:nth-child(n+4) {
    display: none;
  }

  .jobs-table-header,
  .job-row {
    grid-template-columns: 2fr 1fr 1fr;
  }

  .job-row .table-col:nth-child(n+4) {
    display: none;
  }
}

@media (max-width: 480px) {
  .btn-group {
    flex-direction: column;
    align-items: center;
  }

  .join-btn,
  .upgrade-btn {
    width: 100%;
    max-width: 250px;
  }

  .level-grid {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .table-cell:nth-child(n+2) {
    display: none;
  }

  .jobs-table-header,
  .job-row {
    grid-template-columns: 1fr;
  }

  .job-row .table-col:nth-child(n+2) {
    display: none;
  }
}
</style>
