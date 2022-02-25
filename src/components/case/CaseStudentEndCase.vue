<template>
  <el-main>
    <h1>End</h1>
    <el-form @submit.prevent label-width="200px" style="max-width: 800px" label-position="top">
      <el-form-item
        label="To what extend would you recommend this case to other students like you?"
      >
        <el-rate v-model="mockData.case.rating" size="large"></el-rate>
      </el-form-item>
      <el-form-item
        label="Do you think the doctor could have better made other choices?"
      >
        <el-checkbox label="Yes" size="large"></el-checkbox>
        <el-checkbox label="No" size="large"></el-checkbox>
      </el-form-item>
      <el-form-item label="Explain:">
        <el-input v-model="mockData.case.feedback" type="textarea"></el-input>
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
          rating: null,
          feedback: "",
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
