<template>
    <div class="relative">
      <div v-if="loading" class="flex justify-center items-center absolute inset-0 bg-white">
        <div class="loader z-40"></div>
      </div>
  

        <h3 arial_label="time left to open" class="time_left text-2xl xl:text-4xl p-2 m-2 text-gray-600 p-2 m-2 text-center font-bold"> Time left : {{ time_left }}</h3>
        <section v-show="time_left<=0">
        <div class="p-2 m-2 font-medium text-gray-600">
          <p> Send your image</p>
          <p> Some data may not be detected </p>
          <p> You must select the type of troops and units</p>
          <p>Values of 0 are not taken into account</p>
          <p> Select your governor name and confirm</p>
         
        </div>
        <form @submit.prevent="submitImage" enctype="multipart/form-data" id="image_" >
        <div class="custom-file-upload relative overflow-hidden z-1" >
            <button  class="bg-gradient-to-br from-emerald-500 to-lime-500 p-2 m-2 rounded-lg text-white z-2" type="button" @click="openFilePicker">File</button>
          <input type="file" ref="imageInput" accept=".jpg, .jpeg, .png" @change="loadImage" class="custom-file-input absolute inset-0 ">
          </div>
      
        </form>
            <img   src="#" alt="" id="image" style="box-sizing: content-box; border-radius: 2em;">
 
        <div v-if="OcrData.length">
          <button v-on:click="counter += 1">Add bloc troops</button>
          <h3 class="p-2 m-2 font-bold text-xl text-gray-600">Résultat</h3>
          <form  v-on:submit.prevent="FormSend" id="form_ocr" class="grid grid-cols-12 gap-6">
            <select id="id_kvk" name="id_kvk" class="col-span-12 p-2 m-2">
              <option  v-for="(value,index) in kvk" :key="index" :name="value.id" :value="value.id" >{{ value.name_kvk }}</option>
            </select>
            <button type="submit" class=" col-span-12 w-full btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
            <select  class=" col-span-12 font-semibold  w-full  rounded-lg p-2 m-2 text-lg" name="id_account" >

    <option v-for="(value,index) in data" :key="index"   :value="value.governor_id" :name="value.governor_id"> {{ value.governor_name }}</option>

    </select>

            <fieldset  v-for="(data, index) in OcrData" :key="index" class="col-span-12" >

            <div class="grid grid-cols-12 gap-6 text-gray-500  p-2 m-2 rounded-lg" v-show="data>0">
              <select  name="type_units" class="col-span-12 xl:col-span-3 p-1 m-1 rounded-lg font-semibold "  >

                <option v-for="(value,index) in typeUnit" :key="index"    :value="value.id_type_unit" :name="value.id_type_unit" >{{ value.name_type_unit }}</option>

              </select>
              <select  name="type_troops" class="col-span-12 xl:col-span-3 p-1 m-1 rounded-lg font-semibold ">
                <option v-for="(value,index) in typeTroops" :key="index"    :value="value.id_type_troops" :name="value.id_type_troops"> {{ value.name_type_troops }}</option>
              </select>
              <div>
                <input v-if="data ==0" value=0 name="value" class="col-span-12 xl:col-span-6 p-1 m-1 rounded-lg font-semibold  ">
                      <input v-else  :value=data name="value" class="col-span-12 xl:col-span-6 p-1 m-1 rounded-lg font-semibold">
              </div>
            </div>
            </fieldset>

            <fieldset v-show="counter>0">
              <div class="grid grid-cols-12 gap-6 text-gray-500  p-2 m-2 rounded-lg" v-for="index in counter" :key="index">
              <select  name="type_units" class="col-span-12 xl:col-span-3 p-1 m-1 rounded-lg font-semibold "  >

                <option v-for="(value,index) in typeUnit" :key="index"    :value="value.id_type_unit" :name="value.id_type_unit" >{{ value.name_type_unit }}</option>

              </select>
              <select  name="type_troops" class="col-span-12 xl:col-span-3 p-1 m-1 rounded-lg font-semibold ">
                <option v-for="(value,index) in typeTroops" :key="index"    :value="value.id_type_troops" :name="value.id_type_troops"> {{ value.name_type_troops }}</option>
              </select>
              <div>
                <input type="number" value=0 name="value" class="col-span-12 xl:col-span-6 p-1 m-1 rounded-lg font-semibold  ">
                    
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
  // import { getToken } from '@/auth'

  export default {
    name: "OcrApp",

    data() {
      return {
        OcrData: [],
        typeTroops:[],
        typeUnit:[],
        imageLoaded: false,
        loadedImage: null,
        loading: false,
        file:'',
        user:'',
        data:[],
        counter:0,
        image:'',
        kvk:'',
        time_left:0,
        open:false
      };
    },
   async  beforeCreate(){

//       const token = getToken();
     
//     if (!token) {
//   // Le token n'existe pas, redirigez l'utilisateur vers la page de connexion
//   this.$router.push({name:'login'}) // Assurez-vous d'ajuster le nom de votre route de connexion
// }
// else{
//   console.log(localStorage.getItem('user_id'));
// }
    },
async created(){
  this.data=await this.getGovernorName();
  this.typeTroops =await this.getTypeTroop();
  this.typeUnit = await this.getTypeUnit();
  this.kvk = await this.getKvk();
  setInterval(() => {
      this.kvk.forEach((kvk) => {
        if (this.shouldShowKVK(kvk)) {
          // La fonction shouldShowKVK mettra à jour time_left
        }
      });
    }, 1000);
},
    methods: {
      // gestion des dates 
      shouldShowKVK(kvk) {

      const currentDate = new Date();
      const endDate = new Date(kvk.date_end);
      endDate.setDate(endDate.getDate() - 5);
            // Calculer le temps restant en millisecondes
      const timeRemaining = endDate - currentDate;
      // Stocker le temps restant dans time_left
      this.time_left = this.convertTime(timeRemaining/1000);

      return currentDate >= endDate;
    },
    convertTime(time){
var reste=time;
var result='';

          var nbJours=Math.floor(reste/(3600*24));
          reste -= nbJours*24*3600;
      
          var nbHours=Math.floor(reste/3600);
          reste -= nbHours*3600;
      
          var nbMinutes=Math.floor(reste/60);
          reste -= nbMinutes*60;
      
          var nbSeconds=Math.ceil(reste);
      
          if (nbJours>0)
              result=result+nbJours+'j ';
      
          if (nbHours>0)
              result=result+nbHours+'h ';
      
          if (nbMinutes>0)
              result=result+nbMinutes+'m ';
      
          if (nbSeconds>0)
              result=result+nbSeconds+'s ';
      
          return result;
},
      async getGovernorName(){
                let url =`${process.env.VUE_APP_URL_API}api/players/`               
                await axios.get(url)
                .then(response=>{this.data = response.data})
                return this.data
            },
      async getTypeTroop(){
        let url = `${process.env.VUE_APP_URL_API}api/type_troops/`    
        await axios.get(url)
                .then(response=>{this.typeTroops = response.data.results})
                return this.typeTroops    
      },
      async getTypeUnit(){
        let url = `${process.env.VUE_APP_URL_API}api/type_unit_troops/?ordering=-id_type_unit`  
        await axios.get(url)
                .then(response=>{this.typeUnit = response.data.results})
                return this.typeUnit
      },
      async getKvk(){
          await axios.get(`${process.env.VUE_APP_URL_API}/api/kvk_date/?ordering=-id&limit=1`)
          .then(response=>{this.kvk=response.data.results,console.log(response.data)})
          return this.kvk
      },
      async submitImage() {
        this.loading = true;
        const formData = new FormData();
        formData.append("image", this.$refs.imageInput.files[0]);
        this.count=0
        try {
          const response = await axios.post(`${process.env.VUE_APP_URL_API_OCR}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.OcrData = response.data.data;

        } finally {
         
          this.loading = false; 
// Désactiver l'état de chargement une fois la réponse reçue
        }
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
  const form = document.getElementById('form_ocr');
  const formData = new FormData(form);

  // Sélectionnez les champs "Type de Unit", "Type de Troop" et "Value"
  const id_account = formData.get('id_account');
  const typeUnits = formData.getAll('type_units');
  const typeTroops = formData.getAll('type_troops');
  const values = formData.getAll('value');
  const kvk =formData.getAll("id_kvk");

  console.log(kvk)
  
  const FormDataImg = new FormData(document.getElementById('image_'))
  
  // Sélectionnez l'image à partir du champ de fichier
  const imageFile = this.$refs.imageInput.files[0];
  FormDataImg.append('image', imageFile);
  FormDataImg.append('id_account',parseInt(id_account))
  FormDataImg.append('id_name_kvk',parseInt(kvk[0]))
  
    await axios.post(`${process.env.VUE_APP_URL_API}/api/hall_of_fame_img/`,FormDataImg);
  // Assurez-vous que les trois tableaux ont la même longueur
  if (typeUnits.length === typeTroops.length && typeTroops.length === values.length) {
    for (let i = 0; i < typeUnits.length; i++) {

      let data = {
        "value_troop": values[i],
        "id_account": parseInt(id_account),
        "id_type_unit": parseInt(typeUnits[i]),
        "id_type_troops": parseInt(typeTroops[i]),
        'id_name_kvk':parseInt(kvk[0])
      };
      console.log(data);

      if (values[i] > 0 && typeUnits[i]>3) {
        try {
          const response = await axios.post(`${process.env.VUE_APP_URL_API}/api/hall_of_fame/`, data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}

    },
    computed:{

  }
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


  </style>
  