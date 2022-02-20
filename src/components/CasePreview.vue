<template>
  <el-main>
    <!-- <h1>{{ mockData.case }}</h1> -->
    <el-descriptions
      class="margin-top"
      title="Case information"
      :column="3"
      :size="size"
      border
    >
      <template #extra>
        <el-button type="primary">Choose</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            Physician
          </div>
        </template>
        Dr. Superman
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <info-filled />
            </el-icon>
            Specialism:
          </div>
        </template>
        Emergency department
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle"> <calendar /> </el-icon>
            Date:
          </div>
        </template>
        1-1-2022
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            Main problem
          </div>
        </template>
        Abnominal pain
      </el-descriptions-item>
    </el-descriptions>
  </el-main>
</template>

<script setup lang="ts">
import { User, Calendar, Tickets, InfoFilled } from "@element-plus/icons-vue";
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
