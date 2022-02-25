<template>
  <el-main>
    <h1>Overview</h1>
    <p>User lands after login</p>
    <el-button @click="$router.push('/physician/case/edit')">To edit</el-button>
    <el-button @click="newCase">New case</el-button>
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
  </el-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getData } from "../db";
export default {
  data() {
    return {
      onlineCases: [],
    };
  },
  computed: {
    ...mapGetters(["savedCases", "draftCases", "currentRole", "draftCase"]),
  },
  async mounted() {
    this.onlineCases = await getData("cases");
  },
  methods: {
    ...mapActions(["newCase", "selectCase"]),
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
