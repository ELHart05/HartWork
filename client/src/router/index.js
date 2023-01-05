import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import HomeView from '../views/HomeView.vue'
import NewWorkoutView from '../views/NewWorkoutView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/new',
    name: 'new',
    component: NewWorkoutView,
    meta: {
      title: 'New Workout'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Register'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('setError', null);
  document.title = `${to.meta.title} | HartWork`;
  next();
})

export default router
