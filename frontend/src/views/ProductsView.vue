<template>
  <div class="products">
    <div class="head">
      <h1>Products view</h1>
      <div>cart {{ cart.length }}</div>
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

    const products = ref(null)

    onMounted(() => {
      StoreService.getProducts().then((response) => {
        products.value = response.data
        console.log(response.data)
      })
    })

    function addToCart(product) {
      cart.push(product)
      console.log(cart)
    }

    return {
      cart,
      products,
      addToCart
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
