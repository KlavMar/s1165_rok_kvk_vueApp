<template>
    <div class="relative flex flex-col items-center min-h-screen ">
      <div v-if="loading" class="flex justify-center items-center absolute inset-0 bg-white z-40 h-screen w-screen">
        <div class="loader"></div>
      </div>

        <!-- <h3 arial_label="time left to open" class="time_left text-6xl p-2 m-2 text-gray-600 p-2 m-2 text-center font-bold"> Time left : {{ time_left }}</h3>
        <section v-if="time_left<=0"> -->
        <section class="flex flex-col p-2 m-2 justify-center items-center w-full xl:max-w-3xl">
          <div class="grid grid-cols-12 gap-4 w-full">
    <div class="p-2 col-span-4 flex flex-col justify-center items-center text-lg xl:text-2xl font-semibold
    bg-gradient-to-br from-blue-500 to-cyan-500 text-gray-50"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="activeTab = index"
      :class="{ 'active': index === activeTab }"
    >
      {{ tab.title }}
    </div>
  </div>
  <div class="tab-content text-xl text-gray-800 font-semibold leading-loose flex flex-col justify-center items-center p-2 m-2">
    <div v-for="(tab, index) in tabs" :key="index" v-show="index === activeTab">
        <div v-html="tab.content"></div>

    </div>
  </div>      
  
  <button class="bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500 font-bold text-gray-50 py-2 px-5 m-2 rounded-lg" @mouseover="isactivescreen=true" @mouseleave="isactivescreen=false"> 
    Your image must be => <small> Hover me </small></button>
  
    <img v-show="isactivescreen" src="@/assets/hall_of_fame.jpeg" class="w-full rounded-xl">

        <form enctype="multipart/form-data" id="image_" >
        <div class="custom-file-upload relative  z-1" >
            <button  class=" button p-2 m-2 rounded-lg text-white z-2" type="button" @click="openFilePicker">File</button>
          <input type="file" ref="imageInput" accept=".jpg, .jpeg, .png" @change="loadImage" class="custom-file-input absolute inset-0 ">
          </div>
      
        </form>
            <img   src="#" alt="" id="image" class="m-2 p-2" style="box-sizing: content-box; border-radius: 2em;">
        <div id="message" class="bg-white p-2 m-2 text-3xl font-bold text-gray-700 absolute inset-0 text-center" v-if="message">Data are send, redirect after 5sec </div>
        <div class="m-2 p-2 w-full"  v-if="!message ">

          <form  v-on:submit.prevent="FormSend" id="form_ocr" class="grid grid-cols-12 gap-6">
            <label for="id_account" class="col-span-12 xl:col-span-6 text-xl font-semibold p-2 m-2">Governor Id </label>
            <input type="number" name="id_account" v-model="governor_id" class="col-span-6 px-5 py-2 text-xl font-semibold m-2 bg-blue-900 text-white rounded-lg">
            <select id="id_kvk" name="id_kvk" class="col-span-12 p-2 m-2 hidden">

              <option  v-for="(value,index) in kvk" :key="index" :name="value.id" :value="value.id" >{{ value.name_kvk }}</option>
            </select>
        

            <button type="submit"  data-action="confirm" :disabled="isSubmitDisabled" 
            :class="[
            'col-span-12 xl:col-span-6 btn text-gray-50 px-5 py-2 font-bold',
            isSubmitDisabled ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500'
        ]"
            >confirm</button>
  
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  // import VueCookies from 'vue-cookies'
  import axios from 'axios';
  // import VueCookies from 'vue-cookies'

  export default {
    name: "HallOfFame",

    data() {
      return {
        activeTab: 0,
        message:false,

        imageLoaded: false,
        loadedImage: null,
        loading: false,
        governor_id:"",
        file:'',
        user:'',
        data:[],
        counter:0,
        image:'',
        kvk:'',
        time_left:0,
        open:false,
        isactivescreen:false,
        tabs:[
          {
            title:"Instruction English",
            content:`<p>The image should be a scrensshot of the hall of fame with details of the deaths (not just the total)</p>
        <p>The image must not be modified</p>
        <p> Select your governor name and confirm</p>
          <p> Send your image</p>

      `
          },
          {
            title:"Instruction Français",
            content:`<p>L'image doit être un screenshot du Hall des héros avec le détails des morts (pas seulement le total)</p>
        <p>L'image ne doit pas être modifié</p>
        <p>Selectionner votre nom de gouverneur</p>
          <p> Envoyer votre image</p>
          `
          },

        ]
   
      };
    },
   async  mounted(){

    },
async created(){
  this.data=await this.getGovernorName();
  this.kvk = await this.getKvk();


},
    methods: {
      changeTab(index) {
      this.currentTab = index;
    },

      async getGovernorName(){
                let url =`${process.env.VUE_APP_URL_API}api/get_players/`               
                await axios.get(url)
                .then(response=>{this.data = response.data})
                return this.data
            },

      async getKvk(){
          await axios.get(`${process.env.VUE_APP_URL_API}api/kvk_date/?ordering=-id&limit=1`)
          .then(response=>{this.kvk=response.data.results})
          return this.kvk
      },




      loadImage() {
        // Vérifier si un fichier a été sélectionné
        if (this.$refs.imageInput.files && this.$refs.imageInput.files[0]) {
          const reader = new FileReader();
          this.file =this.$refs.imageInput.files[0];
                const image = document.getElementById("image");
                image.src=URL.createObjectURL(this.file)
          reader.onload = () => {
            // La fonction onload est appelée lorsque l'image est chargée
            this.imageLoaded = true; // Mettre à jour le statut de l'image chargée
            
          };
  
          reader.readAsDataURL(this.$refs.imageInput.files[0]);
        }
      },
      async  FormSend() {

  const form = document.getElementById('form_ocr');
  const formData = new FormData(form);

  // Sélectionnez les champs "Type de Unit", "Type de Troop" et "Value"
  const id_account = formData.get('id_account');

  const kvk =formData.getAll("id_kvk");


  
  const FormDataImg = new FormData(document.getElementById('image_'))
  
  // Sélectionnez l'image à partir du champ de fichier
  const imageFile = this.$refs.imageInput.files[0];
  FormDataImg.append('image', imageFile);
  FormDataImg.append('id_account',parseInt(id_account))
  FormDataImg.append('id_name_kvk',parseInt(kvk[0]))

  await axios.post(`${process.env.VUE_APP_URL_API}api/hall_of_fame_img/`,FormDataImg,{headers:{'api-key': process.env.VUE_APP_API_KEY}})


  this.message=true;
  return setTimeout(() => {
  this.$router.push("/");
}, 5000);

}

    },
    computed: {
                // Utilisez une propriété calculée pour déterminer si le bouton doit être désactivé
                isSubmitDisabled() {
                  console.log("Image load =>" +this.imageLoaded)
                  if (this.imageLoaded === false){
                    return true
                  }
                  else {
                    return false
                  }
              
                }
            },

   
}
  </script>
  
  <style scoped>
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }




.custom-file-upload .custom-file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.button {
  position: relative;
  width: 120px;
  height: 40px;
  background-color: #000;
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  left: -4px;
  top: -1px;
  margin: auto;
  width: 128px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.button::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
  filter: blur(15px);
}

.input-gov{
 

}

.tabs div {

cursor: pointer;
}

.tabs div.active {
background-color: #fff;
border-bottom: 1px solid #fff;
}

.tab-content div {

}

.tab-content div.show {
display: block;
}
  </style>
  