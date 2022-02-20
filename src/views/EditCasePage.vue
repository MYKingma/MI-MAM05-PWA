<template>
  <el-main>
    <h1 @click="test">Edit case</h1>
    <!-- <CaseBasicInformation v-if="caseLoaded" v-model="caseEditData" />
    <PhaseAdditionalQuestions
      v-if="caseLoaded"
      v-model="caseEditData"
      :phaseIndex="0"
    /> -->
    <!-- <PhasePhysicalExamination
      v-if="caseLoaded"
      v-model="caseEditData"
      :phaseIndex="1"
    /> -->
  </el-main>
</template>

<script>
import { getCaseOnId, getData, setCaseData } from "../db";
import CaseBasicInformation from "../components/case/CaseBasicInformation.vue";
import PhaseAdditionalQuestions from "../components/case/phases/PhaseAdditionalQuestions.vue";
import PhasePhysicalExamination from "../components/case/phases/PhasePhysicalExamination.vue";

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
    PhaseAdditionalQuestions,
    PhasePhysicalExamination,
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
  methods: {},
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

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
