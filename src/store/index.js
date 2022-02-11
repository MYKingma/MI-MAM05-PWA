import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const plugins = [createPersistedState()];

const store = createStore({
  plugins,
  state: {},
  mutations: {},
  actions: {},
});

export default store;
