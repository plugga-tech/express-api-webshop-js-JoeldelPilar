import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import OrdersView from '../views/OrdersView.vue'
import CreateuserView from '../views/CreateuserView.vue'
import LoginuserView from '../views/LoginuserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductsView
    },
    {
      path: '/about',
      name: 'about',
      component: OrdersView
    },
    {
      path: '/createUser',
      name: 'createUser',
      component: CreateuserView
    },
    {
      path: '/loginUser',
      name: 'loginUser',
      component: LoginuserView
    }
  ]
})

export default router
