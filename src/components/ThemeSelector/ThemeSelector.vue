<template>
  <section class="theme-selector">
    <!-- <div class="theme-selector__button">
      <ButtonAuto @changeThemeMode="toggleTheme" />
    </div> -->
    <div class="theme-selector__button" :class="{ active: theme === 'light' }">
      <ButtonLight @changeThemeMode="toggleTheme" />
    </div>
    <div class="theme-selector__button" :class="{ active: theme === 'dark' }">
      <ButtonDark @changeThemeMode="toggleTheme" />
    </div>
    <div class="theme-selector__button" :class="{ active: theme === 'sepia' }">
      <ButtonSepia @changeThemeMode="toggleTheme" />
    </div>
  </section>
</template>

<script>
// import ButtonAuto from './ButtonAuto.vue';
import ButtonLight from "./ButtonLight.vue";
import ButtonDark from "./ButtonDark.vue";
import ButtonSepia from "./ButtonSepia.vue";

export default {
  components: {
    // ButtonAuto,
    ButtonLight,
    ButtonDark,
    ButtonSepia,
  },
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    toggleTheme(theme) {
      const html = document.getElementsByTagName("html")[0];
      html.setAttribute("class", `${theme}-mode`);
      this.theme = theme;
    },
  },
};
</script>

<style>
.theme-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-selector__button {
  margin: 10px;
  padding: 7px;
  border-radius: 5px;
}
.theme-selector__button a {
  color: var(--color);
  display: flex;
}
.theme-selector__button.active {
  border: 2px solid var(--color-active);

  transition: all 0.1s ease;
}
</style>
