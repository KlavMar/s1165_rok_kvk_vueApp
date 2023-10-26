<template>
        <nav class="flex flex-col xl:flex-row items-center justify-center  bg-gray-900" >
          <section class="container_nav_offline flex flex-col xl:flex-row items-center justify-center">
    
            <router-link class=" text-white font-semibold p-2 m-2" :to="{name:'home'}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
            </router-link>

          

        <div class="relative p-2 m-2 "   
      @mouseover="setDropdownIndexExt(index)" @mouseleave="resetDropdownIndex"
      v-for="(value_,index) in nav_ext" :key="index">
      <div v-if="value_.title != 'Admin'" class="text-gray-50 font-bold text-xl">
        <button>{{value_.title}}</button>
        <div v-show="openExtNav && currentDropdownIndex === index" class="absolute top-15 left-0 mt-2  rounded-xl bg-gray-50   w-96 z-10  ">

          <div class="flex flex-col text-gray-900"  role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
            <a class="w-full p-2 m-2 "  v-for="(value,index) in value_.content" :key="index" :href="`${value.link}`">{{value.name}} </a>
          </div>
        </div>
      </div>
      
    </div>
  </section>


  <section class="container_nav_online flex flex-col xl:flex-row p-2 m-2 justify-center items-center"  v-if="$store.state.isLoggedIn">
    <router-link class="text-white font-bold p-2 m-2 text-xl" :to="{name :'post'}" >Infos </router-link>
            <div class="relative p-2 m-2"
      
      @mouseover="setDropdownIndex(index)" @mouseleave="resetDropdownIndex"
      v-for="(value_,index) in nav" :key="index">
      <div  class="text-gray-50 font-bold text-xl">
        <button v-html=value_.title></button>
        <div v-show="isDropdownOpen && currentDropdownIndex === index" class="absolute top-15 left-0 mt-2  rounded-xl bg-gray-50   w-96 z-10  ">

          <div class="flex flex-col text-gray-900"  role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
            <router-link class="w-full p-2 m-2 "  v-for="(value,index) in value_.content" :key="index" :to="{name:`${value.name_route}`}">{{value.name}} </router-link>
          </div>
        </div>
      </div>
     
    </div>
    <button  class="bg-gradient-to-br from-red-500 to-orange-500 p-2 m-2 rounded-lg text-white " @click="logout">Logout</button>
  </section>
  <router-link v-else  to="/auth/login" :class="`${className}`">Login</router-link>


    </nav>
</template>

<script>

import VueCookies from 'vue-cookies'
export default{
name:'NavComponent',
  data(){
    return {
    
      className:"p-2 m-2 text-xl font-bold bg-clip-text text-gray-50 ",
     
      isDropdownOpen: false,
      currentDropdownIndex: null,
      openExtNav:false,

      nav:[
        {
            title:'Space KvK',
            content:[
                {name_route:"objective",name:"Objective"},
                {name_route:"calendar",name:"Calendar Kvk"},
                {name_route:"hall_of_fame",name:"Hall of Fame"}
            ]

        },
        {
            title:`<svg class="w-8 h-8" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <desc></desc> <g> <circle cx="16" cy="16" fill="none" r="15" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></circle> <path d="M26,27L26,27 c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0" fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path> <circle cx="16" cy="11" fill="none" r="6" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></circle> </g> </g></svg>`,
            content:[
                {name_route:"profil",name:"profil"},
            ]
        },
       
      ],
      nav_ext:[
      {
          title:"Dashboard Access",
          content:[
            {link:`${process.env.VUE_APP_URL_API}dashboard/kingdom/`,name:"Dashboard Kingdom"},
              {link:`${process.env.VUE_APP_URL_API}dashboard/kvk/`,name:"Dashboard KVK"},
              {link:`${process.env.VUE_APP_URL_API}dashboard/mge/`,name:"Dashboard MGE"},
              {link:`${process.env.VUE_APP_URL_API}dashboard/war/`,name:"Dashboard Civil War"}
          ]
        },
      ]
    }
  
  },
  mounted() {

},

  methods:{
    logout() {
      
      localStorage.clear();
      sessionStorage.clear();
      VueCookies.remove('jwt_token');
      this.$store.commit('setLoggedIn',false);
      this.$router.push({ name: 'home' });
    },
    setDropdownIndex(index) {
      this.isDropdownOpen = true;
      this.openExtNav=false;
      this.currentDropdownIndex = index;
    },
    setDropdownIndexExt(index){
        this.openExtNav = true;
        this.currentDropdownIndex = index;
    },
    resetDropdownIndex() {
      this.isDropdownOpen = false;
      this.currentDropdownIndex = null;
    },

  },
  computed:{
  
  }



}</script>

<style scoped>

</style>