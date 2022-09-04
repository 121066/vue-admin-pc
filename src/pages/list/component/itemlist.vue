<template>
  <div class="scroll">
    <div
      :class="len === 1 ? 'item_list' : 'item_list am'"
      :style="{ top: top }"
    >
      <div
        class="item"
        v-for="(item, index) in dataList"
        :key="index"
        @mouseleave="move"
        @mouseenter="seup"
        @mousemove="moves"
      >
        我的{{ item.name }} 点赞{{ item.id }}
      </div>
    </div>
  </div>
</template>
<script>
function throttle(time, fn) {
  let times = null
  return function () {
    let that = this
    let ars = arguments
    if (times) {
      clearTimeout(times)
    }
    times = setTimeout(() => {
      times = null
      fn.apply(that, ars)
    }, time)
  }
}
export default {
  name: 'itemlist',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      len: 1,
      time: null,
    }
  },
  computed: {
    dataList() {
      return JSON.parse(JSON.stringify(this.data))
    },
    top() {
      return -this.len * 45 + 'px'
    },
  },
  methods: {
    moves: throttle(1500, function () {
      this.setTop()
    }),
    move(e) {},
    seup(e) {},
    setTop() {},
    getScorll() {
      this.time = setInterval(() => {
        if (this.dataList.length - 1 > this.len) {
          this.len++
        } else {
          this.len = 1
        }
      }, 1500)
    },
  },
  mounted() {
    this.getScorll()
  },
}
</script>
<style lang="scss" scoped>
.scroll {
  // flex: 1;
  width: 50%;
  height: 300px;
  // overflow: auto;
  margin: 0 auto;
  border: 1px solid #fff;
  padding: 0 10px;
  position: relative;
  overflow-x: auto;
  overflow-y: auto;
  .item_list {
    position: absolute;
    top: -100px;
    width: 100%;
  }
  .am {
    transition: all ease-out 0.3s;
  }
  .item {
    height: 45px;
    line-height: 45px;
    font-size: 13px;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .item:hover {
    background: #eee;
    color: #19197d;
  }
}
</style>
