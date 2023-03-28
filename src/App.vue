<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/lesson">课程</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/profile">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less">
// 这里可以覆盖UI组件库的样式
#app {

  .van-dropdown-menu__bar{
    background-color: @background;
    width: 150px;
  }

}

* {
  margin: 0;
  padding: 0;
}

</style>
