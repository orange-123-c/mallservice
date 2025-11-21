import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由配置


const app = createApp(App)
// 全局注册所有图标

app.use(router) // 必须注册路由！！！

app.mount('#app')