import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/products/:id',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/AdminDashboard.vue')
    },

    {
      path: '/:catchAll(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

export default router
