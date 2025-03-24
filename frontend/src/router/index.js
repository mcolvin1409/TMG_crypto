import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "CryptoCore",
    },
  },
  {
    path: "/health",
    name: "Health",
    // route level code-splitting
    // this generates a separate chunk (health.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "health" */ "../views/Health.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

export const serversRouteConfig = {
  path: "/servers",
  name: "Servers",
  component: () =>
    import(/* webpackChunkName: "servers" */ "../views/Servers.vue"),
};
