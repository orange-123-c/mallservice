<template>
  <div class="visitor-chart-container">
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
const currentPeriod = ref('day');
const chartInstance = ref(null);

// 时间周期选项
const periodOptions = [
  { label: '日客流', value: 'day' },
  { label: '周客流', value: 'week' },
  { label: '月客流', value: 'month' }
];

// 生成模拟数据
const generateData = (type) => {
  switch(type) {
    case 'day':
      return {
        xData: Array.from({length: 12}, (_, i) => `${i+9}点`),
        yData: Array.from({length: 12}, () => Math.floor(Math.random() * 300 + 50))
      };
    case 'week':
      return {
        xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        yData: Array.from({length: 7}, () => Math.floor(Math.random() * 1500 + 500))
      };
    case 'month':
      return {
        xData: Array.from({length: 30}, (_, i) => `${i+1}日`),
        yData: Array.from({length: 30}, () => Math.floor(Math.random() * 2000 + 800))
      };
  }
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
  const { xData, yData } = generateData(currentPeriod.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c} 人次',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e6e6e6',
      textStyle: { color: '#333' }
    },
    grid: {
      left: '4%',
      right: '2%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: { lineStyle: { color: '#e6e6e6' } },
      axisLabel: { color: '#666', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '客流量（人次）',
      nameTextStyle: { color: '#666', fontSize: 12 },
      axisLine: { lineStyle: { color: '#e6e6e6' } },
      axisLabel: { color: '#666', fontSize: 12 },
      splitLine: { lineStyle: { color: '#f5f5f5' } }
    },
    series: [
      {
        name: '客流量',
        type: 'line',
        data: yData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#1890ff' },
        itemStyle: { 
          color: '#1890ff',
          borderColor: '#fff',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.05)' }
          ])
        },
        emphasis: {
          itemStyle: { symbolSize: 8 }
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
.visitor-chart-container {
  position: relative;
  border-radius: 8px;
    padding: 10px;

height: 100%;
width: 100%;  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
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