<template>
  <div>
    <h1>Error {{ status }}</h1>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name:'ErrorView',
  data() {
    return {
      status: this.$route.params.status,
      errorMessage: '',
    };
  },
  created() {
    // Récupérer le code d'erreur du navigateur (par exemple, 404, 500, etc.)
    const browserErrorCode = this.status;
    
    if (browserErrorCode === '404') {
      this.errorMessage = 'Page introuvable';
    } else if (browserErrorCode === '500') {
      this.errorMessage = 'Erreur du serveur';
    } else {
      this.errorMessage = 'Erreur inconnue';
    }
    

  },
};
</script>
