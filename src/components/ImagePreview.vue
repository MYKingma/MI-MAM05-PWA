<template>
  <el-collapse-transition>
    <el-carousel v-if="images.length">
      <el-carousel-item v-for="(image, index) in images" :key="index">
        <el-button
          v-if="upload"
          type="danger"
          class="delete-button"
          :icon="Delete"
          @click="deleteImage(index)"
          circle
        ></el-button>
        <el-image :src="image.url">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </el-collapse-transition>
</template>

<script>
import { Picture, Delete } from "@element-plus/icons-vue";
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
  },
  data() {
    return {};
  },
  components: {
    Picture,
  },
  computed: {
    Delete() {
      return Delete;
    },
  },
  mounted() {},
  methods: {
    deleteImage(imageIndex) {
      this.$emit("deleteImage", imageIndex);
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.delete-button {
  position: absolute;
  z-index: 3000;
  right: 10px;
  top: 10px;
}
</style>
