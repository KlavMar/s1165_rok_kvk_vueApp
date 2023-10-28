<template>
<section class="relative grid grid-cols-12 gap-4 bg-gray-900 ">
  <div id="login" class="col-span-12 h-screen  relative bg-gray-900 flex justify-center items-center flex-col overflow-auto ">
 
      <!-- <img src="https://storage.googleapis.com/rok_1165_stat/img/AGUM%201165.png" class="h-96"> -->
    <h1 class="text-title p-2 m-2 xl:w-1/2 text-gray-50 font-bold break-word text-center "> Welcome  Agum 1165</h1>

        <div class="flex flex-row justify-between items-center p-2 m-2 ">
      <button v-if="!$store.state.isLoggedIn" @click="pushLogin" class=" font-semibold text-xl btn bg-gradient-to-bl from-purple-500 to-pink-500 text-gray-100 px-5 py-3 m-2 rounded-lg">Login</button>
      <a href="https://discord.gg/KKHQqPXR"><svg  class="h-16 w-16" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#ffffff" fill-rule="nonzero">
           </path> </g> </g>
        </svg></a>
        </div>
        <nav ref="sidenav" v-show="!isHidden" class="hidden xl:flex xl:fixed  left-0 top-50 bg-gray-50 items-center flex-col text-2xl p-2 m-2 nav-side  rounded-full ">
          <a href="#language">Language </a>
          <a href="#recruitment">Recruitment </a>
          <a href="#staff">Staff </a>
        </nav>
        <div class="container_mouse absolute bottom-0 text-white">
    <span class="mouse-btn">
        <span class="mouse-scroll"></span>
    </span>
    <span>Scroll Down</span>
