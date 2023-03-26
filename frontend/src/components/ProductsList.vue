<template>
  <div class="products-list">
    <h2>{{ product.name }}</h2>
    <img
      src="../../public/35149.jpg"
      alt="IWC pilot watch on airplane dashboard"
      width="300"
      height="250"
    />
    <p>Info: {{ product.description }}</p>
    <span> {{ product.price }} :-</span>
    <button @click="sendToCart(product._id)">KÖP</button>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    sendToCart(productId) {
      this.$emit('to-cart', productId)
    }
  }
}
</script>
<style scoped>
.products-list {
  align-items: center;
}
</style>
