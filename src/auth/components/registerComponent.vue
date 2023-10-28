<template>
<section class="bg-transparent w-full flex  flex-col items-center justify-center h-screen" >

  <article class="grid grid-cols-12 gap-4 w-full xl:w-1/5  rounded-lg p-5">
          <!-- Username -->
  <div class="inputForm col-span-12">
    <span class="material-symbols-outlined h-10 w-10 text-center flex jusitfy-center items-center bg-white p-2 rounded-lg">person</span>
            <input v-model="username" type="text" name="username" maxlength="150" autocapitalize="none" autocomplete="username" autofocus="" placeholder="username" required=""  id="id_username"
            class="p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent ">
      </div>
          

            <!-- email -->
            <div class="inputForm col-span-12">
        <svg class="h-8 w-8 text-center flex jusitfy-center items-center bg-white p-2 rounded-lg" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
        <input type="text" name="email" placeholder="Enter your Email" v-model="email"
        class="p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent ">
          </div>

           <!-- Password -->
           <div class="inputForm col-span-12 text-gray-50">
              <svg class="h-8 w-8 text-center flex jusitfy-center items-center bg-white p-2 rounded-lg"  viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>        
              <input v-bind:type="showPassword ? 'text' : 'password'" v-model="password" name="password"  placeholder="Enter your Password"
              class="p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent ">
              <button @click="toggleShowPassword"><svg  class="h-8 w-8 text-center flex jusitfy-center items-center bg-white p-2 rounded-lg" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
              </svg></button>     
            </div>
            
            <!-- password confirm-->
            <div class="inputForm col-span-12">
              <svg class="h-8 w-8 text-center flex jusitfy-center items-center bg-white p-2 rounded-lg"  viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>        
              <input v-bind:type="showPassword1 ? 'text' : 'password'" v-model="password_1" name="password1"  placeholder="confirme your Password"
              class="p-2 m-2 focus:border-b-2 
                      focus:outline-none focus:border-fuchsia-400 text-2xl 
                      font-bold text-gray-50
                      bg-transparent ">
              <button @click="toggleShowPassword_1"><svg class="h-8 w-8 text-center flex jusitfy-center items-center bg-white p-2 rounded-lg"   viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
              </svg></button>
            </div>
      


            <div class="relative col-span-12">
                <span  class="text-lg font-bold bg-clip-text text-transparent 
                bg-gradient-to-br from-red-500 to-orange-500"  @click="BtnshowHelpText">
                    password policy 
                  </span>
                  <span v-if="showHelpText" class=" absolute top-10 left-0 right-0 w-full bg-white text-gray-700 p-2 rounded-lg shadow-md border border-gray-300">
                    <ul>
                        <li>Your password can’t be too similar to your other personal information.</li>
                        <li>Your password must contain at least 8 characters.</li>
                        <li>Your password can’t be a commonly used password.</li>
                        <li>Your password can’t be entirely numeric.</li>
                    </ul>
                </span>
            </div>
                
          
        
            <div class="col-span-12 flex flex-col xl:flex-row items-center">
          
              <button class=" col-span-11 xl:col-span-4 btn  w-98
                    bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500
                    hover:bg-gradient-to-bl from-blue-500 to-blue-900
                    w-full px-5 py-3  m-2 rounded-lg text-gray-100 font-semibold  text-center" @click="register">Register</button>
              <button @click="cancel" class=" col-span-11 xl:col-span-4 btn
                    bg-gradient-to-br from-red-500 via-pink-500 to-rose-500  w-98
                    hover:bg-gradient-to-bl from-red-500 to-red-900 
                    px-5 py-3  m-2  w-full rounded-lg text-gray-100 font-semibold  text-center" >return to login</button>
            </div>
   

</article>
</section>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
export default{
  name:"RegisterComponent",
        data() {
          return {
   
            showHelpText:false,
            count:0,
            count_show:1,
            count_show_0:0,
            username:'',
            email:'',
            password: '',
            password_1:'',
            showPassword:false,
            showPassword1:false

          };
        },
        async created() {


        },
        methods: {
          async register() {
            console.log(this.username,this.password,this.password_1,this.email)
              try {
                    const response = await axios.post('http://127.0.0.1:8000/authentification/register_api/', {
                  username: this.username,
                  password1: this.password,
                  password2:this.password_1,
                  email:this.email
                });
                

                if (response.status == 200){
                  const token = response.data.access;
                  const userId = response.data.user_id
        
                  VueCookies.set('jwt_token',token,'2h');
                  VueCookies.set('user_id',userId,'2h');
                  this.$store.commit('setLoggedIn');

                  return setTimeout(() => { this.$router.push("/");}, 10);
                }
              }
           catch (error) {
       
       return this.message = "Username or Password is false";
     }
    },
            BtnshowHelpText(){
                 this.showHelpText=true;
                 this.count+=1;
                 if (this.count > 1){
                    this.showHelpText=false;
                    this.count=0;
                 }
            },
            toggleShowPassword() {
              if (this.count_show %2 ==0){
                this.showPassword=true
              }
              else{
                this.showPassword=false
              }
              this.count_show+=1

          
             },
             toggleShowPassword_1() {
              this.showPassword1=true

                
             },
             cancel(){
                 this.$store.commit('showRegister');
            }

           
        },
      }
    </script>

    <style>

.person {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

     .inputForm {

  border-radius: 10px;

  height: 50px;
  display: flex;

  align-items: center;
  padding: 0.5em;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 85%;
  height: 100%;
}

  </style>