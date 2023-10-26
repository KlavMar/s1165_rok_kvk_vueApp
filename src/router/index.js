import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/HomeView.vue'
import ObjectiveAPP from '@/kvk/components/objective'
import CalendarApp from '@/views/Calendar.vue'
import OcrApp from '@/views/Ocr.vue'
import post from '@/views/Actualite.vue'

const routes = [
  {
    path:'/',
    name:'home',
    component:home
  },
  {
    path: '/objective',
    name: 'objective',
    component: ObjectiveAPP
  },
  {
    path:'/calendar',
    name:'calendar',
    component:CalendarApp
  },
  {
    path:'/hall_of_fame',
    name:'hall_of_fame',
    component:OcrApp

  },
  {
    path:'/post',
    name:'post',
    component:post

  },

  {
    path:'/auth',
    name:'auth',
    children:[
      {
        path:'login',
        name:"login",
        component:()=>import('@/auth/views/login.vue')
      },
      {
        path:'reset_password',
        name:"resetpassword",
        component:()=>import('@/auth/components/passwordResetComponent.vue')
      },
      {
        path:'register',
        name:"regsiter",
        component:()=>import('@/auth/components/registerComponent.vue')
      }
    ]
  },
  {
    path:'/user',
    name:"user",
    children:[
      {
        path:'profil',
        name:'profil',
        component:()=>import('@/user/views/GetProfilSelect.vue')
      },
      {
        path:'nav/:governor_id',
        name:"nav",
        component:()=>import('@/user/views/navProfil.vue')
      },
      {
        path:'dashboard/:governor_id',
        name:"dashboard",
        component:()=>import('@/user/views/ProfilDetail/dashboardProfil.vue')
      },
      {
        path:'troops/add/:governor_id',
        name:"troops",
        component:()=>import('@/user/views/troopsAdd.vue')
      },
      {
        path:'calculator/rss/:governor_id',
        name:"ressource",
        component:()=>import('@/user/components/calculator/ressourceComponent.vue')
      }
    ]
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
