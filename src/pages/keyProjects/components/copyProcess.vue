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
      <span slot="title" class="addDialogTitle">进展查看</span>
      <div v-if="gridData.length > 0">
        <div v-for="(item, index) in gridData" :key="index" class="list">
          <div class="list_top">
            <span class="list_top_s">{{ item.createTime }} 更新 :</span>
            <span class="list_top_f" @click="setCopy(item)">复制</span>
          </div>
          <div class="list_bottom">{{ item.content }}</div>
        </div>
      </div>
      <div v-else class="notyet">暂无数据</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Copy } from '@/utils/keyproject'
import { projectProgress } from '@/api/keyproject'
export default {
  name: 'Copy',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      projectId: this.$route.query.projectId,
      gridData: [],
    }
  },
  methods: {
    async open(val) {
      if (!val) return
      const { data } = await projectProgress({ projectId: val })
      this.gridData = data
    },
    handleClose() {
      this.$emit('input', false)
    },
    setCopy({ content }) {
      if (!content) return
      const val = Copy(content || '')
      if (val) {
        this.$message.success('复制成功')
      } else {
        this.$message.warning('复制失败')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/style/variables.scss';
.addDialog {
  .addDialogTitle {
    background: $themebg;
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
.notyet {
  color: #909399;
  padding-top: 25px;
  text-align: center;
}
.list {
  padding: 0 25px;
  max-height: 500px;
  overflow: hidden;
  .list_top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: $themebg;
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 15px;
    .list_top_f {
      cursor: pointer;
    }
    .list_top_s {
      position: relative;
    }
    .list_top_s::after {
      position: absolute;
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: $themebg;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
