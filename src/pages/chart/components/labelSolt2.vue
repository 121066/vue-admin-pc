<template>
  <div class="list">
    <div class="list_title">{{ node.text }}</div>
    <div
      class="list_item"
      v-for="item in node.data.props || []"
      :key="item.text"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'labelSolt2',
  components: {},
  props: {
    node: {
      mustUseProp: true,
      default: null,
      type: Object
    }
  },
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.list {
  width: 150px;
  font-size: 12px;
  .list_title {
    height: 32px;
    line-height: 32px;
    padding-left: 12px;
  }
  .list_item {
    height: 28px;
    line-height: 28px;
    padding-left: 12px;
  }
}
</style>