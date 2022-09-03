<template>
  <div class="wd">
    <!-- 基本信息 -->
    <cartTitle :title="'基本信息'" class="cart_title">
      <div class="handel_btn">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-edit"
          @click="setEliminate"
        >
          更新
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-d-arrow-left"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
      </div>
      <basicInfos ref="basicInfo" />
    </cartTitle>
    <!-- 投资信息 -->
    <cartTitle :title="'投资信息及项目计划'" :tips="'(单位:万元)'">
      <caitalInfos ref="caitalInfo" />
    </cartTitle>
    <!-- 项目节点完成信息 -->
    <cartTitle v-if="nodeInfoShow" :title="'项目节点完成时间'">
      <!-- <nodeInfo ref="nodeInfo" /> -->
      <el-form :label-position="'left'" label-width="185px">
        <el-row :gutter="24">
          <div v-for="(val, key, index) in infoObj['nodeInfo']" :key="index">
            <el-col :span="12">
              <el-form-item>
                <label slot="label">{{ ruleList[key] }}:</label>
                <div class="value">{{ val }}</div>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </cartTitle>
    <historyDialog v-model="historyDialogShow" />
  </div>
</template>
<script>
import cartTitle from './components/cardTitle.vue'
import basicInfos from './components/basicInfos.vue'
import caitalInfos from './components/capitalInfos.vue'
import { seeDetail } from '@/api/keyproject'
import {
  basicInfoObj,
  capitalInfoObj,
  monthObj,
  nodeInfoObj,
  ruleList
} from '@/common/keyproject'
import historyDialog from './components/historyDialog.vue'
import { handleEcho } from '@/utils/keyproject'
export default {
  components: { cartTitle, basicInfos, caitalInfos, historyDialog },
  data() {
    return {
      isLoading: false,
      projectId: this.$route.query.projectId || null,
      majorIntentionCategory: this.$route.query.majorIntentionCategory || 1,
      msg: {
        add: '添加',
        edit: '更新'
      },
      btnText: {
        add: '提交',
        edit: '保存'
      },
      type: 'add',
      saveTime: null,
      seconds: 30,
      saveFlag: false,
      infoObj: {
        basicInfo: {},
        nodeInfo: {}
      },
      ruleList: ruleList,
      historyDialogShow: false
    }
  },
  computed: {
    nodeInfoShow() {
      return this.majorIntentionCategory === 1
    }
  },
  created() {
    this.seeDetail()
  },
  methods: {
    // 更新
    setEliminate() {
      this.$router.push({
        path: '/keyproject/editproject',
        query: {
          projectId: this.projectId,
          majorIntentionCategory: this.majorIntentionCategory
        }
      })
    },
    // 获取详情
    async seeDetail() {
      const { data } = await seeDetail({ projectId: this.projectId })
      const basicInfo = await handleEcho(basicInfoObj, data)
      const capitalInfo = await handleEcho(
        capitalInfoObj,
        data.projectCycleInfoPlanList[0]
      )
      const month = await handleEcho(
        monthObj,
        data.projectCycleInfoPlanList[0]
      )
      const planList = data.projectCycleInfoPlanList

      const nodeInfo = this.nodeInfoShow
        ? await handleEcho(nodeInfoObj, data)
        : {}
      const obj = { basicInfo, capitalInfo, nodeInfo, month, planList }
      this.infoObj = obj
      this.echoData(obj)
    },
    // 基本信息&投资信息&项目节点完成时间回显
    echoData(obj) {
      this.$refs.basicInfo.detail(obj['basicInfo'])
      this.$refs.caitalInfo.detail(obj['capitalInfo'], obj['month'])
      // this.$refs.nodeInfo.detail(obj['nodeInfo'])
      this.$refs.caitalInfo.detailPlan(obj['planList'])
    },
    // 历史进展
    getHistory() {
      this.historyDialogShow = !this.historyDialogShow
    }
  }
}
</script>
<style lang="scss" scoped>
  .add_btn {
    text-align: center;
    .el-button {
      margin: 0 15px;
    }
  }
  .cart_title {
    position: relative;
  }
  .handel_btn {
    position: absolute;
    right: 140px;
    top: -10px;
    span {
      color: #ccc;
      font-size: 13px;
      font-weight: 500;
      margin-right: 10px;
    }
  }
  .value {
    text-align: left;
  }
  .info {
    margin: 15px 0;
  }
  .progress {
    position: relative;
  }
  .history {
    left: 0;
    position: absolute;
  }
</style>
