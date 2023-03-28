import * as types from "../../action-types.js";

const userMutations = {
    [types.SET_USER](state,payload){
        const {token,username,authList} = payload;
        console.log('获取到commit 开始修改state');

        state.username = username;
        state.token = token;
        state.authList = authList;

        if(token){
            localStorage.setItem('usertoken',token)
        }

    },
    [types.SET_PERMISSION](state,payload){
        console.log('获取到commit 开始修改state中的权限');

        state.hasPermission = payload;

    },
    [types.SET_MENU_PERMISSION](state,payload){
        console.log('获取到commit 开始修改菜单权限');
        state.menuPermission = payload;
    },
};

export default userMutations;