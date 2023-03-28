<template>
 <div style="padding-top:48px">
    <div class="home-header">
    <img src="../../assets/logo.png" alt="" />

    <van-dropdown-menu>
      <!-- <van-dropdown-item v-model="value" :options="option1" /> -->
      <van-dropdown-item :value="value" @change="change" :options="option" />
    </van-dropdown-menu>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
        option: [
        { text: "全部课程", value: -1 },
        { text: "React", value: 0 },
        { text: "Vue", value: 1 },
        { text: "Node", value: 2 },
      ],
    };
  },
  props: {
    value: Number,
  },
  methods: {
    change(newValue) {
        console.log('下拉框切换change',newValue)
      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="less">
    .home-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        background: @background;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0 20px;


        img{
            height: 48px;
        }
    }
</style>