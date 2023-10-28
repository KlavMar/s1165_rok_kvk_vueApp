import { createStore } from 'vuex'

export default createStore({
  state: {
    showResetPassword: false,
    showRegister:false,
    isLoggedIn: false,
    governor_id:''
  },

  getters: {
  },
  mutations: {
    showResetPassword(state) {
      state.showResetPassword = !state.showResetPassword;
    },
    showRegister(state){
      state.showRegister= !state.showRegister;
    },
    setLoggedIn(state,value) {
      console.log(state.isLoggedIn)
      state.isLoggedIn = value;
      
    },

  },
  actions: {
    
  },
  modules: {
  }
})
