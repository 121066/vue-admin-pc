<template>
  <div class="project">
    <div class="scroll">
      <div
        :class="len === 10 ? 'item_list' : 'item_list am'"
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
  </div>
</template>
<script>
function throttle(time, fn) {
  console.log('1')
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
  name: 'project',
  data() {
    return {
      len: 1,
      time: null,
    }
  },
  computed: {
    dataList() {
      let list = []
      for (let index = 0; index < 30; index++) {
        list.push({ name: `${index}奥林老师`, id: index })
      }
      return list
    },
    top() {
      return -this.len * 45 + 'px'
    },
  },
  methods: {
    moves: throttle(1500, function () {
      this.setTop()
    }),
    move(e) {
      console.log('2')
      // this.getScorll()
      // throttle(1500, this.setTop)
    },
    seup(e) {
      console.log(e, '移除')
    },
    setTop() {
      console.log('来了', this.top)
    },
    getScorll() {
      this.time = setInterval(() => {
        this.len++
        if (this.dataList.length - 10 > this.len) {
          this.dataList.push(this.dataList[0])
          this.dataList.shift()
        } else {
          this.len = 10
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
.project {
  padding: 15px;
  /* margin: 35px 15px; */
  background: #0000cd;
  height: 100%;
  display: flex;
}
.scroll {
  flex: 1;
  /* width: 100%; */
  height: 400px;
  overflow: auto;
  margin: 0 auto;
  border: 1px solid #fff;
  padding: 0 10px;
  position: relative;
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
