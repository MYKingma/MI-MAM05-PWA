<template>
  <h3>Basic information</h3>
  <el-form @submit.prevent :inline="true" label-position="top">
    <el-form-item label="Specialism">
      <el-select class="input" v-model="value.specialism">
        <el-option
          v-for="item in specialisms"
          :label="item.name"
          :value="item.name"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Main problem">
      <el-input class="input" v-model="value.mainProblem"></el-input>
    </el-form-item>
    <el-form-item label="Date">
      <el-date-picker v-model="value.date" type="date"></el-date-picker>
    </el-form-item>
  </el-form>
  <el-form @submit.prevent label-position="top">
    <el-form-item label="Introduction">
      <el-input
        v-model="value.introduction"
        type="textarea"
        autosize
        resize="none"
        class="textarea"
      ></el-input>
    </el-form-item>
  </el-form>
  <h3>Patient information</h3>
  <el-form @submit.prevent :inline="true" label-position="top">
    <el-form-item label="Gender">
      <el-select class="input" v-model="value.patient.gender">
        <el-option
          v-for="item in genders"
          :label="item"
          :key="item.id"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Age">
      <el-input
        class="input"
        v-model="value.patient.age"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="Etnicity">
      <el-input class="input" v-model="value.patient.ethnicity"></el-input>
    </el-form-item>
  </el-form>
  <el-form @submit.prevent label-position="top">
    <el-form-item label="Medical history">
      <el-tag
        v-for="tag in value.patient.medicalHistory"
        :key="tag"
        class="mx-1 tag"
        closable
        :disable-transitions="false"
        @close="handleClose('medicalHistory', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.medicalHistory"
        id="medicalHistoryTag"
        v-model="tagValue['medicalHistory']"
        class="ml-1 w-20 tag-input"
        size="small"
        @keyup.enter="handleInputConfirm('medicalHistory')"
        @blur="handleInputConfirm('medicalHistory')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1 tag-button"
        size="small"
        @click="showInput('medicalHistory')"
      >
        + Add medical history
      </el-button>
    </el-form-item>
    <el-form-item label="Medication">
      <el-tag
        v-for="tag in value.patient.medication"
        :key="tag"
        class="mx-1 tag"
        closable
        :disable-transitions="false"
        @close="handleClose('medication', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.medication"
        id="medicationTag"
        v-model="tagValue['medication']"
        class="ml-1 w-20 tag-input"
        size="small"
        @keyup.enter="handleInputConfirm('medication')"
        @blur="handleInputConfirm('medication')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1 tag-button"
        size="small"
        @click="showInput('medication')"
      >
        + Add medication
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getData } from "../../../db";
export default {
  props: ["modelValue"],
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
  data() {
    return {
      genders: ["Male", "Female", "Other"],
      specialisms: [],
      showTagInput: {
        medicalHistory: false,
        medication: false,
      },
      tagValue: {
        history: "",
        medication: "",
      },
    };
  },
  async mounted() {
    this.specialisms = await getData("specialisms");
  },
  methods: {
    handleClose(type, tag) {
      this.value.patient[type].splice(this.value.patient[type].indexOf(tag), 1);
    },

    showInput(type) {
      this.showTagInput[type] = true;
      this.$nextTick(() => {
        document.getElementById(`${type}Tag`).focus();
      });
    },

    handleInputConfirm(type) {
      let tagValue = this.tagValue[type];
      if (tagValue) {
        this.value.patient[type].push(tagValue);
      }
      this.showTagInput[type] = false;
      this.tagValue[type] = "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.input {
  width: 220px;
}
.textarea {
  max-width: 725px;
}
</style>
