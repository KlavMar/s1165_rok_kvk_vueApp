<template>
  <navComponent></navComponent>

<main class="">
  <router-view/>
</main>
<footerComponent></footerComponent>



</template>
<script>

import navComponent from '@/components/ui/nav.vue'
import footerComponent from '@/components/ui/footer.vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'
export default{
  components:{
    navComponent,footerComponent
  },
  data(){
    return {
   url_api :`${process.env.VUE_APP_URL_API}`,
    }
  
  },
  created() {
  let token = VueCookies.get('jwt_token');
  if (token) {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.$store.commit('setLoggedIn',true)
      console.log(token);
    } catch (error) {
      localStorage.clear();
      sessionStorage.clear();
      VueCookies.remove('jwt_token');
      VueCookies.remove('user_id');
      this.$store.commit('setLoggedIn',false)
      this.$router.push({name:'home'});
    }
  } else {
  
      localStorage.clear();
      sessionStorage.clear();
      VueCookies.remove('jwt_token');
      VueCookies.remove('user_id');
      this.$store.commit('setLoggedIn',false)
      this.$router.push({name:'home'});
  }
},
  methods:{



    },
  

}</script>


<style>
html {
  scroll-behavior: smooth;

}
</style>
