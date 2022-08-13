<template>
  <div class="wrapper">
    <div class="container" :class="classObj">
      <div
        class="sidebar-container"
        :style="{ width: sidebar ? '54px' : '200px' }"
      >
        <sidebar></sidebar>
      </div>
      <div class="main">
        <Header></Header>
        <Main> </Main>
      </div>
    </div>
  </div>
</template>
<script>
import Main from './components/main.vue'
import sidebar from './components/sidebar.vue'
import Header from './components/header.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sidebar']),
    classObj() {
      return {
        hideSidebar: this.sidebar,
      }
    },
  },
  components: {
    sidebar,
    Header,
    Main,
  },
  name: 'Layout',
  data() {
    return {}
  },
  created() {
    // console.log(this.$route, '路由模块')
  },
  watch: {
    $route(route) {},
  },
}
</script>
<style lang="scss" scoped>
@import '../style/sidebar.scss';
.wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.container {
  // min-height: calc(100vh - 84px);
  height: 100%;
  display: flex;
  flex-direction: row;
}
.sidebar {
}
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
}
::v-deep .el-header {
  padding: 0;
}
</style>
