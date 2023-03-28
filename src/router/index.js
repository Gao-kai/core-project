import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/index.vue";
// import Lesson from '@/views/lesson/index.vue';
// import Profile from '@/views/profile/index.vue';

import Loadable from "@/utils/loadable.js";
import routerHooks from "./routerHooks.js";

Vue.use(VueRouter);

/* 自动生成路由 不建议自动配置 这样子可配置性比较低 比如钩子 批注无法搞 */
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/lesson",
    name: "lesson",
    /* 
      直接使用路由懒加载 虽然会有效果 但是会出现白屏 因为先加载js再进行渲染
      这里基于Vue中的异步组件工厂函数进行优化
      传入一个懒加载路由的函数 返回一个对象 可以帮助我们实现切换组件等待加载的过程中页面loading
      不至于让用户使用白屏等待
    */
    component: Loadable(() => import("@/views/lesson/index.vue")),
    meta:{
      needLogin:true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Loadable(() => import("@/views/profile/index.vue")),
  },
  {
    path: "/login",
    name: "login",
    component: Loadable(() => import("@/views/login/index.vue")),
  },
  {
    path: "/register",
    name: "register",
    component: Loadable(() => import("@/views/register/index.vue")),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

/* 
  添加全局路由钩子
*/
Object.values(routerHooks).forEach((hook) => {
  router.beforeEach(hook);
});

/* 
  后续再有其他钩子接着放
  Object.values(routerHooks).forEach(hook=>{
    router.beforeEnter(hook);
  })

*/

export default router;
