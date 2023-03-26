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
      <button v-if="loggedIn" type="button" @click="logoutSubmit">Log out</button>
      <button v-else type="submit">Login</button>
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

    const loggedIn = ref(false)

    const loginSubmit = async () => {
      try {
        const login = await StoreService.loginUser(form)
        console.log(login)
        if (login.status === 200) {
          status.value = login.data.name + ' is logged in!'
          loggedIn.value = true
          localStorage.setItem('token', login.data.loggedIn)
          localStorage.setItem('id', login.data.id)
        } else {
          status.value = 'Något gick fel, försök igen!'
        }
      } catch (error) {
        status.value = error
      }
    }

    const logoutSubmit = async () => {
      loggedIn.value = false
      localStorage.setItem('token', false)
      localStorage.removeItem('id')
      status.value = ''
    }

    return {
      title,
      form,
      status,
      loginSubmit,
      logoutSubmit,
      loggedIn
    }
  }
}
</script>

<style scoped></style>
