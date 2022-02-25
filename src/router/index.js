import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import store from "../store";

const checkAuthorization = async (roles) => {
  if (roles) {
    if (!roles.includes(store.state.user.role)) return false;
  }
  return true;
};

const checkEmailVerified = async (roles) => {
  if (roles) {
    if (!store.state.user.emailVerified) return false;
  }
  return true;
};

const router = createRouter({
  history: createWebHashHistory(),
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
      path: "/overview",
      name: "overview",
      meta: { roles: ["admin", "student", "physician"] },
      component: () => import("../views/OverviewPage.vue"),
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
      path: "/physician/case/edit",
      name: "caseEdit",
      // meta: { roles: ["admin", "physician"] },
      component: () => import("../views/EditCasePage.vue"),
    },
    {
      path: "/physician/case",
      name: "caseView",
      // meta: { roles: ["admin", "physician"] },
      component: () => import("../views/CasePage.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      meta: { roles: ["admin"] },
      component: () => import("../views/AdminPage.vue"),
    },
    {
      path: "/email_not_verified",
      name: "email_not_verified",
      component: () => import("../views/EmailVerificationPage.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const roles = to.meta.roles || false;
  const authorized = await checkAuthorization(roles);
  if (!authorized) return "/";
  const emailVerified = await checkEmailVerified(roles);
  if (!emailVerified) return "/email_not_verified";
});

export default router;
