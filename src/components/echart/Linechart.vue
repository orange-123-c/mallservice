<template>
  <div class="line-chart-container">
    <!-- 图表标题 -->
    <h3 class="chart-title" v-if="title">{{ title }}</h3>
    
    <!-- 图表容器 -->
    <div class="line-chart" ref="chartRef"></div>
    
    <!-- 数据信息卡片（可通过props控制显示） -->
    <div class="chart-stats" v-if="showStats">
      <div class="stat-item">
        <span class="stat-label">平均值</span>
        <span class="stat-value">{{ averageValue.toFixed(1) }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">最大值</span>
        <span class="stat-value">{{ maxValue }}</span>
        <span class="stat-time">({{ maxValueLabel }})</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">最小值</span>
        <span class="stat-value">{{ minValue }}</span>
        <span class="stat-time">({{ minValueLabel }})</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">总计</span>
        <span class="stat-value">{{ totalValue.toFixed(0) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  // 核心必填参数
  data: { type: Array, required: true },
  xAxis: { type: Array, required: true },
  
  // 可选配置参数
  yLabel: { type: String, default: '' },
  title: { type: String, default: '' },
  seriesName: { type: String, default: '数据系列' },
  lineColor: { type: String, default: '#409eff' },
  showStats: { type: Boolean, default: true },
  height: { type: [String, Number], default: '400px' },
  decimalPlaces: { type: Number, default: 0 }
});

// 核心变量
const chartRef = ref(null);
let chartInstance = null;

// 数据统计计算
const averageValue = computed(() => {
  if (props.data.length === 0) return 0;
  return props.data.reduce((sum, val) => sum + val, 0) / props.data.length;
});
const maxValue = computed(() => props.data.length > 0 ? Math.max(...props.data) : 0);
const minValue = computed(() => props.data.length > 0 ? Math.min(...props.data) : 0);
const totalValue = computed(() => props.data.reduce((sum, val) => sum + val, 0));
const maxValueLabel = computed(() => {
  if (props.data.length === 0) return '';
  const maxIndex = props.data.indexOf(maxValue.value);
  return props.xAxis[maxIndex] || '';
});
const minValueLabel = computed(() => {
  if (props.data.length === 0) return '';
  const minIndex = props.data.indexOf(minValue.value);
  return props.xAxis[minIndex] || '';
});

// 初始化图表
const initChart = () => {
  // 销毁已有实例
  if (chartInstance) chartInstance.dispose();
  
  // 创建新实例
  chartInstance = echarts.init(chartRef.value);
  
  // 图表配置项（简化核心功能）
  const option = {
    grid: { left: '5%', right: '10%', bottom: '5%', top: '18%', containLabel: true },
    legend: { show: true, data: [props.seriesName], textStyle: { fontSize: 12 }, top: 0, right: 20 },
    xAxis: {
      type: 'category',
      data: props.xAxis,
      axisLabel: { fontSize: 12, color: '#606266', rotate: props.xAxis.length > 10 ? -45 : 0 },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      name: props.yLabel,
      nameTextStyle: { color: '#606266', fontSize: 12 },
      axisLabel: {
        fontSize: 12,
        color: '#606266',
        formatter: (value) => value.toLocaleString(undefined, {
          minimumFractionDigits: props.decimalPlaces,
          maximumFractionDigits: props.decimalPlaces
        })
      },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.05)', type: 'dashed' } },
      scale: true,
      boundaryGap: [0.05, 0.05]
    },
    series: [{
      name: props.seriesName,
      data: props.data,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      showSymbol: false,
      emphasis: { showSymbol: true, symbolSize: 10 },
      lineStyle: { width: 3, color: props.lineColor, shadowColor: `${props.lineColor}33`, shadowBlur: 10 },
      itemStyle: { color: props.lineColor, borderColor: '#fff', borderWidth: 2 },
      animation: true,
      animationDuration: 1500,
      markPoint: {
        data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }],
        label: { fontSize: 10 }
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
        lineStyle: { type: 'dashed', color: '#ff9f43' }
      }
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(64, 158, 255, 0.2)',
      borderWidth: 1,
      textStyle: { color: '#303133', fontSize: 12 },
      formatter: (params) => {
        const param = params[0];
        const value = param.value.toLocaleString(undefined, {
          minimumFractionDigits: props.decimalPlaces,
          maximumFractionDigits: props.decimalPlaces
        });
        return `${param.name}<br/>${props.yLabel}: ${value}`;
      },
      padding: 12,
      borderRadius: 6,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
    }, {
      type: 'slider',
      bottom: 0,
      height: 20,
      handleStyle: { color: props.lineColor, borderColor: props.lineColor }
    }]
  };
  
  chartInstance.setOption(option);
};

// 生命周期与监听
onMounted(() => {
  nextTick(() => {
    initChart();
    const resizeObserver = new ResizeObserver(() => chartInstance?.resize());
    if (chartRef.value) resizeObserver.observe(chartRef.value);
    
    onUnmounted(() => {
      resizeObserver.disconnect();
      chartInstance?.dispose();
    });
  });
});

watch([() => props.data, () => props.xAxis, () => props.lineColor], () => {
  nextTick(initChart);
}, { deep: true });
</script>

<style scoped>
.line-chart-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
position: relative;
top: 0px;
  padding: 20px;
}

.chart-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.line-chart {
  width: 100%;
  height: v-bind(height);
}

.chart-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.stat-time {
  font-size: 12px;
  color: #606266;
  margin-left: 6px;
}
</style>