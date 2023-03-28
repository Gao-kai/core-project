import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 入口文件处注入一段脚本 基于手机屏幕宽度动态的去计算根html字体大小
import 'lib-flexible';

Vue.config.productionTip = false

import directives from '@/utils/directives.js'
/* 
  注入全局指令
*/
Object.entries(directives).forEach(([id,define])=>{
  Vue.directive(id,define);
})


// 导入UI组件库 
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
