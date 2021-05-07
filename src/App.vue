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
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-text-color);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--main-text-color);
}

#nav a.router-link-exact-active {
  color: var(--success-text-color);
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
</style>
