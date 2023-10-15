import { createRouter, createWebHistory } from 'vue-router'
import ObjectiveAPP from '../views/HomeView.vue'
import CalendarApp from '@/views/Calendar.vue'
import OcrApp from '@/views/Ocr.vue'
import AppLogin from '@/views/login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ObjectiveAPP
  },
  {
    path:'/calendar',
    name:'calendar',
    component:CalendarApp
  },
  {
    path:'/hall_of_fame',
    name:'ocr',
    component:OcrApp

  },
  {
    path:'/login',
    name:"login",
    component:AppLogin
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
