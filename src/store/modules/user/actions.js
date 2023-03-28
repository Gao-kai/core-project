import * as types from "@/store/action-types.js";
import { login, validate } from "@/api/user.js";
import permissionRouteList from "@/router/permission.js";
import router from "@/router/index.js";

const userActions = {
  async [types.SET_LOGIN]({ commit }, payload) {
    // 发起ajax的login请求 获取到用户信息
    try {
      let userInfo = login(payload);
      userInfo = {
        token: (Math.random() * 0xffff).toString(16),
        username: "lilei",
        authList: [
          {
            auth: "points",
            name: "查看积分",
            path: "/user/points",
          },
          {
            auth: "collections",
            name: "查看收藏",
            path: "/user/collections",
          },
        ],
      };
      console.log("获取到login结果,开始commit", userInfo);
      //   提交mutation 进行存储用户信息
      commit(types.SET_USER, userInfo);
      commit(types.SET_PERMISSION, true);
    } catch (error) {
      console.log(error);
    }
  },
  async [types.VALIDATE]({ commit }, payload) {
    console.log("用户登录权限校验");

    // 缓存中都没有 那么直接返回false
    if (!localStorage.getItem("usertoken")) {
      console.log("当前用户没有token 无需校验");
      return false;
    }

    // 如果有 那么校验下是否过期 并重新拉取用户权限
    // 这里不直接把token当做参数传递 而是使用请求头的authrization实现
    try {
      let res = await validate();
      res = {
        token: (Math.random() * 0xffff).toString(16),
        username: "lilei",
        authList: [
          {
            auth: "points",
            name: "查看积分",
            path: "/profile/points",
          },
          {
            auth: "collections",
            name: "查看收藏",
            path: "/profile/collections",
          },
        ],
      };
      console.log("校验结果成功,开始commit", res);
      //   提交mutation 进行存储用户信息
      commit(types.SET_USER, res);
      commit(types.SET_PERMISSION, true);
      return true;
    } catch (error) {
          //   提交mutation 进行存储用户信息
      commit(types.SET_USER, {});
      commit(types.SET_PERMISSION, false);
      return false;
    }
  },

  // 动态添加菜单权限路由
  async [types.ADD_ROUTE]({ commit,state }, payload) {
    
    // 先获取到后端返回的当前登录用户的authList 这不是路由
    let authList = state.authList;
    console.log('authList',authList);

    // 然后和前端自定义好的权限路由进行匹配 找出符合要求的路由
    console.log('permissionRouteList',permissionRouteList)

    // 过滤出可以添加到vue router中的符合格式的路由
    const filterRoutes = filterRouter(authList,permissionRouteList);
    console.log('filterRoutes',filterRoutes)

    // 找到要添加的父路由实例 
    const route = router.options.routes.find(item=>item.path === '/profile');
    if(route){
        // 动态添加路由 这是当前路由的子路由 vue-router自己会根据路由路径识别出父子关系
        route.children =  route.children?.length ?  [...route.children,filterRoutes]:filterRoutes
        router.addRoutes([route]);
    }
    console.log(router);

    // 动态添加路由完成之后 开始提交SET_MENU_PERMISSION 设置用户菜单权限ok
    commit(types.SET_MENU_PERMISSION,true);
  }
};


/* 
    1. 扁平化循环
    2. 递归
*/
function filterRouter(authList,permissionRouteList){
    let auths = authList.map(item=>item.auth);

    function loop(permissionRouteList){
        let res = permissionRouteList.filter(route=>{
            // 如果返回的权限列表中auth存在前端的permission中
            if(auths.includes(route.meta.auth)){
                if(route.children){
                    // 递归
                    route.children = loop(route.children);
                }
                return route;
            }
        })

        return res;
    }

    return loop(permissionRouteList);
}

export default userActions;
