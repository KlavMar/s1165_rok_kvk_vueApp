<template>

    <section class="flex flex-col w-max-full  xl:w-10/12 2xl:w-8/12 mx-auto min-h-screen" v-if="this.access">
    <div id ="data_user" class=" relative p-2 m-2" >
        <div class="flex grid grid-cols-12 gap-4 py-2 my-2 ">
            <p class="col-span-12 text-xl font-bold p-2 m-2" v-if="data.length==0">You have no Profil please Add</p>
            <button class="col-span-4 w-full xl:col-span-1 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 m-2 rounded-lg font-semibold"  @click="add_button">Add</button>

            <button class="col-span-4 w-full  xl:col-span-1 btn bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-yellow-200 px-5 py-2 m-2 rounded-lg font-semibold"  v-if="data.length>0" @click="update_button">Update</button>
            <button class="col-span-4 w-full xl:col-span-1 btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200 px-5 py-2 m-2 rounded-lg font-semibold"   v-if="data.length>0" @click="delete_button">Delete</button>
        </div>
        <div class="flex flex-col xl:grid xl:grid-cols-12 gap-6 flex-wrap p-2 m-2">
            <router-link :to="{name:'dashboard', params:{governor_id:value.id_account}}" @click="createCookieGov(value.id_account)" 
            class="font-semibold hover:bg-gradient-to-br from-blue-700  to-sky-900 hover:text-gray-50 bg-white hover:shadow-2xl 
            w-full col-span-4 rounded-lg p-5 m-2 text-xl" v-for="(value,index) in data" :key="index" ><h1>{{value.governor_name}}</h1>
                <div class="card-user-data">
                    <small class="text-lg color-gray-600">{{value.date_updated}}</small>
                    <p>{{value.id_alliance.name_alliance}}</p>
                    <p>{{value.id_kingdom.id_kingdom}} - {{value.id_kingdom.name_kingdom}}</p>
                </div>
            </router-link>
        </div>
    
    
        <!-- add account -->



        <form  v-show="isActiveAdd" id="form_add" 
        class=" modal flex flex-col justify-center items-center rounded-lg  bg-gradient-to-br from-blue-800 via--sky-600 to-cyan-500 font-semibold text-gray-700 text-xl  p-10" 
        aria-label="add-account" method="POST"  v-on:submit.prevent="FormAddAccount">
          
            <fieldset class="grid grid-cols-12 gap-8 w-full xl:w-1/3">
                <input type="number" name="id_account" class="p-2 m-2 col-span-12 focus:outline focus:outline-2 outline-blue-500 rounded-lg" placeholder="Id account">
                <input type="text" name="governor_name" placeholder="governor Name" class="p-2 m-2 col-span-12  focus:outline focus:outline-2 outline-blue-500 rounded-lg">
                
                <select name="id_type_account" class="p-2 m-2 col-span-12  focus:outline focus:outline-2 outline-purple-500 rounded-lg">
                    <option v-for="(option,index) in type_account" :key="index" :value="option.id_type_account">{{option.name_type_account}}</option>
                </select>
                <select  @change="get_alliance($event.target.value)" name="id_kingdom" class="p-2 m-2 col-span-12 focus:outline focus:b-2 outline-blue-500 rounded-lg"
                required="required">
                    <option>Choose your Kingdom please click</option>
                    <option  v-for="(option,index) in kingdom" :key="index" :value="option.id_kingdom">{{option.id_kingdom}} - {{option.name_kingdom}}</option>
                </select>
                <select name="id_alliance" class="p-2 m-2 col-span-12 focus:outline focus:outline-2 outline-purple-500 rounded-lg"
                required="required">
                    <option v-for="(option,index) in alliance" :key="index" :value="option.id_alliance"> {{option.name_alliance}}</option>
                </select>
     
                    <button type="submit" class=" col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
                    <button class="col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200  px-5 py-2 rounded-lg font-semibold"  @click.prevent="cancel_button">Cancel</button>
          
            </fieldset>
        </form>
        <!-- end add account-->
    
        <!-- update account -->
        <form method="POST" id="form_update_account" arial-label="form_update_account" 
        class=" modal flex flex-col justify-center items-center rounded-lg  bg-gradient-to-br from-amber-500 to-yellow-500  min-h-screen p-10"
                aria-label="update-account" v-show="isActiveUpdate"  v-on:submit.prevent="FormUpdateAccount">
        <fieldset class="grid grid-cols-12 gap-4 w-full xl:w-1/3">
                <input type="number" name="id_account" class="p-2 m-2 col-span-12 focus:outline focus:outline-2 outline-blue-500 rounded-lg" placeholder="Id account">
                <input type="text" name="governor_name" placeholder="governor Name" class="p-2 m-2 col-span-12  focus:outline focus:outline-2 outline-amber-500 rounded-lg">
                
                <select name="id_type_account" class="p-2 m-2 col-span-12  focus:outline focus:outline-2 outline-purple-500 rounded-lg">
                    <option v-for="(option,index) in type_account" :key="index" :value="option.id_type_account">{{option.name_type_account}}</option>
                </select>
                <select  @change="get_alliance($event.target.value)" name="id_kingdom" class="p-2 m-2 col-span-12 focus:outline focus:b-2 outline-blue-500 rounded-lg"
                required="required">
                    <option>Choose your Kingdom please click</option>
                    <option  v-for="(option,index) in kingdom" :key="index" :value="option.id_kingdom">{{option.id_kingdom}} - {{option.name_kingdom}}</option>
                </select>
                <select name="id_alliance" class="p-2 m-2 col-span-12 focus:outline focus:outline-2 outline-purple-500 rounded-lg"
                required="required">
                    <option v-for="(option,index) in alliance" :key="index" :value="option.id_alliance"> {{option.name_alliance}}</option>
                </select>
     
                    <button type="submit" class=" col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
                    <button class="col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200  px-5 py-2 rounded-lg font-semibold"  @click.prevent="cancel_button">Cancel</button>
          
            </fieldset>
        </form>
    
            <!-- del account-->
            <form method="POST" 
        class=" modal flex flex-col justify-center items-center rounded-lg absolute bg-gradient-to-br from-red-500 to-orange-500  p-10" 

        aria-label="delete-account" v-show="isActiveDel" id="form_delete_account" v-on:submit.prevent="FormDeleteAccount">  
        <fieldset class="grid grid-cols-12 gap-4">
            <select @change="account_choice_delete($event.target)" class="p-2 m-2 col-span-12 xl:col-span-3 focus:outline focus:outline-2 outline-red-500 rounded-lg" name="id_account">
                <option value="">Choose account to delete</option>
                <option v-for="(value,index) in data" :key="index" :value="value.id_account" :name="value.governor_name">{{value.governor_name}}</option>
            </select>
            <div class="col-span-12">
            <div class="grid grid-cols-12  gap-4 w-full my-2 py-2"  v-show="confirm">
                <p class="col-span-12 text-lg text-gray-50 font-bold m-2 p-3">You are about to delete the account {{data_account}}</p>
                <button type="submit" class=" col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
                <button class="col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200  px-5 py-2 rounded-lg font-semibold"  @click.prevent="cancel_button">Cancel</button>
          </div>
        </div>
          </fieldset>
        </form>

        <!-- end del account-->
      
            
        </div>
    </section>
    <div v-else>
      <div class="  xl:h-screen flex justify-center items-center">
        <h3 class="text-xl bg-red-500 xl-h-64 rounded-lg p-10 m-2  text-gray-50 font-bold" >
            You haven't access this page - You need create account - Token Connection not permise this access

        </h3> </div>
    </div>
    </template>
        <script>
    import axios from 'axios';
    import VueCookies from 'vue-cookies'

    export default {
      watch: {
      },
    name:'AccountPage',
                data:() =>{
                    return {
                        data:[],
                        kingdom:[],
                        alliance:[],
                        type_account:[],
                        isActiveAdd:false,
                        isActiveUpdate:false,
                        isActiveDel:false,
                        confirm:false,
                        data_account:false,
                        id_data_account:false,
                        id_account:'',
                        access:'',
                        user_id:'',
              
      
                      
                    }
                },
                async created() {
           

                        this.user_id = this.$cookies.get('user_id')
                        this.access=this.$cookies.get("jwt_token");

                        this.kingdom=await this.getKingdom();
                        this.data= await this.getData();
                        this.type_account=await this.getTypeAccount();
                        this.data = await this.getData();   
                    
                    },


                methods:{
    
                    add_button(){
                        this.isActiveAdd=true;
                    },
                    update_button(){
                        this.isActiveUpdate=true;
                    },
                    delete_button(){
                        this.isActiveDel=true;
                    },
                    cancel_button(){
                        this.isActiveAdd=false;
                        this.isActiveUpdate=false;
                        this.isActiveDel=false;
                        
                    },
                    account_choice_update(){
                        this.confirm=true;
                        this.data_account= event.options[event.selectedIndex].getAttribute('name');
                        this.id_data_account=event.value
                        
                    },
                    account_choice_delete(event){
                        this.confirm=true;
                        this.data_account= event.options[event.selectedIndex].getAttribute('name');
                    
                        this.id_data_account=event.value
                   
                    },
                    async getData(){
                    try{
                        
                        let url =`${process.env.VUE_APP_URL_API}api/user_account/?user_id=${this.user_id}&ordering=-power`
               
                      const response =   await axios.get(url)
                        if (response.status== 200){
                            return this.data = response.data.results
                        }
                        else{
                          return this.data = []
                        }
                        
                    }
                        catch(error)
                    {
                        return this.data = []
                    }
                
                },
                    async getKingdom(){
                        await axios.get(`${process.env.VUE_APP_URL_API}api/kingdom/`)
                        .then(response => {
                            this.kingdom = response.data.results})
                        return this.kingdom
                    
                    },
                    async getTypeAccount(){
                        await axios.get(`${process.env.VUE_APP_URL_API}api/type_account/`)
                        .then(response => {
                            this.type_account = response.data.results
                        })
                        return this.type_account
                    },
                async get_alliance(id){
                  
                    await axios.get(`${process.env.VUE_APP_URL_API}api/alliance/?id_kingdom=${id}`)
                    .then(response=>{this.alliance=response.data.results})
                    
                },
                cancelSubmit(event){
                        event.preventDefault();
                    },
                    createCookieGov(governor_id){
            
                        VueCookies.set("governor_id",governor_id)
                    },
                async FormAddAccount(){
                    let form = document.getElementById("form_add");
                    const formData = {};
                    for (let field of form.elements) {
                        if (field.value == "") {
                                field.value =0
                            }
                        formData[field.name]= field.value;
                    }
                    
                    let id_account = document.querySelector('[name=id_account]').value;
                    let governor_name = document.querySelector('[name=governor_name]').value;
                    let id_kingdom = document.querySelector('[name=id_kingdom]').value;
                    let id_alliance = document.querySelector('[name=id_alliance]').value;

                    let id_type_account = document.querySelector('[name=id_type_account]').value;
                    this.isActiveAdd=false
        
    
                    await axios({
                        method:"POST",
                        url:`${process.env.VUE_APP_URL_API}api/user_account/`,
                        data:
                        {
                            id_account: id_account,
                            governor_name: governor_name,
                            user_id: this.user_id,
                            id_type_account: id_type_account,
                            id_kingdom: id_kingdom,
                            id_alliance: id_alliance
                        },
                      
                    })
                        .then(this.isActive=false)
                        return this.getData()
    
                },
                async FormUpdateAccount(){
                    let form = document.getElementById("form_update_account");
                    
                    const formData = {};
                      
                    for (let field of form.elements) {
                        if (field.value == "") {
                                field.value =0
                            }
                        formData[field.name]= field.value;
                    }
                    formData["user_id"]=this.user_id
                
                    await axios({
                        method:"PATCH",
                        url:`${process.env.VUE_APP_URL_API}api/user_account/${this.id_account}/`,
                        data:formData,
                        
                    })
                    .then(this.getData())
                    .then(this.isActiveUpdate=false)

                    return this.getData()
    
    
                },
                async FormDeleteAccount(){
                    let form = document.getElementById("form_delete_account");
                    
                    const formData = {};
                    for (let field of form.elements) {
                        if (field.value == "") {
                                field.value =0
                            }
                        formData[field.name]= field.value;
                    }    
           
                    await axios({
                        method:"DELETE",
                        url:`${process.env.VUE_APP_URL_API}api/user_account/${formData["id_account"]}/`,
                        headers: {Accept:'application/json'}
                    })
                    .then()
                   
                    .finally(this.getData(),this.isActiveDel=false)

                    return this.getData()
    
                }
                },
                
            }
        </script>
        <style  scoped>
            .modal{
                position: fixed;
                inset:0;
                width: auto;    
                z-index: 1;
                
                height: auto;
                
    
            }

        </style>
    
    
    
    
    
    