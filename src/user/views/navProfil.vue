<template>
            <div class="relative  p-2 m-2 grid-cols-12 grid gap-4"
      v-for="(value_,index) in nav_profil" :key="index">


        <router-link
        class="text-gray-50 font-bold text-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-2 m-2 col-span-3"
  v-for="(value, index) in value_.content"
  :key="index"
  :to="{ name: value.name_route, params: { governor_id: this.$route.params.governor_id }}"
>
  {{ value.name }}
</router-link>



     
    </div>

</template>

<script>

export default {
  methods: {
  },
    name:"NavProfil",
      
    data() {
      return {
        governor_id:'',
        nav_profil:
    [
        {
       
            content:[
                {name_route:'dashboard',name:"dashboard"},
                {name_route:'ressource',name:"Calculator Ressource"},
                {name_route:'troops',name:"Update troops stats"}
            // {name_route:"calculator" ,name:"Calculator"},
            // {name_route:"scan_troops" ,name:"Update troops"},

        ]
        }
    ]
        }
    },
    mounted(){
        this.governor_id = this.$route.params.governor_id;

        },


}
</script>
<style>
</style>