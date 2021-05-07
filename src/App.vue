<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/calculator">IRPF para MEI</router-link> |
      <router-link to="/beneficios-trabalhistas"
        >Benefícios Trabalhistas para MEI</router-link
      >
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  font-size: 20px;
  color: #181c32;
  margin: 0;
}
h2 {
  margin: 0;
  padding-bottom: 0;
  font-size: 20px;
}
h3 {
  margin: 0;
  font-size: 16.25px;
  padding-bottom: 16.25px;
}
.pb-2 {
  padding-bottom: 16.25px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a {
  text-decoration: none;
  font-weight: 500;
  color: #42b983;
}
a:visited {
  color: #42b983;
}
.container {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  background-color: #f5f8fa;
  border-radius: 1.5rem;
  padding: 20px;
}
@media (min-width: 768px) {
  .container {
    max-width: 1140px;
    padding: 30px;
  }
}
table {
  width: 100%;
}
th {
  font-size: 14px;
  text-align: left;
  padding: 10px;
}
th:first-child {
  padding-left: 0;
}
td {
  font-size: 14px;
  font-weight: 400;
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
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}
.border-bottom {
  border-bottom: 1px solid #eff2f5;
}
input[type="tel"] {
  height: 42px;
  padding: 12px;
  background-color: #f5f8fa;
  color: #5e6278;
  transition: color 0.2s ease, background-color 0.2s ease;
  border: 1px solid #f5f8fa;
  appearance: none;
  border-radius: 0.475rem;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 700;
}
input[type="tel"]:focus {
  background-color: #eef3f7;
  border-color: #eef3f7;
  outline: none;
  color: #5e6278;
  transition: color 0.2s ease, background-color 0.2s ease;
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
.card {
  box-shadow: 0 0 20px 0 rgb(76 87 125 / 2%);
  border: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #eff2f5;
  border-radius: 0.475rem;
  padding: 26px 30px;
}
.featured {
  border: 1px dashed #42b983;
  background-color: #f1faff;
  padding: 20px;
}
.description {
  margin-top: 6px;
  font-weight: 500;
  font-size: 14px;
  color: rgb(181, 181, 195);
}
h2 ~ .description {
  margin-bottom: 6px;
}
</style>
