<template>
  <el-upload
    class="upload-image"
    action=""
    :limit="1"
    :on-exceed="emitImage"
    :show-file-list="false"
    :http-request="emitImage"
    accept="image/*"
    multiple
  >
    <el-button type="primary">Click to upload</el-button>
  </el-upload>
</template>

<script>
import { toBase64 } from "../db";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    async emitImage(event) {
      const images = event.length ? Array.from(event) : [event.file];
      const imagesObject = [];
      await Promise.all(
        images.map(async (image) => {
          imagesObject.push({ base64: await toBase64(image) });
        })
      );
      this.$emit("selectImage", imagesObject);
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
