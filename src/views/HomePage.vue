<template>
  <el-main>
    <h1>Home</h1>
    <p>
      Alleen als je bent ingelogd kan je naar de rolspecifieke pagina's (De
      titel veranderd). <br />
      Zo niet, dan kom je op de homepagina uit.
    </p>
    <br />
    <el-collapse v-model="activeSection">
      <el-collapse-item title="Photo upload and preview" name="1">
        <el-row>
          <ImageSelector @select-image="imageSelected" />
        </el-row>
        <ImagePreview
          :images="images"
          :upload="true"
          @delete-image="deleteImage"
        />
      </el-collapse-item>
      <el-collapse-item title="Upload images to firebase" name="2">
        <el-row>
          <el-button @click="uploadImages"
            >Upload above images to firebase</el-button
          >
          <el-button @click="getImages"
            >Retrieve images from firebase</el-button
          >
        </el-row>
        <ImagePreview :images="imagesFromFirebase" />
      </el-collapse-item>
    </el-collapse>
  </el-main>
</template>

<script>
import ImageSelector from "../components/ImageSelector.vue";
import ImagePreview from "../components/ImagePreview.vue";
import { uploadImages, getDataOnId } from "../db";
export default {
  data() {
    return {
      activeSection: 1,
      images: [],
      imagesFromFirebase: [],
    };
  },
  components: {
    ImageSelector,
    ImagePreview,
  },
  computed: {},
  async mounted() {},
  methods: {
    imageSelected(images) {
      this.images = [].concat(images, this.images);
    },
    deleteImage(imageIndex) {
      this.images.splice(imageIndex, 1);
    },
    async uploadImages() {
      const ids = await uploadImages(this.images);
      console.log(ids);
    },
    async getImages() {
      const filePaths = await getDataOnId("images", "z4XFjWl4YkpiC2O0vutc");
      this.imagesFromFirebase = [filePaths];
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
