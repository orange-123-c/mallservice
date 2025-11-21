<template>
  <div class="bar-chart" ref="chartRef"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  xAxis: {
    type: Array,
    required: true
  },
  maxValue: {
    type: Number,
    default: 1
  },
  format: {
    type: Function,
    default: null
  }
});

const chartRef = ref(null);
let chartInstance = null;

// 柱状图颜色数组
const barColors = [
  '#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399',
  '#c0c4cc', '#1890ff', '#722ed1', '#eb2f96', '#fa8c16'
];

// 初始化图表
const initChart = () => {
  // 销毁已有实例
  if (chartInstance) {
    chartInstance.dispose();
  }

  // 创建新实例
  chartInstance = echarts.init(chartRef.value);

  // 处理显示数据
  const displayData = props.data.map((value, index) => {
    return props.format ? props.format(value) : value;
  });

  // 配置项
  const option = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxis,
      axisLabel: {
        interval: 0,
        rotate: 30, // 标签旋转，防止重叠
        fontSize: 12,
        color: '#606266'
      },
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      max: props.maxValue,
      axisLabel: {
        fontSize: 12,
        color: '#606266',
        formatter: (value) => props.format ? props.format(value) : value
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    series: [
      {
        data: props.data,
        type: 'bar',
        itemStyle: {
          color: (params) => barColors[params.dataIndex % barColors.length],
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '60%', // 柱子宽度
        animation: true,
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 100 // 逐个动画延迟
      }
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(64, 158, 255, 0.2)',
      borderWidth: 1,
      textStyle: {
        color: '#303133'
      },
      formatter: (params) => {
        const value = props.format ? props.format(params.value) : params.value;
        return `${params.name}: ${value}`;
      },
      padding: 10
    }
  };

  chartInstance.setOption(option);
};

// 初始化与监听
onMounted(() => {
  // 确保DOM渲染完成
  setTimeout(initChart, 0);
  
  // 监听窗口大小变化，重绘图表
  window.addEventListener('resize', () => {
    chartInstance && chartInstance.resize();
  });
});

// 数据变化时重绘
watch([() => props.data, () => props.xAxis], initChart);
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>