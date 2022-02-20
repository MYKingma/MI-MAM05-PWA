<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <h1>Phase: physical examination</h1>
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="200px"
      :model="formLabelAlign"
      style="max-width: 800px"
    >
      <el-form-item label="What physical examination was done?">
        <el-input v-model="mockData.answer" type="textarea"></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
      </el-form-item>
      <el-form-item label="Add some examples of what was not done?">
        <el-input v-model="mockData.wrongAnswer" type="textarea"></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
      </el-form-item>
      <h2>What was the outcome of the physical exam?</h2>

      <el-form
        :label-position="labelPosition"
        label-width="200px"
        :model="formLabelAlign"
        style="width: 300px"
      >
        <el-form-item label="Temperature">
          <el-input v-model="mockData.Temperature" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Breathing frequency">
          <el-input
            v-model="mockData.BreathingFrequency"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="Bloodpressure">
          <el-input v-model="mockData.BloodPressure" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Heartrate">
          <el-input v-model="mockData.HeartRate" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Blood Saturation">
          <el-input
            v-model="mockData.BloodSaturation"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="Furthermore you found that" style="width: 800px">
          <el-input v-model="mockData.ourcome" type="textarea"></el-input>
        </el-form-item>
      </el-form>
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
        outcome: null,
        Temperature: null,
        BreathingFrequency: null,
        BloodPressure: null,
        HeartRate: null,
        BloodSaturation: null,
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
