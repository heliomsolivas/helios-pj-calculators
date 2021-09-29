<template>
  <a href="#" @click.prevent="changeThemeMode">
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
  </a>
</template>

<script>
export default {
  methods: {
    changeThemeMode() {
      this.$emit('changeThemeMode', 'dark');
    },
  },
};
</script>

<style></style>
