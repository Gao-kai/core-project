import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules/index.js"
import * as types from "./action-types.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    tokens:[]
  },
  actions:{},
  mutations:{
    [types.SET_TOKEN](state,token){
      /* 
        希望状态可以被追踪 不要用push 而应该用...赋值的方法 为了状态被追踪
         state.tokens.push(payload);

         1.  [...state.tokens,token];
         2. 不要用tokens[0] = xxx 不会更新 应该采用vue.set(tokens，index，value)解决
      */

        //  保存token即可
      state.tokens = [...state.tokens,token];
      console.log('-----已经存入token',state.tokens)
    },
    [types.CLEAR_TOKEN](state){
      state.tokens.forEach(token=>token()); // 执行所有的取消方法
      state.tokens = [];
      console.log('-----已经取消token',state.tokens)
    }
  },
  modules:{
    ...modules
  }
})

console.log('store',store)
window.store = store;

export default store;