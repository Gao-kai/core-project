import * as types from "../../action-types.js";
import { getSlideList } from "@/api/home.js";

const homeActions = {
  async [types.SET_SLIDES]({ commit }, payload) {
    try {
      //   发起api请求
      let slideList = await getSlideList();
      console.log("slideList---res", slideList);
      slideList = ["a", "b", "c", "d"];

      // 请求返回 提交一个mutations
      commit(types.SET_SLIDES, slideList);
    } catch (error) {
        console.log(error)
    }
  },
};

export default homeActions;
