<template>
  <div class="orders">
    <h1>Orders view</h1>
    <orderList v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import StoreService from '@/services/StoreService.js'
import orderList from '../components/orderList.vue'
import { onMounted, ref } from 'vue'

export default {
  components: {
    orderList
  },
  setup() {
    const orders = ref(null)

    onMounted(() => {
      const user = localStorage.getItem('id')
      const token = '1234key1234'
      const orderData = {
        user: user,
        token: token
      }
      StoreService.getOrder(orderData).then((response) => {
        const ordersList = response.data
        console.log(ordersList)
        orders.value = ordersList
      })
    })

    return {
      orders
    }
  }
}
</script>

<style>
/* @media (min-width: 1024px) {
  .orders {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
