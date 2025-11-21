<template>
  <div class="monthly-satisfaction-pie">
    <h4>{{ title }}</h4>
      <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: '月度满意度趋势'
  },
  data: {
    type: Array,
    default: () => [
      { label: '1月', value: 88 },
      { label: '2月', value: 91 },
      { label: '3月', value: 93 },
      { label: '4月', value: 95 }
    ]
  }
});

// 图表实例和容器引用
const chartContainer = ref(null);
let chartInstance = null;
const average = ref(0);

// 计算平均满意度
const calculateAverage = () => {
  const total = props.data.reduce((sum, item) => sum + item.value, 0);
  average.value = Math.round(total / props.data.length);
};

// 生成图表配置
const getChartOption = () => {
  // 科技感渐变颜色
  const colorList = [
    ['#00f0ff', '#0077ff'],
    ['#40bfff', '#0091ff'],
    ['#80d4ff', '#00aaff'],
    ['#b3e5ff', '#0088ff']
  ];

  // 处理数据格式
  const seriesData = props.data.map((item, index) => ({
    name: item.label,
    value: item.value,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: colorList[index][0] },
        { offset: 1, color: colorList[index][1] }
      ]),
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      // 基础阴影
      shadowBlur: 10,
      shadowColor: colorList[index][0],
      shadowOffsetX: 0,
      shadowOffsetY: 0
    },
    emphasis: {
      itemStyle: {
        // 强化悬停阴影
        shadowBlur: 20,
        shadowColor: `${colorList[index][0]}80`, // 带透明度的发光效果
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderColor: 'rgba(255, 255, 255, 0.3)'
      }
    },
    // 扇区标签样式
    label: {
      show: true,
      position: 'outside',
      formatter: '{b}: {c}%',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 12,
      fontWeight: 500,
      textShadowBlur: 5,
      textShadowColor: 'rgba(0, 240, 255, 0.5)',
      // 标签阴影
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.3)'
    },
    // 连接线样式
    labelLine: {
      show: true,
      length: 15,
      length2: 20,
      lineStyle: {
        color: 'rgba(100, 243, 255, 0.3)',
        width: 1.5,
        // 连接线阴影
        shadowBlur: 5,
        shadowColor: 'rgba(0, 240, 255, 0.5)'
      }
    }
  }));

  return {
        backgroundColor: 'rgba(0, 119, 255, 0.05)',

    // 主容器阴影（通过配置项模拟）
    tooltip: {
      trigger: 'item',
            backgroundColor: 'rgba(10, 30, 80, 0.95)',

      borderColor: 'rgba(100, 243, 255, 0.5)',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      formatter: '{a} <br/>{b}: {c}%',
      // 提示框阴影
      shadowBlur: 15,
      shadowColor: 'rgba(0, 240, 255, 0.3)',
      transitionDuration: 0.3
    },
    legend: {
      orient: 'vertical',
      right: 20,
      top: 'center',
      icon: 'circle',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 18,
      textStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        padding: [0, 0, 0, 8],
        // 图例文字阴影
        textShadowBlur: 3,
        textShadowColor: 'rgba(0, 240, 255, 0.3)'
      }
    },
    series: [
      {
        name: '满意度',
        type: 'pie',
        radius: ['45%', '70%'], // 环形图
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        data: seriesData,
        // 增强动画效果
        animationType: 'scale',
        animationEasing: 'cubicOut',
        animationDuration: 1500,
        animationDelay: (idx) => idx * 100,
        // 悬停放大效果
        hoverOffset: 15
      }
    ],

  };
};

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return;

  // 销毁已有实例
  if (chartInstance) {
    echarts.dispose(chartInstance);
  }

  // 创建实例
  chartInstance = echarts.init(chartContainer.value);
  
  // 计算平均值
  calculateAverage();
  
  // 设置配置
  chartInstance.setOption(getChartOption());
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    calculateAverage();
    if (chartInstance) {
      chartInstance.setOption(getChartOption());
    }
  },
  { deep: true }
);

// 窗口大小调整
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 生命周期
onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (chartInstance) {
    echarts.dispose(chartInstance);
    chartInstance = null;
  }
  window.removeEventListener('resize', handleResize);
});
</script>



<style scoped>
.monthly-satisfaction-pie {
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  position: relative;
}

.monthly-satisfaction-pie h4 {
  color: #8ab4f8;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(100, 243, 255, 0.1);
  text-align: left;
  text-shadow: 0 0 5px rgba(100, 243, 255, 0.2);
}

.chart-container {
  width: 100%;
  height: 260px; /* 与柱状图保持相同高度 */
  position: relative;
  z-index: 1;
}

/* 背景网格光效（与柱状图一致） */
.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(100, 243, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 243, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: -1;
}

/* 响应式调整（与柱状图完全一致） */
@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
  
  .monthly-satisfaction-pie {
    padding: 15px;
  }
}
</style>