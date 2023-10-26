<template>

    <section class="flex flex-col w-max-full">
    <div id ="data_user" class=" relative p-2 m-2" >
        <div class="flex grid grid-cols-12 gap-4 py-2 my-2 ">
            
            <button class="col-span-4 w-full xl:col-span-1 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 m-2 rounded-lg font-semibold"  @click="add_button">Add</button>
            <button class="col-span-4 w-full  xl:col-span-1 btn bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-yellow-200 px-5 py-2 m-2 rounded-lg font-semibold"  v-if="data.length>0" @click="update_button">Update</button>
            <button class="col-span-4 w-full xl:col-span-1 btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200 px-5 py-2 m-2 rounded-lg font-semibold"   v-if="data.length>0" @click="delete_button">Delete</button>
        </div>
        <div class="flex flex-col xl:grid xl:grid-cols-12 gap-6 flex-wrap p-2 m-2">
            <router-link :to="{name:'nav', params:{governor_id:value.id_account}}" class="font-semibold hover:bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 hover:text-gray-50 bg-white hover:shadow-2xl 
            w-full col-span-6 rounded-lg p-5 m-2 text-xl" v-for="(value,index) in data" :key="index" ><h1>{{value.governor_name}}</h1>
                <div class="card-user-data">
                    <small class="text-lg color-gray-600">{{value.date_updated}}</small>
                    <p>{{value.id_alliance.name_alliance}}</p>
                    <p>{{value.id_kingdom.id_kingdom}} - {{value.id_kingdom.name_kingdom}}</p>
                </div>
            </router-link>
        </div>
    
    
        <!-- add account -->
        <form  v-show="isActiveAdd" id="form_add" class=" modal flex flex-col flex-wrap bg-white rounded-lg p-2 m-2 " aria-label="add-account" method="POST"  v-on:submit.prevent="FormAddAccount">
          
         
                <input type="number" name="id_account" class="input" placeholder="Id account">
                <input type="text" name="governor_name" placeholder="Nom de joueur" class="input">
                
                <select name="id_type_account" class="input">
                    <option v-for="(option,index) in type_account" :key="index" :value="option.id_type_account">{{option.name_type_account}}</option>
                </select>
                <select  @change="get_alliance($event.target.value)" name="id_kingdom" class="input" required="required">
                    <option></option>
                    <option  v-for="(option,index) in kingdom" :key="index" :value="option.id_kingdom">{{option.id_kingdom}} - {{option.name_kingdom}}</option>
                </select>
                <select name="id_alliance" class="input" required="required">
                    <option v-for="(option,index) in alliance" :key="index" :value="option.id_alliance"> {{option.name_alliance}}</option>
                </select>
                <div class="grid grid-cols-12 gap-4 w-full  my-2 py-2">
                    <button type="submit" class=" col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
                    <button class="col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200  px-5 py-2 rounded-lg font-semibold"  @click.prevent="cancel_button">Cancel</button>
                </div>
        
        </form>
        <!-- end add account-->
    
        <!-- update account -->
        <form method="POST" id="form_update_account" arial-label="form_update_account" 
        class=" modal flex flex-col bg-white rounded-lg p-2 m-2"
        aria-label="update-account" v-show="isActiveUpdate"  v-on:submit.prevent="FormUpdateAccount">
    
            <select  class="input" v-model="id_account" name="id_account">
                <option value="Choisir le compte"></option>
                <option v-for="(value,index) in data" :key="index" :value="value.id_account" >{{value.governor_name}}</option>
            </select>
    
            <select name="id_type_account" class="input">
                <option v-for="(option,index) in type_account" :key="index" :value="option.id_type_account">{{option.name_type_account}}</option>
            </select>
            <select  @change="get_alliance($event.target.value)" name="id_kingdom" class="input" required="required">
                <option value="Choix du Royaume"></option>
                <option  v-for="(option,index) in kingdom" :key="index" :value="option.id_kingdom">{{option.id_kingdom}} - {{option.name_kingdom}}</option>
            </select>
            <select name="id_alliance" class="input" required="required">
                <option v-for="(option,index) in alliance" :key="index" :value="option.id_alliance"> {{option.name_alliance}}</option>
            </select>
    
            <div class="grid grid-cols-12 gap-4 my-2 py-2">
                <button type="submit" class=" col-span-6 w-full xl:col-span-3 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
                <button class="col-span-6 w-full  xl:col-span-3  btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200  px-5 py-2 rounded-lg font-semibold"  @click.prevent="cancel_button">Cancel</button>
            </div>
     
        </form>
    
            <!-- del account-->
            <form method="POST" class=" modal flex flex-col flex-wrap bg-white rounded-lg p-2 m-2 delete-account" 
        aria-label="delete-account" v-show="isActiveDel" id="form_delete_account" v-on:submit.prevent="FormDeleteAccount">  
            <select @change="account_choice_delete($event.target)" class="input" name="id_account">
                <option value="">Choose account to delete</option>
                <option v-for="(value,index) in data" :key="index" :value="value.id_account" :name="value.governor_name">{{value.governor_name}}</option>
            </select>
            <div class="grid grid-cols-12  gap-4 w-full my-2 py-2"  v-show="confirm">
                <p class="col-span-12 text-lg color-red-700 font-bold m-2 p-3">You are about to delete the account {{data_account}}</p>
                <button type="submit" class=" col-span-6 w-full xl:col-span-6 btn bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 text-blue-200 px-5 py-2 rounded-lg font-semibold" >confirm</button>
                <button class="col-span-6 w-full xl:col-span-6  btn bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-red-200  px-5 py-2 rounded-lg font-semibold"  @click.prevent="cancel_button">Cancel</button>
            </div>
        </form>
        <!-- end del account-->
      
            
        </div>
    </section>
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
                        url :`${process.env.VUE_APP_URL_API}`,
                        user_id:''
                      
                    }
                },
                mounted(){
                    this.user_id= VueCookies.get('user_id')
                },
                async created() {
           
                    this.kingdom=await this.getKingdom()
                    this.data= await this.getData()
                    this.type_account=await this.getTypeAccount() 
                    this.data = await this.getData()       
                    console.log(this.data)        
             
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
                        console.log(this.data_account)
                        this.id_data_account=event.value
                   
                    },
                    async getData(){
                    try{
                        
                        let url =`${this.url}api/user_account/?user_id=${this.user_id}&ordering=-power`
               
                      const response =   await axios.get(url)
                        if (response.status== 200){
                            return this.data = response.data.results
                        }
                        else{
                            this.$router.push({name:'login'});
                            VueCookies.remove('jwt_token');
                            this.$store.commit('setLoggedIn',false);
                        }
                        
                    }
                        catch(error)
                    {
                        this.$router.push({name:'login'});
                        VueCookies.remove('jwt_token');
                        this.$store.commit('setLoggedIn',false);
                    }
                
                },
                    async getKingdom(){
                        await axios.get(`${this.url}api/kingdom/?ordering=${this.id_kingdom}`)
                        .then(response => {
                            this.kingdom = response.data.results})
                        return this.kingdom
                    
                    },
                    async getTypeAccount(){
                        await axios.get(`${this.url}api/type_account/`)
                        .then(response => {
                            this.type_account = response.data.results
                        })
                        return this.type_account
                    },
                async get_alliance(id){
                  
                    await axios.get(`${this.url}api/alliance/?id_kingdom=${id}`)
                    .then(response=>{this.alliance=response.data.results})
                    
                },
                cancelSubmit(event){
                        event.preventDefault();
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
                    if (id_alliance.lenght==0){
                        alert("Error please choose alliance")
                    }
                    let id_type_account = document.querySelector('[name=id_type_account]').value;
                    this.isActiveAdd=false
        
    
                    await axios({
                        method:"POST",
                        url:`${this.url}api/user_account/`,
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
                    console.log(form)
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
                        url:`${this.url}api/user_account/${this.id_account}/`,
                        data:formData,
                        
                    })
                    .then(this.getData())
                    .then(this.isActiveUpdate=false)
                    .catch(response=>{alert(response)})

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
                    console.log(`${this.url}api/user_account/?id_account=${formData["id_account"]}`)
                    await axios({
                        method:"DELETE",
                        url:`${this.url}api/user_account/${formData["id_account"]}/`,
                        headers: {Accept:'application/json'}
                    })
                    .then()
                    .catch(response=>{console.log(response)})
                    .finally(this.getData(),this.isActiveDel=false)

                    return this.getData()
    
                }
                },
                
            }
        </script>
        <style  scoped>
            .modal{
                position: absolute;
                inset:0;
                height:auto;
    
            }

        </style>
    
    
    
    
    
    