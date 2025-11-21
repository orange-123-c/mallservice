<template>
  <div class="sales-chart-container">
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
  { label: '日销售', value: 'day' },
  { label: '周销售', value: 'week' },
  { label: '月销售', value: 'month' }
];

// 生成模拟数据
const generateData = (type) => {
  switch(type) {
    case 'day':
      return {
        xData: Array.from({length: 12}, (_, i) => `${i+9}点`),
        salesData: Array.from({length: 12}, () => Math.floor(Math.random() * 5000 + 1000)),
        growthData: Array.from({length: 12}, () => (Math.random() * 20 - 10).toFixed(1))
      };
    case 'week':
      return {
        xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        salesData: Array.from({length: 7}, () => Math.floor(Math.random() * 30000 + 5000)),
        growthData: Array.from({length: 7}, () => (Math.random() * 20 - 10).toFixed(1))
      };
    case 'month':
      return {
        xData: Array.from({length: 30}, (_, i) => `${i+1}日`),
        salesData: Array.from({length: 30}, () => Math.floor(Math.random() * 40000 + 8000)),
        growthData: Array.from({length: 30}, () => (Math.random() * 20 - 10).toFixed(1))
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
  const { xData, salesData, growthData } = generateData(currentPeriod.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { color: '#333' },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e6e6e6',
      formatter: function(params) {
        let result = params[0].name + '<br/>';
        params.forEach(item => {
          if (item.seriesName === '销售额') {
            result += `${item.seriesName}: ${item.value.toLocaleString()} 元<br/>`;
          } else {
            result += `${item.seriesName}: ${item.value}%<br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['销售额', '增长率'],
      top: 0,
      right: 0,
      textStyle: { color: '#666', fontSize: 12 }
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '3%',
      top: '22%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: { lineStyle: { color: '#e6e6e6' } },
      axisLabel: { color: '#666', fontSize: 12 }
    },
    yAxis: [
      {
        type: 'value',
        name: '销售额（元）',
        nameTextStyle: { color: '#666', fontSize: 12 },
        axisLine: { lineStyle: { color: '#e6e6e6' } },
        axisLabel: { 
          color: '#666', 
          fontSize: 12,
          formatter: '{value}'
        },
        splitLine: { lineStyle: { color: '#f5f5f5' } }
      },
      {
        type: 'value',
        name: '增长率（%）',
        nameTextStyle: { color: '#666', fontSize: 12 },
        axisLine: { lineStyle: { color: '#e6e6e6' } },
        axisLabel: { 
          color: '#666', 
          fontSize: 12,
          formatter: '{value}%'
        },
        splitLine: { show: false },
        min: -10,
        max: 10
      }
    ],
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: salesData,
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5b8ff9' },
            { offset: 1, color: '#3b82f6' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#409eff' },
              { offset: 1, color: '#1e40af' }
            ])
          }
        },
        label: {
          show: false,
          position: 'top',
          color: '#666',
          fontSize: 11,
          formatter: '{c}'
        }
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        data: growthData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, color: '#f59e0b' },
        itemStyle: { 
          color: '#f59e0b',
          borderColor: '#fff',
          borderWidth: 2
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ yAxis: 0, lineStyle: { color: '#e6e6e6', type: 'dashed' } }]
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
.sales-chart-container {
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