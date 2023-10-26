<template>
<main class="grid grid-cols-12 gap-4">

    <aside class="col-span-2"></aside>

<section id="post_view" class="col-span-12 xl:col-span-8">
<div class="flex flex-col p-2 m-2 xl:grid xl:grid-cols-12  gap-4 relative">
    <p class="text-2xl p-2 m-2 font-bold text-red-200 text-center">{{ message }}</p>
  <article class="p-6 bg-white border border-gray-200 rounded-lg shadow  col-span-12" v-for="(value,index) in post" :key="index">
        <h2 class="p-2 m-2 text-4xl font-bold tracking-tight text-gray-900 ">{{value.post_name}}</h2>
    <p class="font-semibold p-2 px-3 m-2 rounded-2xl">  Create {{value.created_on}}</p>
  

    <div class="flex flex-row">
      <span class=" bg-gray-200 rounded-lg px-5 py-2 text-center text-sm font-semibold text-gray-700  m-2 " v-for="(categorie, index) in value.categories" :key="index">
        <button class=" categorie">#{{categorie.name}}</button>
      </span> 
    </div>

   
    <div v-if="value.showFullContent" class="text-gray-500 p-2 m-2 text-base">
      <p :id="index" class="font-normal text-gray-500 m-1 p-1" v-html="value.description"></p>

      <button     
      class="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 
      focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"

      @click="togglePostContent(index)">read less
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
      </button>
    </div>
    <div class="text-gray-700 p-2 m-2 text-base" v-else>
      <p  :id="index"  v-html="truncateDescription(value.description, 600)"></p>
      <button v-show="value.description.length>600" 
        class="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         @click="togglePostContent(index)">read more
         <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
    </div>


</article>

</div>
</section>
<aside id="versionning" class="m-5 p-2 border-l border-gray-300 col-span-12 xl:col-span-2">
      <h2 class="p-3 m-3 text-3xl text-gray-700 font-semibold">Versionning </h2>
      <div v-for="(value, index) in versionning_lasted" :key="index" 
      class=" overflow-hidden flex row justify-start my-3 p-2 ">
        <div class="">
          
          <div class="p-4">
          <h4 class="font-bold text-lg mb-2 post_name">{{value.name_version}}</h4>
            <small class="text-gray-500 text-sm mb-2">{{value.created_on}}</small>
            <p class="text-gray-500 text-sm mb-2" v-html=value.description></p>
           
          </div>
        </div>
    </div>

</aside>
</main>
</template>
    <script>
   import axios from 'axios'

export default
   {
    name:"PostView",

        data() {
          return {
   
            post:[], 
            i:0,
            message:'',
            versionning_lasted:[],
          }
        },
        async created() {
          this.post = await this.get_post()
          this.versionning_lasted = await this.get_versonning();
          
        },
        methods: {
          async get_post(){


            let urlFilter;
            urlFilter = "http://127.0.0.1:8000/api/post/?published=true&ordering=-created_on&limit=10";
            try{
                //await axios.get(urlFilter).then(response =>{this.post = response.data.results})
                const response = await axios.get(urlFilter)
                if (response.status==200){
                this.post = response.data.results
                return this.post
                }
                else{
                     this.$router.push({name:'login'});
                     this.$store.commit('setLoggedIn',false);
                }
            }

              catch(error)
              {
                 this.$router.push({name:'login'})
                 this.$store.commit('setLoggedIn',false);
              }

              
           
            },
            async get_versonning(){
            const response = await axios.get("http://127.0.0.1:8000/api/versionning/?ordering=-created_on&limit=10")
  
            return response.data.results
          },

            togglePostContent(index) {
      this.post[index].showFullContent = !this.post[index].showFullContent;
    },
    truncateDescription(description, maxLength) {
      if (description.length > maxLength) {
        const truncated = description.substring(0, maxLength);
        return truncated + "...";
      }
      return description;
    }
           
        },
      }

      </script>
