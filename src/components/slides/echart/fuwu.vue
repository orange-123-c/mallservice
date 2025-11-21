<template>
  <div class="radar-chart-container">
    <div ref="radarChartRef" class="radar-chart-content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

// 图表容器引用
const radarChartRef = ref(null)
let chartInstance = null

// 服务时段分布数据
const radarData = {
  // 各个服务类型
  indicator: [
    { name: '咨询', max: 600 },
    { name: '导购', max: 600 },
    { name: '售后', max: 600 },
    { name: '退换', max: 600 },
    { name: '投诉', max: 600 },
    { name: '其他', max: 600 }
  ],
  // 两组数据：实际值和目标值
  series: [
    {
      name: '实际',
      data: [380, 420, 350, 280, 220, 310],
      itemStyle: { color: 'rgba(0, 180, 255, 0.8)' }
    },
    {
      name: '目标',
      data: [450, 500, 400, 350, 300, 380],
      itemStyle: { color: 'rgba(255, 180, 0, 0.8)' }
    }
  ]
}

// 初始化雷达图
const initRadarChart = () => {
  // 销毁已有实例
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  // 创建新实例
  if (radarChartRef.value) {
    chartInstance = echarts.init(radarChartRef.value)
    
    // 配置图表
    const option = {
      backgroundColor: 'rgba(10, 25, 65, 0.95)',
    
      legend: {
        data: ['实际', '目标'],
        top: '3%',
        right: '4%',
        textStyle: {
          color: 'rgba(200, 220, 255, 0.8)',
          fontSize: 14
        },
        itemGap: 20,
        itemWidth: 12,
        itemHeight: 12
      },
      radar: {
        indicator: radarData.indicator.map(item => ({
          ...item,
          nameTextStyle: {
            color: 'rgba(200, 220, 255, 0.8)',
            fontSize: 13
          }
        })),
        center: ['50%', '30%'],
        radius: '35%',
        splitNumber: 3,
        // 雷达图轮廓线
        nameGap: 15,
        axisLine: {
          lineStyle: {
            color: 'rgba(50, 150, 255, 0.3)',
            width: 1
          }
        },
        // 分隔线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(50, 150, 255, 0.15)',
            type: 'dashed'
          }
        },
        // 填充区域样式
        splitArea: {
          areaStyle: {
            color: [
              'rgba(10, 30, 70, 0.5)',
              'rgba(10, 30, 70, 0.3)',
              'rgba(10, 30, 70, 0.1)'
            ]
          }
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(10, 25, 65, 0.95)',
        borderColor: 'rgba(50, 150, 255, 0.5)',
        borderWidth: 1,
        textStyle: { color: '#fff' },
        formatter: function(params) {
          return `${params.name}: ${params.value}`
        }
      },
      series: radarData.series.map((series, index) => ({
        name: series.name,
        type: 'radar',
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2.5,
          color: index === 0 ? 'rgba(0, 180, 255, 0.8)' : 'rgba(255, 180, 0, 0.8)',
          shadowColor: index === 0 ? 'rgba(0, 180, 255, 0.6)' : 'rgba(255, 180, 0, 0.6)',
          shadowBlur: 8
        },
        itemStyle: {
          color: series.itemStyle.color,
          borderColor: '#fff',
          borderWidth: 1.5,
          shadowColor: index === 0 ? 'rgba(0, 180, 255, 0.8)' : 'rgba(255, 180, 0, 0.8)',
          shadowBlur: 10
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: index === 0 ? 'rgba(0, 180, 255, 0.3)' : 'rgba(255, 180, 0, 0.3)' },
            { offset: 1, color: index === 0 ? 'rgba(0, 180, 255, 0)' : 'rgba(255, 180, 0, 0)' }
          ])
        },
        data: [series.data]
      }))
    }
    
    // 设置配置项
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
  initRadarChart()
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
watch(radarChartRef, () => {
  initRadarChart()
})
</script>

<style scoped>
.radar-chart-container {
  width: 100%;
  min-width: 200px;
  max-width: 600px;
  height: 400px;
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
.radar-chart-container::before {
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

.radar-chart-container::after {
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

/* 图表内容区域 */
.radar-chart-content {
  width: 100%;
  height: 100%;
}
</style>