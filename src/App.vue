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
      <div>
        <!-- <el-button @click="$router.push('/')">Home</el-button> -->
        <!-- <el-button @click="$router.push('/admin')">Admin</el-button> -->
        <!-- <el-button @click="$router.push('/student')">Student</el-button> -->
        <!-- <el-button @click="$router.push('/physician')">Phisician</el-button> -->
      </div>
      <!-- <p>
        Logged in user: {{ user.name || "null" }}, <br />
        Role:
        {{ user.role || "null" }}
      </p> -->
      <div>
        <el-button @click="test">TEST</el-button>
        <el-button @click="$router.push('/physician/case/edit')"
          >Editpage</el-button
        >
        <el-button v-if="!user.name" @click="$router.push('/register')"
          >Register</el-button
        >
        <el-button v-if="!user.name" @click="$router.push('/login')"
          >Log in</el-button
        >
        <el-button v-if="user.name" @click="logOut">Log out</el-button>
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
import { mapGetters } from "vuex";
import { logOut } from "./firebase";
import axios from "axios";

export default {
  data() {
    return {
      auth: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {},
  methods: {
    logOut() {
      logOut();
    },
    async test() {
      const img = await axios.get(
        "https://firebasestorage.googleapis.com/v0/b/mi-mam05-pwa.appspot.com/o/images%2F1644808590701_2646065.png?alt=media&token=dd687448-f2e2-4dc9-bfd2-7547636bea63",
        {
          headers: {
            accept:
              "image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5",
          },
        }
      );
      console.log(img);
    },
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
