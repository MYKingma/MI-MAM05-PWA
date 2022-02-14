<template>
  <el-main>
    <h1>Log in</h1>
    <el-form>
      <el-form-item label="E-mail">
        <el-input v-model="loginUser.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="loginUser.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">Log in</el-button>
      </el-form-item>
    </el-form>
    <div>{{ errorMessage }}</div>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { logIn } from "../firebase";
export default {
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {},
  methods: {
    async login() {
      this.errorMessage = await logIn(this.loginUser);
    },
  },
  watch: {
    user() {
      if (this.user.uid) {
        this.$router.push("/overview");
      }
    },
  },
};
</script>

<style lang="scss"></style>
