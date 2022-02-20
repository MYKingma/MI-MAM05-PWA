<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <h1>Student information:</h1>
    <el-form
      :label-position="labelPosition"
      label-width="200px"
      :model="formLabelAlign"
      style="max-width: 800px"
    >
      <el-form-item label="What is your first name?">
        <el-input v-model="mockData.firstname" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="What is your last name?">
        <el-input v-model="mockData.lastname" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="At what institution do you study?">
        <el-input v-model="mockData.institution" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="What is your field of study?">
        <el-input v-model="mockData.fieldofstudy" type="textarea"></el-input>
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
        firstname: "",
        lastname: "",
        institution: "",
        fieldofstudy: "",
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
