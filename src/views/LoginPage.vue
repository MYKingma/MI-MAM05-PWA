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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  computed: {},
  mounted() {},
  methods: {
    async login() {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          this.loginUser.email,
          this.loginUser.password
        );
        this.loginUser.email = null;
        this.loginUser.password = null;
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            this.errorMessage = "Invalid email";
            break;
          case "auth/user-not-found":
            this.errorMessage = "No account with that email was found";
            break;
          case "auth/wrong-password":
            this.errorMessage = "Incorrect password";
            break;
          default:
            this.errorMessage = "Email or password was incorrect";
            break;
        }
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
