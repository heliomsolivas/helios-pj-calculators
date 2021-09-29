<template>
  <nav>
    <router-link to="/">Home</router-link> | 
    <router-link to="/calculator">IRPF para MEI</router-link> | 
    <router-link to="/beneficios-trabalhistas"
      >Benefícios Trabalhistas para MEI</router-link
    > | 
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style>
nav a {
  font-weight: bold;
  color: var(--color);
  font-size: 20px;
}

nav a.router-link-exact-active {
  color: var(--color-active);
}
</style>
