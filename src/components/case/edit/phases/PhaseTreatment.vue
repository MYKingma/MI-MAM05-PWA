<template>
  <el-row justify="space-between">
    <el-col :span="12"><h3>Treatment</h3></el-col>
    <el-col class="max-width" :span="12"
      ><PhaseToolbar
        @move-up="$emit('moveUp')"
        @move-down="$emit('moveDown')"
        @delete-phase="$emit('deletePhase')"
        :index="phaseIndex"
        :length="value.phases.length"
    /></el-col>
  </el-row>
  <el-form @submit.prevent label-position="top">
    <el-form-item label="Recommended treatment and explaination">
      <el-input
        v-model="value.phases[phaseIndex].answer[0]"
        type="textarea"
        class="textarea"
        autosize
        resize="none"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="Wrong treatment options (for generating multiple choice)"
    >
      <el-tag
        v-for="tag in value.phases[phaseIndex].wrongAnswer"
        :key="tag"
        class="mx-1 tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput"
        id="tagInput"
        v-model="tagValue"
        class="ml-1 w-20 tag-input"
        size="small"
        @keyup.enter="handleInputConfirm()"
        @blur="handleInputConfirm()"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1 tag-button"
        size="small"
        @click="showInput()"
      >
        + Add wrong treatment
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["modelValue", "phaseIndex"],
  emits: ["deletePhase", "moveUp", "moveDown"],
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
      this.value.phases[this.phaseIndex].wrongAnswer.splice(
        this.value.phases[this.phaseIndex].wrongAnswer.indexOf(tag),
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
        this.value.phases[this.phaseIndex].wrongAnswer.push(tagValue);
      }
      this.showTagInput = false;
      this.tagValue = "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.max-width {
  max-width: fit-content;
}
.textarea {
  max-width: 725px;
}
</style>
