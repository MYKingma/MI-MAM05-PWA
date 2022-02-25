<template>
  <el-row justify="space-between">
    <el-col :span="12"><h3>Additional questions</h3></el-col>
    <el-col class="to-right" :span="12"
      ><PhaseToolbar
        @move-up="$emit('moveUp')"
        @move-down="$emit('moveDown')"
        @delete-phase="$emit('deletePhase')"
        :index="phaseIndex"
        :length="value.phases.length"
    /></el-col>
  </el-row>
  <el-form @submit.prevent label-position="top">
    <el-form-item label="Important additional questions">
      <el-tag
        v-for="tag in value.phases[phaseIndex].answer"
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
        + Add additional question
      </el-button>
    </el-form-item>
    <el-form-item label="Answers on questions from patient">
      <el-input
        v-model="value.phases[phaseIndex].outcome.text"
        type="textarea"
        class="textarea"
        autosize
        resize="none"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import PhaseToolbar from "./PhaseToolbar.vue";
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
  components: {
    PhaseToolbar,
  },
  mounted() {},
  emits: ["deletePhase", "moveUp", "moveDown"],
  methods: {
    handleClose(tag) {
      this.value.phases[this.phaseIndex].answer.splice(
        this.value.phases[this.phaseIndex].answer.indexOf(tag),
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
        this.value.phases[this.phaseIndex].answer.push(tagValue);
      }
      this.showTagInput = false;
      this.tagValue = "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.to-right {
  max-width: fit-content;
}
.textarea {
  max-width: 725px;
}
</style>
