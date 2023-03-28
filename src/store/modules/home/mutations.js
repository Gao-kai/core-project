import * as types from "../../action-types.js";

const homeMutations = {
    [(types.SET_SELECT_VALUE)](state,payload){
        state.selectValue = payload;
    },
    [(types.SET_SLIDES)](state,payload){
        state.slides = payload;
    }
};

export default homeMutations;