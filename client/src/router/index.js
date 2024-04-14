import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'; // Import the Vuex store
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import ResetView from '../views/ResetView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminView from '../views/AdminView.vue'

import Userfront from '@userfront/toolkit/vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/admin', // Define the path for the admin page
      name: 'admin',
      component: AdminView,
      meta: { requiresAdmin: true } // Use meta field to mark this route as requiring admin access
    },
  ]
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = !!Userfront.tokens.accessToken;
  const isAdmin = store.state.isAdmin; // Make sure you import and use Vuex store

  // Redirect to home if trying to access a restricted admin route without proper credentials
  if (to.matched.some(record => record.meta.requiresAdmin) && (!isLoggedIn || !isAdmin)) {
    return next({ path: '/' }); // Redirect to home instead of login
  }

  // Redirect to login if not logged in and trying to access the dashboard
  if (to.name === 'dashboard' && !isLoggedIn) {
    return next({ path: '/login' });
  }

  next();
});



export default router
