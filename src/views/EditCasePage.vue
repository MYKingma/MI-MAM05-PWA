<template>
  <el-main>
    <h1 @click="test">Edit case</h1>
    <CaseBasicInformation
      v-if="caseLoaded"
      v-model="caseEditData"
      @date="test"
    />
  </el-main>
</template>

<script>
import { getCaseOnId, getData, setCaseData } from "../db";
import CaseBasicInformation from "../components/CaseBasicInformation.vue";
export default {
  data() {
    return {
      caseLoaded: false,
      caseEditData: {
        caseData: {
          date: null,
          specialism: null,
          mainProblem: null,
          introduction: null,
          patient: null,
          images: [],
          phases: [],
          uid: null,
          id: null,
        },
        specialisms: [],
        genders: ["Male", "Female", "Other"],
      },
    };
  },
  components: {
    CaseBasicInformation,
  },
  computed: {
    caseData() {
      return this.caseEditData.caseData;
    },
  },
  async mounted() {
    const caseDataTest = await getCaseOnId("efSvC2nU2IAh8jARpz1t");
    this.caseEditData.caseData = caseDataTest;
    console.log(caseDataTest);
    this.caseEditData.specialisms = await getData("specialisms");
    this.caseLoaded = true;
  },
  methods: {
    test(test) {
      this.caseEditData.caseData.date = test;
    },
  },
  watch: {
    caseData: {
      handler: function () {
        setCaseData(this.caseEditData.caseData);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss"></style>
