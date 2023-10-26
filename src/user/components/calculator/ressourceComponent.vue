<template>
<div id="rss_app" class="w-full">

    <form id="form_rss"  method="POST" v-on:submit.prevent="send_button">
        <div class="font-semibold p-2 m-2 " v-if="isActive">
            Your data is insert , redirect in 3 sec
        </div>
    <div class=" rounded-2xl flex flex-col xl:grid xl:grid-cols-12 gap-6 p-2 m-2">
        
        <div v-for="(value,index) in resources" :key="index" class="flex flex-row col-span-3
        bg-gradient-to-br from-emerald-300 to-green-200
         justify-between items-center text-gray-700 p-3 m-2 rounded-lg">
            <h4 class="font-semibold text-xl p-2 m-2 capitalize">{{value.name }}</h4>
            <input :name="value.name" class="text-gray-700 p-2 font-bold text-end" :value="value.value">
        </div>
        <button class="btn p-2 m-2 rounded-lg font-semibold col-span-2  bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-100"   type="submit" >Save</button>
     </div>
     
    
      </form>
        <main class="flex flex-col xl:grid xl:grid-cols-12 flex-wrap gap-6 p-2 m-2">
       <div class="flex flex-col col-span-3 p-2 m-2 " v-for="elem in liste_el" :key="elem.title">
     
        <h3 class="text-3xl p-3 m-2 text-gray-700 font-semibold">{{elem.title}}</h3>
   
        <div class="flex flex-row xl:grid xl:grid-cols-12 gap-4  p-2 m-2 outline outline-2 outline-gray-200 border-l-8 rounded-l-lg  border-green-500 bg-white  " v-for="item in elem.value" :key="item.label">
            <label class=" font-semibold p-1 m-1 col-span-4 ">{{item.number }} </label>
            <input type="number" v-model="item.value" min="0" class=" w-full col-span-8 border- text-gray-700 font-bold text-end">
        </div>
       </div>
       </main>


  

     
      </div>
</template>
  <script>
  import axios from 'axios'
export default {
    name:"RssCalcul",
    data() {
      return {
        isActive:false,
        error:false,
        gradientRed:"bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-100 ",
        liste_el:[
        {
                    title:"Food",
                    value:[
                        { label :'F1',number:1000,value:0},
                        { label :'F2',number:10000, value:0},
                        { label :'F3',number:50000, value:0},
                        { label :'F4',number:150000,value:0},
                        { label :'F5', number:500000,value:0},
                        { label :'F6',number:1500000, value:0},
                        { label :'F7',number:5000000, value:0},
                        ]
                },
                {
                    
                    title:"Wood",
                    value:[
                            { label :'W1',number:1000,value:0},
                            { label :'W2',number:10000, value:0},
                            { label :'W3',number:50000, value:0},
                            { label :'W4',number:150000,value:0},
                            { label :'W5', number:500000,value:0},
                            { label :'W6',number:1500000, value:0},
                            { label :'W7',number:5000000, value:0},
                    ],
                },

                {
                    title:"Stone",
                    value:[
                        { label :'S1',number:750,value:0},
                        { label :'S2',number:7500, value:0},
                        { label :'S3',number:37500, value:0},
                        { label :'S4',number:112500,value:0},
                        { label :'S5', number:375000,value:0},
                        { label :'S6',number:1125000, value:0},
                        { label :'S7',number:3750000, value:0},
                        ]
            },
            {
                    title:"Gold",
                    value:[
                        { label :'G1',number:500,value:0},
                        { label :'G2',number:3000, value:0},
                        { label :'G3',number:15000, value:0},
                        { label :'G4',number:50000,value:0},
                        { label :'G5', number:200000,value:0},
                        { label :'G6',number:600000, value:0},
                        { label :'G7',number:2000000, value:0},
                    ]
            },
            ]
      }
    },
    async mounted(){
        this.error =  this.get_account()
    },
    methods:{
        wood() {
    if (this.liste_el) {
      const woodValue = this.liste_el.find(item => item.title === 'Wood');
      if (woodValue) {
        return this.convertNumber(woodValue.value.reduce((total, item) => total + item.number * item.value, 0));
      }
    }
    return 0;
  },
  food() {
    if (this.liste_el) {
      const foodValue = this.liste_el.find(item => item.title === 'Food');
      if (foodValue) {
        return this.convertNumber(foodValue.value.reduce((total, item) => total + item.number * item.value, 0));
      }
    }
    return 0;
  },
  stone() {
    if (this.liste_el) {
      const stoneValue = this.liste_el.find(item => item.title === 'Stone');
      if (stoneValue) {
        return this.convertNumber(stoneValue.value.reduce((total, item) => total + item.number * item.value, 0));
      }
    }
    return 0;
  },
  gold() {
    if (this.liste_el) {
      const goldValue = this.liste_el.find(item => item.title === 'Gold');
      if (goldValue) {
        return this.convertNumber(goldValue.value.reduce((total, item) => total + item.number * item.value, 0));
      }
    }
    return 0;
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
                   
                    const id_account = this.$route.params.governor_id;
                    if (id_account != ""){
                        
                        let wood = document.querySelector('[name=wood]').value.replace(/\s/g,"");
                        let food = document.querySelector('[name=food]').value.replace(/\s/g,"");
                        let stone = document.querySelector('[name=stone]').value.replace(/\s/g,"");
                        let gold = document.querySelector('[name=gold]').value.replace(/\s/g,"");
                   
                   await axios({
                       method: 'POST',
                       url:`${process.env.VUE_APP_URL_API}api/ressource_user/`,
                       data:
                       {
                        wood: wood,
                        food: food,
                        stone: stone,
                        gold: gold,
                        "id_account": id_account
                    },
                      
                   }).then(() => {
                            this.isActive = true;
                            setTimeout(() => {
                                this.$router.push({ name: 'nav', params: { governor_id: this.$route.params.governor_id } });
                            }, 3000);
                            })

             
                   
                    }
                    else{
                        alert('Id Account is not defined')
                    }
                 
               },
               confirm_button(){
                return this.isActive=false;
               },
               convertNumber(nbr) {
  var nombre = '' + nbr;
  return nombre.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
               
    },
    computed: {
        resources() {
            return [
                { name: 'wood', value: this.wood()},
                { name: 'food', value: this.food() },
                { name: 'stone', value: this.stone() },
                { name: 'gold', value: this.gold() },
               
                ]
    },


    

    }
  }
  </script>
