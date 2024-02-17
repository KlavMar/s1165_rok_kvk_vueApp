import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/HomeView.vue'
import ObjectiveAPP from '@/kvk/components/objective'
import CalendarApp from '@/views/Calendar.vue'
import hallOfFame from '@/kvk/views/hallOfFame.vue'
import recruitment from '@/recruitment/views/recruitment.vue'

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
    path:'/hall_of_heroes',
    name:'hall of heroes',
    component:hallOfFame

  },
  {
    path:'/recruitment',
    name:'recruitment',
    component:recruitment

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
        component:()=>import('@/user/components/navProfil.vue')
      },
      {
        path:'dashboard/:governor_id',
        name:"dashboard",
        component:()=>import('@/user/views/ProfilDetail/dashboardProfil.vue')
      },
      {
        path:'retrospective/:governor_id',
        name:"retrospective",
        component:()=>import('@/user/views/ProfilDetail/retro.vue')
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
      },
      {
        path:'calculator/speed/:governor_id',
        name:"speed",
        component:()=>import('@/user/components/calculator/accelComponent.vue')
      }
    ]
  },
 



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
