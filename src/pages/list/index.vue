<template>
  <div class="project">
    <div class="main" style="width: 100%">
      <itemList :data="dataList" style="width: 50%"> </itemList>
      <itemList2 class="box" :speed="0.5">
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
  mounted() {},
}
</script>
<style lang="scss" scoped>
.project {
  padding: 15px;
  /* margin: 35px 15px; */
  background: #0000cd;
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
</style>
