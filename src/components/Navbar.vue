<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/calculator">IRPF para MEI</router-link>
    <router-link to="/beneficios-trabalhistas"
      >Benefícios Trabalhistas para MEI</router-link
    >
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style>
nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
  margin-right: 2rem;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
