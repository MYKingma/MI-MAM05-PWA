<template>
  <el-main>
    <el-row class="header-row" justify="space-between" align="middle">
      <el-col :span="12"><h1>Edit case</h1></el-col>
      <el-col class="max-width" :span="12">
        <CaseToolbar />
      </el-col>
    </el-row>
    <div class="box">
      <CaseBasicInformation v-model="caseData" />
      <ImageSelector @select-image="selectImage" />
      <ImagePreview
        :upload="true"
        :images="caseData.images"
        @delete-image="deleteImage"
      />
    </div>
    <draggable
      v-model="caseData.phases"
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
        <div class="box no-m-bottom">
          <component
            v-model="caseData"
            :phaseIndex="index"
            :is="`Phase${element.type}`"
            @move-up="movePhase({ phaseIndex: index, direction: 'up' })"
            @move-down="movePhase({ phaseIndex: index, direction: 'down' })"
            @delete-phase="deletePhaseFromGroup(index)"
          />
          <ImageSelector :phaseIndex="index" @select-image="selectImage" />
          <ImagePreview
            :upload="true"
            :images="element.images"
            :phaseIndex="index"
            @delete-image="deleteImage"
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
import { mapActions, mapGetters } from "vuex";

import CaseBasicInformation from "../components/case/edit/CaseBasicInformation.vue";
import PhaseAdditionalQuestions from "../components/case/edit/phases/PhaseAdditionalQuestions.vue";
import PhasePhysicalExamination from "../components/case/edit/phases/PhasePhysicalExamination.vue";
import PhaseAdditionalDiagnosticTests from "../components/case/edit/phases/PhaseAdditionalDiagnosticTests.vue";
import PhaseDiagnosis from "../components/case/edit/phases/PhaseDiagnosis.vue";
import PhaseTreatment from "../components/case/edit/phases/PhaseTreatment.vue";
import PhaseSelector from "../components/case/edit/phases/PhaseSelector.vue";
import ImageSelector from "../components/ImageSelector.vue";
import ImagePreview from "../components/ImagePreview.vue";
import CaseToolbar from "../components/case/edit/CaseToolbar.vue";
// import { ElNotification } from "element-plus";

export default {
  data() {
    return {};
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
    ImageSelector,
    ImagePreview,
    CaseToolbar,
  },
  computed: {
    ...mapGetters({
      caseData: "currentCase",
    }),
    showSelector() {
      if (!this.caseData.phases.length) return true;
      return (
        this.caseData.phases[this.caseData.phases.length - 1].type !==
        "Treatment"
      );
    },
  },
  async mounted() {
    // ElNotification({
    //   title: "Title",
    //   message: "This is a reminder",
    //   type: "success",
    //   showClose: false,
    // });
  },
  methods: {
    ...mapActions([
      "movePhase",
      "deletePhase",
      "saveDraftCurrentCase",
      "publishCase",
    ]),
    deletePhaseFromGroup(index) {
      const el = document.getElementsByClassName("box")[index + 1];
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
      this.deletePhase(index);
    },
    deleteCase() {
      console.log("DELETE");
    },
    selectPhase(selectedPhase) {
      this.caseData.phases.push(this.getCaseObject(selectedPhase));
    },
    selectImage(imageArray) {
      if (imageArray[0].phaseIndex === false) {
        imageArray.forEach((image) => {
          this.caseData.images.push({ base64: image.base64 });
        });
      } else {
        imageArray.forEach((image) => {
          this.caseData.phases[image.phaseIndex].images.push({
            base64: image.base64,
          });
        });
      }
    },
    deleteImage(imageObject) {
      if (imageObject.phaseIndex === false) {
        this.caseData.images.splice(imageObject.imageIndex, 1);
      } else {
        this.caseData.phases[imageObject.phaseIndex].images.splice(
          imageObject.imageIndex,
          1
        );
      }
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
        this.$store.commit("SET_CURRENT_CASE", this.caseData);
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
.header-row {
  max-width: 778px;
}

.max-width {
  max-width: fit-content;
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
