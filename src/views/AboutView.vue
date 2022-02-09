<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="ui button">button</button>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this);
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
