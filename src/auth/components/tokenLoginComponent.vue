<template>

    <div class="bg-transparent w-full xl:w-1/2  flex items-center  justify-center relative" >
    
          <form v-on:submit.prevent="tokenLogin" id="form_connect_token" class=" xl:max-w-2xl w-full relative" >
    
            <div class="p-10 h-96  rounded-lg bg-gray-100 ">
            <p class="text-2xl p-2 m-2 font-bold text-red-700 text-center">{{ message_ }}</p>
              <div class="flex flex-col p-2 m-2 items-center grid grid-cols-12 gap-4">
                          <input autocomplete="off" id="governor_id" name="governor_id" type="text" v-model="governor_id" 
                          class="col-span-12 p-2 m-2 focus:border-b-4 
                          focus:outline-none focus:border-blue-700 text-2xl 
                          font-bold 
                          bg-transparent 
                          " 
                          placeholder="Your governor Id" />
                    
                          <input  name="token" id="token"  v-model="token"
                          class="col-span-12 p-2 m-2 focus:border-b-4 
                          focus:outline-none focus:border-blue-700  text-2xl 
                          font-bold 
                          bg-transparent"
                          type="password" placeholder="Enter your token">
                    </div>
                    
             <div class="flex flex-col  items-center grid grid-cols-12 gap-4">
                        <button type="submit" class="col-span-11 xl:col-span-6 btn  w-98
                        bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500
                        hover:bg-gradient-to-bl from-blue-500 to-blue-900
                        w-full px-5 py-3  m-2 rounded-lg text-gray-100 font-semibold  text-center">Confirm</button>
                        <button @click="cancel" class=" col-span-11 xl:col-span-6
                    bg-gradient-to-br from-red-500 via-pink-500 to-rose-500  w-98
                    hover:bg-gradient-to-bl from-red-500 to-red-900 
                    px-5 py-3  m-2  w-full rounded-lg text-gray-100 font-semibold  text-center" >return to login</button>
                        
                        
    
            </div>
          </div>
        </form>
                
    </div> 
    </template>
    <script>
    import axios from 'axios';
    import VueCookies from 'vue-cookies';
    
    export default {
      name:'AppToken',
    
    
      data() {
        return {
          governor_id: '',
          token: '',
          message_:'',
          open:false,
          count:0,
          resetOpen:false,
       
        };
      },
      methods: {
        async tokenLogin() {
            const form = document.getElementById('form_connect_token');
            const formData = new FormData(form);
            const governor_id = formData.get("governor_id");
            const token_ = formData.get("token");
            formData.append("governor_id",parseInt(governor_id));
            formData.append("token_key",token_);
            
          try {
                const response = await axios.post("https://api.riseofstat.com/api/token_validate/",
                formData,{headers:{'api-key': process.env.VUE_APP_API_KEY}})
                

            if (response.status == 200){
                

              //const token = response.data.access;
              //const userId = response.data.user_id
    
              // VueCookies.set('jwt_token', token, '2h', { secure: true, domain: 'riseofstat.com' });
              //VueCookies.set('jwt_token', token, '2h');
              //axios.defaults.headers.common['Authorization'] = `Bearer ${this.$cookies.get('jwt_token')}`;
    
              VueCookies.set('governor_id',this.governor_id,'2h');
              VueCookies.set('ConnectionToken',true,'2h');

             
              this.$store.commit('setLoggedIn',true);
               this.$router.push("/")
              
            }
            else{
                console.log(response.status)
            }
    
        
          } catch (error) {
            console.log(error)
            return this.message_ = "Governor id or copy token fail ";
          }
        },
        cancel(){
                 this.$store.commit('showTokenPage');
            }
    }

    };
    </script>
    <style>
    </style>