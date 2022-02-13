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
      const imagesObject = images.map((image) => ({
        url: URL.createObjectURL(image),
        data: image,
      }));
      this.$emit("selectImage", imagesObject);
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
