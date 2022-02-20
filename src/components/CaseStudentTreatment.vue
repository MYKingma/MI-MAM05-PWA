<template>
  <el-main>
    <h1>Treatment</h1>  
    <el-form label-width="200px" style="max-width: 800px" label-position="top">
      <el-form-item label="What treatment would you recommend?">
          <el-checkbox v-for="item in mockData.case.answer.concat(mockData.case.wrongAnswer).sort()" :key="item" class="text item" >{{ item }} </el-checkbox>                
      </el-form-item>
      <el-button @click="">Submit</el-button>
      <el-form-item label>
        {{mockData.case.outcome}}
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
          answer: ["Appendectomy"],
          wrongAnswer:["Antibiotics","Expectative","Diet advice"],
          outcome:"some extra information?"
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

<style lang="scss" scoped></style>
