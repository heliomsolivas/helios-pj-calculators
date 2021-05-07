import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueAnalytics from "vue-analytics";

import "chartist/dist/chartist.css";
import "./assets/css/general.css";

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTCS_ID,
  router,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
