/* 
    定义引起state改变的mutation的名称
*/

export const SET_SELECT_VALUE = 'SET_SELECT_VALUE';

export const SET_SLIDES = 'SET_SLIDES';

/* 
    取消请求相关
*/

export const SET_TOKEN = 'SET_TOKEN';

export const CLEAR_TOKEN = 'CLEAR_TOKEN';


/* 
    登录相关
*/
export const SET_LOGIN = 'SET_LOGIN'; // ACTION 点击登录时

export const SET_USER = 'SET_USER'; // 登录完成之后更改用户存储信息

export const SET_PERMISSION = 'SET_PERMISSION'; // 更改权限 mutation

export const VALIDATE = 'VALIDATE'; // 校验权限 action


/* 
    动态添加路由
*/
export const ADD_ROUTE = 'ADD_ROUTE'; // 动态添加路由 actions

export const SET_MENU_PERMISSION = 'SET_MENU_PERMISSION'; // 添加菜单权限