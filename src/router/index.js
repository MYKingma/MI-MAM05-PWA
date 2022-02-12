import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import store from "../store";

const checkAuthorization = async (roles) => {
  if (roles) {
    if (!roles.includes(store.state.user.role)) return false;
  }
  return true;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterPage.vue"),
    },
    {
      path: "/student",
      name: "student",
      meta: { roles: ["admin", "student"] },
      component: () => import("../views/StudentPage.vue"),
    },
    {
      path: "/physician",
      name: "physician",
      meta: { roles: ["admin", "physician"] },
      component: () => import("../views/PhysicianPage.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      meta: { roles: ["admin"] },
      component: () => import("../views/AdminPage.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const authorized = await checkAuthorization(to.meta.roles);
  if (!authorized) return "/";
});

export default router;
