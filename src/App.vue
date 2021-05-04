<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/calculator">IRPF para MEI</router-link> |
      <router-link to="/beneficios-trabalhistas">Benefícios Trabalhistas para MEI</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.container {
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .container {
    max-width: 900px;
  }
}
table {
  width: 100%;
}
img {
  max-width: 100%;
}
.form__control {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}
.form__control:last-of-type {
  margin-bottom: 0;
}
.form__control label {
  margin-bottom: 6px;
}
input[type="tel"] {
  height: 42px;
  padding: 12px;
}
.text-left {
  text-align: left;
}
.row--selected {
  background: #42b983;
  color: #fff;
}
th,
td {
  padding: 6px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
