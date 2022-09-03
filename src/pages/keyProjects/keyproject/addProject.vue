<template>
  <div class="wd">
    <!-- 基本信息 -->
    <cartTitle :title="'基本信息'" class="cart_title">
      <div v-if="typeinten" class="tips">
        <i class="el-icon-warning-outline" />
        请完善项目信息后，再转入重点项目库
      </div>
      <div class="handel_btn">
        <span v-if="type === 'add'">
          {{ saveFlag ? `${seconds}秒后内容自动保存` : '内容已自动保存' }}
        </span>
        <el-button
          v-if="type === 'add'"
          type="primary"
          size="small"
          icon="el-icon-delete"
          @click="setEliminate"
        >
          清除
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
      <basicInfo ref="basicInfo" />
    </cartTitle>
    <!-- 投资信息 -->
    <cartTitle :title="'投资信息及项目计划'" :tips="'(单位:万元)'">
      <caitalInfo ref="caitalInfo" />
    </cartTitle>
    <!-- 项目节点完成信息 -->
    <cartTitle v-if="nodeInfoShow" :title="'项目节点完成时间'">
      <nodeInfo ref="nodeInfo" />
    </cartTitle>
    <div class="add_btn">
      <el-button type="primary" :loading="isLoading" @click="submit">
        {{ btnText[type] }}
      </el-button>
      <el-button type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import cartTitle from './components/cardTitle.vue'
import basicInfo from './components/basicInfo.vue'
import caitalInfo from './components/capitalInfo.vue'
import nodeInfo from './components/NodeInfo.vue'
import { addProject, seeDetail } from '@/api/keyproject'
import {
  basicInfoObj,
  capitalInfoObj,
  monthObj,
  nodeInfoObj
} from '@/common/keyproject'
import { handleEcho } from '@/utils/keyproject'
export default {
  components: { cartTitle, basicInfo, caitalInfo, nodeInfo },
  data() {
    return {
      isLoading: false,
      projectId: this.$route.query.projectId || null,
      majorIntentionCategory: this.$route.query.majorIntentionCategory || 1,
      typeinten: this.$route.query.typeinten || '',
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
      saveFlag: false
    }
  },
  computed: {
    nodeInfoShow() {
      return this.majorIntentionCategory === 1
    }
  },
  created() {
    const saveObj = localStorage.getItem('saveObj') || ''
    if (this.projectId) {
      this.seeDetail()
      this.type = 'edit'
    } else if (saveObj) {
      this.$nextTick(() => {
        this.echoData(JSON.parse(saveObj))
      })
    } else {
      this.autoSave()
    }
  },
  beforeDestroy() {
    clearInterval(this.saveTime)
  },
  methods: {
    // 清除数据
    setEliminate() {
      this.$refs.basicInfo.setEliminate()
      this.$refs.caitalInfo.setEliminate()
      this.nodeInfoShow ? this.$refs.nodeInfo.setEliminate() : ''
    },
    // 保存提交
    async submit() {
      this.$refs.caitalInfo.createdData()
      const r = this.$refs.basicInfo.verify()
      const r1 = this.$refs.caitalInfo.verify()
      // 基本信息
      const basicInfo = this.$refs.basicInfo.addForm
      // 投资计划信息
      // const caitalInfo = this.$refs.caitalInfo.addForm
      const projectCycleInfoPlanList =
          this.$refs.caitalInfo.projectCycleInfoPlanList
      const planList = []
      for (const key in projectCycleInfoPlanList) {
        if (projectCycleInfoPlanList[key]['projectCycleYear']) {
          planList.push(projectCycleInfoPlanList[key])
        }
      }
      // 项目节点完成时间
      const nodeInfo = this.nodeInfoShow ? this.$refs.nodeInfo.addForm : {}
      // return
      try {
        Promise.all([r, r1])
          .then(async() => {
            this.isLoading = !this.isLoading
            const data = {
              projectId: this.projectId,
              ...basicInfo,
              projectCycleInfoPlanList: planList,
              ...nodeInfo,
              majorIntentionCategory: this.majorIntentionCategory // 1是重点2是意向
            }
            console.log(data, '添加的参数')
            const res = await addProject(data)
            if (res.code === 0) {
              this.$message.success(`${this.msg[this.type]}成功`)
              this.type === 'add' ? localStorage.removeItem('saveObj') : ''
              this.nodeInfoShow
                ? this.$router.push('/keyproject')
                : this.$router.push('/keyproject/intention')
            } else {
              this.$message.warning(res.msg)
            }
            this.isLoading = !this.isLoading
          })
          .catch(e => {
            this.$message.warning('请填写必填项')
          })
      } catch (e) {
        this.$message.warning('请填写必填项')
        console.log(e)
      }
      // console.log(basicInfo, '基本信息')
      // console.log(caitalInfo, '投资信息')
      // console.log(nodeInfo, '节点信息')
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
      this.echoData(obj)
    },
    // 基本信息&投资信息&项目节点完成时间回显
    echoData(obj) {
      this.$refs.basicInfo.detail(obj['basicInfo'])
      this.$refs.caitalInfo.detail(obj['capitalInfo'], obj['month'])
      this.nodeInfoShow ? this.$refs.nodeInfo.detail(obj['nodeInfo']) : ''
      this.$refs.caitalInfo.detailPlan(obj['planList'])
    },
    // 新增自动保存
    autoSave() {
      this.saveFlag = !this.saveFlag
      this.saveTime = setInterval(async() => {
        this.seconds--
        if (this.seconds <= 0) {
          this.saveFlag = !this.saveFlag
          clearInterval(this.saveTime)
          this.$message.success('内容以自动保存')
          this.$refs.caitalInfo.createdData()
          // 基本信息
          const basicInfo = this.$refs.basicInfo.addForm
          // 投资计划信息
          const capitalInfo = this.$refs.caitalInfo.addForm
          // 项目节点完成时间
          const nodeInfo = this.nodeInfoShow
            ? this.$refs.nodeInfo.addForm
            : {}
            // 投资信息数组
          const projectCycleInfoPlanList =
              this.$refs.caitalInfo.projectCycleInfoPlanList
          const planList = []
          for (const key in projectCycleInfoPlanList) {
            if (projectCycleInfoPlanList[key]['projectCycleYear']) {
              planList.push(projectCycleInfoPlanList[key])
            }
          }
          const month = await handleEcho(monthObj, capitalInfo)
          const obj = { basicInfo, capitalInfo, nodeInfo, month, planList }
          localStorage.setItem('saveObj', JSON.stringify(obj))
        }
      }, 1000)
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
  .tips {
    position: absolute;
    left: 35%;
    min-width: 500px;
    top: -15px;
    color: #ec808d;
    font-weight: 500;
  }
</style>
