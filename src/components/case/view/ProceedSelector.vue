<template>
  <Transition mode="out-in">
    <div v-if="showSelector">
      <h3>How would you proceed?</h3>
      <el-row class="select-phase-wrapper" justify="space-between">
        <el-col :span="10">
          <el-form @submit.prevent :inline="true">
            <el-form-item>
              <el-select
                class="select-phase"
                v-model="selectedPhase"
                placeholder="Select phase"
              >
                <el-option
                  v-for="phase in phases"
                  :key="phase"
                  :value="phase"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="max-width"
          ><el-button
            @click="selectProceed"
            :disabled="selectedPhase === null"
            type="primary"
            round
            size="small"
            >Submit</el-button
          ></el-col
        >
      </el-row>
    </div>
    <div v-else>
      <div v-if="correct">
        <el-row class="select-phase-wrapper" justify="space-between">
          <el-col :span="10">
            <h3>This is correct</h3>
          </el-col>
          <el-col :span="10" class="max-width">
            <el-button @click="proceed" type="primary" round size="small"
              >Next</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row class="select-phase-wrapper" justify="space-between">
          <el-col :span="10">
            <h3>This is false</h3>
          </el-col>
          <el-col :span="10" class="max-width">
            <el-button @click="proceed" type="primary" round size="small"
              >Next</el-button
            >
          </el-col>
        </el-row>
        <p>{{ creator.name }} chose to proceed with {{ caseType }}.</p>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  emits: ["proceed"],
  props: {
    phaseData: {
      type: Array,
    },
    phaseIndex: {
      type: Number,
    },
    creator: {
      type: Object,
    },
  },
  data() {
    return {
      phases: [
        "Additional questions",
        "Physical Exam",
        "Additional diagnostic tests",
        "Diagnosis",
        "Treatment",
      ],
      selectedPhase: null,
      correct: null,
      showSelector: true,
    };
  },
  computed: {
    caseType() {
      const phaseType = this.phaseData[this.phaseIndex].type;
      switch (phaseType) {
        case "AdditionalQuestions":
          return "some additional questions";
        case "PhysicalExamination":
          return "a physical exam";
        case "AdditionalDiagnosticTests":
          return "some additional diagnostic tests";
        case "Diagnosis":
          return "a diagnosis";
        case "Treatment":
          return "determining treatment";
        default:
          return "";
      }
    },
  },
  mounted() {},
  methods: {
    selectProceed() {
      if (
        this.phaseData[this.phaseIndex].type.toLowerCase() ===
        this.selectedPhase.toLowerCase().replace(" ", "")
      ) {
        this.showSelector = false;
        this.correct = true;
      } else {
        this.showSelector = false;
        this.correct = false;
      }
      this.selectedPhase = null;
    },
    proceed() {
      this.showSelector = true;
      this.$emit("proceed");
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.select-phase-wrapper {
  margin: 10px 0px;
  max-width: 778px;
  .select-phase {
    width: 250px;
  }
}
.max-width {
  max-width: fit-content;
  margin-top: 2px;
}
</style>
