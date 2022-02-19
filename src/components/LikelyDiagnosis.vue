<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <h1>Phase: diagnosis</h1>
    <el-form
      :label-position="labelPosition"
      label-width="200px"
      :model="formLabelAlign"
      style="max-width: 800px"
    >
      <el-form-item label="What did you think the most likely diagnosis was?">
        <el-input v-model="mockData.answer" type="textarea"></el-input>
      </el-form-item>
      <el-form-item
        label="Add examples of what you did not regard the most likely diagnosis?"
      >
        <el-input v-model="mockData.wrongAnswer" type="textarea"></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
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
        wrongAnswer: [""],
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
