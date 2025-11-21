<template>
  <div class="home-carousel">
    <!-- 轮播内容区 -->
    <div 
      class="carousel-slides" 
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
      ref="slidesContainer" 
    >
      <!-- 插槽：插入所有幻灯片组件 -->
      <slot></slot>
    </div>

    <!-- 轮播控制（底部滚轮） -->
    <div class="carousel-controls">
      <button 
        v-for="(item, index) in slidesCount" 
        :key="index" 
        class="control-dot"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      ></button>
    </div>

    <!-- 左右切换按钮 -->
    <button class="carousel-btn prev-btn" @click="prevSlide">
      <i class="btn-icon">←</i>
    </button>
    <button class="carousel-btn next-btn" @click="nextSlide">
      <i class="btn-icon">→</i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue';

// 接收幻灯片总数（从父组件传入）
const props = defineProps({
  slidesCount: {
    type: Number,
    required: true
  }
});

// 轮播状态
const currentIndex = ref(0);
let autoPlayTimer = null;
const slidesContainer = ref(null);  // 轮播容器DOM引用

// 自动播放逻辑（已禁用）
const startAutoPlay = () => {
  // 取消自动播放，清空定时器逻辑
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

// 重置当前幻灯片状态（核心功能）
const resetCurrentSlide = () => {
  // 获取当前激活的幻灯片DOM
  const slides = slidesContainer.value?.children || [];
  const currentSlide = slides[currentIndex.value];
  
  if (currentSlide) {
    // 1. 重置幻灯片自身滚动位置到顶部
    currentSlide.scrollTop = 0;
    
    // 2. 重置幻灯片内部所有可滚动元素
    const scrollableElements = currentSlide.querySelectorAll(
      'div, section, article, iframe'  // 常见可滚动元素
    );
    scrollableElements.forEach(el => {
      if (el.scrollHeight > el.clientHeight) {  // 只处理实际可滚动的元素
        el.scrollTop = 0;
      }
    });

    // 3. 可选：通知子组件执行自定义重置逻辑（如果子组件有需要）
    const slideComponent = currentSlide.__vueComponent__;
    if (slideComponent?.reset) {
      slideComponent.reset();  // 子组件可实现reset方法处理自身状态
    }
  }
};

// 切换幻灯片
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slidesCount) % props.slidesCount;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slidesCount;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

// 监听索引变化，自动重置当前页面
watch(currentIndex, () => {
  // 延迟执行，确保幻灯片切换动画完成后再重置
  setTimeout(resetCurrentSlide, 300);  // 时间可根据动画时长调整
});

// 初始化时重置第一页
onMounted(() => {
  // 初始加载完成后重置第一页
  setTimeout(resetCurrentSlide, 500);
});

onUnmounted(() => {
  stopAutoPlay();
});

// 暴露当前索引给父组件
defineExpose({ currentIndex });
</script>
<style scoped>
.home-carousel {
  position: relative;
  width: 100%;
  height: calc(100vh - 90px); 
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.carousel-slides {
  display: flex;
  height: 100%;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 轮播控制按钮 */
.carousel-controls {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;
}

.control-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgba(135,206,235);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.control-dot.active {
  background-color: blue;
  /* 移除放大效果 */
  box-shadow: 0 0 0 4px rgba(22, 93, 255, 0.2);
}

.control-dot:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.8);
  /* 移除放大效果 */
}

/* 左右切换按钮 */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: orange;
  backdrop-filter: blur(8px);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.home-carousel:hover .carousel-btn {
  opacity: 1;
}

.prev-btn {
  left: 30px;
}

.next-btn {
  right: 30px;
}

.carousel-btn:hover {
  background-color: orange;
  /* 移除放大效果，保留垂直居中 */
  transform: translateY(-50%);
}

.btn-icon {
  font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .home-carousel {
    height: calc(80vh - 90px);
  }
  
  .carousel-controls {
    bottom: 20px;
    gap: 10px;
  }
  
  .control-dot {
    width: 12px;
    height: 12px;
  }
  
  .carousel-btn {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
  
  .prev-btn {
    left: 2px;
  }
  
  .next-btn {
    right: 2px;
  }
}
</style>