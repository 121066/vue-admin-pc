<template>
  <div class="logo">
    <img src="https://dbyxs.xyz:3006/uploads/fae4e814a5d9510d10277ff78ea6dc12" alt="">
    <div class="pc_name">后台管理系统</div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style scoped>
.logo {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #2b2f3a;
  padding: 0 15px;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.pc_name {
  color: #fff;
  flex: 1;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
</style>