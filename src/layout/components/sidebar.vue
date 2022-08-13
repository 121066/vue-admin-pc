<template>
  <div
    class="sidebar"
    :class="classObj"
    :style="{ width: sidebar ? '54px' : '200px' }"
  >
    <!-- logo区域 -->
    <!-- :background-color="variables.menuBg"  -->
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        background-color="#304156"
        :default-active="activeMenu"
        :collapse="sidebar"
        text-color="#bfcbd9"
        :unique-opened="true"
        active-text-color="#409EFF"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in getRout"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Logo from './Logo.vue'
import sidebarItem from './sidebarItem.vue'
export default {
  components: {
    Logo,
    sidebarItem,
  },
  computed: {
    ...mapGetters(['getRout', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    classObj() {
      return {
        hideSidebar: this.sidebar,
      }
    },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    ...mapActions('permission', ['generateRoutes']),
  },
  created() {},
  mounted() {
    // console.log(this.router_s, '??路由')
  },
}
</script>
<style lang="scss" scoped>
// @import "@/style/sidebar.scss";
.opened {
  width: 200px !important;
}
.sidebar {
  transition: ease-in 0.28s;

  background-color: #304156;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
::v-deep .el-menu--collapse {
  width: 100%;
}
::v-deep .el-submenu {
  overflow: hidden;
}
::v-deep .el-menu {
  border: none;
}
</style>
