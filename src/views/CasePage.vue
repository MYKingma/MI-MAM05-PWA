<template>
  <el-main>
    <h1>Case</h1>
    <el-row justify="space-between">
      <el-descriptions
        class="description-box"
        direction="horizontal"
        :column="1"
      >
        <el-descriptions-item label="Specialism">{{
          caseData.specialism
        }}</el-descriptions-item>
        <el-descriptions-item label="Main problem">{{
          caseData.mainProblem
        }}</el-descriptions-item>
        <el-descriptions-item label="Date">{{
          new Date(caseData.date).toLocaleDateString()
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="horizontal" :column="1">
        <el-descriptions-item label="Created by"
          >Floris Wiesman, Dr.</el-descriptions-item
        >
        <el-descriptions-item label="Specialism"
          >Medical informatics</el-descriptions-item
        >
        <el-descriptions-item label="Institution"
          >Amsterdam UMC
        </el-descriptions-item>
      </el-descriptions>
    </el-row>
    <br />
    <h3>Patient information</h3>
    <el-row justify="space-between">
      <el-descriptions
        class="description-box"
        direction="horizontal"
        :column="1"
      >
        <el-descriptions-item label="Age">{{
          caseData.patient.age
        }}</el-descriptions-item>
        <el-descriptions-item label="Gender">{{
          caseData.patient.gender
        }}</el-descriptions-item>
        <el-descriptions-item label="Ethnicity">{{
          caseData.patient.ethnicity
        }}</el-descriptions-item> </el-descriptions
      ><el-descriptions direction="horizontal" :column="1">
        <el-descriptions-item
          class="medical-history"
          width="220px"
          label="Medical history"
          >{{
            caseData.patient.medicalHistory.join(", ")
          }}</el-descriptions-item
        >
        <el-descriptions-item label="Medication" width="220px">{{
          caseData.patient.medication.join(", ")
        }}</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <ImagePreview :images="caseData.images" />
    <br />
    <el-descriptions class="description-box" direction="vertical" :column="1">
      <el-descriptions-item label="Introduction">{{
        caseData.introduction
      }}</el-descriptions-item>
    </el-descriptions>
    <TransitionGroup
      tag="ul"
      name="fade"
      class="container"
      @before-leave="beforeLeave"
    >
    </TransitionGroup>
    <ProceedSelector
      :phaseData="caseData.phases"
      :phaseIndex="currentPhaseIndex"
      @proceed="proceedPhase"
    />
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import ImagePreview from "../components/ImagePreview.vue";
import ProceedSelector from "../components/case/view/ProceedSelector.vue";

export default {
  data() {
    return {
      currentPhaseIndex: 0,
    };
  },
  components: {
    ImagePreview,
    ProceedSelector,
  },
  computed: {
    ...mapGetters({
      caseData: "currentCase",
    }),
  },
  mounted() {
    console.log(this.caseData);
  },
  methods: {
    proceedPhase() {
      console.log("Proceed");
    },
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.description-box {
  margin-right: 10px;
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
