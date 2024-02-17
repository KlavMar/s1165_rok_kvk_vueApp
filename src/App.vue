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
  mounted() {
  // Vérifiez si le token existe

  if (!this.$cookies.get('jwt_token')) {
    // Effacez les données stockées en local et redirigez vers la page d'accueil
    localStorage.clear();
    sessionStorage.clear();
    this.$cookies.remove('jwt_token');
    this.$cookies.remove('user_id');
    this.$store.commit('setLoggedIn', false);
    this.$router.push({ name: 'home' });
  }

  else{
    
    this.$store.commit('setLoggedIn', true);
  }

  axios.defaults.headers.common['api-key'] = process.env.VUE_APP_API_KEY;
 // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://s1165.riseofstat.com';

},
  methods:{



    },
  

}</script>


<style>
html {
  scroll-behavior: smooth;

}
</style>
