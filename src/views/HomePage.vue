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
        <ImageUpload />
      </el-collapse-item>
      <!-- <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </el-collapse-item> -->
    </el-collapse>
  </el-main>
</template>

<script>
import ImageUpload from "../components/ImageUpload.vue";
export default {
  data() {
    return {
      activeSection: 1,
    };
  },
  components: {
    ImageUpload,
  },
  computed: {},
  async mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss"></style>
