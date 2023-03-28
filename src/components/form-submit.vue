<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />

    <van-field
      v-if="isLogin"
      v-model="repassword"
      type="password"
      name="repassword"
      label="重复密码"
      placeholder="请再次输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px"  v-if="isLogin">
      <van-button round block type="info" native-type="submit">登录</van-button>
      <br></br>
      <van-button round block type="info" native-type="primary" to="/register">去注册</van-button>
    </div>

    <div style="margin: 16px"  v-if="isRegister">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>

<script>
export default {
    data(){
        return {
            username:"",
            password:"",
            repassword:"",
        }
    },
    methods:{
        onSubmit(values){
            this.$emit('submit',values)
        }
    },
    computed:{
        /* 子组件中通过路由来确定来自那个页面 */
        isLogin(){
            return this.$route.path === '/login';
        },
        isRegister(){
            return this.$route.path === '/register';
        }
    }
};
</script>

<style>
</style>