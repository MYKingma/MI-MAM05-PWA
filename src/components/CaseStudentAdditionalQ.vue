<template>
  <el-main>
    <h1>Additional questions</h1>  
    <el-form label-width="200px" style="max-width: 800px" label-position="top">
      <el-form-item label="What additional questions are important to ask?">
        <el-input type="textarea"></el-input>
        <el-button @click="">Submit</el-button>
      </el-form-item>
      <el-form-item label="The physician asked the following additional question(s):">
        <ul>
          <li v-for="item in mockData.case.answer" :key="item" class="text item">{{ item }}</li>
        </ul>
      </el-form-item>
      <el-form-item label="Outcome:">{{mockData.case.outcome.string}}
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
        case:{
          answer: ["Has the pain moved and how is defecation going?"],
          outcome: {
            type: "string",
            string: "Doctor Superman was told that the pain started in the middle and moved to the right below. The patient doesn’t remember when his last defecation was. The patient seemed to get more pain during the conversation and bend over.",
          }
        }
      },
    }
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss"></style>
