<template>
  <div class="products">
    <div class="head">
      <h1>Products view</h1>
      <div>cart {{ cart.length }}</div>
      <button v-if="isLoggedIn" @click="sendOrder(cart)">Beställ</button>
      <p v-if="!isLoggedIn">Logga in för att beställa</p>
      <div>{{ successMessage }}</div>
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
    const isLoggedIn = localStorage.getItem('token')
    const products = ref(null)
    const successMessage = ref('')

    onMounted(() => {
      StoreService.getProducts().then((response) => {
        products.value = response.data
      })
      // checkLogginStatus()
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

    // function checkLogginStatus() {
    //   const loggedIn = localStorage.getItem('token')
    //   console.log(loggedIn)
    //   isLoggedIn.value = Boolean(loggedIn)
    //   console.log(isLoggedIn.value)
    // }

    return {
      cart,
      products,
      addToCart,
      isLoggedIn,
      successMessage
    }
  },
  methods: {
    async sendOrder(products) {
      const order = {
        user: localStorage.getItem('id'),
        products: products
      }
      // const jsonOrder = JSON.stringify(order)

      StoreService.sendOrder(order).then((response) => {
        this.successMessage = response.data
      })
      this.cart.splice(0, this.cart.length)
    }
  },
  mounted() {}
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
