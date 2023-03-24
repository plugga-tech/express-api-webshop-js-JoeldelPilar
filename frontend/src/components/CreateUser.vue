<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        Name:
        <input type="text" v-model="form.name" />
      </label>
      <label>
        Email:
        <input type="email" v-model="form.email" />
      </label>
      <label>
        Password:
        <input type="password" v-model="form.password" />
      </label>
      <div>{{ status }}</div>
      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import StoreService from '@/services/StoreService.js'
export default {
  setup() {
    const form = reactive({
      name: '',
      email: '',
      password: ''
    })

    const title = ref('Skapa din användare!')

    const status = ref('hej')

    const handleSubmit = async () => {
      try {
        const response = await StoreService.createUser(form)
        console.log(response)
        if (response.status === 201) {
          status.value = 'Användare skapad, fortsätt till login'
          resetForm()
        } else {
          status.value = 'Kunde inte skapa ny användare, kontrollera alla fält.'
        }
      } catch (err) {
        console.log(err)
      }
    }

    const resetForm = () => {
      form.name = ''
      form.email = ''
      form.password = ''
    }

    return {
      form,
      status,
      handleSubmit,
      title
    }
  }
}
</script>

<style scoped></style>
