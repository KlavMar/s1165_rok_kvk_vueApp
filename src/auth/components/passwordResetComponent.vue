<template>
<section class="">



<div class="flex flex-col items-center justify-between">
  <p class="text-xl text-gray-50 font-semibold m-3 p-2 w-full xl:w-1/4 leading-loose">
    Password reset please enter an email. If after 5 min you haven't received an email contact me by Discord or make a new request
  </p>


<p class="text-2xl p-2 m-2 font-bold text-red-200 text-center">{{ message }}</p>
  <input name="email" type="email" placeholder="Your mail" v-model="email"     
    class="p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent ">
   <div class="flex flex-row">
    <button type="submit" class="col-span-11 xl:col-span-4 btn  w-98
                    bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500
                    hover:bg-gradient-to-bl from-blue-500 to-blue-900
                    w-full px-5 py-3  m-2 rounded-lg text-gray-100 font-semibold  text-center" @click="resetPassword">Reset Password</button>
    <button @click="cancel" type="cancel" class="col-span-11 xl:col-span-4 btn 
                    bg-gradient-to-br from-red-500 via-pink-500 to-rose-500  w-98
                    hover:bg-gradient-to-bl from-red-500 to-red-900 
                    px-5 py-3  m-2  w-full rounded-lg text-gray-100 font-semibold  text-center"> Cancel</button>
   </div>

</div>

</section>
</template>
<script>
import axios from 'axios';

export default{
    name:"resetPassword",
    data(){
        return {
            email:'',
            message:'',

        }
    },

    methods:{
      resetPassword() {
      axios.post(`${process.env.VUE_APP_URL_API}authentification/password_reset/`, { email: this.email })
        .then(response => {this.message=response.data.message})
        .catch(error => {
          if (error.response.status === 400) {
            // Erreur 400 (Bad Request)
            this.message = error.response.data.errors.message
          } else {
            // Gérez d'autres erreurs HTTP ici
          }
        });
        
        return this.message
      },

            cancel(){
                 this.$store.commit('showResetPassword');
            }
    }
}

</script>

<style>

</style>