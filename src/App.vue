<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  deleted() {
    window.onresize = null
  },
  methods: {
    handleScreen() {
      const w = 1920
      const h = 960
      const scale =
        document.documentElement.clientWidth /
          document.documentElement.clientHeight <
        w / h
          ? document.documentElement.clientWidth / w
          : document.documentElement.clientHeight / h
      //缩放比例
      document.querySelector(
        '#app'
      ).style.transform = `scale(${scale}) translate(-50%)`
    },
  },
  mounted() {
    // this.handleScreen()
    // window.onresize = () => this.handleScreen()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  /* margin-top: 60px; */
}
</style>
