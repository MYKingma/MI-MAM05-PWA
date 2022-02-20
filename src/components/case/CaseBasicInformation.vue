<template>
  <el-form>
    <el-form-item label="Specialism">
      <el-select v-model="value.caseData.specialism">
        <el-option
          v-for="item in value.specialisms"
          :label="item.name"
          :value="item.name"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Main problem">
      <el-input v-model="value.caseData.mainProblem"></el-input>
    </el-form-item>
    <el-form-item label="Introduction">
      <el-input
        v-model="value.caseData.introduction"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item label="Date">
      <el-date-picker
        v-model="value.caseData.date"
        type="date"
      ></el-date-picker>
    </el-form-item>
    <h2>Patient information</h2>
    <el-form-item label="Gender">
      <el-select v-model="value.caseData.patient.gender">
        <el-option
          v-for="item in value.genders"
          :label="item"
          :key="item.id"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Age">
      <el-input v-model="value.caseData.patient.age" type="number"></el-input>
    </el-form-item>
    <el-form-item label="Etnicity">
      <el-input v-model="value.caseData.patient.ethnicity"></el-input>
    </el-form-item>
    <el-form-item label="Medical history">
      <el-tag
        v-for="tag in value.caseData.patient.medicalHistory"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose('medicalHistory', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.medicalHistory"
        id="medicalHistoryTag"
        v-model="tagValue['medicalHistory']"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm('medicalHistory')"
        @blur="handleInputConfirm('medicalHistory')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput('medicalHistory')"
      >
        + Add field
      </el-button>
    </el-form-item>
    <el-form-item label="Medication">
      <el-tag
        v-for="tag in value.caseData.patient.medication"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose('medication', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.medication"
        id="medicationTag"
        v-model="tagValue['medication']"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm('medication')"
        @blur="handleInputConfirm('medication')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput('medication')"
      >
        + Add field
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
  mounted() {},
  methods: {
    handleClose(type, tag) {
      this.value.caseData.patient[type].splice(
        this.value.caseData.patient[type].indexOf(tag),
        1
      );
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
        this.value.caseData.patient[type].push(tagValue);
      }
      this.showTagInput[type] = false;
      this.tagValue[type] = "";
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
