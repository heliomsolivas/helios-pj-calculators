<template>
  <header>
    <Navbar />
    <ThemeSelector />
  </header>
</template>

<script>
import Navbar from "./Navbar.vue";
import ThemeSelector from "./ThemeSelector/ThemeSelector.vue";

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
  max-width: 1140px;
  margin: 0 auto;
}
@media(max-width:767px){
  header{
    flex-direction: column;
  }
}
</style>
