<template>
  <div class="container">
    <h1>{{ title }}</h1>

    <form @submit.prevent="loginSubmit">
      <label>
        Email:
        <input type="email" v-model="form.email" />
      </label>
      <label>
        Password:
        <input type="password" v-model="form.password" />
      </label>
      <div>{{ status }}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import StoreService from '@/services/StoreService.js'
export default {
  setup() {
    const title = ref('Logga in')
    const status = ref('')

    const form = reactive({
      email: '',
      password: ''
    })

    const loginSubmit = async () => {
      try {
        const login = await StoreService.loginUser(form)
        console.log(login)
        if (login.status === 200) {
          status.value = login.data
          localStorage.setItem('token', login.data)
        } else {
          status.value = 'Något gick fel, försök igen!'
        }
      } catch (error) {
        status.value = error
      }
    }

    return {
      title,
      form,
      status,
      loginSubmit
    }
  }
}
</script>

<style scoped></style>
