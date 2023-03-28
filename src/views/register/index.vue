<template>
  <div>
    <van-nav-bar title="注册" @click-left="$router.back()"/>
    <FormSubmit @submit="submit"></FormSubmit>
  </div>
</template>

<script>
import FormSubmit from '../../components/form-submit.vue';
export default {
  components:{
    FormSubmit
  },
  methods:{
    submit(values){
      console.log('注册',values);
    }
  }

}
</script>

<style>

</style>