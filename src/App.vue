<template>
  <header>
    <navComponent></navComponent>
  </header>


<main class="relative">
  <router-view/>
</main>
<footerComponent></footerComponent>



</template>
<script>

import navComponent from '@/components/ui/nav.vue'
import footerComponent from '@/components/ui/footer.vue'
import axios from 'axios'

export default{
  components:{
    navComponent,footerComponent
  },
  data(){
    return {

    }
  
  },
  created() {
    const hasCookies = (document.cookie.includes('jwt_token') && document.cookie.includes('user_id')) || document.cookie.includes("governor_id");
    if ((!hasCookies && this.$store.state.isLoggedIn==false) || this.$route.path.startsWith("recruitment")){
      this.$router.push({name:"home"})
    }
    else{
      this.$store.commit('setLoggedIn', true);
    }


  axios.defaults.headers.common['api-key'] = process.env.VUE_APP_API_KEY;


},
  methods:{



    },
  

}</script>


<style>
html {
  scroll-behavior: smooth;

}
</style>
