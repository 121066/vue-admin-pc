<template>
  <div class="main">
    <div
      class="main_face"
      v-for="item in data"
      :key="item.id"
      v-bind:style="{
        left: item.location.x + 'px',
        top: item.location.y + 'px',
        transform: `scale(${item.scale})`,
      }"
    >
      <span>{{ genderText[item.gender] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'adduser',
  data () {
    return {
      genderText: { 1: '男', 2: '女' },
      data: [{ id: 1, gender: 1, scale: 1, location: { x: 12, y: 33 } },
      { id: 2, gender: 2, scale: 0.8, location: { x: 122, y: 33 } },
      { id: 3, gender: 2, scale: 0.9, location: { x: 246, y: 63 } },
      { id: 4, gender: 1, scale: 1, location: { x: 456, y: 33 } },
      { id: 5, gender: 2, scale: 1.1, location: { x: 569, y: 33 } },
      { id: 6, gender: 1, scale: 1, location: { x: 136, y: 200 } },
      { id: 7, gender: 1, scale: 1.2, location: { x: 456, y: 200 } },]
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: aqua;
}
.main_face {
  position: absolute;
  width: 100px;
  height: 150px;
  border: 2px solid red;
}
</style>
