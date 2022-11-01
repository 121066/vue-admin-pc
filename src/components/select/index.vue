<template>
  <div class="active">
    <el-select
      v-model="streetId"
      :popper-append-to-body="false"
      class="active_select"
      @change="change"
    >
      <template slot="prefix">
        {{ (optins.find((v) => v.id === streetId) || {}).name }}
      </template>
      <el-option
        v-for="item in optins"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    optins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      streetId: '',
    }
  },
  methods: {
    change(e) {
      this.$emit('onChange', e)
    },
  },
}
</script>
<style lang="scss" scoped>
.active {
  z-index: 10;
}
// ::v-deep .el-input--medium .el-input__inner {
//   background-color: #1c3688;
//   border-color: #2065df;
// }
.active_select {
  // position: relative;
  min-width: 120px;
  color: #fff;
}
::v-deep .el-input__prefix {
  box-sizing: border-box;
  height: 38px;
  line-height: 38px;
  padding: 0 35px;
  visibility: hidden;
  position: relative;
  text-align: center;
}

::v-deep input {
  position: absolute;
  left: 0;
}
// .active_select >>> .el-input__inner {
//   color: #7d97f9 !important;
// }
// ::v-deep .el-select-dropdown {
//   border: none;
//   color: #fff;
// }
</style>
