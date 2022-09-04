<template>
  <div class="echarts">
    <div class="list">
      <div v-for="(item, index) in dataList" :key="index" class="list_item">
        <speed :item="item"></speed>
        <el-button type="primary" size="mini" @click="add(item, index)"
          >点击+</el-button
        >
        <el-button type="primary" size="mini" @click="reduce(item, index)"
          >点击-</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import speed from './component/speed.vue'
export default {
  components: {
    speed,
  },
  data() {
    return {
      dataList: [
        { id: 1, speed: 50, color: 'red' },
        { id: 2, speed: 90, color: 'orange' },
        { id: 3, speed: 30, color: 'blue' },
        { id: 4, speed: 10, color: 'green' },
      ],
    }
  },
  methods: {
    add(item, index) {
      if (item.speed >= 100) return
      item.speed++
      this.$set(this.dataList, index, item)
    },
    reduce(item, index) {
      if (item.speed <= 0) return
      item.speed--
      this.$set(this.dataList, index, item)
    },
  },
}
</script>
<style lang="scss" scoped>
.echarts {
  .list {
    width: 500px;
    border: 1px solid #eee;
    height: 100%;
  }
}
.list_item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.el-button {
  margin: 1px 5px;
  height: 40px;
}
</style>
