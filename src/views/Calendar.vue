<template>
<section class="p-2 m-2 grid grid-cols-12 gap-6 mx-auto">
    <article class="col-span-12 p-2 m-2 rounded-lg bg-gray-50 flex flex-col justify-center items-center font-bold text-xl " v-for="(value,index) in liste_of_calendar" :key="index">
<h3 class="text-2xl p-2 m-2">{{ value.title }}</h3>
<a :href="`${value.link}`" class="btn bg-gradient-to-br from-red-500 to-orange-500 px-5 py-2 m-2 rounded-2xl">Link to calendar</a>
    </article>
</section>

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
                    }
                ]
        }
    },

    
}
</script>

<style>
</style>