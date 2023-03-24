<template>
  <div class="create-user">
    <h1>Create user view</h1>
    <createUser />
  </div>
</template>

<script>
import createUser from '../components/CreateUser.vue'
export default {
  components: {
    createUser
  },
  setup() {
    return {}
  }
}
</script>

<style>
/* @media (min-width: 1024px) {
  .create-user {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
