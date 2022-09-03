<template>
  <div :class="widthShow ? 'card' : 'card d_center'">
    <div class="card_top">
      <div class="card_top_left">{{ title }}</div>
      <div class="card_top_right">{{ tips }}</div>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
    widthShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import '@/style/variables.scss';
.card {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin: 15px;
  .card_top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .card_top_left {
      color: #333;
      font-size: 16px;
      font-weight: 500;
      position: relative;
    }
    .card_top_left::after {
      position: absolute;
      content: '';
      left: -15px;
      width: 10px;
      height: 25px;
      top: -3px;
      background-color: $themebg;
      border-radius: 2px;
    }
    .card_top_right {
      color: #ccc;
      font-size: 12px;
      font-weight: 500;
      margin-left: 10px;
    }
  }
}
.d_center {
  text-align: center;
  padding: 0 140px;
}
</style>
