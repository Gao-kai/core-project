const userState = {
   username:"",
   hasPermission:false, // 用户权限

   token:"",

   authList:[], // 菜单权限列表
   menuPermission:false,

   btnPermission:['remove','edit'] // 按钮权限列表
}

export default userState;