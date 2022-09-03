<template>
  <div>
    <el-dialog
      :visible.sync="value"
      center
      width="600px"
      class="addDialog"
      :before-close="handleClose"
      @open="open"
    >
      <span slot="title" class="addDialogTitle">历史进展</span>
      <el-table :data="gridData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="createTime" label="填报时间" width="180" />
        <el-table-column prop="content" label="内容" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { projectProgress } from '@/api/keyproject'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectId: this.$route.query.projectId,
      gridData: []
    }
  },
  methods: {
    async open() {
      const { data } = await projectProgress({ projectId: this.projectId })
      this.gridData = data
    },
    handleClose() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .addDialog {
    .addDialogTitle {
      background: #4768c2;
      font-size: 18px;
      font-weight: 900;
      color: white;
    }
  }
  ::v-deep {
    .el-dialog__header {
      background: #4768c2;
      // text-align: center;
    }
    .el-transfer-panel {
      width: 40%;
    }
  }
</style>
