import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: 'UA-73380905-5'
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
