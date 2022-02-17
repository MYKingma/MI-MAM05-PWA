<template>
  <el-main>
    <h1>Edit case</h1>
    <CaseBasicInformation v-if="caseLoaded" v-model="caseBasicInformation" />
    <p>{{ caseBasicInformation.case.patient }}</p>
  </el-main>
</template>

<script>
import { getData, getDataOnId } from "../db"
import CaseBasicInformation from "../components/CaseBasicInformation.vue"
export default {
  data() {
    return {
      caseLoaded: false,
      caseBasicInformation: {
        case: {
          date: null,
          specialism: null,
          mainProblem: null,
          introduction: null,
          phases: []
        },
        specialisms: [],
        genders: ["Male", "Female", "Other"],
      },
    };
  },
  components: {
    CaseBasicInformation
  },
  computed: {},
  async mounted() {
    const data = await getData("cases")
    this.caseBasicInformation.case = data[0]
    this.caseBasicInformation.case.phases = []
    data[0].phases.forEach(async (phaseID) => {
      const phase = await getDataOnId("phases", phaseID)
      this.caseBasicInformation.case.phases.push(phase)
    })
    this.caseBasicInformation.specialisms = await getData("specialisms")
    this.caseLoaded = true
  },
  methods: {},
  watch: {},
};
</script>

<style lang="scss"></style>
