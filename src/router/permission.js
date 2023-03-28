/* 
    这里导出的都是需要动态添加的路由
    需要和后端协商一一对应上
    这里必须和后端配合
*/
import Loadable from "@/utils/loadable.js";
export default [
  {
    path: "points",
    component: Loadable(() => import("@/views/others/points.vue")),
    meta: {
      auth: "points",
    },
  },
  {
    path: "collections",
    component: Loadable(() => import("@/views/others/collections.vue")),
    meta: {
      auth: "collections",
    },
  },
  {
    path: "students",
    component: Loadable(() => import("@/views/others/students.vue")),
    meta: {
      auth: "students",
    },
  },
  {
    path: "goods",
    component: Loadable(() => import("@/views/others/goods.vue")),
    meta: {
      auth: "goods",
    },
  },
];
