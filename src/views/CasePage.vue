<template>
  <el-main v-if="!loading" class="main">
    <el-row class="select-phase-wrapper" justify="space-between">
      <el-col :span="10"
        ><el-button @click="$router.push('/')" round size="small"
          >Home</el-button
        ></el-col
      >
      <el-col :span="12" class="max-width"
        ><el-button @click="refresh" type="primary" round size="small"
          >Refresh</el-button
        ></el-col
      >
    </el-row>
    <br />
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
          >{{ creator.name }}, {{ creator.title }}</el-descriptions-item
        >
        <el-descriptions-item label="Specialism">{{
          creator.specialism
        }}</el-descriptions-item>
        <el-descriptions-item label="Institution"
          >{{ creator.institution }}
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
    <template v-for="(phase, index) in caseData.phases" :key="phase">
      <Transition mode="out-in">
        <CasePhaseView
          v-show="currentPhaseIndex === index && !showFinished"
          :key="phase"
          :phase-data="phase"
          :phase-index="index"
          :creator="creator"
          @proceed="proceedPhase"
        />
      </Transition>
    </template>
    <ProceedSelector
      v-if="
        nextPhaseIndex !== null &&
        currentPhaseIndex < caseData.phases.length &&
        !phaseActive &&
        !showFinished
      "
      :phaseData="caseData.phases"
      :phaseIndex="nextPhaseIndex"
      :creator="creator"
      @proceed="proceedPhase"
    />
    <div vlass="box" v-if="showFinished">
      <el-row justify="center">
        <el-col>
          <el-result icon="success" title="Finished"> </el-result>
        </el-col>
      </el-row>
    </div>
    <!-- <p>
      {{ caseData.phases.length
      }}{{ nextPhaseIndex === caseData.phases.length }}
      {{
        nextPhaseIndex === caseData.phases.length && currentPhaseIndex !== null
      }}
    </p> -->
  </el-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ImagePreview from "../components/ImagePreview.vue";
import ProceedSelector from "../components/case/view/ProceedSelector.vue";
import CasePhaseView from "../components/case/view/CasePhaseView.vue";

export default {
  data() {
    return {
      currentPhaseIndex: null,
      nextPhaseIndex: 0,
      phaseActive: false,
      creator: {
        name: "C Superman",
        title: "Dr.",
        specialism: "Internal medicine",
        institution: "Amsterdam UMC",
      },
      showFinished: false,
    };
  },
  components: {
    ImagePreview,
    ProceedSelector,
    CasePhaseView,
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.id) {
      next((vm) => vm.loadCaseById(to.query.id));
    } else {
      next();
    }
  },
  computed: {
    ...mapGetters({
      caseData: "currentCase",
      loading: "loading",
    }),
  },
  mounted() {
    console.log(this.caseData);
  },
  methods: {
    ...mapActions(["loadCaseById", "selectCase"]),
    proceedPhase() {
      if (this.nextPhaseIndex === this.caseData.phases.length) {
        this.currentPhaseIndex = null;
        this.showFinished = true;
      } else {
        this.currentPhaseIndex = this.nextPhaseIndex;
        this.nextPhaseIndex += 1;
        this.phaseActive = true;
      }
    },
    finishPhase() {
      this.phaseActive = false;
    },
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
    refresh() {
      this.selectCase({ edit: false, caseId: "83wme8E8qSJOnkDw55wc" });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.main {
  max-width: 778px;
}
.max-width {
  max-width: fit-content;
}
.box {
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 5px 15px 10px 15px;
  background-color: rgb(252, 252, 252);
  max-width: 778px;
  margin-bottom: 20px;
}
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
