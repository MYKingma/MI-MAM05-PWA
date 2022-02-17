<template>
  <el-main>
    <h1>Case</h1>
    <el-form>
      <el-form-item label="Specialism">
        <el-select v-model="value.case.specialism">
          <el-option
            v-for="item in value.specialisms"
            :label="item.name"
            :value="item.name"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Main problem">
        <el-input v-model="value.case.mainProblem"></el-input>
      </el-form-item>
      <el-form-item label="Introduction">
        <el-input v-model="value.case.introduction" type="textarea"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Date">
        <el-date-picker v-model="value.case.date" type="date"></el-date-picker>
      </el-form-item> -->
      <h2>Patient information</h2>
      <el-form-item label="Gender">
        <el-select v-model="value.case.patient.gender">
          <el-option
            v-for="item in value.genders"
            :label="item"
            :key="item.id"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Age">
        <el-input v-model="value.case.patient.age" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Etnicity">
        <el-input v-model="value.case.patient.etnicity"></el-input>
      </el-form-item>
      <el-form-item label="Medical history">
        <el-tag
          v-for="tag in value.case.patient.medicalHistory"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          >{{ tag }}</el-tag
        >
        <el-input
          v-if="showMedHisInput"
          id="medHisTag"
          v-model="medHisTagValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + Add field
        </el-button>
      </el-form-item>
      <!-- <el-form-item label="Medication">
        <el-tag class="mx-1" closable :disable-transitions="false" @close=""
          >Exm tag</el-tag
        >
        <el-input v-model="" @keyup.enter="" @blur=""></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
      </el-form-item> -->
    </el-form>
  </el-main>
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
      showMedHisInput: false,
      medHisTagValue: "",
      dynamicTags: ["Een", "twee", "drie"],
    };
  },
  mounted() {
    // this.mockData = mockData
    // this.specialisms = [{value:"Dermatology"}, {value: "Emergency department"}, {value: "Family medicine"}]
    // this.genders = [{value:"Male"},{value:"Female"}]
  },
  methods: {
    handleClose(tag) {
      this.value.case.patient.medicalHistory.splice(
        this.value.case.patient.medicalHistory.indexOf(tag),
        1
      );
    },

    showInput() {
      this.showMedHisInput = true;
      this.$nextTick((_) => {
        document.getElementById("medHisTag").focus();
      });
    },

    handleInputConfirm() {
      let medHisTagValue = this.medHisTagValue;
      if (medHisTagValue) {
        this.value.case.patient.medicalHistory.push(medHisTagValue);
      }
      this.showMedHisInput = false;
      this.medHisTagValue = "";
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
