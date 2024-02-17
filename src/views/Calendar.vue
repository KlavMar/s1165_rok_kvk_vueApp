<template>
        <div class="relative flex flex-col items-center h-screen ">
<section class="p-2 m-2 grid grid-cols-12 gap-6 mx-auto  xl:max-w-3xl relative">
    <article class="col-span-12 p-2 m-2  flex flex-col justify-center items-center font-bold text-xl " v-for="(value,index) in liste_of_calendar" :key="index">
<h3 class="text-2xl p-2 m-2">{{ value.title }}</h3>
<a :href="`${value.link}`" class="btn bg-gradient-to-br from-red-500 to-orange-500 px-5 py-2 m-2 rounded-2xl">Link to calendar</a>
    </article>
</section>
</div>
</template>

<script>
export default{

    name:"CalendarApp",
    data(){
        return {
                liste_of_calendar:[
                    {
                        title:"Orleans",
                        link:"https://docs.google.com/spreadsheets/d/1uBTM0b168yt_RVEKL5kOruFlmwDRufnV7gjBTJK4Xro/edit?usp=sharing"
                    },
                    {
                    title:"Tides of War",
                    link:"https://docs.google.com/spreadsheets/d/1Fbz64DFMYfLcpzzdCckI5ZwjDSaORjMVDqdoJ-ymkcE/edit?usp=sharing"
                    }
                ]
        }
    },

    
}
</script>

<style>
</style>