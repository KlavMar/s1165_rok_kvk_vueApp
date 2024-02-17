<template>
        <nav class="flex flex-col xl:flex-row items-center justify-center  w-full h-24 xl:h-32 shadow-lg  bg-gray-900" >
          <!-- bouton open-->
    <button class="flex items-end  font-bold z-40 p-3 absolute top-1 left-1 xl:hidden text-gray-50 bg-gray-900" @click="openav" aria-label="open nav">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      
    </button>
    <!-- end button -->
    <div id="block-nav" 
  class=" z-40 xl:z-1 flex flex-col  w-full  fixed  sm:h-screen xl:h-32 xl:justify-center xl:items-center  inset-0 xl:flex xl:relative xl:flex-row  font-bold
nav-color-play bg-gray-900" 
  :class="{'hidden': !btn}">

      <button class="flex items-end  p-2 m-2 text-gray-50 font-bold top-1 left-0 xl:hidden"  @click="openav" aria-label="close nav">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

          <section class="container_nav_offline flex flex-col xl:flex-row xl:items-center xl:justify-center"  v-if="$store.state.isLoggedIn">
    
            <router-link class=" text-white font-semibold p-2 m-2" :to="{name:'home'}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
            </router-link>

          

        <div class="relative p-2 m-2 "   
      @mouseover="setDropdownIndexExt(index)" @mouseleave="resetDropdownIndex"
      v-for="(value_,index) in nav_ext" :key="index" >
      <div v-if="value_.title != 'Admin'" class="text-gray-50 font-bold text-xl ">
        <button>{{value_.title}}</button>
        <div v-show="openExtNav && currentDropdownIndex === index" 
        class="absolute top-15 left-0 mt-2  rounded-xl w-96  z-10 bg-gradient-to-br from-red-500 to-orange-500  ">

          <div class="flex flex-col p-2 m-2"  role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
            <a class="w-full p-2 m-2 "  v-for="(value,index) in value_.content" :key="index" :href="`${value.link}`"  :data-token="token">{{value.name}} </a>
          </div>
        </div>
      </div>
      
    </div>
  </section>


  <section class="container_nav_online flex flex-col xl:flex-row  xl:justify-center xl:items-center"  v-if="$store.state.isLoggedIn">
            <div class="relative p-2 m-2"
      
      @mouseover="setDropdownIndex(index)" @mouseleave="resetDropdownIndex"
      v-for="(value_,index) in nav" :key="index">
      <div  class="text-gray-50 font-bold text-xl">
        <button class="flex justify-center items-center" v-html=value_.title></button>
        <div v-show="isDropdownOpen && currentDropdownIndex === index" 
        class="absolute top-15 left-0 mt-2  rounded-xl w-96  z-10 bg-gradient-to-br from-red-500 to-orange-500  ">

          <div v-for="(value,index) in value_.content" :key="index" class="grid-cols-12 grid gap-4"  role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
              <router-link class="font-bold text-xl p-2 m-2 col-span-12"   :to="{name:`${value.name_route}`}">{{value.name}} </router-link>

              <navProfil v-if="value.name=='profil' && this.governor_id>0" :governor_id="this.governor_id" class="p-2 m-2 col-span-12"></navProfil>

              <div v-if="value.name=='profil' && this.governor_id == null " class="col-span-12">Select your Profil before access this menu</div>
          
          </div>
        </div>
      </div>
     
    </div>
    <button  class="bg-gradient-to-br from-red-500 to-orange-500 p-2 m-2 rounded-lg text-white " @click="logout">Logout</button>
  </section>
 
  <router-link v-else  to="/auth/login" :class="`${className}`">Login</router-link>
  <router-link v-if="!$store.state.isLoggedIn" to="/hall_of_heroes" :class="`${className}`">Hall of fame </router-link> 
  <router-link  to="/recruitment" :class="`${className}`">Recruitment</router-link>
</div>

    </nav>
</template>

<script>


import VueCookies from 'vue-cookies'
import navProfil from '@/user/components/navProfil.vue'
export default{
name:'NavComponent',
components:{
  navProfil
},
  data(){
    return {
    
      className:"p-2 m-2 text-xl font-bold bg-clip-text text-gray-50 ",
      btn:false,
      count:1,
      isDropdownOpen: false,
      currentDropdownIndex: null,
      openExtNav:false,
      governor_id:'',
      token:null,
      nav:[
        {
            title:'Space KvK',
            content:[
                {name_route:"objective",name:"Objective"},
                {name_route:"calendar",name:"Calendar Kvk"},
                
                {name_route:"hall of heroes",name:"Hall of heroes"}
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
            {link:`${process.env.VUE_APP_URL_API_DASHBAORD}dashboard/kingdom/`,name:"Dashboard Kingdom"},
              {link:`${process.env.VUE_APP_URL_API_DASHBAORD}dashboard/kvk/`,name:"Dashboard KVK"},
              // {link:`${process.env.VUE_APP_URL_API_DASHBAORD}dashboard/mge/`,name:"Dashboard MGE"},
              // {link:`${process.env.VUE_APP_URL_API_DASHBAORD}dashboard/war/`,name:"Dashboard Civil War"}
          ]
        },
      ]
    }
  
  },
 
  beforeUpdate() {
    this.governor_id = VueCookies.get("governor_id");


},
  methods:{
    logout() {
      
      localStorage.clear();
      sessionStorage.clear();
      VueCookies.remove('jwt_token');
      VueCookies.remove('user_id');
      VueCookies.remove('governor_id');
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
    openav() {
        this.count+=1
        if (this.count %2 == 0) {
            return this.btn =true; 
        }
         
        else{
            return this.btn=false
        }
            // Changer la valeur de 1280 selon votre point de rupture XL
  }

  },
  watch:{
    '$route' () {
   
      return this.btn=false
      
   
    }
  },
  computed:{
  
  }



}</script>

<style scoped >
</style>