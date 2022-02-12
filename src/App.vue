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
        <el-button @click="$router.push('/')">Home</el-button>
        <el-button @click="$router.push('/admin')">Admin</el-button>
        <el-button @click="$router.push('/student')">Student</el-button>
        <el-button @click="$router.push('/physician')">Phisician</el-button>
      </div>
      <p>
        Logged in user: {{ user.name || "null" }}, <br />
        Role:
        {{ user.role || "null" }}
      </p>
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
import { getAuth, signOut } from "firebase/auth";
import { mapGetters } from "vuex";

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
  mounted() {
    this.auth = getAuth();
  },
  methods: {
    async logOut() {
      signOut(this.auth);
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
