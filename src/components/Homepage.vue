<template>
  <div class="home-page">
    <!-- 轮播容器：传入幻灯片总数 -->
    <HomeCarousel :slidesCount="5">
      <!-- 插入5个独立幻灯片组件 -->
      <SlideCoreValue />
      <slide2></slide2>

<slide3></slide3>
<slide4></slide4>
<slide6></slide6>


    </HomeCarousel>








  </div>
</template>

<script setup>
import HomeCarousel from './HomeCarousel.vue';
import SlideCoreValue from '../components/slides/SlideCoreValue.vue';
import slide3 from './slides/slide3.vue';
import slide4 from './slides/slide4.vue';
import slide5 from './slides/slide5.vue';
import slide6 from './slides/slide6.vue';

import slide2 from './slides/slide2.vue';
// import slide5 from './slides/slide3.vue';

</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>