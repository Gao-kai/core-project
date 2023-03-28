import store from "@/store/index.js";
import * as types from "@/store/action-types.js";

export default {
    // 
    'clear_token': (to,from,next)=>{
        // 这边可以做一个白名单 哪些路由切换不需要取消请求 可以设置

        // 只要路由切换 就把正在请求的请求中止了
        console.log('路由切换取消token请求1次',to.path);
        store.commit(types.CLEAR_TOKEN);
       
        next();
    },

    /* 
        每次切换路由都需要进行路由级别的权限校验，好处在于：

        1. 用户登录之后将用户信息存在vuex中用于模板展示，一刷新状态没了
            为了让登录状态持久化 我们先假设每次进入到路由前都先向后端校验一下登录状态
            如果存在local中有token并且token没有过期 那么将用户信息刷新返回重新存入vuex
            如果local中没有token 说明压根没登录过 直接返回false 表示此用户未登录
            如果local中有token 但是过期了 此时后端返回401 前端重置vuex中存储的用户信息为空 返回false

        2. 为了实现有些页面比如lesson是登录之后才可以访问的，有些页面是任何状态都可以访问的
        3. 
    */
    'login_permission': async (to,from,next)=>{

        /* 
            获取当前要进入的页面是否需要登录才可以访问
            1. 可以访问 那么走next
            2. 不可以访问 那么走到登录页让用户去登录
        */
        const isNeedLogin = to.matched.some((item)=>item.meta.needLogin);

        /* 
            检查用户是否已经为登录态
            如果hasPermissio为true 那么就认为此用户已经登录过了
        */
        const hasPermission = store.state.user.hasPermission;


        /* 如果用户已登录 */
        if(hasPermission){
            //  当前要访问的路由页面是登录页 那么就没必要再去了 让他去个人中心
            if(to.name === 'login'){
                next('/profile')
            }else{
                // 如果要去其他页面 就让他去就好了
                next();
            }
        }else{
            /* 如果用户未登录 */

            // 1. 首先重新validate下用户信息 刷新下vuex中的登录信息 这里不是login 是校验
            let validateLoginSussess = await store.dispatch(`user/${types.VALIDATE}`);

            // 如果即将要访问的页面必须需要登录才可以访问
            if(isNeedLogin){
                // 并且我校验登录是ok的 那么让你去这个页面
                if(validateLoginSussess){
                    next();
                }else{
                    // 我校验登录是不ok的 那么我强制让你去登录页 因为这个页面只有登录才可以看
                    next('/login');
                }
            }else{
                // 如果即将访问的野蛮不需要登录也可以访问 但是这个页面是登录页
                if(to.name === 'login'){
                    // 如果校验已经登录ok 那么还去登录页干嘛 给你拦截去个人中心
                    if(validateLoginSussess){
                        next('/profile')
                    }else{
                        // 如果没登录 那就放你去登录
                        next();
                    }
                }else{
                    // 如果你要去其他页面 那就去 因为不需要登录就可以访问
                    next();
                }
            }
            
        }
    },
    // 这里主要是动态的添加路由权限
    'menu_permission': async (to,from,next)=>{
        
        const hasPermission = store.state.user.hasPermission;
        if(hasPermission){
            // 必须登录才可以动态添加菜单权限
            if(store.state.user.menuPermission){
                // 如果用户已经有了菜单权限 那么不处理
                console.log('2222')
                next();
            }else{
                // 没有才需要动态添加
                await store.dispatch(`user/${types.ADD_ROUTE}`);
                console.log('111')
                next({
                    ...to,
                    replace:true
                });
            }
        }else{
            // 用户没登录 不需要处理就好了
           
            next();
        }
    }
}
