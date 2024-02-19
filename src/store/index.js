import VueCookies from 'vue-cookies'
import { createStore } from 'vuex'

export default createStore({
  state: {
    showResetPassword: false,
    showRegister:false,
    isLoggedIn: false,
    governor_id:'',
    user_id:null
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
    showTokenPage(state){
      state.showTokenPage = !state.showTokenPage;
    },
    setLoggedIn(state,value) {
      console.log("state login=>"+state.isLoggedIn)
      state.isLoggedIn = value;
      
    },

      setUserID(state, user_id) {
        state.user_id = user_id;
      },
      setGovernorId(state,governor_id){
        state.governor_id=governor_id;
      }
    },
    actions: {
      async getUserID() {
        const user_id = await VueCookies.get('user_id');
        if (user_id) {
          this.commit('setUserID', user_id);
        }
        
      },

    },
  modules: {
  }
})
