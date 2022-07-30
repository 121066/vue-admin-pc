<template>
  <div class="app-main">
    <transition>
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
<style scoped>
.app-main {
  padding: 20px;
  position: relative;
  overflow: hidden;
  /* min-height: calc(100vh- 50px);
   */
  height: 100%;
  background-color: #f0f2f5;
}
</style>