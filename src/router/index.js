import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: () =>
      import(/* webpackChunkName: "calculator" */ "../views/Calculator.vue"),
  },
  {
    path: "/beneficios-trabalhistas",
    name: "Beneficios",
    component: () =>
      import(
        /* webpackChunkName: "beneficios-trabalhistas" */ "../views/Beneficios.vue"
      ),
  },
  {
    path: "/clt",
    name: "CLT",
    component: () => import(/* webpackChunkName: "clt" */ "../views/CLT.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
