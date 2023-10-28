<template>
<section class="m-2 p-2" id="speed">
    <h2 class="text-4xl md:text-4xl lg:text-6xl font-semibold p-2 m-2">Speed Items</h2>

<div class="card-user content-rss-user" id="data_accel">
    <div class="text-2xl p-2 m-2 font-bold" v-if="error" :class="`${gradientRed}`">
        Select Account in Profil
    </div>

<div class="flex flex-col p-2 m-2 " >
   <div class="font-semibold p-2 m-2 " v-if="message">
    Your data is insert 
    <div class="flex flex-row justify-center items-center">
        <button type="submit" class="p-2 m-2 rounded-lg font-semibold" :class="`${gradientBlue}`" @click="confirm_button" >confirm</button>

    </div>
   </div>

    <form class="flex flex-col lg:flex-row  items-center w-full" id="accel_form" method="POST" v-on:submit.prevent="send_button">

    <div class="flex flex-row border-2 border-blue-400 rounded-lg text-2xl justify-between items-cente p-2 m-2 w-full">
        <select class="p-1 m-1 border-none outline-none w-full bg-transparent" name="id_type_accels">
            <option v-for="(value,index) in type_accel"  :key="index" :value="value.id_type_accels">{{value.name_item_accel}}</option>
          </select>
    </div>

    <div class="flex flex-row border-2 border-blue-400 rounded-lg justify-between items-center p-2 m-2">
        <h4 class="text-2xl p-1 m-1 font-medium">Total</h4>
        <input name="time_accel" class="text-lg text-gray-700 bg-transparent outline-none border-none font-medium m-1 p-1"  :value=convertTime(time_to_accel) >
        <input name="time_accel_sec" class="hidden"  :value=(time_to_accel) >
    </div>
    <button  class="w-full btn p-4 m-2 rounded-lg font-semibold" :class="`${gradientBlue}`" type="submit">Save</button>
   
    </form>
    <main class="flex flex-col xl:grid xl:grid-cols-12 " >
       
            <div v-for="(item, index) in meters" :key="index"  class="flex flex-row col-span-4 shadow-md bg-white
            justify-between items-center text-gray-700 p-2 m-2 rounded-lg border-l-4 border-blue-500 ">
              <label class="font-semibold p-2 m-2 capitalize">{{item.label }}</label>
              <input type="number" v-model="item.value" min="0" class="p-2 m-2 bg-transparent text-gray-700 font-bold text-end h-full rounded-lg focus:outline-blue-400">
    </div>
    </main>
    </div>
    </div>
    </section>
</template>
<script>
  import axios from 'axios'
export default {
    name:"AccelCalcul",
    data:() => {
        return {
            message:false,
            your_account :"",
            gradientBlue:"bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-100   ",
            gradientYellow:"bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-yellow-100 ",
            gradientRed:"bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-100 ",
            error:false,
            meters:[
                { label :'M1', value:0},
                { label :'M5', value:0},
                { label : 'M10',value:0},
                { label :'M15', value:0},
                { label :'M30', value:0},
                { label :'H1', value:0},
                { label :'H3', value:0},
                { label :'H8', value:0},
                { label :'H15', value:0},
                { label :'D1', value:0},
                { label :'D3', value:0},
                { label :'D7', value:0},
                { label :'D30', value:0},

            ],

       number:200000,
       type_accel:[],

        }
    },      
    async mounted(){
        this.type_accel = await this.getTypeAccel()
        this.error =  this.get_account()
    },
    async updated(){
      
    },
    methods :{
       async  getTypeAccel(){
        await axios.get(`${process.env.VUE_APP_URL_API}api/type_accel/`)
        .then(response =>{this.type_accel = response.data.results})
        
        return this.type_accel
    },
     get_account(){
      
        const id_account = this.$route.params.governor_id;

        if (id_account.length>0){
            
            return this.your_account
        }
        else{
            
            return this.error=true;
        }

    },
    async send_button(){
                   
                    const time_accel_element = document.getElementsByName("time_accel_sec")[0].value;
                
                   let form_accel = document.getElementById('accel_form');
                   const id_account = this.$route.params.governor_id;
                   const formData = {};
                 
                   for (let field of form_accel.elements) {
                       if (field.value == "") {
                           field.value =0
                       }
                       formData[field.name]= field.value;
                       }
                   formData["id_account"]=id_account
                   formData["time_accel"]=time_accel_element
                   
                   await axios({
                       method: 'POST',
                       url:`${process.env.VUE_APP_URL_API}api/accel_user/`,
                       data:formData,
                       headers: {Accept:'application/json'}
                   })
                   .then(this.message=true,this.resetValues())
         
                   

               },
               convertTime(seconds) {
      const days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      const hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return `${days} D ${hours} h ${minutes} m`;
    },
               confirm_button(){
                return this.message=false;
               },
               resetValues(){
            for (const meter of this.meters) {
        meter.value = 0;
    }
        }

               
},
    computed:{
 
      time_to_accel(){
                var C1=60;
                var C60 =Math.pow(C1,2);
                let nbr= 0
                nbr +=
            this.meters[0].value*C1+
            this.meters[1].value*(C1*5)+
            this.meters[2].value*(C1*10)+
            this.meters[3].value*(C1*15)+
            this.meters[4].value*(C1*30)+
            this.meters[5].value*(C60)+
            this.meters[6].value*(C60*3)+
            this.meters[7].value*(C60*8)+
            this.meters[8].value*(C60*15)+
            this.meters[9].value*(C60*24)+
            this.meters[10].value*((C60*24)*3)+
            this.meters[11].value*((C60*24)*7)+
            this.meters[12].value*((C60*24)*30);

            return nbr
                
            },
    }

}
</script>