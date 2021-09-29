<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background-color: var(--body-color);
  color: var(--text-color);
  transition: background-color 0.3s;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
h1 {
  font-size: 20px;
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

a {
  text-decoration: none;
  font-weight: 500;
  color: var(--color-active);
}
.container {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  border-radius: 1.5rem;
  background-color: var(--card-body-color);
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
  background-color: var(--bg);
  color: var(--placeholder-color);
  transition: color 0.2s ease, background-color 0.2s ease;
  border: 1px solid #f5f8fa;
  appearance: none;
  border-radius: 0.475rem;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 700;
}
input[type="tel"]:focus {
  background-color: var(--bg);
  border-color: #eef3f7;
  outline: none;
  color: var(--placeholder-color);
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
  background-color: var(--body-color);
  background-clip: border-box;
  border: 1px solid #eff2f5;
  border-radius: 0.475rem;
  padding: 26px 30px;
}
.featured {
  border: 1px dashed #42b983;
  background-color: var(--bg);
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
:root {
  --body-color: #fff;
  --card-body-color: #f5f8fa;
  --text-color: #000;
  --placeholder-color: #5e6278;
  --color: #243746;
  --color-primary: #158876;
  --color-active: #42b983;
  --color-secondary: #0e2233;
  --bg: #f3f5f4;
  --bg-secondary: #fff;
}
.dark-mode {
  --body-color: #091a28;
  --card-body-color: #123653;
  --text-color: #fff;
  --placeholder-color: #8995d5;
  --color: #ebf4f1;
  --color-primary: #41b38a;
  --color-secondary: #fdf9f3;
  --bg: #091a28;
  --bg-secondary: #071521;
}
.sepia-mode {
  --body-color: #f1e7d0;
  --card-body-color: #eae0c9;
  --text-color: #433422;
  --placeholder-color: #bf8035;
  --color: #433422;
  --color-secondary: #504231;
  --bg: #f1e7d0;
  --bg-secondary: #eae0c9;
}
</style>
