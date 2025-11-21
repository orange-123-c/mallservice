<template>
  <div class="satisfaction-chart-container">
    <div class="chart-header">
      <div class="chart-period-selector">
        <button 
          v-for="item in periodOptions" 
          :key="item.value"
          :class="{ active: currentPeriod === item.value }"
          @click="handlePeriodChange(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 响应式数据
const chartRef = ref(null);
const currentPeriod = ref('week');
const chartInstance = ref(null);

// 时间周期选项
const periodOptions = [
  { label: '周趋势', value: 'week' },
  { label: '月趋势', value: 'month' },
  { label: '季趋势', value: 'quarter' }
];

// 生成模拟数据
const generateData = (type) => {
  let xData, baseScore = 4.2;
  
  switch(type) {
    case 'week':
      xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      break;
    case 'month':
      xData = Array.from({length: 30}, (_, i) => `${i+1}日`);
      break;
    case 'quarter':
      xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'];
      break;
  }
  
  // 生成满意度数据（3.5-5.0之间波动）
  const satisfactionData = xData.map((_, index) => {
    const randomFactor = Math.random() * 0.8 - 0.4; // -0.4 到 0.4 之间
    // 添加一点趋势性
    const trendFactor = type === 'quarter' ? index * 0.05 : 0;
    return Math.min(5.0, Math.max(3.5, baseScore + randomFactor + trendFactor)).toFixed(1);
  });
  
  // 生成评价数量数据
  const commentCountData = xData.map(() => Math.floor(Math.random() * 200 + 50));
  
  return { xData, satisfactionData, commentCountData };
};

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  
  // 创建图表实例
  chartInstance.value = echarts.init(chartRef.value);
  
  // 更新图表配置
  updateChart();
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
};

// 更新图表
const updateChart = () => {
  const { xData, satisfactionData, commentCountData } = generateData(currentPeriod.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e6e6e6',
      textStyle: { color: '#333' },
      formatter: function(params) {
        let result = params[0].name + '<br/>';
        result += `满意度: ${params[0].value} 分<br/>`;
        result += `评价数: ${params[1].value} 条`;
        return result;
      }
    },
    legend: {
      data: ['满意度', '评价数量'],
      top: 0,
      right: 0,
      textStyle: { color: '#666', fontSize: 12 }
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '8%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: { lineStyle: { color: '#e6e6e6' } },
      axisLabel: { 
        color: '#666', 
        fontSize: 12,
        interval: currentPeriod.value === 'month' ? 4 : 0 // 月份数据间隔显示
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '满意度（分）',
        nameTextStyle: { color: '#666', fontSize: 12 },
        axisLine: { lineStyle: { color: '#e6e6e6' } },
        axisLabel: { 
          color: '#666', 
          fontSize: 12,
          formatter: '{value}'
        },
        splitLine: { lineStyle: { color: '#f5f5f5' } },
        min: 3,
        max: 5,
        splitNumber: 4
      },
      {
        type: 'value',
        name: '评价数量',
        nameTextStyle: { color: '#666', fontSize: 12 },
        axisLine: { lineStyle: { color: '#e6e6e6' } },
        axisLabel: { 
          color: '#666', 
          fontSize: 12
        },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '满意度',
        type: 'line',
        data: satisfactionData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#52c41a' },
        itemStyle: { 
          color: '#52c41a',
          borderColor: '#fff',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(82, 196, 26, 0.3)' },
            { offset: 1, color: 'rgba(82, 196, 26, 0.05)' }
          ])
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            { yAxis: 4.5, name: '优秀线', lineStyle: { color: '#52c41a', type: 'dashed' } },
            { yAxis: 4.0, name: '良好线', lineStyle: { color: '#faad14', type: 'dashed' } },
            { yAxis: 3.5, name: '及格线', lineStyle: { color: '#f5222d', type: 'dashed' } }
          ],
          label: {
            fontSize: 10,
            color: '#666',
            formatter: '{b}'
          }
        },
        emphasis: {
          itemStyle: { symbolSize: 8 }
        }
      },
      {
        name: '评价数量',
        type: 'bar',
        yAxisIndex: 1,
        data: commentCountData,
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1890ff' },
            { offset: 1, color: '#91d5ff' }
          ]),
          opacity: 0.6
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8
          }
        }
      }
    ]
  };
  
  chartInstance.value.setOption(option);
};

// 处理周期切换
const handlePeriodChange = (value) => {
  currentPeriod.value = value;
};

// 处理窗口大小调整
const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

// 生命周期钩子
onMounted(() => {
  initChart();
});

watch(currentPeriod, () => {
  updateChart();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<style scoped>
.satisfaction-chart-container {
  position: relative;
  border-radius: 8px;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-period-selector {
  top: 9px;
  position: absolute;
  right: 20px;
  display: flex;
  gap: 8px;
}

.chart-period-selector button {
  padding: 6px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: #f9f9f9;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.chart-period-selector button:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.chart-period-selector button.active {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.chart-content {
  position: relative;
  top: 15px;
  flex: 1;
  width: 100%;
}
</style>