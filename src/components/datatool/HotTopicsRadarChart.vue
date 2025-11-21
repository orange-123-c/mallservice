<template>
  <div class="hot-topics-radar-container">
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 响应式数据
const chartRef = ref(null);
const chartInstance = ref(null);

// 热门话题维度数据
const topicsData = {
  dimensions: [
    '促销活动', 
    '环境设施', 
    '品牌入驻', 
    '服务体验', 
    '停车便利', 
    '餐饮美食', 
    '娱乐活动'
  ],
  currentWeek: [85, 72, 90, 68, 60, 88, 75],
  lastWeek: [70, 65, 78, 72, 55, 75, 68]
};

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  
  // 创建图表实例
  chartInstance.value = echarts.init(chartRef.value);
  
  // 设置图表配置
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e6e6e6',
      textStyle: { color: '#333' },
      formatter: function(params) {
        return `${params.seriesName}<br/>${params.name}: ${params.value}分`;
      }
    },
    legend: {
      orient: 'horizontal',
      bottom: '-2%',
      right: '2%',
      textStyle: { color: '#666', fontSize: 12 },
      data: ['本周热度', '上周热度']
    },
    radar: {
      indicator: topicsData.dimensions.map(name => ({
        name,
        max: 100,
        min: 0
      })),
      shape: 'polygon',
      splitNumber: 4,
      name: {
        textStyle: {
          color: '#666',
          fontSize: 11
        }
      },
      splitLine: {
        lineStyle: {
          color: '#e6e6e6',
          type: 'dashed'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(255,255,255,0.1)', 'rgba(240,240,240,0.1)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    series: [
      {
        name: '本周热度',
        type: 'radar',
        data: [
          {
            value: topicsData.currentWeek,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(24, 144, 255, 0.4)' },
                { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
              ])
            },
            lineStyle: {
              color: '#1890ff',
              width: 2
            },
            itemStyle: {
              color: '#1890ff',
              borderColor: '#fff',
              borderWidth: 2
            },
            symbol: 'circle',
            symbolSize: 6
          }
        ]
      },
      {
        name: '上周热度',
        type: 'radar',
        data: [
          {
            value: topicsData.lastWeek,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(245, 158, 11, 0.4)' },
                { offset: 1, color: 'rgba(245, 158, 11, 0.1)' }
              ])
            },
            lineStyle: {
              color: '#f59e0b',
              width: 2,
              type: 'dashed'
            },
            itemStyle: {
              color: '#f59e0b',
              borderColor: '#fff',
              borderWidth: 2
            },
            symbol: 'circle',
            symbolSize: 6
          }
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
.hot-topics-radar-container {
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