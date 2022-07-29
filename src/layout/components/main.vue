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
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>