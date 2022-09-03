<template>
  <div class="node">
    <el-form
      ref="addForm"
      :model="addForm"
      :label-position="'left'"
      label-width="180px"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="签约时间:">
            <el-date-picker
              v-model="addForm.signingTime"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择签约时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拿地时间:">
            <el-date-picker
              v-model="addForm.landAcquisitionTime"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择拿地时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="领取施工许可证时间:">
            <el-date-picker
              v-model="addForm.obtainConstructionPermitTime"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择领取施工许可证时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="竣工时间:">
            <el-date-picker
              v-model="addForm.completionTime"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择竣工时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投产时间:">
            <el-date-picker
              v-model="addForm.productionTime"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择投产时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="列统入库时间:">
            <el-date-picker
              v-model="addForm.includeTime"
              style="width: 100%"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择入库时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { nodeInfoObj } from '@/common/keyproject'
export default {
  data() {
    return {
      addForm: {
        // signingTime: '', // 签约时间
        // landAcquisitionTime: '', // 拿地时间
        // obtainConstructionPermitTime: '', // 领取施工许可证时间
        // completionTime: '', // 竣工时间
        // productionTime: '', // 投产时间
        // includeTime: '' // 入库时间
        ...nodeInfoObj
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
  .node {
    margin-top: 15px;
  }
</style>
