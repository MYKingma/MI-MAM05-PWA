<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <h1>Phase: additional questions</h1>
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="200px"
      :model="formLabelAlign"
      style="max-width: 800px"
    >
      <el-form-item label="What additional questions did you ask?">
        <el-input v-model="mockData.answer" type="textarea"></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
      </el-form-item>
      <el-form-item label="What was the outcome of the questions?">
        <el-input v-model="mockData.outcome" type="textarea"></el-input>
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
      mockData: {
        answer: [""],
      },
    };
  },
  computed: {},
  mounted() {
    this.mockData = mockData;
  },
  methods: {},
  watch: {},
};
</script>

<style lang="scss"></style>
