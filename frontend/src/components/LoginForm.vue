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
      <button v-if="loggedIn === 'false'" type="submit">Login</button>
      <button v-if="loggedIn === 'true'" type="button" @click="logoutSubmit">Log out</button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import StoreService from '@/services/StoreService.js'
export default {
  setup() {
    const title = ref('Logga in')
    const status = ref('')

    const form = reactive({
      email: '',
      password: ''
    })

    onMounted(() => {
      const token = localStorage.getItem('token')
      if (token) {
        loggedIn.value = 'true'
      }
    })

    const loggedIn = ref('false')

    const loginSubmit = async () => {
      try {
        const login = await StoreService.loginUser(form)
        console.log(login)
        if (login.status === 200) {
          status.value = login.data.name + ' is logged in!'
          localStorage.setItem('token', Boolean(login.data.loggedIn))
          localStorage.setItem('id', login.data.id)
          loggedIn.value = localStorage.getItem('token')
        } else {
          status.value = 'Något gick fel, försök igen!'
        }
      } catch (error) {
        status.value = error
      }
    }

    const logoutSubmit = async () => {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      status.value = ''
      loggedIn.value = 'false'
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
