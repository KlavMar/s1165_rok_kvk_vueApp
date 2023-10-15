<template>
  <div class="max-w-2xl mx-auto relative">

    <nav class="grid grid-cols-12 gap_6 items-center justify-center">
      <router-link  :to="{ name: 'home' }" :class="`${className}`">Objective</router-link> 
        <router-link  :to="{ name: 'calendar' }" :class="`${className}`">Calendar Kvk</router-link> 
        <router-link  :to="{ name: 'ocr' }" :class="`${className}`">Scan to Hall of Fame</router-link> 

        <!-- <button class="bg-gradient-to-br from-red-500 to-orange-500 p-2 m-2 rounded-lg text-white " @click="logout">Logout</button> -->
    </nav>

  <router-view/>
</div>
</template>
<script>


export default{

  data(){
    return {
      className:"p-2 m-2 bg-gradient-to-br from-green-500 via-teal-500 to-emerald-500 text-2xl font-bold bg-clip-text text-transparent col-span-12 xl:col-span-3 "
    }
  
  },
  methods:{
    logout() {
      // Supprimez toutes les données du localStorage
      localStorage.clear();
      
      // Redirigez l'utilisateur vers la page de connexion (ou une autre page de votre choix)
      this.$router.push({ name: 'login' });
    }
  }

}</script>


<style>

</style>
