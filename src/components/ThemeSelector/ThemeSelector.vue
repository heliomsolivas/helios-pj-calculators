<template>
  <section class="theme-selector">
    <!-- <div class="theme-selector__button">
      <ButtonAuto @changeThemeMode="toggleTheme" />
    </div> -->
    <div class="theme-selector__button">
      <ButtonLight @changeThemeMode="toggleTheme" />
    </div>
    <div class="theme-selector__button">
      <ButtonDark @changeThemeMode="toggleTheme" />
    </div>
    <div class="theme-selector__button">
      <ButtonSepia @changeThemeMode="toggleTheme" />
    </div>
  </section>
</template>

<script>
// import ButtonAuto from './ButtonAuto.vue';
import ButtonLight from './ButtonLight.vue';
import ButtonDark from './ButtonDark.vue';
import ButtonSepia from './ButtonSepia.vue';

export default {
  components: {
    // ButtonAuto,
    ButtonLight,
    ButtonDark,
    ButtonSepia,
  },
  data() {
    return {};
  },
  methods: {
    toggleTheme(theme) {
      const html = document.getElementsByTagName('html')[0];
      html.setAttribute('class', `${theme}-mode`);
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
}
</style>
