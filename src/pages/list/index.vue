<template>
  <div class="project">
    <div class="main" style="width: 100%">
      <itemList :data="dataList" style="width: 30%"> </itemList>
      <itemList2 class="box" :speed="0.5" id="box" :scrollHieght="scrollHieght">
        <div class="list">
          <div class="item" v-for="(item, index) in dataList" :key="index">
            我的{{ item.name }} 点赞{{ item.id }}
          </div>
        </div>
      </itemList2>
    </div>
  </div>
</template>
<script>
import itemList from './component/itemlist.vue'
import itemList2 from './component/itemlist2.vue'
export default {
  components: {
    itemList,
    itemList2,
  },
  name: 'list',
  data() {
    return {
      len: 1,
      time: null,
      scrollHieght: 0,
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
  },
  methods: {},
  mounted() {
    // this.handleScreen()
    // window.onresize = () => this.handleScreen()
    let box = document.querySelector('#box')
    box.addEventListener('scroll', function (e) {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      // console.log(scrollTop, '//滚动距离')
      init(scrollTop)
    })
    let that = this
    const init = shake(function (e) {
      console.log('来了', e)
      // that.scrollHieght = e
    }, 3000)
    function throttle(func, wait) {
      let previous = 0
      return function () {
        const now = Date.now()
        const context = this
        const args = arguments
        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
      }
    }
    function shake(fn, delay) {
      let timeout
      return function () {
        // 重新计时
        timeout && clearTimeout(timeout)
        timeout = setTimeout(fn.bind(this), delay, ...arguments)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.project {
  padding: 15px;
  /* margin: 35px 15px; */
  // background: #0000cd;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.box {
  height: 300px;
  overflow: hidden;
  overflow-y: auto;
}
.list {
  padding: 0 10px;
  width: 300px;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      background-color: #95a5a6;
    }
  }
}
// ::-webkit-scrollbar {
//   display: none;
// }
</style>
