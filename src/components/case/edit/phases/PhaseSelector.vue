<template>
  <el-row class="select-phase-wrapper" justify="space-between">
    <el-col :span="10">
      <el-form @submit.prevent :inline="true">
        <el-form-item label="Add next phase">
          <el-select
            class="select-phase"
            v-model="selectedPhase"
            placeholder="Select type"
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
        @click="selectPhase"
        :disabled="selectedPhase === null"
        type="primary"
        circle
        size="small"
        ><IconWrapper icon="plus" /></el-button
    ></el-col>
  </el-row>
</template>

<script>
export default {
  emits: ["selectPhase"],
  props: {},
  data() {
    return {
      phases: [
        "Additional questions",
        "Physical examination",
        "Additional diagnostic tests",
        "Diagnosis",
        "Treatment",
      ],
      selectedPhase: null,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    selectPhase() {
      this.$emit("selectPhase", this.selectedPhase);
      this.selectedPhase = null;
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
