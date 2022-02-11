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
      </div>
    </el-row>
  </el-affix>
  <el-container>
    <Transition>
      <RouterView />
    </Transition>
  </el-container>
  <el-footer></el-footer>
</template>

<script>
import "element-plus/theme-chalk/display.css";
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
