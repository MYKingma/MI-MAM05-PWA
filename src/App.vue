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
        <el-button @click="$router.push('/overview')">Overviewpage</el-button>
        <el-button @click="$router.push('/physician/case/edit')"
          >Editpage</el-button
        >
        <el-button @click="$router.push('/case')">CasePage</el-button>
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
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </el-container>
  <el-footer></el-footer>
</template>

<script>
import { mapGetters } from "vuex";
import { logOut } from "./firebase";
// import { subscibeToNotifications, sendNotification } from "./firebase";

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
    // test() {
    //   subscibeToNotifications("TEST");
    // },
    // send() {
    //   sendNotification(
    //     "TEST",
    //     "Test bericht",
    //     "Hoi, dit is een test",
    //     "https://mi-mam05.netlify.app"
    //   );
    // },
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/base.css";
.home-header {
  padding: 10px;
  border-bottom: 1px solid lightgrey;
  background-color: white;
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
