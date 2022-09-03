<template>
  <div class="month">
    <div class="item">1月完成投资额</div>
    <div class="item">2月完成投资额</div>
    <div class="item">3月完成投资额</div>
    <div class="item">4月完成投资额</div>
    <div class="item">5月完成投资额</div>
    <div class="item">6月完成投资额</div>
    <div class="item">
      <el-input v-model="addForm.january" type="number" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.february" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.march" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.april" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.may" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.june" :disabled="disabled" />
    </div>
    <div class="item">7月完成投资额</div>
    <div class="item">8月完成投资额</div>
    <div class="item">9月完成投资额</div>
    <div class="item">10月完成投资额</div>
    <div class="item">11月完成投资额</div>
    <div class="item">12月完成投资额</div>
    <div class="item">
      <el-input v-model="addForm.july" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.august" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.september" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.october" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.november" :disabled="disabled" />
    </div>
    <div class="item">
      <el-input v-model="addForm.december" :disabled="disabled" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: {
        january: '', // 一月完成投资额
        february: '', // 二月完成投资额
        march: '', // 三月完成投资额
        april: '', // 四月完成投资额
        may: '', // 五月完成投资额
        june: '', // 六月完成投资额
        july: '', // 七月完成投资额
        august: '', // 八月完成投资额
        september: '', // 九月完成投资额
        october: '', // 十月完成投资额
        november: '', // 十一月完成投资额
        december: '' // 十二月完成投资额
      }
    }
  },
  methods: {
    setEliminate() {
      this.addForm = {}
    },
    detail(val) {
      this.addForm = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .month {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-items: flex-start;
    border: 1px solid #dcdfe6;
    border-right: none;
    border-bottom: none;
    box-sizing: border-box;
    .item {
      height: 40px;
      line-height: 40px;
      width: 16.66%;
      text-align: center;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      padding: 1px;
      font-size: 12px;
      color: #333;
      font-weight: 500;
    }
  }
  ::v-deep .el-input__inner {
    border: none;
    text-align: center;
  }
</style>
