<template>
  <header class="container">
    <Navbar />
    <ThemeSelector />
  </header>
</template>

<script>
import Navbar from './Navbar.vue';
import ThemeSelector from './ThemeSelector/ThemeSelector.vue';

export default {
  components: {
    Navbar,
    ThemeSelector,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
}
</style>
