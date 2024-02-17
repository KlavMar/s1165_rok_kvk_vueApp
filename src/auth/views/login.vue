<template>

<section class="relative flex justify-center items-center bg-gray-900 h-screen  ">
 
  <login v-if="!$store.state.showResetPassword && !$store.state.showRegister"></login>
    <resetPassword  v-if="$store.state.showResetPassword"></resetPassword>
    <registerComponent v-if="$store.state.showRegister"></registerComponent>
</section>
</template>
<script>
import login from '@/auth/components/loginComponent.vue'
import resetPassword from '@/auth/components/passwordResetComponent.vue'
import registerComponent from '@/auth/components/registerComponent.vue'
export default {
  name:'AppLogin',
  components:{
    login,resetPassword,registerComponent
  },
  data() {
    return {

    }
  },
  methods: {
  },
};
</script>

<style scoped>


</style>