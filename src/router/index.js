// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router' // 替换为 createWebHashHistory
import Homepage from '@/components/Homepage.vue'
import aiznfk from '@/components/aiznfk.vue'
import Aboutus from '@/components/aboutus.vue'
import Login from '@/components/login.vue'
import Opinion from '@/components/opinion.vue'
import AR from '@/components/AR.vue'
import Flex from '@/components/flex.vue'
import MerchantRank from '@/components/MerchantRank.vue'
import Aifirend from '@/components/aifirend.vue'
import DataCockpit from '@/components/DataCockpit.vue'
import MembershipView from '@/components/slides/MembershipView.vue'
const routes = [
  { path: '/', component: Homepage },
    { path: '/homepage', component: Homepage },
    { path: '/aiznfk', component: aiznfk },     //ai智能反馈
        { path: '/about', component: Aboutus },   //关于我们
                { path: '/login', component: Login },  //登录/注册

                { path: '/opinion', component: Opinion },  //意见公示
                { path: '/ar', component: AR },    //ar智能导航
                                { path: '/flex', component: Flex },   //灵工资源池
                                { path: '/merchant-rank', component: MerchantRank },   //灵工资源池
                                { path: '/aifriend', component: Aifirend },   //ai客服中心
                                                                { path: '/aifriend', component: Aifirend },   //ai客服中心
                                                                { path: '/data-cockpit', component: DataCockpit },   //数据驾驶舱

                                                                { path: '/MembershipView', component: MembershipView },   //会员中心



  // 其他路由...
]

const router = createRouter({
  history: createWebHashHistory(), // 这里改为 Hash 模式
  routes
})

export default router