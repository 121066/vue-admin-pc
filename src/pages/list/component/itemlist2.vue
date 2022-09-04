<template>
   
  <div class="Scroll" ref="child">    <slot></slot>     <slot></slot>  </div>
</template>

<script>
export default {
  name: 'Scroll',
  created() {},
  mounted() {
    //在盒子内容高度小于可视高度时不滚动
    if (this.childHeight < this.child1.clientHeight) {
      this.start(this.height)
      this.setEvet()
    } else {
      this.isScrollShow = false
    }
  },
  props: {
    speed: {
      default: 1,
      type: Number,
    },
  },
  computed: {
    //第一个slot
    child1() {
      return this.$refs.child.children[0]
    }, //第二个slot
    child2() {
      return this.$refs.child.children[1]
    }, //盒子的可视高度
    childHeight() {
      return this.$refs.child.clientHeight
    },
  },
  data() {
    return {
      height: 0,
      isScrollShow: true,
    }
  },
  methods: {
    //鼠标移入停止滚动 移出继续滚动
    setEvet() {
      this.$refs.child.onmouseenter = () => {
        this.isScrollShow = false // this.height = 0;
      }
      this.$refs.child.onmouseleave = () => {
        this.isScrollShow = true
        this.$nextTick(() => {
          this.start(this.height)
        })
      }
    }, //滚动方法
    start(height) {
      this.child1.style = `transform:translateY(-${height}px);`
      this.child2.style = `height:${this.childHeight}px;transform:translateY(-${height}px);overflow: hidden;`
      if (height >= this.child1.clientHeight) {
        this.height = 0
      } else {
        this.height += this.speed
      }
      if (!this.isScrollShow) return
      window.requestAnimationFrame(() => {
        this.start(this.height)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
