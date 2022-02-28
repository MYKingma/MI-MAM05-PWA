<template>
  <el-main>
    <h1>Overview</h1>
    <el-button @click="newCase">New case</el-button>
    <br />
    <br />
    <h4>Online cases</h4>
    <div
      @click="
        selectCase({ edit: currentRole === 'admin', caseId: caseData.id })
      "
      class="case"
      v-for="caseData in onlineCases"
      :key="caseData"
    >
      <p>id: {{ caseData.id }}</p>
      <p>spec: {{ caseData.specialism }}</p>
      <p>uid: {{ caseData.uid }}</p>
    </div>
    <br />
    <template v-if="['student', 'admin'].includes(currentRole)">
      <h4>Saved cases</h4>
      <div
        @click="
          selectCase({ edit: currentRole === 'admin', caseId: caseData.id })
        "
        class="case"
        v-for="caseData in savedCases"
        :key="caseData"
      >
        <p>id: {{ caseData.id }}</p>
        <p>spec: {{ caseData.specialism }}</p>
        <p>uid: {{ caseData.uid }}</p>
      </div>
    </template>
    <br />
    <template v-if="['physician', 'admin'].includes(currentRole)">
      <h4>Draft cases</h4>
      <div
        v-for="(caseData, index) in draftCases"
        :key="caseData"
        @click="selectCase({ edit: currentRole === 'admin', index })"
        class="case"
      >
        <p>id: {{ caseData.id }}</p>
        <p>spec: {{ caseData.specialism }}</p>
        <p>uid: {{ caseData.uid }}</p>
      </div>
    </template>
    <br />
    <br />
    <div>
      <h4>Notification demo</h4>
      <br />
      <el-button round type="primary" @click="subscribe('Anesthesiology')"
        >Subscribe to Anesthesiology</el-button
      >
    </div>
  </el-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getData } from "../db";
import { subscibeToNotifications } from "../firebase";
export default {
  data() {
    return {
      onlineCases: [],
      categories: [],
    };
  },
  computed: {
    ...mapGetters(["savedCases", "draftCases", "currentRole", "draftCase"]),
  },
  async mounted() {
    this.onlineCases = await getData("cases");
    this.categories = await getData("specialisms");
  },
  methods: {
    ...mapActions(["newCase", "selectCase"]),
    subscribe(categ) {
      subscibeToNotifications(categ);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.case {
  border: 1px solid black;
  padding: 15px;
}
</style>
