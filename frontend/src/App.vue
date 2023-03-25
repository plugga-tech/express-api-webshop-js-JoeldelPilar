<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <div class="login"></div>

    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/createUser">Create User</RouterLink> |
          <RouterLink to="/LoginUser">Login User</RouterLink> |
          <RouterLink to="/">Products</RouterLink> |
          <RouterLink to="/orders">Orders</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: hsl(210, 29%, 24%);
}
nav a.router-link-exact-active {
  color: hsl(153, 47%, 49%);
}
h2 {
  font-size: 20px;
}
</style>
