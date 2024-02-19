<template>

<section class=" flex justify-center items-center  text-gray-700 bg-gradient-to-b from-gray-900 from-25% to-gray-950  xl:h-screen ">
 
  <login v-if="!$store.state.showResetPassword && !$store.state.showRegister && !$store.state.showTokenPage"></login>
    <resetPassword  v-if="$store.state.showResetPassword"></resetPassword>
    <registerComponent v-if="$store.state.showRegister"></registerComponent>
    <TokenLogin v-if="$store.state.showTokenPage"></TokenLogin>
</section>
</template>
<script>
import login from '@/auth/components/loginComponent.vue'
import resetPassword from '@/auth/components/passwordResetComponent.vue'
import registerComponent from '@/auth/components/registerComponent.vue'
import TokenLogin from '@/auth/components/tokenLoginComponent.vue'
export default {
  name:'AppLogin',
  components:{
    login,resetPassword,registerComponent,TokenLogin
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