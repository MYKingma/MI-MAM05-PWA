<template>
  <el-main>
    <h1>Physical exam</h1>  
    <el-form label-width="200px" style="max-width: 800px" label-position="top">
      <el-form-item label="What would you do for physical exam?">
        <el-checkbox v-for="item in mockData.case.answer.concat(mockData.case.wrongAnswer).sort()" :key="item" class="text item" >{{ item }} </el-checkbox>       
      </el-form-item>
      <el-button @click="">Submit</el-button>
      <el-form-item label="Outcome of the physical exam:">
        <ul>
          <li >Temperature (C): {{mockData.case.outcome.object.temperature}}</li>
          <li >Breathing frequency (Hz): {{mockData.case.outcome.object.breathingFrequency}}</li>
          <li >Blood pressure (mmHg): {{mockData.case.outcome.object.bloodPressure}}</li>
          <li >Heart rate (bpm): {{mockData.case.outcome.object.heartRate}}</li>
          <li >Blood saturation (%): {{mockData.case.outcome.object.bloodSaturation}}</li>
        </ul>
        Futhermore: {{mockData.case.outcome.object.other}}
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      mockData: {
        case: {
          answer: ["measuring vital parameters", "inspection, auscultation and palpation of the abdomen","testing rebound tenderness", "rectal exam"],
          wrongAnswer: ["auscultation of the heart", "prostate toucher"],
          outcome: {
            type: "object",
            object: {
              temperature: 38,
              breathingFrequency: "",
              bloodPressure: "60/100",
              heartRate: 100,
              bloodSaturation: null,
              other: "Abdomen looked normal, but palpation was extremely painful and rebound tenderness was present. Rectal exam showed no abnormalities."
            }
          }
        }
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss"></style>
