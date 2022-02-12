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
          <ImageUpload @select-image="imageSelected" />
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
import ImageUpload from "../components/ImageUpload.vue";
import ImagePreview from "../components/ImagePreview.vue";
import { uploadFiles } from "../firebase/index";
import { getFiles } from "../db";
export default {
  data() {
    return {
      activeSection: 1,
      images: [],
      imagesFromFirebase: [],
    };
  },
  components: {
    ImageUpload,
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
      await uploadFiles(
        "images",
        this.images.map((image) => image.data)
      );
    },
    async getImages() {
      const filePaths = await getFiles([
        "images/1644690104554_93557-950-692 kopie.jpg",
      ]);
      this.imagesFromFirebase = filePaths;
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
