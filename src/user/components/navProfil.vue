<template>
        <div>
            <div class="relative w-80  grid-cols-12 grid gap-4" 
                  v-for="(value_,index) in nav_profil" :key="index">

                  <hr class="col-span-12">
            <div class="font-bold text-xl p-2 m-2 col-span-12 flex flex-col " v-for="(value,index) in value_.content" :key="index">
                    <router-link class="p-2 "
                    
              v-for="(value, index) in value.dashboard"
              :key="index"
              :to="{ name: value.name_route, params: { governor_id: this.governor_id}}"
            >
              {{ value.name }}
            </router-link>
            </div>
            <hr class="col-span-12">
            <div class="font-bold text-xl p-2 m-2 col-span-12 flex flex-col " v-for="(value,index) in value_.content" :key="index">
                    <router-link class="p-2 "
                    
              v-for="(value, index) in value.calcul"
              :key="index"
              :to="{ name: value.name_route, params: { governor_id: this.governor_id}}"
            >
              {{ value.name }}
            </router-link>
            </div>


     
    </div>
    </div>


</template>

<script>

export default {

  props:{
    governor_id:{
      type:Number,
      required:true
    },

  },
    name:"NavProfil",
      
    data() {
      return {

        nav_profil:
    [
        {
       
            content:[
              {
                dashboard:[
                {name_route:'dashboard',name:"Dashboard"},
                {name_route:'retrospective',name:"Retrospective"},
                ],
       
              calcul:[
                {name_route:'ressource',name:"Calculator Ressource"},
                {name_route:'speed',name:"Calculator Accel"},
                {name_route:'troops',name:"Update troops stats"}
            // {name_route:"calculator" ,name:"Calculator"},
            // {name_route:"scan_troops" ,name:"Update troops"},

            ]
  
              }
        ]

        }
    ]
        }
    },
    mounted(){

        
        },


}
</script>
<style>
</style>