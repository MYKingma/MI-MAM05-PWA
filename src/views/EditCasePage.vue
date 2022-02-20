<template>
  <el-main v-if="caseLoaded">
    <h1 @click="test">Edit case</h1>
    <div class="box">
      <CaseBasicInformation v-model="caseEditData" />
    </div>
    <draggable
      v-model="caseEditData.caseData.phases"
      tag="transition-group"
      item-key="id"
      :sort="false"
      :disabled="true"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: 'fade',
        class: 'container',
      }"
    >
      <template #item="{ element, index }">
        <div class="box">
          <component
            v-model="caseEditData"
            :phaseIndex="index"
            :is="`Phase${element.type}`"
            @move-up="movePhaseUp(index)"
            @move-down="movePhaseDown(index)"
            @delete-phase="deletePhase(index)"
          />
        </div>
      </template>
      <template #footer>
        <PhaseSelector
          v-if="showSelector"
          key="selector"
          @select-phase="selectPhase"
        />
      </template>
    </draggable>
  </el-main>
</template>

<script>
import draggable from "vuedraggable";

import CaseBasicInformation from "../components/case/CaseBasicInformation.vue";
import PhaseAdditionalQuestions from "../components/case/phases/PhaseAdditionalQuestions.vue";
import PhasePhysicalExamination from "../components/case/phases/PhasePhysicalExamination.vue";
import PhaseAdditionalDiagnosticTests from "../components/case/phases/PhaseAdditionalDiagnosticTests.vue";
import PhaseDiagnosis from "../components/case/phases/PhaseDiagnosis.vue";
import PhaseTreatment from "../components/case/phases/PhaseTreatment.vue";
import PhaseSelector from "../components/case/phases/PhaseSelector.vue";

import { getCaseOnId, getData, setCaseData, deleteDataOnId } from "../db";

export default {
  data() {
    return {
      caseLoaded: false,
      caseEditData: {
        caseData: {
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
        specialisms: [],
        genders: ["Male", "Female", "Other"],
      },
    };
  },
  components: {
    CaseBasicInformation,
    PhaseAdditionalQuestions,
    PhasePhysicalExamination,
    PhaseAdditionalDiagnosticTests,
    PhaseDiagnosis,
    PhaseTreatment,
    PhaseSelector,
    draggable,
  },
  computed: {
    caseData() {
      return this.caseEditData.caseData;
    },
    showSelector() {
      return (
        this.caseEditData.caseData.phases[
          this.caseEditData.caseData.phases.length - 1
        ].type !== "Treatment"
      );
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
    async movePhaseUp(index) {
      this.caseEditData.caseData = await getCaseOnId("efSvC2nU2IAh8jARpz1t");
      const phase = this.caseEditData.caseData.phases[index];
      this.caseEditData.caseData.phases.splice(index, 1);
      this.caseEditData.caseData.phases.splice(index - 1, 0, phase);
    },
    async movePhaseDown(index) {
      this.caseEditData.caseData = await getCaseOnId("efSvC2nU2IAh8jARpz1t");
      const phase = this.caseEditData.caseData.phases[index];
      this.caseEditData.caseData.phases.splice(index, 1);
      this.caseEditData.caseData.phases.splice(index + 1, 0, phase);
    },
    async deletePhase(index) {
      this.caseEditData.caseData = await getCaseOnId("efSvC2nU2IAh8jARpz1t");
      const id = this.caseEditData.caseData.phases.splice(index, 1)[0].id;
      deleteDataOnId("phases", id);
    },
    test() {
      deleteDataOnId("phases", "jtYx4lsvSjQsv3JwMaaD");
    },
    selectPhase(selectedPhase) {
      this.caseEditData.caseData.phases.push(this.getCaseObject(selectedPhase));
    },
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
    getCaseObject(type) {
      switch (type) {
        case "Additional questions":
          return {
            id: "",
            type: "AdditionalQuestions",
            answer: [],
            wrongAnswer: [],
            images: [],
            outcome: {
              id: "",
              text: "",
              extraTestName1: "",
              extraTestName2: "",
              extraTestValue1: "",
              extraTestValue2: "",
              bloodPressure: "",
              bloodSaturation: null,
              breathRate: null,
              heartRate: null,
              temperature: null,
            },
          };
        case "Physical examination":
          return {
            id: "",
            type: "PhysicalExamination",
            answer: [],
            wrongAnswer: [],
            images: [],
            outcome: {
              id: "",
              text: "",
            },
          };
        case "Additional diagnostic tests":
          return {
            id: "",
            type: "AdditionalDiagnosticTests",
            answer: [],
            wrongAnswer: [],
            images: [],
            outcome: {
              id: "",
              extraTestName1: "",
              extraTestName2: "",
              extraTestValue1: "",
              extraTestValue2: "",
              text: "",
            },
          };
        case "Diagnosis":
          return {
            id: "",
            type: "Diagnosis",
            answer: [],
            wrongAnswer: [],
            images: [],
          };
        case "Treatment":
          return {
            id: "",
            type: "Treatment",
            answer: [],
            wrongAnswer: [],
            images: [],
          };
        default:
          return null;
      }
    },
  },
  watch: {
    caseData: {
      handler: async function () {
        await setCaseData(this.caseEditData.caseData);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid rgb(240, 240, 240);
  background-color: rgb(254, 254, 254);
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px 0px;
  max-width: 778px;
}

.container {
  position: relative;
  padding: 0;
  overflow: hidden;
  * > * {
    overflow: hidden;
  }
}
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: relative;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
