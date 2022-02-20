<template>
  <el-main>
    <h1>Case</h1>
    <el-form>
      <el-form-item label="Specialism">
        <el-select v-model="mockData.specialisms">
          <el-option
            v-for="item in specialisms"
            :label="item.value"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Main problem">
        <el-input v-model="mockData.mainProblem"></el-input>
      </el-form-item>
      <el-form-item label="Introduction">
        <el-input v-model="mockData.introduction" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker v-model="mockData.date" type="date"></el-date-picker>
      </el-form-item>
      <h2>Patient information</h2>
      <el-form-item label="Gender">
        <el-select v-model="mockData.gender">
          <el-option
            v-for="item in genders"
            :label="item.value"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Age">
        <el-input v-model="mockData.age" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Etnicity">
        <el-input v-model="mockData.etnicity"></el-input>
      </el-form-item>
      <el-form-item label="Medical history">
        <el-tag class="mx-1" closable :disable-transitions="false" @close=""
          >Exm tag</el-tag
        >
        <el-input v-model="" @keyup.enter="" @blur=""></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
      </el-form-item>
      <el-form-item label="Medication">
        <el-tag class="mx-1" closable :disable-transitions="false" @close=""
          >Exm tag</el-tag
        >
        <el-input v-model="" @keyup.enter="" @blur=""></el-input>
        <el-button class="button-new-tag ml-1" @click="">
          + Add field
        </el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import mockData from "../../mockdata.json";
export default {
  props: {},
  data() {
    return {
      mockData: {
        specialism: "",
        mainProblem: "",
        introduction: "",
        date: null,
        gender: "",
        age: null,
        etnicity: "",
        medicalHistory: [],
        medication: [],
      },
      specialisms: [],
      genders: [],
    };
  },
  computed: {},
  mounted() {
    this.mockData = mockData;
    this.specialisms = [
      { value: "Dermatology" },
      { value: "Emergency department" },
      { value: "Family medicine" },
    ];
    this.genders = [{ value: "Male" }, { value: "Female" }];
  },
  methods: {},
  watch: {},
};
</script>

<style lang="scss"></style>
