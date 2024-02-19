import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/HomeView.vue'
import ObjectiveAPP from '@/kvk/components/objective'
import CalendarApp from '@/views/Calendar.vue'
import hallOfFame from '@/kvk/views/hallOfFame.vue'
import recruitment from '@/recruitment/views/recruitment.vue'
import Service from "@/services/views/ServiceView.vue"
import axios from 'axios';
//import store from '@/store/index.js'
const routes = [
  {
    path:'/',
    name:'home',
    component:home,

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
    name:'hall_of_heroes',
    
    component:hallOfFame

  },
  {
    path:'/recruitment',
    name:'recruitment',
    component:recruitment

  },
  {
    path:'/services',
    name:'service',
    component:Service

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
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 || error.response.status==404) {
      // Redirigez vers la route "home" en cas d'erreur 401
      router.push({ name: 'home' });
    }
    return Promise.reject(error);
  }
);
//router.beforeEach((to, from) => {
//  console.log("route", to, from);
//  const isLoggedIn = store.state.isLoggedIn;
//  const hasCookies = (document.cookie.includes('jwt_token') && document.cookie.includes('user_id')) || document.cookie.includes("governor_id");
//});
export default router
