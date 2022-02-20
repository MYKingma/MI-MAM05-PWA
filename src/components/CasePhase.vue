<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <h1>What is the type of your next phase?</h1>
    <el-form ref="formRef" label-width="120px">
      <el-form-item label="Type">
        <el-select
          v-model="selectedPhase"
          placeholder="Please select your next phase"
        >
          <el-option
            v-for="phase in phases"
            :key="phase.id"
            :value="phase"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import mockData from "../../mockdata.json";
export default {
  props: {},
  data() {
    return {
      mockData: null,
      phases: [
        "Additional questions",
        "Physical Exam",
        "Additional diagnostic tests",
        "Diagnosis",
        "Treatment",
        "Endcase",
      ],
      selectedPhase: null,
    };
  },
  computed: {},
  mounted() {
    console.log(mockData);
  },
  methods: {},
  watch: {
    selectedPhase() {
      this.$emit("change", this.selectedPhase);
    },
  },
};
</script>

<style lang="scss"></style>
