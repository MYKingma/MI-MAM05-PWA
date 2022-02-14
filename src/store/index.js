import { createStore } from "vuex";
import { getData } from "../db";

const store = createStore({
  state: {
    user: {
      uid: null,
      name: null,
      email: null,
      emailVerified: false,
      role: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, userData) {
      if (userData) {
        state.user = {
          uid: userData.uid || state.user.uid,
          name: userData.name || state.user.name,
          email: userData.email || state.user.email,
          emailVerified: userData.emailVerified || state.user.emailVerified,
          role: userData.role || state.user.role,
        };
      } else {
        state.user = {
          uid: null,
          name: null,
          email: null,
          emailVerified: false,
          role: null,
        };
      }
    },
  },
  actions: {
    async fetchUser({ commit }, user) {
      if (user) {
        const userData = await getData("profiles", "uid", "==", user.uid);
        commit("SET_USER", {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified || false,
          ...userData[0],
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
});

export default store;
