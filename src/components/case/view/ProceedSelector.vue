<template>
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
      validation: null,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    selectProceed() {
      if (
        this.phaseData[this.phaseIndex].type.toLowerCase() ===
        this.selectedPhase.toLowerCase().replace(" ", "")
      ) {
        console.log("CORRECT");
      } else {
        console.log("FALSE");
      }
      this.selectedPhase = null;
    },
    proceed() {
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
