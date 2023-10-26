<template>
<section class="grid grid-cols-12 gap-4 w-full">
    <div class="p-2 col-span-4 flex flex-col h-24 rounded-lg justify-center items-center text-lg xl:text-2xl font-semibold
    btn bg-gradient-to-bl from-purple-500 to-pink-500 text-gray-100"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="activeTab = index"
      :class="{ 'active': index === activeTab }"
    >
      {{ tab.title }}
    </div>

  <div class=" col-span-12 tab-content text-xl md:text-2xl xl:text-4xl font-semibold text-gray-800 font-semibold leading-loose flex flex-col justify-center items-center p-2 m-2">
    <div v-for="(tab, index) in tabs" :key="index" v-show="index === activeTab">
        <div v-html="tab.content"></div>

    </div>
    </div>
    </section>
</template>
<script>
export default{
    name:'tabsComponent',
    props:{
        tabs:{
            type:Array,
            required:true
        },
      
    },
    data(){
        return {
          activeTab: 0,
        }
    },
    methods:{
      changeTab(index) {
      this.currentTab = index;
    },
    }
}
</script>
<style>
.tab-content p {
margin:0.5em;
padding:0.25em;
}
</style>