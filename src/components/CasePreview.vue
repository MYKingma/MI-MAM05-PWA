<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Case</span>
          <el-button class="button" type="text">Choose</el-button>
        </div>
      </template>
      <div>Date: {{ mockData.case.date }}</div>
      <div>
        Physician:
        {{ mockData.physician.firstname + " " + mockData.physician.lastname }}
      </div>
      <div>Main problem: {{ mockData.case.mainProblem }}</div>
    </el-card>
  </el-main>
</template>

<script>
import mockData from "../../mockdata.json";
export default {
  props: {},
  data() {
    return {
      mockData: {},
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

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
