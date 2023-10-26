<template>
    <div class="relative flex flex-col items-center h-screen ">
      <div v-if="loading" class="flex justify-center items-center absolute inset-0 bg-white z-40 h-screen w-screen">
        <div class="loader"></div>
      </div>
        <section class="flex flex-col p-2 m-2 justify-center items-center w-full xl:max-w-3xl">

            <form @submit.prevent="submitImage" enctype="multipart/form-data" id="image_" >
        <div class="custom-file-upload relative  z-1" >
            <button  class=" button p-2 m-2 rounded-lg text-white z-2" type="button" @click="openFilePicker">File</button>
          <input type="file" ref="imageInput" accept=".jpg, .jpeg, .png" @change="loadImage" class="custom-file-input absolute inset-0 ">
          </div>
      
        </form>
            <img   src="#" alt="" id="image" class="m-2 p-2" style="box-sizing: content-box; border-radius: 2em;">
        <div id="message" class="bg-white p-2 m-2 text-3xl font-bold text-gray-700 absolute inset-0 text-center" v-if="message">Data are send, redirect after 5sec </div>
        <div class="m-2 p-2"  v-if="OcrData.length && !message ">

          <h3 class="p-2 m-2 font-bold text-2xl text-gray-600">Résult</h3>
          <form  v-on:submit.prevent="FormSend" id="form_ocr" class="grid grid-cols-12 gap-6">
      
          <button type="submit"  data-action="confirm" class="col-span-12 xl:col-span-6 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-gray-50 px-5 py-2  font-bold" >confirm</button>
      
            <fieldset  v-for="(data, index) in OcrData" :key="index" class="col-span-12" >

            <div class="grid grid-cols-12 gap-6 text-gray-500  p-2 m-2 rounded-lg" v-if="data>0">
              <select  name="type_units" class="col-span-12 xl:col-span-3 p-1 m-1 rounded-lg font-semibold "  >
         
                <option v-for="(value,index) in typeUnit" :key="index"    :value="value.id_type_unit" :name="value.id_type_unit" >{{ value.name_type_unit }}</option>

              </select>
              <select  name="type_troops" class="col-span-12 xl:col-span-3 p-1 m-1 rounded-lg font-semibold ">
                <option v-for="(value,index) in typeTroops" :key="index"    :value="value.id_type_troops" :name="value.id_type_troops"> {{ value.name_type_troops }}</option>
              </select>
              <div class="col-span-12 xl:col-span-3">
                <input v-if="data ==0" value=0 name="value" class="p-2 m-2 rounded-lg font-semibold  ">
                      <input v-else  :value=data name="value" class="p-2 m-2 rounded-lg font-semibold">
              </div>
              <div @click="deleteblock(index)" 
  class="flex justify-center items-center gap-2 col-span-12 xl:col-span-3 h-12 cursor-pointer rounded-md  text-white
   font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#fb7185]">
                <svg viewBox="0 0 15 15" class="w-5 fill-white">
    <svg
      class="w-6 h-6"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></path>
    </svg>
    Button
  </svg>
</div>
            </div>
         
            </fieldset>


  
          </form>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  // import VueCookies from 'vue-cookies'

  export default {
    name: "OcrApp",

    data() {
      return {
        message:false,
        OcrData: [],
        imageLoaded: false,
        loadedImage: null,
        loading: false,
        file:'',
        user:'',
        data:[],
        counter:0,
        count:0,
        image:'',
        open:false,

   
      };
    },
   async  mounted(){

    },
async created(){

},
    methods: {
      async submitImage() {
        this.loading = true;
        const formData = new FormData();
        formData.append("image", this.$refs.imageInput.files[0]);
        this.count=0
        try {
         // const response = await axios.post(`${process.env.VUE_APP_URL_API_OCR}`, formData, {
            delete axios.defaults.headers.common['Authorization'];
            const response = await axios.post("http://192.168.1.17:5002/process_image_troops", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response)
          this.OcrData = response.data.data;

        } 
        catch(error){
            console.log(error)
        }
        finally {
         
          this.loading = false; 
// Désactiver l'état de chargement une fois la réponse reçue
        }
      },
      deleteblock(index){
        this.OcrData.splice(index,1)
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
            
            this.submitImage(); // Soumettre le formulaire dès que l'image est chargée
          };
  
          reader.readAsDataURL(this.$refs.imageInput.files[0]);
        }
      },
      async  FormSend() {
  
     await axios.post(`${process.env.VUE_APP_URL_API}api/troops_user/`);
  
      let data = {
    "Archers_nb_T4": null,
    "Archers_nb_T5": null,
    "Infanterie_nb_T4": null,
    "Infanterie_nb_T5": null,
    "Cavalerie_nb_T4": null,
    "Cavalerie_nb_T5": null,
    "Sieges_nb_T4": null,
    "Sieges_nb_T5": null,
    "id_account": null
    }
    console.log(data)
  this.message=true;
  return  setTimeout(() => {this.$router.push({ name: 'nav', params: { governor_id: this.$route.params.governor_id } });
                            }, 3000);
                            

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
  