import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueGtm from "vue-gtm";
import VueAnalytics from "vue-analytics";

import "chartist/dist/chartist.css";
import "./assets/css/main.scss";

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTCS_ID,
  router,
});

Vue.use(VueGtm, {
  id: "GTM-K6XMWW3",
  // queryParams: {
  //   // Add url query string when load gtm.js with GTM ID (optional)
  //   gtm_auth: "AB7cDEf3GHIjkl-MnOP8qr",
  //   gtm_preview: "env-4",
  //   gtm_cookies_win: "x",
  // },
  defer: false, // defaults to false. Script can be set to `defer` to increase page-load-time at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible)
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  // ignoredViews: ["homepage"], // Don't trigger events for specified router names (case insensitive) (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
