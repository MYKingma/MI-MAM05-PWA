<template>
  <!-- <el-menu
    mode="horizontal"
    @select="handleSelect"
    router
    active-text-color="green"
  >
    <el-menu-item index="/register">Register</el-menu-item>
    <el-menu-item index="/login">Log in</el-menu-item>
  </el-menu> -->
  <el-affix>
    <el-row class="home-header" justify="space-between" align="middle">
      <el-button @click="$router.push('/')">Home</el-button>
      <div>
        <el-button @click="$router.push('/register')">Register</el-button>
        <el-button @click="$router.push('/login')">Log in</el-button>
        <el-button @click="logOut">Log out</el-button>
      </div>
    </el-row>
  </el-affix>
  <el-container>
    <RouterView v-slot="{ Component }">
      <!-- <Transition> -->
      <component :is="Component" />
      <!-- </Transition> -->
    </RouterView>
  </el-container>
  <el-footer></el-footer>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, function (user) {
      if (user) {
        // TODO: vuex logged in
        console.log("IN");
        console.log(user);
      } else {
        // TODO: vuex logged out
        console.log("OUT");
      }
    });
  },
  methods: {
    async logOut() {},
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/base.css";
.home-header {
  padding: 10px;
  border: 1px solid green;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
