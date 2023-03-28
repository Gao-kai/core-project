export default {
    // 指令的核心在于操作真实dom
    'permissionBtn':{
        inserted(el,bindings,vnode){
            // console.log(el,bindings,vnode);
            /* 获取用户传入的值  v-permissionBtn="remove"  remove就是值*/
            let value = bindings.value;
            /* 获取当前用户的按钮权限数组 vnode.context获取当前组件实例 */
            let permissions = vnode.context.$store.state.user.btnPermission;
            console.log(permissions)
            /* 判断是否保留 */
            if(!permissions.includes(value)){
                // 如果指令和权限不匹配 那么直接移除即可
                el.parentNode.removeChild(el);
            }
        }
    }
}