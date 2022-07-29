<template>
  <div class="app-header">
    <div class="header">
      <div class="header_left">
        <div class="left">
          <i @click="getSide" v-if="sidebar" class="el-icon-d-arrow-left"></i>
          <i @click="getSide" v-else class="el-icon-d-arrow-right"></i>
        </div>
        <div class="right">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in matched" :key="index">
              <span v-if="item.redirect==='noRedirect'||index==matched.length-1">{{item.meta.title}}</span>
              <span v-else @click="goPath(item)" :class="$route.fullPath===item.path?'active':''">{{item.meta.title}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="header_right"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import pathToRegexp from 'path-to-regexp'
export default {
  computed: {
    ...mapGetters(['sidebar'])
  },
  data() {
    return {
      matched: []
    }
  },
  watch: {
    $route(route) {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
    console.log(this.sidebar, 'sidebar')
  },
  methods: {
    ...mapActions('sidebar', ['toggleSidebar']),
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // if (matched.length <= 0) {
      //   matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      // }
      this.matched = matched
      console.log(this.$route, '页面')
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    //关闭打开侧边栏
    getSide() {
      this.toggleSidebar()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    goPath(item) {
      console.log(item.path, this.matched)
      if (this.$route.fullPath === item.path && item.path === this.matched[0].path) {
        return
      }
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>
<style scoped>
.app-header {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  line-height: 50px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.header_left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
}
.right {
  margin-left: 10px;
}
.right span {
  cursor: pointer;
}
.right span:hover {
  color: rgb(64, 158, 255);
}
.active {
  color: #ccc;
}
</style>