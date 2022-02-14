<template>
  <el-main>
    <h1>User needs to verify email</h1>
    <p>Lands after login or register if email not verified</p>
    <el-button @click="resendEmailVerification">
      Resend email verification
    </el-button>
  </el-main>
</template>

<script>
import { resendEmailVerification } from "../firebase";
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    async resendEmailVerification() {
      await resendEmailVerification();
    },
  },
  watch: {},
};
</script>

<style lang="scss"></style>
