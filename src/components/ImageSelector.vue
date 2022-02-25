<template>
  <el-row justify="space-between">
    <el-col :span="8"> <h4>Images</h4> </el-col>
    <el-col :span="8" class="max-width"
      ><el-upload
        action=""
        :limit="1"
        :on-exceed="emitImage"
        :show-file-list="false"
        :http-request="emitImage"
        accept="image/*"
        multiple
      >
        <el-button type="primary" size="small" round
          >Add image<IconWrapper icon="plus" class="icon-button"
        /></el-button> </el-upload
    ></el-col>
  </el-row>
</template>

<script>
import { toBase64 } from "../db";
export default {
  props: {
    phaseIndex: {
      default: false,
    },
  },
  emits: ["selectImage"],
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
          imagesObject.push({
            base64: await toBase64(image),
            phaseIndex: this.phaseIndex,
          });
        })
      );
      this.$emit("selectImage", imagesObject);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.max-width {
  max-width: fit-content;
}
</style>
