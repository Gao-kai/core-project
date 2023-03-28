<template>
  <div>
    <!-- 不可以将vuex中的数据直接传递给v-model 需要通过计算属性做一层代理 -->
    <!-- <HomeHeader :value="currentSelectedValue" @input="input"></HomeHeader> -->
    <!-- 
        等价于:
        将自己的属性value绑定传递给子组件home-header
        并监听子组件发射来的自定义事件change
        这里还有一个自动的点：当监听到change事件触发的时候，会自动将change事件携带的参数赋值给value

        父 = > 子 value
        子 = > 父 change emit params
        父 => value = params

        <HomeHeader v-model="value"></HomeHeader>
    -->
    <HomeHeader v-model="currentSelectedValue"></HomeHeader>
    vuex中的数据：selectValue{{ selectValue }}

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <div v-for="item in slides" :key="item">
        <van-swipe-item>{{ item }}</van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
import HomeHeader from "./home-header.vue";

/**
 * createNamespacedHelpers是一个vuex提供的专门用于我们快捷取到store中值的api
 * 它接收一个模块名称作为参数，返回一个对象，对象上有对应的mapState、mapActions等方法
 *
 * mapState接收一个对应模块内部state对象的key组成的数组作为参数，等于是一个$store.state.xxx的语法糖
 * 包装在计算属性之后 我们就可以在模板中快捷取值了
 */
import * as types from "@/store/action-types.js";
import { createNamespacedHelpers } from "vuex";

let {
  mapState: mapHomeState,
  mapMutations: mapHomeMutations,
  mapActions: mapHomeActions,
} = createNamespacedHelpers("home");

export default {
  components: {
    HomeHeader,
  },
  data() {
    return {
      value: -1,
    };
  },
  computed: {
    ...mapHomeState(["selectValue", "slides"]),
    currentSelectedValue: {
      get() {
        return this.selectValue;
      },
      set(value) {
        // 等价于 this.$store.commit(types.SET_SELECT_VALUE,payload) 因为有了mapMutations方法 才方便调用了
        this[types.SET_SELECT_VALUE](value);
      },
    },
  },
  methods: {
    input(newValue) {
      console.log("input事件触发");
      this.value = newValue;
    },
    // 等于返回了一个对象{[types.SET_SELECT_VALUE]:function(state,payload){}} 然后解构
    ...mapHomeMutations([types.SET_SELECT_VALUE]),
    ...mapHomeActions([types.SET_SLIDES]),
  },
  mounted() {
    // 如果有slides 就别请求了 直接去vuex中取值 对于这种静态资源这其实是一个优化
    if (this.slides.length == 0) {
      // dispatch一个action 发起异步请求 并将请求的结果存放到vuex的state 然后在页面取值
      this[types.SET_SLIDES]();
    }
  },
};
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>