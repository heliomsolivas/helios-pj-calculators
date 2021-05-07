<template>
  <div id="app">
    <div class="theme-setter__container">
      <button
        :class="{ actived: theme === 'darkMode' }"
        @click="setDarkTheme()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-moon preferred selected"
          data-v-2b778c3e=""
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            data-v-2b778c3e=""
          ></path>
        </svg>
      </button>
      <button :class="{ actived: theme === 'lightMode' }" @click="setLightTheme()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-sun"
          data-v-2b778c3e=""
        >
          <circle cx="12" cy="12" r="5" data-v-2b778c3e=""></circle>
          <line x1="12" y1="1" x2="12" y2="3" data-v-2b778c3e=""></line>
          <line x1="12" y1="21" x2="12" y2="23" data-v-2b778c3e=""></line>
          <line
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
            data-v-2b778c3e=""
          ></line>
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            data-v-2b778c3e=""
          ></line>
          <line x1="1" y1="12" x2="3" y2="12" data-v-2b778c3e=""></line>
          <line x1="21" y1="12" x2="23" y2="12" data-v-2b778c3e=""></line>
          <line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
            data-v-2b778c3e=""
          ></line>
          <line
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
            data-v-2b778c3e=""
          ></line>
        </svg>
      </button>
    </div>
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

<script>
export default {
  name: "App",
  data() {
    return {
      theme: null,
    };
  },
  mounted() {
    this.loadTheme();
  },
  methods: {
    setLightTheme() {
      this.setTheme("lightMode");
    },
    setDarkTheme() {
      this.setTheme("darkMode");
    },
    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      this.theme = theme;
      this.saveTheme(theme);
    },
    saveTheme(theme) {
      theme = theme ? theme : "lightMode";
      localStorage.setItem("melios-theme", theme);
    },
    loadTheme() {
      const theme = localStorage.getItem("melios-theme");
      this.setTheme(theme);
    },
  },
};
</script>

<style lang="scss">
.theme-setter__container {
  display: flex;
  justify-content: flex-end;

  button:nth-child(1) {
    margin-right: 0.4rem;
  }
  button {
    display: flex;
    padding: 2px 7px;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid var(--success-text-color);
    color: var(--main-text-color);
    background-color: var(--main-background-color);
    transition: all .2s ease-in-out;
    outline: none;

    .feather {
      width: 16px;
    }
  }
  .actived {
    background-color: var(--success-background-color);
  }
}
</style>

<style>
* {
  box-sizing: border-box;
}
body {
  background-color: var(--main-background-color);
  margin: 0;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-text-color);
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
  color: var(--main-text-color);
  font-size: 20px;
}

#nav a.router-link-exact-active {
  color: var(--success-text-color);
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
  background: var(--success-background-color);
  color: var(--white);
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
