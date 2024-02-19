<template>
    <div class="grid-cols-12 grid p-2 m-2 rounded-lg bg-gray-50">
        <h1 class="text-6xl bg-gradient-br from-red-500 to-rose-500 bg-clip-text col-span-12 p-4 m-2">Recruitment AW-1165</h1>
    </div>
    <form class="col-span-6 flex flex-col">

        <input type="file" ref="profilFov" name="profil_gov" accept=".jpg, .jpeg, .png"  class="custom-file-input  inset-0 ">
        <input type="file" ref="profilFov" name="details_kills" accept=".jpg, .jpeg, .png"  class="custom-file-input  inset-0 ">
        <input type="file" ref="profilFov" name="more_info" accept=".jpg, .jpeg, .png"  class="custom-file-input  inset-0 ">
        <input type="file" ref="profilFov" name="faith_vi_stat_kvk" accept=".jpg, .jpeg, .png"  class="custom-file-input  inset-0 ">
    </form>

</template>
<script>

  export default{
    name:"recruitmentApp",
    data(){
        return{

        }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style scoped>
#block-nav{display:none}
</style>