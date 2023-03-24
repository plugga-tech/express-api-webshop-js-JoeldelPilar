<template>
  <div class="login-user">
    <h1>Login user view</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },

  setup() {
    return {}
  }
}
</script>

<style>
/* @media (min-width: 1024px) {
  .login-user {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
