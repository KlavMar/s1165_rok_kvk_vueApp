<template>
  <div>
    <!-- Votre formulaire de connexion -->
    <input v-model="username" name="username" type="text" placeholder="Nom d'utilisateur">
    <input v-model="password" type="password" name="password" placeholder="Mot de passe">
    <button @click="login">Connexion</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'AppLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8001/authentification/api/token/', {
          username: this.username,
          password: this.password,
        });
        

        if (response.status == 200){
          const token = response.data.access;
          const userId = response.data.user_id
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('user_id', userId);
          console.log(token,userId)
          return this.$router.push(`/`)
        }
           

        // const token = response.data.token;
   
        // Stocker le token localement, par exemple dans les cookies ou le stockage local
      } catch (error) {
        console.error('Erreur de connexion :', error);
      }
    },
  },
};
</script>
