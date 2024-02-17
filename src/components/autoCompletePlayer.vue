<template>
      <div class="w-full flex flex-col justify-center items-center">
      <input class="w-full m-2
       px-4 py-2 bg-gradient-to-br from-red-500 to-orange-50 bg-clip-text text-transparent rounded-lg focus:outline-none text-gray-100 text-3xl font-bold  border-gray-100 border-2" 
         type="text"
         name="search"
         id="tag-search"
         v-model="governor_name"
         @input="filterTitle()"
         
         placeholder="Governor name"
  />
  <div v-show="active" class="relative w-full  flex flex-col items-start">
    <ul class="absolute w-full inset-O z-10 bg-white py-1 mt-1 tags-search text-gray-800 text-3xl font-bold p-3 m-2">
    <li class="item p-3 m-2 font-semibold"
    @click="handleItemClick(value)"

        v-for="(value, index) in filter_data"
        :key="index"
    >
      {{ value.governor_name }} 
    </li>
    
  </ul>
  </div>


</div>
</template>
<script>
import axios from 'axios';
export default {
     name:"searchBar",
       data() {
    return {
      list_data: [],
      governor_name: '',
      filter_data: [],

      select_data:'',
      active:false
        };
  },
  async created() {
    this.list_data = await this.get_data();
  },
  methods: {
    async get_data(){
                try{
                    const response = await axios.get("http://127.0.0.1:8000/api/players/");
                    this.list_data = response.data;
                    return this.list_data;
                }
                catch(error){
            
                    return []
                }
        },
    filterTitle() {
      this.active=true;
    this.filter_data = Object.values(this.list_data)
    .filter(data => {
      return data.governor_name.toLowerCase().includes(this.governor_name.toLowerCase());
    })
    .slice(0, 10); // Limite le résultat à 10 éléments
},
handleItemClick(data_) {
        this.active=false;
        this.data = data_.governor_id;
        this.filter_data = [];
         // event pour déclencher la récupération du govname
        this.$store.commit('UpdateGovId',data_.governor_id)
        this.governor_name=data_.governor_name

  }
}
}
</script>