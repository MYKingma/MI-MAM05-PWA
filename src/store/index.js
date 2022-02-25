import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";

import {
  getData,
  getCaseOnId,
  deleteDataOnId,
  setCaseData,
  deleteCaseOnId,
} from "../db";
import router from "../router";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = createStore({
  plugins: [vuexLocal.plugin, createLogger()],
  state: {
    user: {
      uid: null,
      name: null,
      email: null,
      emailVerified: false,
      role: null,
    },
    currentCase: {
      date: null,
      specialism: "",
      mainProblem: "",
      introduction: null,
      patient: {
        age: null,
        ethnicity: "",
        gender: "",
        id: "",
        medicalHistory: [],
        medication: [],
      },
      images: [],
      phases: [],
      uid: "",
      id: "",
    },
    savedCases: [],
    draftCases: [],
  },
  getters: {
    user(state) {
      return state.user;
    },
    currentRole(state) {
      return state.user.role;
    },
    currentCase(state) {
      return state.currentCase;
    },
    savedCases(state) {
      return state.savedCases;
    },
    draftCases(state) {
      return state.draftCases;
    },
    isCurrentCaseDraft(state) {
      if (state.currentCase.id === "") return true;
      return false;
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
    SET_CURRENT_CASE(state, caseData) {
      state.currentCase = caseData;
    },
    RESET_CURRENT_CASE(state) {
      state.currentCase = {
        date: null,
        specialism: "",
        mainProblem: "",
        introduction: null,
        patient: {
          age: null,
          ethnicity: "",
          gender: "",
          id: "",
          medicalHistory: [],
          medication: [],
        },
        images: [],
        phases: [],
        uid: state.user.uid,
        id: "",
      };
    },
    SET_CURRENT_CASE_UID(state) {
      state.currentCase.uid = state.user.uid;
    },
    SET_CURRENT_CASE_ID(state, id) {
      state.currentCase.id = id;
    },
    SAVE_CURRENT_CASE(state) {
      state.savedCases.push(state.currentCase);
    },
    SAVE_CASE_DRAFT_ON_INDEX(state) {
      state.draftCases[state.currentCase.draftIndex] = state.currentCase;
    },
    SAVE_CASE_DRAFT(state) {
      state.draftCases.push(state.currentCase);
    },
    DELETE_DRAFT_ON_INDEX(state) {
      state.draftCases.splice(state.currentCase.draftIndex, 1);
    },
    DELETE_DRAFT_INDEX(state) {
      delete state.currentCase.draftIndex;
    },
    DELETE_SAVED_ON_ID(state, caseId) {
      state.savedCases.filter((item) => item.id === caseId);
    },
    MOVE_PHASE_UP(state, phaseIndex) {
      const phase = state.currentCase.phases[phaseIndex];
      state.currentCase.phases.splice(phaseIndex, 1);
      state.currentCase.phases.splice(phaseIndex - 1, 0, phase);
    },
    MOVE_PHASE_DOWN(state, phaseIndex) {
      const phase = state.currentCase.phases[phaseIndex];
      state.currentCase.phases.splice(phaseIndex, 1);
      state.currentCase.phases.splice(phaseIndex + 1, 0, phase);
    },
    DELETE_PHASE(state, phaseIndex) {
      state.currentCase.phases.splice(phaseIndex, 1);
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
    async loadCaseById({ commit }, caseId) {
      const caseData = await getCaseOnId(caseId);
      commit("SET_CURRENT_CASE", caseData);
    },
    async loadSavedCaseById({ commit, state }, caseId) {
      const caseData = state.savedCases.filter((item) => item.id === caseId);
      commit("SET_CURRENT_CASE", caseData);
    },
    async loadDraftCaseByIndex({ commit, state }, draftIndex) {
      const caseData = state.draftCases[draftIndex];
      caseData.draftIndex = draftIndex;
      commit("SET_CURRENT_CASE", caseData);
    },
    async saveCurrentCase({ commit, state }) {
      if (
        state.currentCase.id &&
        state.savedCases.filter((item) => item.id === state.currentCase.id)
          .length === 0
      ) {
        commit("SAVE_CURRENT_CASE");
      }
    },
    async publishCase({ commit, state, getters }) {
      commit("SET_CURRENT_CASE_UID");
      if (getters.isCurrentCaseDraft) {
        commit("DELETE_DRAFT_ON_INDEX");
        commit("DELETE_DRAFT_INDEX");
      }
      const caseId = await setCaseData(state.currentCase);

      commit("SET_CURRENT_CASE_ID", caseId);
    },
    async saveDraftCurrentCase({ state, commit }) {
      router.push("/overview");
      if (state.currentCase.draftIndex !== undefined) {
        commit("SAVE_CASE_DRAFT_ON_INDEX");
      } else {
        commit("SAVE_CASE_DRAFT");
      }
      commit("RESET_CURRENT_CASE");
    },
    async movePhase({ commit }, payload) {
      if (payload.direction === "up") {
        commit("MOVE_PHASE_UP", payload.phaseIndex);
      }
      if (payload.direction === "down") {
        commit("MOVE_PHASE_DOWN", payload.phaseIndex);
      }
    },
    async deletePhase({ commit, state }, phaseIndex) {
      const phaseId = state.currentCase.phases.splice(phaseIndex, 1)[0].id;
      if (phaseId) deleteDataOnId("phases", phaseId);
      commit("DELETE_PHASE", phaseIndex);
    },
    async toOverview({ commit, dispatch }) {
      router.push("/overview");
      await dispatch("publishCase");
      commit("RESET_CURRENT_CASE");
    },
    async selectCase({ dispatch }, payload) {
      if (payload.caseId) {
        await dispatch("loadCaseById", payload.caseId);
      } else if (payload.savedCaseId) {
        await dispatch("loadSavedCaseById", payload.caseId);
      } else {
        await dispatch("loadDraftCaseByIndex", payload.index);
      }
      if (payload.edit) {
        router.push("/physician/case/edit");
      } else {
        router.push("student/case");
      }
    },
    async newCase({ commit }) {
      commit("RESET_CURRENT_CASE");
      router.push("/physician/case/edit");
    },
    async deleteCase({ state, getters, commit }) {
      if (getters.isCurrentCaseDraft) {
        if (state.currentCase.draftIndex) commit("DELETE_DRAFT_ON_INDEX");
      } else {
        await deleteCaseOnId(state.currentCase.id);
      }
      router.push("/overview");
    },
  },
});

export default store;
