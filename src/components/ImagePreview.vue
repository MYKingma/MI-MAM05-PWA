<template>
  <el-row justify="center" class="image-preview-wrapper">
    <el-col class="image-col">
      <el-collapse-transition>
        <el-carousel height="220px" class="image-carousel" v-if="images.length">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <el-button
              v-if="upload"
              type="danger"
              class="delete-button"
              @click="deleteImage(index)"
              circle
              ><IconWrapper icon="trash-alt"
            /></el-button>
            <el-image
              class="image"
              :src="image.base64"
              style="width: 300px; height: 220px"
              fit="scale-down"
            >
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-collapse-transition>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    upload: {
      type: Boolean,
      default: false,
    },
    phaseIndex: {
      default: false,
    },
  },
  emits: ["deleteImage"],
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    deleteImage(imageIndex) {
      this.$emit("deleteImage", { phaseIndex: this.phaseIndex, imageIndex });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.image-preview-wrapper {
  padding: 5px 0px;
  .image-col {
    max-width: 300px;
    .image-carousel {
      height: 220px;
      width: 300px;
      .delete-button {
        position: absolute;
        z-index: 3000;
        right: 10px;
        top: 10px;
        .icon-button {
          margin: 0;
        }
      }
      .image {
        max-width: inherit;
      }
    }
  }
}
</style>
