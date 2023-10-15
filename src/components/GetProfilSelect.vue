
<template>
    <select  class="font-semibold hover:bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 hover:text-gray-50 bg-white hover:shadow-2xl 
    w-full col-span-6 rounded-lg p-5 m-2 text-xl" name="id_account" >
    <option v-for="(value,index) in data" :key="index"    :value="value.id_account" :name="value.governor_id">{{ value.governor_name }}</option>
 
</select>
</template>
<script>
import axios from 'axios';
import {getToken } from '@/auth'
export default {
name:'AccountPage',

        data:() =>{
            return {
                data:[],
                user_id:''
              
            }
        },
        async beforeMount() {
                this.user_id = localStorage.getItem('user_id');
                await this.getData();
            },
        async created() {
        
            
             
        },
        methods:{
            async getData(){
                console.log("user => "+this.user_id)
                let url =`${process.env.VUE_APP_URL_API}}api/user_account/?user_id=${this.user_id}&ordering=-power`
                console.log(url)

                let headers =  {Authorization: `Bearer ${getToken()}`,};
                await axios.get(url,{headers})
                .then(response=>{this.data = response.data.results,console.log(response.data)})
                return this.data
            },
        
    }
}
</script>



