<template>
  <div class="chart-container">
    <!-- ECharts图表容器 - 整体容器包含图例和图表内容 -->
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 图表容器引用
const chartRef = ref(null)
let chartInstance = null

// 模拟数据
const chartData = {
  xAxis: ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'],
  series: [
    {
      name: '热力',
      data: [240, 260, 230, 300, 350, 420, 580, 620, 550, 480, 520, 450],
      type: 'line',
      lineStyle: { width: 3 },
      itemStyle: { radius: 6 }
    },
    {
      name: '常规',
      data: [200, 220, 190, 250, 280, 320, 380, 420, 380, 350, 360, 320],
      type: 'line',
      lineStyle: { width: 2 },
      itemStyle: { radius: 5 }
    }
  ]
}

// 初始化图表
const initChart = () => {
  // 销毁已有实例
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  // 创建新实例
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    
    // 配置图表 - 确保完全填充容器
    const option = {
      // 深蓝色科技感背景
      backgroundColor: 'rgba(10, 25, 65, 0.95)',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 25, 65, 0.95)',
        borderColor: 'rgba(50, 150, 255, 0.5)',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        formatter: function(params) {
          return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value}`
        }
      },
      // 添加ECharts内置图例
      legend: {
        data: ['热力', '常规'],
        top: '5%',
        left: 'center',
        textStyle: {
          color: 'rgba(200, 220, 255, 0.9)',
          fontSize: 14
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
        // 图例项的样式
        formatter: function(name) {
          return name;
        }
      },
      // 调整网格使图表完全填充，预留图例空间
      grid: {
        left: '5%',
        right: '5%',
        top: '15%',  // 为图例预留空间
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: chartData.xAxis,
        axisLine: {
          lineStyle: { color: 'rgba(50, 150, 255, 0.3)' }
        },
        axisTick: {
          lineStyle: { color: 'rgba(50, 150, 255, 0.3)' }
        },
        axisLabel: {
          color: 'rgba(200, 220, 255, 0.8)',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: { color: 'rgba(50, 150, 255, 0.3)' }
        },
        axisTick: {
          lineStyle: { color: 'rgba(50, 150, 255, 0.3)' }
        },
        axisLabel: {
          color: 'rgba(200, 220, 255, 0.8)',
          fontSize: 12
        },
        splitLine: {
          lineStyle: { 
            color: 'rgba(50, 150, 255, 0.1)',
            type: 'dashed'
          }
        }
      },
      series: chartData.series.map((series, index) => {
        const baseSeries = { ...series }
        
        if (index === 0) {
          // 热力线样式
          baseSeries.lineStyle = {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#00c8ff' },
              { offset: 0.5, color: '#ffcc00' },
              { offset: 1, color: '#ff6600' }
            ])
          }
          baseSeries.itemStyle = {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#00c8ff' },
              { offset: 1, color: '#ff6600' }
            ]),
            shadowColor: 'rgba(255, 200, 0, 0.8)',
            shadowBlur: 10
          }
          baseSeries.areaStyle = {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 200, 0, 0.3)' },
              { offset: 1, color: 'rgba(255, 200, 0, 0)' }
            ])
          }
          // 图例标记样式
          baseSeries.legendSymbol = 'circle'
          baseSeries.legendSymbolSize = 12
        } else {
          // 常规线样式
          baseSeries.lineStyle = {
            color: 'rgba(50, 180, 255, 0.8)'
          }
          baseSeries.itemStyle = {
            color: 'rgba(50, 180, 255, 0.9)',
            shadowColor: 'rgba(50, 180, 255, 0.6)',
            shadowBlur: 8
          }
          // 图例标记样式
          baseSeries.legendSymbol = 'circle'
          baseSeries.legendSymbolSize = 12
        }
        
        return baseSeries
      })
    }
    
    // 设置配置项
    chartInstance.setOption(option)
    
    // 添加峰值标记
    const highestPoint = Math.max(...chartData.series[0].data)
    const highestIndex = chartData.series[0].data.indexOf(highestPoint)
    
    option.series[0].markPoint = {
      symbol: 'pin',
      symbolSize: 50,
      data: [{
        name: '峰值',
        value: '峰值',
        xAxis: highestIndex,
        yAxis: highestPoint,
        itemStyle: {
          color: '#ff6600',
          shadowColor: 'rgba(255, 102, 0, 0.8)',
          shadowBlur: 15
        },
        label: {
          color: '#fff',
          fontSize: 12
        }
      }]
    }
    
    chartInstance.setOption(option)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时清理
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

// 监听容器变化
watch(chartRef, () => {
  initChart()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  min-width: 300px;
  max-width: 800px;
  height: 260px;
  /* 深蓝色科技感背景 */
  background: linear-gradient(145deg, rgba(10, 25, 65, 0.98), rgba(15, 35, 85, 0.95));
  border: 1px solid rgba(50, 150, 255, 0.4);
  border-radius: 12px;
  box-shadow: 
    0 0 20px rgba(50, 150, 255, 0.2),
    inset 0 0 10px rgba(50, 150, 255, 0.1);
  overflow: hidden;
  position: relative;
}

/* 科技感边框装饰 */
.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(50, 150, 255, 0.6), 
    transparent);
}

.chart-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(50, 150, 255, 0.6), 
    transparent);
}

/* 图表内容区域 - 确保完全填充 */
.chart-content {
  width: 100%;
  height: 100%; /* 完全填充容器 */
  padding: 0; /* 移除内边距确保完全填充 */
}
</style>