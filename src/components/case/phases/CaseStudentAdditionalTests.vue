<template>
  <el-main>
    <h1>Additional diagnostic tests</h1>
    <el-form label-width="200px" style="max-width: 800px" label-position="top">
      <el-form-item
        label="What additional diagnostic tests would you do/order?"
      >
        <el-checkbox
          v-for="item in mockData.case.answer
            .concat(mockData.case.wrongAnswer)
            .sort()"
          :key="item"
          >{{ item }}
        </el-checkbox>
      </el-form-item>
      <el-button @click="">Submit</el-button>
      <el-form-item label="Result(s) of the tests:"
        >{{ mockData.case.outcome }}
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
          answer: [
            "echo abdomen",
            "BSE",
            "CRP",
            "Leukocieten",
            "Hb",
            "Natrium",
          ],
          wrongAnswer: [
            "X boz",
            "MRI abdomen",
            "endoscopy",
            "MCV",
            "ALAT/ASAT",
          ],
          outcome:
            "The echo showed inflammation of the appendix and the lab showed a mild leukocytose.",
        },
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