</div>


   
    </div>

    <article id="language" class="h-screen col-span-12 bg-gray-50 flex justify-around items-center p-5 ">
      <div class="grid grid-cols-12 gap-6 p-2 m-2">
     
      <div class="col-span-12 flex flex-col p-2 m-2">
        <h3 class="text-xl lg:text-3xl xl:text-9xl p-2 m-2 col-span-12 font-semibold">Language in Kingdom</h3>
      <div class="flex flex-col xl:flex-row">
        <svg class="p-2 m-2 w-24 h-24 xl:w-96 xl:h-96" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_1310_8031)"> <path d="M27.999 0H-0.000976562V20H27.999V0Z" fill="url(#paint0_linear_1310_8031)"></path> <path d="M27.999 0H13.3324V20H27.999V0Z" fill="url(#paint1_linear_1310_8031)"></path> <path d="M9.33236 0H-0.000976562V20H9.33236V0Z" fill="url(#paint2_linear_1310_8031)"></path> <path d="M18.6657 0H9.33237V20H18.6657V0Z" fill="url(#paint3_linear_1310_8031)"></path> </g> <defs> <linearGradient id="paint0_linear_1310_8031" x1="13.999" y1="0" x2="13.999" y2="20" gradientUnits="userSpaceOnUse"> <stop stop-color="white"></stop> <stop offset="1" stop-color="#F0F0F0"></stop> </linearGradient> <linearGradient id="paint1_linear_1310_8031" x1="20.6657" y1="0" x2="20.6657" y2="20" gradientUnits="userSpaceOnUse"> <stop stop-color="#F44653"></stop> <stop offset="1" stop-color="#EE2A39"></stop> </linearGradient> <linearGradient id="paint2_linear_1310_8031" x1="4.66569" y1="0" x2="4.66569" y2="20" gradientUnits="userSpaceOnUse"> <stop stop-color="#1035BB"></stop> <stop offset="1" stop-color="#042396"></stop> </linearGradient> <linearGradient id="paint3_linear_1310_8031" x1="13.999" y1="0" x2="13.999" y2="20" gradientUnits="userSpaceOnUse"> <stop stop-color="white"></stop> <stop offset="1" stop-color="#F0F0F0"></stop> </linearGradient> <clipPath id="clip0_1310_8031"> <rect width="28" height="20" rx="2" fill="white"></rect> </clipPath> </defs> </g></svg>
        <svg class="p-2 m-2 w-24 h-24 xl:w-96 xl:h-96" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_503_2952)"> <rect width="28" height="20" rx="2" fill="white"></rect> <mask id="mask0_503_2952" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"> <rect width="28" height="20" rx="2" fill="white"></rect> </mask> <g mask="url(#mask0_503_2952)"> <rect width="28" height="20" fill="#0A17A7"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M-1.28244 -1.91644L10.6667 6.14335V-1.33333H17.3334V6.14335L29.2825 -1.91644L30.7737 0.294324L21.3263 6.66667H28V13.3333H21.3263L30.7737 19.7057L29.2825 21.9165L17.3334 13.8567V21.3333H10.6667V13.8567L-1.28244 21.9165L-2.77362 19.7057L6.67377 13.3333H2.95639e-05V6.66667H6.67377L-2.77362 0.294324L-1.28244 -1.91644Z" fill="white"></path> <path d="M18.668 6.33219L31.3333 -2" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path d="M20.0128 13.6975L31.3666 21.3503" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path d="M8.00555 6.31046L-3.83746 -1.67099" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path d="M9.29006 13.6049L-3.83746 22.3105" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12H12V20H16V12H28V8H16V0H12V8H0V12Z" fill="#E6273E"></path> </g> </g> <defs> <clipPath id="clip0_503_2952"> <rect width="28" height="20" rx="2" fill="white"></rect> </clipPath> </defs> </g></svg>
       <svg class="p-2 m-2 w-24 h-24 xl:w-96 xl:h-96" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_503_3849)"> <rect width="28" height="20" rx="2" fill="white"></rect> <mask id="mask0_503_3849" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"> <rect width="28" height="20" rx="2" fill="white"></rect> </mask> <g mask="url(#mask0_503_3849)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.66667H28V0H0V6.66667Z" fill="#262626"></path> <g filter="url(#filter0_d_503_3849)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.3333H28V6.66666H0V13.3333Z" fill="#F01515"></path> </g> <g filter="url(#filter1_d_503_3849)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V13.3333H0V20Z" fill="#FFD521"></path> </g> </g> </g> <defs> <filter id="filter0_d_503_3849" x="0" y="6.66666" width="28" height="6.66666" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset></feOffset> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_3849"></feBlend> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_3849" result="shape"></feBlend> </filter> <filter id="filter1_d_503_3849" x="0" y="13.3333" width="28" height="6.66666" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset></feOffset> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_503_3849"></feBlend> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_503_3849" result="shape"></feBlend> </filter> <clipPath id="clip0_503_3849"> <rect width="28" height="20" rx="2" fill="white"></rect> </clipPath> </defs> </g></svg>
       <svg class="p-2 m-2 w-24 h-24 xl:w-96 xl:h-96" viewBox="0 -4 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_503_4163)"> <rect width="28" height="20" rx="2" fill="white"></rect> <mask id="mask0_503_4163" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20"> <rect width="28" height="20" rx="2" fill="white"></rect> </mask> <g mask="url(#mask0_503_4163)"> <rect width="28" height="20" fill="#FF2936"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H10.6667V0H0V20Z" fill="#128415"></path> <path d="M10.6667 13.3333C12.5076 13.3333 14 11.8409 14 9.99999C14 8.15905 12.5076 6.66666 10.6667 6.66666C8.82572 6.66666 7.33333 8.15905 7.33333 9.99999C7.33333 11.8409 8.82572 13.3333 10.6667 13.3333Z" stroke="#FAF94F" stroke-width="1.33333"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3335 8.33333C9.3335 8.14924 9.48273 8 9.66683 8H11.6668C11.8509 8 12.0002 8.14924 12.0002 8.33333V10.6667C12.0002 11.403 11.4032 12 10.6668 12V12C9.93045 12 9.3335 11.403 9.3335 10.6667V8.33333Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 10.6667C11.0349 10.6667 11.3333 9.70153 11.3333 9.33334C11.3333 8.96515 11.0349 8.66667 10.6667 8.66667C10.2985 8.66667 10 8.96515 10 9.33334C10 9.70153 10.2985 10.6667 10.6667 10.6667Z" fill="#1D50B5"></path> </g> </g> <defs> <clipPath id="clip0_503_4163"> <rect width="28" height="20" rx="2" fill="white"></rect> </clipPath> </defs> </g></svg>
      </div>
    </div>
      </div>

    </article>

    <article id="recruitment" class="col-span-12 bg-gray-50 flex justify-center items-center ">
      <img src="@/assets/sale.png">
     
    </article>
   


    <article id="staff" class="bg-gray-50 col-span-12 h-screen  flex flex-col justify-around rounded-lg z-40 relative">
      <div class="bg-gradient-to-bl from-red-500 to-orange-900  absolute h-screen w-1/3 z-10 rounded-r-full"></div>
      <div class="bg-gray-900 absolute h-screen  w-full"></div>
      <div class="grid grid-cols-12 gap-12 relative z-20 h-full  content-center"   v-for="(value,index) in orga" :key="index">
        <h3 class="text-xl lg:text-3xl xl:text-9xl p-2 m-2 col-span-4 h-96 items-center  flex text-gray-50 "
        @mouseover="activeIndex(index)" @mouseleave="deactiveIndex(index)">{{ value.title }}</h3>
      <div class="col-span-8 flex flex-col items-center justify-center font-bold leading-loose text-2xl lg:text-4xl xl:text-7xl text-gray-50 " v-show="isactive && currentIndex === index">
        <p v-for="(value,index) in value.content" :key="index" class="p-2 m-2">{{ value }}</p>
        </div>

      </div>

    </article>
    </section>
    
</template>

<script>

export default{
  components:{
    
  },
  data(){
    return {
      isactive:false,
      currentIndex:null,
      isHidden:false,
      
        orga:[
          {
            title:"Leader",
            content:[
              'FFigueras,LéoDynamo,Jmez'
            ]
          },
            {
            title:"Recruitment",
            content:[
              "Arzival,CoCo"
            ]
          },
          {
            "title":"Analyst",
            "content":[
              "Arzival"
            ]
          },
          {
            "title":"Events",
            "content":[
              "LéoDynamo,Babass,NeoPunch"
            ]
          },

         
        ]
    }
  },
  mounted(){
    window.addEventListener("scroll", this.hiddenSideNav);

  },
  methods:{
    pushLogin(){
      return this.$router.push("/auth/login")
    },
    activeIndex(index){
      this.isactive=true;
      this.currentIndex = index;
    },
    deactiveIndex(index){
      this.isactive=false;
      this.currentIndex = index;
    },
    hiddenSideNav(){

      
      const documentHeight = document.documentElement.scrollHeight*0.7;

      const scrollTop = window.scrollY;


      if (scrollTop >= documentHeight) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
    }
}
}
</script>

<style scoped>

.gradient{
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

   section{
    font-family: 'Orbitron' !important;
   }
   .text-title{
    font-size: 4em;
    font-family: 'Orbitron' !important;
   }
   @media screen and (min-width:750px) {
    .text-title{
      font-size: 8em;
      line-height: 1.2;
      
}
   }
   @media screen and (min-width:1200px) {
    .text-title{
      font-size: 10em;
      line-height: 1.2;
      
}
   }

   .mouse-btn {
  margin: 10px auto;
  width: 40px;
  height: 80px;
  border: 3px solid rgba(122, 122, 124, 0.918);
  border-radius: 20px;
  display: flex;
}

.mouse-scroll {
  display: block;
  width: 20px;
  height: 20px;
  background: linear-gradient(170deg, rgba(122, 122, 124, 0.918), rgb(123, 124, 124));
  border-radius: 50%;
  margin: auto;
  animation: scrolling13 1s linear infinite;
}

@keyframes scrolling13 {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(20px);
  }
}
.recruitment{
  background: url("@/assets/sale.png");
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 200em;

}
.nav-side a {
  font-size:2em;
  padding:0.75em;
  margin:0.5em;

}
.text-fam{
  font-family: Arial, Helvetica, sans-serif;
}
</style>