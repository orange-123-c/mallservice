<template>
  <div class="business-type-chart-container">
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 响应式数据
const chartRef = ref(null);
const chartInstance = ref(null);

// 业态类型数据
const businessData = [
  { name: '餐饮美食', value: 35 },
  { name: '零售购物', value: 25 },
  { name: '休闲娱乐', value: 18 },
  { name: '生活服务', value: 12 },
  { name: '儿童亲子', value: 8 },
  { name: '其他业态', value: 2 }
];

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  
  // 创建图表实例
  chartInstance.value = echarts.init(chartRef.value);
  
  // 设置图表配置
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e6e6e6',
      textStyle: { color: '#333' }
    },
    legend: {
      orient: 'vertical',
      right: '1%',
      top: 'center',
      textStyle: { color: '#666', fontSize: 12 }
    },
    series: [
      {
        name: '业态分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          fontSize: 12,
          color: '#666',
          formatter: '{b}: {c}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 10,
          lineStyle: {
            color: '#999'
          }
        },
        data: businessData,
        color: [
          '#5b8ff9', // 蓝色
          '#61ddaa', // 绿色
          '#65789b', // 深灰色
          '#f68484', // 红色
          '#ffb84d', // 橙色
          '#9287e7'  // 紫色
        ]
      }
    ]
  };
  
  chartInstance.value.setOption(option);
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
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
});
</script>

<style scoped>
.business-type-chart-container {
  position: relative;
  border-radius: 8px;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chart-content {
  flex: 1;
  width: 100%;
}
</style>