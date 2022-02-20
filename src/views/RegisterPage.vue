<template>
  <el-main>
    <h1>Register</h1>
    <el-form>
      <el-form-item label="Name">
        <el-input v-model="newUser.name"></el-input>
      </el-form-item>
      <el-form-item label="E-mail">
        <el-input v-model="newUser.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="newUser.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Role">
        <el-radio-group v-model="newUser.role">
          <el-radio
            v-for="role in roles"
            :label="role.name"
            :key="role.id"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Create</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { register } from "../firebase";
import { getData } from "../db";
export default {
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        role: "",
      },
      roles: [],
    };
  },
  computed: {},
  async mounted() {
    this.roles = await getData("roles");
  },
  methods: {
    async register() {
      register(this.newUser);
      this.newUser = {
        email: "",
        password: "",
        role: "",
        name: "",
      };
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
