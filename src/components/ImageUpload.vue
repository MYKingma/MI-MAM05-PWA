<template>
  <el-main>
    <el-upload
      ref="upload"
      class="upload-demo"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      accept="image/*"
      capture="camera"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload"
        >upload to server</el-button
      >
      <template #tip>
        <div class="el-upload__tip" style="color: red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
  </el-main>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      image: null,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleExceed(files) {
      this.image.value.clearFiles();
      this.image.value.handleStart(files[0]);
    },
    submitUpload() {
      this.image.value.submit();
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
