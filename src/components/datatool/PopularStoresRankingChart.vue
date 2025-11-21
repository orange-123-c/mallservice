<template>
  <div class="popular-stores-chart-container">
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
  { label: '日排行', value: 'day' },
  { label: '周排行', value: 'week' },
  { label: '月排行', value: 'month' }
];

// 商铺名称列表
const storeNames = [
  '优衣库', '星巴克', '海底捞', 'Apple Store', 'ZARA', 
  '无印良品', '喜茶', 'Nike', '华为体验店', '西西弗书店'
];

// 生成模拟数据
const generateData = (type) => {
  // 根据不同周期生成不同范围的数据
  const getRandomValue = () => {
    switch(type) {
      case 'day': return Math.floor(Math.random() * 800 + 200);
      case 'week': return Math.floor(Math.random() * 5000 + 1000);
      case 'month': return Math.floor(Math.random() * 20000 + 5000);
    }
  };
  
  // 生成数据并按客流量降序排序
  let data = storeNames.map(name => ({
    name,
    value: getRandomValue()
  })).sort((a, b) => b.value - a.value);
  
  // 只取前8名展示
  return data.slice(0, 8);
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
  const chartData = generateData(currentPeriod.value);
  const storeNames = chartData.map(item => item.name);
  const visitorValues = chartData.map(item => item.value);
  
  // 定义渐变色数组
  const colorList = [
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#ff6b81' },
      { offset: 1, color: '#ff8fa3' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#ffa502' },
      { offset: 1, color: '#ffc048' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#70a1ff' },
      { offset: 1, color: '#a4bfe6' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#2ed573' },
      { offset: 1, color: '#7bed9f' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#5f27cd' },
      { offset: 1, color: '#836fa9' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#00d2d3' },
      { offset: 1, color: '#48dbfb' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#ff9ff3' },
      { offset: 1, color: '#f368e0' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#2f3542' },
      { offset: 1, color: '#57606f' }
    ])
  ];
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e6e6e6',
      textStyle: { color: '#333' },
      formatter: '{b}: {c} 客流量'
    },
    grid: {
      left: '2%',
      right: '8%',
      bottom: '4%',
      top: '6%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#e6e6e6' } },
      axisLabel: { color: '#666', fontSize: 12 },
      splitLine: { lineStyle: { color: '#f5f5f5' } }
    },
    yAxis: {
      type: 'category',
      data: storeNames,
      axisLine: { show: false },
      axisLabel: { 
        color: '#666', 
        fontSize: 12,
        width: 100,
        overflow: 'truncate'
      },
      axisTick: { show: false },
      inverse: true // 倒序显示，第一名在顶部
    },
    series: [
      {
        name: '客流量',
        type: 'bar',
        data: visitorValues,
        barWidth: '60%',
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: (params) => colorList[params.dataIndex]
        },
        label: {
          show: true,
          position: 'right',
          color: '#666',
          fontSize: 11,
          formatter: '{c}'
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
.popular-stores-chart-container {
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