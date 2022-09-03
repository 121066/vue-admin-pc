<template>
  <div class="project">
    <div style="width: 100%">
      <itemList :data="dataList"> </itemList>
    </div>
  </div>
</template>
<script>
import itemList from './component/itemlist.vue'
export default {
  components: {
    itemList,
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
}
</style>
