<template>
  <el-main>
    <el-row justify="center"
      ><img
        class="logo"
        src="https://mi-mam05.netlify.app/pwa-512x512.png"
        alt=""
    /></el-row>
    <el-row justify="center"><h1 class="main-title">MedReas</h1></el-row>
    <br />
    <br />
    <el-row justify="center"><h3>Train your</h3></el-row>
    <el-row justify="center"><h2>Medical Reasoning</h2></el-row>
    <el-row justify="center"><h3>skills</h3></el-row>
    <br />
    <br />
    <el-row justify="center">
      <el-button @click="demo" round>Try our demo</el-button>
    </el-row>
  </el-main>
</template>

<script>
// import ImageSelector from "../components/ImageSelector.vue";
// import ImagePreview from "../components/ImagePreview.vue";
// import { uploadImages, getDataOnId } from "../db";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeSection: 1,
      images: [],
      imagesFromFirebase: [],
    };
  },
  components: {
    // ImageSelector,
    // ImagePreview,
  },
  computed: {},
  async mounted() {},
  methods: {
    ...mapActions(["newCase", "selectCase"]),
    // imageSelected(images) {
    //   this.images = [].concat(images, this.images);
    // },
    // deleteImage(imageIndex) {
    //   this.images.splice(imageIndex, 1);
    // },
    // async uploadImages() {
    //   const ids = await uploadImages(this.images);
    //   console.log(ids);
    // },
    // async getImages() {
    //   const filePaths = await getDataOnId("images", "z4XFjWl4YkpiC2O0vutc");
    //   this.imagesFromFirebase = [filePaths];
    // },
    demo() {
      this.selectCase({ edit: false, caseId: "efSvC2nU2IAh8jARpz1t" });
      this.$router.push("/case");
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.logo {
  max-width: 75vw;
}
.main-title {
  font-size: 30px;
}
</style>
