<template>
  <h1>Additional questions</h1>
  <el-form label-width="200px" style="max-width: 800px" label-position="top">
    <el-form-item label="What additional questions are important to ask?">
      <el-tag
        v-for="tag in value.caseData.phases[phaseIndex].answer"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput"
        id="tagInput"
        v-model="tagValue"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm()"
        @blur="handleInputConfirm()"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput()"
      >
        + Add field
      </el-button>
    </el-form-item>
    <el-form-item label="What did the patient answer on these questions?">
      <el-input
        v-model="value.caseData.phases[phaseIndex].outcome.text"
        type="textarea"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["modelValue", "phaseIndex"],
  data() {
    return {
      showTagInput: false,
      tagValue: "",
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  mounted() {},
  methods: {
    handleClose(tag) {
      this.value.caseData.phases[this.phaseIndex].answer.splice(
        this.value.caseData.phases[this.phaseIndex].answer.indexOf(tag),
        1
      );
    },

    showInput() {
      this.showTagInput = true;
      this.$nextTick(() => {
        document.getElementById(`tagInput`).focus();
      });
    },
    handleInputConfirm() {
      let tagValue = this.tagValue;
      if (tagValue) {
        this.value.caseData.phases[this.phaseIndex].answer.push(tagValue);
      }
      this.showTagInput = false;
      this.tagValue = "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
