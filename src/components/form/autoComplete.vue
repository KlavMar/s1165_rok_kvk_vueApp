<template>
              <div class="relative search-bar">
            <input class="w-full xl:w-1/2 px-4 py-2 bg-transparent border border-gray-300  rounded-lg focus:outline-none focus:border-gray-600" 
            type="text" name="search" 
            id="tag-search" placeholder="Search" v-model="value_"  />
            <ul class="absolute bg-white w-full xl:w-1/2 z-10 top-full left-0 right-0 py-1 mt-1 tags-search text-gray-800" v-if="filterValue.length > 0">
              <li class="item px-3 py-2 font-semibold" v-for="(val, index) in filterValue" :key="index" @click="seletedValue(val)">
                <p class="hover:text-blue-400">{{ val.governor_name }}</p>
                <input type="hidden" name="id_account"  :value=`${val.governor_id}`>
              </li>
              <hr class="bg-gray-100">
            </ul>
          </div>
</template>

<script>
export default{

name:"autoCompleteSearchBar",
data() {
        return {
          value_: '',
          list_value: [],
          btn:false,
          count:1,
         
        }
      },
methods:{
    seletedValue(value){
          this.categories=cat.name
          this.btn=false



         return this.categories
       
        },
},
computed: {
    filterValue() {
        if (!this.categories || this.categories === '') {
          return [];
        }
        
        const lowercaseCategories = this.categories.toLowerCase();
  

            return this.list_categories.filter(cat => {
          const lowercaseName = cat.name.toLowerCase();
          return lowercaseName.includes(lowercaseCategories) && lowercaseName !== lowercaseCategories;
        });

    
        
      },

    }
}
    </script>