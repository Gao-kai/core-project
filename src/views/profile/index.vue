<template>
  <div>
    <van-nav-bar title="个人中心" />
    <div class="user">
      <!-- 登录前 -->
      <template v-if="!$store.state.user.hasPermission">
        <img src="@/assets/logo.png" alt="" />
        <van-button type="info" to="/login">登录</van-button>
      </template>

      <!-- 已登录 -->
      <template v-else>
        <img src="@/assets/logo.png" alt="" />
        <span>用户名：{{ $store.state.user.username }}</span>
      </template>
    </div>

    <div v-if="$store.state.user.menuPermission">
      <van-tabs v-model="active">
        <div v-for="item in $store.state.user.authList" :key="item.auth">
          <van-tab :title="item.name" :to="item.path"> </van-tab>
        </div>
      </van-tabs>
      <router-view></router-view>
    </div>

    <div>
        <van-button type="primary" v-permissionBtn ="'edit'">编辑</van-button>
        <van-button type="info" v-permissionBtn="'remove'">删除</van-button>
    </div>
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
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 100px;
    height: 100px;
  }
}
</style>