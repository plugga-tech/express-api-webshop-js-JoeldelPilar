<template>
  <div class="products">
    <div class="head">
      <h1>Products view</h1>
      <div>cart {{ cart.length }}</div>
      <button @click="sendOrder(cart)">Beställ</button>
    </div>
    <ProductsList
      v-for="product in products"
      :key="product.id"
      :product="product"
      @to-cart="addToCart"
    />
  </div>
</template>
<script>
import { ref, onMounted, reactive } from 'vue'
import StoreService from '@/services/StoreService.js'
import ProductsList from '../components/ProductsList.vue'

export default {
  components: {
    ProductsList
  },

  setup() {
    const cart = reactive([])
    const token = localStorage.getItem('token')

    const products = ref(null)

    onMounted(() => {
      StoreService.getProducts().then((response) => {
        products.value = response.data
      })
    })

    function addToCart(product) {
      const item = {
        productId: product,
        quantity: 1
      }
      const excistingItem = cart.find((item) => item.productId === product)
      if (excistingItem) {
        excistingItem.quantity += 1
      } else {
        cart.push(item)
      }
    }

    return {
      cart,
      products,
      addToCart,
      token
    }
  },
  methods: {
    async sendOrder(products) {
      const order = {
        user: localStorage.getItem('id'),
        products: products
      }
      const jsonOrder = JSON.stringify(order)
      console.log(jsonOrder)
      StoreService.sendOrder(order).then((response) => {
        console.log(response.data)
      })
      this.cart.splice(0, this.cart.length)
    }
  }
}
</script>
<style>
.head {
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
}
</style>
