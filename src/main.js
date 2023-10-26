import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store'

const app= createApp(App).use(store)


app.use(router)
app.use(VueCookies)

app.mount('#app')


VueCookies.config('1d') 
app.config.globalProperties.$filters = {
    numberFormat(value) {
      if (value !== null && value !== undefined) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    }
  }