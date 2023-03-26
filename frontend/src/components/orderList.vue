<template>
  <div class="products-list">
    <h2>OrderId: {{ order._id }}</h2>
    <ul>
      <li v-for="(product, index) in order.products" :key="index">
        <img
          src="../../public/35149.jpg"
          alt="IWC pilot watch on airplane dashboard"
          width="300"
          height="250"
        />
        <p>{{ product.productId.name }}</p>
        <p>{{ product.productId.description }}</p>
        <p>{{ product.productId.price }}:-</p>
        <p>{{ product.quantity }}st</p>
      </li>
    </ul>
    <!-- <img
      src="../../public/35149.jpg"
      alt="IWC pilot watch on airplane dashboard"
      width="300"
      height="250"
    />
    <p>Info: {{ orderedProduct.description }}</p>
    <span> {{ orderedProduct.price }} :-</span>
    <span> {{ orderedProduct.quantity }} :-</span> -->
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
    // orderedProduct: {
    //   type: Object,
    //   required: true
    // }
  },

  setup() {
    console.log()
  },

  methods: {}
}
</script>
<style scoped>
.products-list {
  align-items: center;
}

li {
  list-style: none;
}
</style>
