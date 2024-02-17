<template>

<div class="bg-transparent w-full xl:w-1/2  flex items-center justify-center" >
      
      <div class=" xl:max-w-2xl w-full  " >
        <p class="text-2xl p-2 m-2 font-bold text-red-200 text-center">{{ message }}</p>
          <div class="flex flex-col p-2 m-2 items-center grid grid-cols-12 gap-4">
                      <input autocomplete="off" id="username" name="username" type="text" v-model="username" 
                      class="col-span-12 p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent 
                      " 
                      placeholder="Your username" />
                
                      <input  name="password" id="password"  v-model="password"
                      class="col-span-12 p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent"
                      type="password" placeholder="Enter your password">
                </div>
                
         <div class="flex flex-col  items-center grid grid-cols-12 gap-4">
                    <button class="col-span-11 xl:col-span-4 btn  w-98
                    bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500
                    hover:bg-gradient-to-bl from-blue-500 to-blue-900
                    w-full px-5 py-3  m-2 rounded-lg text-gray-100 font-semibold  text-center" @click="login">Confirm</button>
                    <button class="col-span-11 xl:col-span-4 btn 
                    bg-gradient-to-br from-red-500 via-pink-500 to-rose-500  w-98
                    hover:bg-gradient-to-bl from-red-500 to-red-900 
                    px-5 py-3  m-2  w-full rounded-lg text-gray-100 font-semibold  text-center" @click="showResetPassword" >Forget Password ?</button>
                    <button class="col-span-11 xl:col-span-4 btn w-98
                    bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 
                    hover:bg-gradient-to-bl from-amber-500 to-amber-900 
                    px-5 py-3  m-2 w-full rounded-lg text-gray-100  font-semibold text-center" @click="showRegister" >Register</button>
        

        </div>
      </div>
            
</div> 
</template>
<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  name:'AppLogin',


  data() {
    return {
      username: '',
      password: '',
      message:'',
      open:false,
      count:0,
      resetOpen:false,
   
    };
  },
  methods: {
    async login() {
      try {
            const response = await axios.post(`${process.env.VUE_APP_URL_API}authentification/api/token/`, {
          username: this.username,
          password: this.password,
        });
        
        if (response.status == 200){
          const token = response.data.access;
          const userId = response.data.user_id

          // VueCookies.set('jwt_token', token, '2h', { secure: true, domain: 'riseofstat.com' });
          VueCookies.set('jwt_token', token, '2h');
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get('jwt_token')}`;

          VueCookies.set('user_id',userId,'2h');
         
          this.$store.commit('setLoggedIn',true);
          
         
           window.location.reload();
           this.$router.push("/")
          
        }

    
      } catch (error) {
        return this.message = "Username or Password is false";
      }
    },
    openlogin(){
        this.count+=1;
        if (this.count%2==0){
              return this.open=true;
              }
              else{
                return this.open=false
              }
            },
            showResetPassword(){
   
                this.$store.commit('showResetPassword');
            },
            showRegister(){
                this.$store.commit("showRegister");
            }

  },
};
</script>
<style>
</style>