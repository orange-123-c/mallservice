<template>
  <div class="satisfaction-bar-chart">
    <h4>{{ title }}</h4>
    <!-- 图表容器 -->
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts'; // 直接引入原生ECharts

// 组件属性
const props = defineProps({
  title: {
    type: String,
    default: '服务类型满意度'
  },
  data: {
    type: Array,
    default: () => [
      { label: '设施维护', value: 85 },
      { label: '商户服务', value: 92 },
      { label: '导航指引', value: 96 },
      { label: '应急帮助', value: 90 }
    ]
  }
});

// 图表实例和容器引用
const chartContainer = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  // 确保容器存在
  if (!chartContainer.value) return;

  // 销毁已有实例（避免重复创建）
  if (chartInstance) {
    echarts.dispose(chartInstance);
  }

  // 创建图表实例
  chartInstance = echarts.init(chartContainer.value);

  // 设置图表配置
  const option = getChartOption();
  chartInstance.setOption(option);
};

// 生成图表配置项
const getChartOption = () => {
  const labels = props.data.map(item => item.label);
  const values = props.data.map(item => item.value);

  return {
    // 图表背景
    backgroundColor: 'rgba(0, 119, 255, 0.05)',
    // 提示框
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(10, 30, 80, 0.9)',
      borderColor: 'rgba(100, 243, 255, 0.3)',
      borderWidth: 1,
      textStyle: { color: '#fff' },
      formatter: '{a} <br/>{b}: {c}%'
    },
    // 网格布局
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    // X轴
    xAxis: [
      {
        type: 'category',
        data: labels,
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        axisTick: { show: false },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 12
        }
      }
    ],
    // Y轴
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.6)',
          formatter: '{value}%'
        }
      }
    ],
    // 数据系列
    series: [
      {
        name: '满意度',
        type: 'bar',
        data: values,
        barWidth: 35,
        itemStyle: {
          // 渐变颜色
          color: function(params) {
            const colorList = [
              { from: '#0077ff', to: '#00f0ff' },
              { from: '#0091ff', to: '#40bfff' },
              { from: '#00aaff', to: '#80d4ff' },
              { from: '#0088ff', to: '#b3e5ff' }
            ];
            const color = colorList[params.dataIndex] || colorList[0];
            return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: color.from },
              { offset: 1, color: color.to }
            ]);
          },
          borderRadius: [6, 6, 4, 4],
          shadowColor: 'rgba(0, 240, 255, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        // 顶部数值标签
        label: {
          show: true,
          position: 'top',
          color: '#64f3ff',
          fontSize: 12,
          fontWeight: 'bold',
          formatter: '{c}%'
        },
        // 动画效果
        animationDuration: 1500,
        animationEasing: 'cubicOut'
      }
    ]
  };
};

// 监听数据变化，更新图表
watch(
  () => props.data,
  () => {
    if (chartInstance) {
      chartInstance.setOption(getChartOption());
    }
  },
  { deep: true }
);

// 窗口大小变化时重绘
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 组件挂载时初始化
onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

// 组件卸载时清理
onUnmounted(() => {
  if (chartInstance) {
    echarts.dispose(chartInstance);
    chartInstance = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.satisfaction-bar-chart {
  width: 100%;
  padding: 20px;
  /* background: rgba(0, 119, 255, 0.05); */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
}

.satisfaction-bar-chart h4 {
  color: #8ab4f8;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(100, 243, 255, 0.1);
}

.chart-container {
  width: 100%;
  height: 260px; /* 固定图表高度 */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
}
</style>