
<template>

    <div class="mx-auto xl:max-w-3xl relative h-screen">
        <h1 class="text-2xl font-semibold text-center p-2 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
        Objective was fixed date in matchmaking so 2023-09-06 </h1>
        <div class="grid grid-cols-4 gap-2 p-5" >
  
          <button class="col-span-4 text-2xl btn px-5 py-2 my-5 bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 font-bold rounded-lg text-gray-50" @click="openaside" v-show="!activate">Important information - calculation!</button>
        <button class="col-span-4 text-2xl btn px-5 py-2 my-5 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 font-bold rounded-lg text-gray-50" @click="opensimulator" v-show="!simulator_on">Simulator for deads Points</button>
        </div>
  
  
  <aside id="aside_modal"  class="absolute inset-0 z-10 bg-white" v-show="activate">
    <button class="btn px-5 py-2 m-5 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-gray-50 font-bold rounded-lg" @click="close">close</button>
  <div class="text-lg text-color-500 font-medium p-2 m-2">
    <p class="p-2 m-2">BE CAREFUL ! 
    Kills and deaths carried out outside the context of war events, i.e., 
    taking and defending territory, countering coalition offensives, will not be counted</p>
    <p class="p-2 m-2">If you fight alone outside the group just to score points, you'll be excluded!</p>
  
    <p class="p-2 m-2">You're fighting for the kingdom, not for yourself. 
      Your objectives are accessible to all, and can be used extensively 
      during gate captures and zone defenses</p>
  
      <p class="p-2 m-2">If there are no coalition or alliance battles, there will be no scans, so your kills won't count.</p>
  
  </div>
  
  
  <div class="text-lg text-color-500 font-medium p-2 m-2">
    <p class="p-2 m-2">Les kills et morts réalisés en dehors des évènements de guerre c'est à dire  
    prise de porte et défense de territoire, 
    contre offensive de coalition, ne seront pas compté. </p>
    <p class="p-2 m-2">Si vous vous battez seuls en dehors du
     groupe juste pour faire des points vous serez exclus ! </p>
     <p class="p-2 m-2"> Vous vous battez pour le royaume par pour vous. Vos objectives sont accessbiles à tous, 
     et peuvent être largement fait pendant les prises des portes, et les défenses de zone. </p>
     <p class="m-2 p-2">S'il n'y a pas de combat de coalition et ou d'alliance , 
     cela veut dire qu'il n'y aura pas de scan et donc que vos kills sont non comptabilisés.</p> 
  
  </div>
  </aside>
  <aside id="simulateur_deads" class="absolute inset-0 z-10 bg-white" v-show="simulator_on">
  <button class="btn px-5 py-2 m-5 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-gray-50 font-bold rounded-lg" @click="close">close</button>
  
    <div class="grid grid-cols-12 gap-4 my-3 p-2">
      <input type="range"  v-model="T4deads" @input="calculate" min="0" max="2000000" step="10000" class="col-span-6" />
      <p class="col-span-6 text-sm font-semibold">Nb T4 : {{ T4deads }}</p>
    </div>
  
    <div class="grid grid-cols-12 gap-4 my-3 p-2">
      <input type="range"  v-model="T5deads" @input="calculate" min="0" max="2000000" step="10000" class="col-span-6" />
      <p class="col-span-6 text-sm font-semibold">Nb T5 : {{ T5deads }}</p>
    </div>
  
      <p class="p-2 m-2 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text text-2xl font-bold" >Score Deads  {{ formatNumber(sliderValue) }}</p>
  </aside>
    <section class="flex flex-col p-2 m-2  mx-auto relative">
  
  
    <article class="text-sm  w-full">
        <div class="relative search-bar">
          <input class="w-full px-4 py-2 bg-transparent border border-gray-300  rounded-lg focus:outline-none focus:border-gray-600" 
          type="text" name="search" 
          id="tag-search" placeholder="Recherchez" v-model="governor_id"  />
          <ul class="absolute bg-white w-full z-10 top-full left-0 right-0 py-1 mt-1 tags-search text-gray-800" v-if="filteredCategories.length > 0">
            <li class="item px-3 py-2 font-semibold" v-for="(cat, index) in filteredCategories" :key="index" @click="selectedCategorie(cat)">
              <p class="hover:text-blue-400">{{ cat.governor_name }}</p>
            </li>
            <hr class="bg-gray-100">
          </ul>
        </div>
      </article>
  
    
  <article v-for="(value,index) in objective" :key="index" class="m-2 p-2 flex flex-col border-b ">
    <div class="flex grid grid-cols-12 gap-6 p-2 m-2 " v-for="(val,index) in value" :key="index">
    <h4 class="text-xl text-gray-700  font-semibold col-span-6">{{ index }}</h4>
    <p class="text-md text-gray-700  col-span-6">{{ formatNumber(val)  }}</p>
    </div>
  </article>
  
  
  </section>
  </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default { 
  
  name:"ObjectiveAPP",
  
  data(){
  return {
    objective:[],
    governor_id:null,
    list_governor:[],
    activate:false,
    T4deads: 0,
    T5deads:0,
    simulator_on:false
  }
  },
  async created(){
  
  this.list_governor=await this.get_governor()
  },
  methods:{
  // async get_objective(){
  //   await axios.get(`${process.env.VUE_APP_URL_API}/api/objective/`)
  //   .then(response =>{this.objective = response.data})
  
  //   return this.objective
  // },
  async get_governor(){
    await axios.get(`${process.env.VUE_APP_URL_API}/api/players/`)
    .then(response =>{this.list_governor = response.data})
  
    return this.list_governor
  
  },
  async selectedCategorie(cat){
        let governor_id =cat.governor_id
  
        await axios.get(`${process.env.VUE_APP_URL_API}/api/objective/?governor_id=${governor_id}`)
      .then(response =>{this.objective = response.data})
      this.governor_id=null
      return this.objective,this.governor_id
      },
      formatNumber(value) {
        if(value >0){
          return value.toLocaleString();
        }
        else{
          return value
        }
  
          
        
     
         
      },
      openaside(){
        this.activate=true
      },
      close(){
        this.activate=false;
        this.simulator_on=false;
      },
      opensimulator(){
        this.simulator_on=true;
      },
      calculate() {
        // Votre logique de calcul ici en utilisant this.sliderValue
        // Par exemple, si vous voulez doubler la valeur du curseur :
        this.sliderValue=this.T4deads*80+this.T5deads*160
        return this.sliderValue
      },
  
  },
  computed:{
  filteredCategories() {
      if (!this.governor_id || this.governor_id === '') {
        return [];
      }
      
      const lowercaseCategories = this.governor_id.toLowerCase();
  
  
          return this.list_governor.filter(cat => {
        const lowercaseName = cat.governor_name.toLowerCase();
        return lowercaseName.includes(lowercaseCategories) && lowercaseName !== lowercaseCategories;
      });
  
  
      
    },
  }
  }
  
  </script>
  
  <style>
  .bloc{
    height: 110px;
    width: 300px;
    border-radius: 10px;
  }
  </style>