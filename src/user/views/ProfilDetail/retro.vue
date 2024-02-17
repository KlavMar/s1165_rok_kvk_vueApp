<template>
<section class="grid grid-cols-12 mx-auto justify-center bg-gray-950">
<header class=" mx-auto col-span-12   flex text-center justify-center items-center">
    <h1 class="text-title  font-bold text-gray-50 p-2 m-2 break-word bg-gradient-to-br from-blue-500 to-red-500 bg-clip-text text-transparent">Your Retrospective 2023 </h1>
</header>
<main class="col-span-12">
    <section class="flex flex-col">
        <!-- <article class="enter grid grid-cols-12  p-4 m-2 rounded-sm w-full xl:w-8/12 mx-auto items-center justify-center font-bold">
            <h3 class="text-subtitle  text-center text-gray-50 break-word col-span-6">You are enter  </h3>
            <p class="text-4xl p-2 m-2 text-gray-50 col-span-6" >2023-01-01</p>
        </article> -->
    </section>

</main>
</section>
</template>

<script>
export default{
    name:"retrospectiveApp",
    data(){
        return {
            
        }
    }
}

    



</script>
<style scoped>

.text-title{
    font-size: 3em;
}
.text-subtitle{
    font-size: 2em;
}
@media screen and ( min-width: 1000px) {
    
.text-title{
    font-size:24em;
    line-height:1.5em;

}
.text-subtitle{
    font-size:15em;
}
}

</style>