<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()" />
    <FormSubmit @submit="submit"></FormSubmit>
  </div>
</template>

<script>
import FormSubmit from "../../components/form-submit.vue";
import { createNamespacedHelpers } from "vuex";
let { mapActions } = createNamespacedHelpers("user");
import { Dialog } from "vant";
import * as types from "@/store/action-types.js";


export default {
  components: {
    FormSubmit,
  },
  methods: {
    ...mapActions([types.SET_LOGIN]),

    async submit(values) {
      try {
        console.log("开始登录", values);
        await this[types.SET_LOGIN](values);
       setTimeout(()=>{
        this.$router.push('/profile');
       },1000)
      } catch (error) {
        Dialog.alert({
          title: "登录失败",
          message: error
        });
      }
    },
  },
};
</script>

<style>
</style>