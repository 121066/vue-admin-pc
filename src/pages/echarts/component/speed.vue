<template>
  <div class="speed">
    <div
      class="item animate__bounceInLeft"
      :style="{ width: `${item.speed}%`, background: `${item.color}` }"
    ></div>
    <div class="title">入驻率{{ item.speed }}%</div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import './animation.scss';
.speed {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-bottom: 1px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  background: #11519a;
  position: relative;

  overflow: hidden;
}
.item {
  height: 100%;
  transition: width ease-out 0.3s;
  // animation: design 1s ease-out;
  // animation-iteration-count: 1;
  // animation: animate__bounceInLeft 1s ease-out;
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
@keyframes design {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
