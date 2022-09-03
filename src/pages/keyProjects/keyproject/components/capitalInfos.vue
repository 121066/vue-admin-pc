<template>
  <div class="info">
    <el-form
      ref="addForm"
      :model="addForm"
      :label-position="'left'"
      label-width="185px"
      :rules="rules"
    >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item>
            <label slot="label">
              <i style="color: #fff">*&nbsp;</i>
              年份:
            </label>
            <el-select
              v-model="addForm.projectCycleYear"
              style="width: calc(50% - 100px)"
              placeholder="请选择年份"
              @change="onChange"
            >
              <el-option
                v-for="item in yearList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划总投资额:" prop="totalPlannedInvestment">
            <div class="value">{{ addForm.totalPlannedInvestment }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="2022年度累计完成投资额:"
            prop="yearCumulativeCompletionInvestment"
          >
            <div class="value">
              {{ addForm.yearCumulativeCompletionInvestment }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="项目累计完成投资额:"
            prop="projectCumulativeCompletionInvestment"
          >
            <div class="value">
              {{ addForm.projectCumulativeCompletionInvestment }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <label slot="label">
              <i style="color: #fff">*&nbsp;</i>
              剩余完成投资额:
            </label>
            <el-input placeholder="自动计算" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年度计划投资额:" prop="yearPlanInvestment">
            <div class="value">{{ addForm.yearPlanInvestment }}</div>
          </el-form-item>
        </el-col>
        <!-- 1-12月完成投资额 -->
        <el-col :span="24">
          <month ref="month" :disabled="true" />
        </el-col>
        <!-- 年目标 -->
        <el-col :span="24">
          <el-form-item label="年目标:">
            <div class="value">{{ addForm.yearTarget }}</div>
          </el-form-item>
        </el-col>
        <!-- 季度推进计划 -->
        <el-col :span="12">
          <el-form-item label="一季度推进计划:">
            <div class="value">{{ addForm.firstQuarterPromotionPlan }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二季度推进计划:">
            <div class="value">{{ addForm.secondQuarterPromotionPlan }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="三季度推进计划:">
            <div class="value">{{ addForm.thirdQuarterPromotionPlan }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="四季度推进计划:">
            <div class="value">{{ addForm.fourthQuarterPromotionPlan }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import month from './month.vue'
import { capitalInfoObj, monthObj } from '@/common/keyproject'
import { handleEcho } from '@/utils/keyproject'
export default {
  components: {
    month
  },
  data() {
    return {
      addForm: {
        projectCycleYear: '', // 年份
        totalPlannedInvestment: '', // 计划投资总额
        yearCumulativeCompletionInvestment: '', // 年度累计完成投资额
        projectCumulativeCompletionInvestment: '', // 项目累计完成投资额
        yearPlanInvestment: '', // 年度计划投资额
        yearTarget: '', // 年目标
        firstQuarterPromotionPlan: '', // 一季度推进计划
        secondQuarterPromotionPlan: '', // 二季度推进计划
        thirdQuarterPromotionPlan: '', // 三季度推进计划
        fourthQuarterPromotionPlan: '' // 四季度推进计划
      },
      rules: {
        totalPlannedInvestment: [
          { required: true, message: '请输入计划投资总额', trigger: 'blur' }
        ],
        yearCumulativeCompletionInvestment: [
          {
            required: true,
            message: '请输入年度累计完成投资额',
            trigger: 'blur'
          }
        ],
        projectCumulativeCompletionInvestment: [
          {
            required: true,
            message: '请输入项目累计完成投资额',
            trigger: 'blur'
          }
        ],
        yearPlanInvestment: [
          { required: true, message: '请输入年度计划投资额', trigger: 'blur' }
        ]
      },
      projectCycleInfoPlanList: {},
      yearList: [],
      yearIndex: 0,
      projectCycleInfoPlanObjDetail: [],
      yearObj: {},
      yearOld: '', // 旧年份
      projectId: this.$route.query.projectId || null
    }
  },
  watch: {
    'addForm.projectCycleYear'(val, oldVal) {
      this.yearOld = val
    }
  },
  mounted() {
    this.$bus.$on('handle_year', e => {
      const { arr, yearObj } = e
      this.yearList = arr
      this.yearObj = yearObj
      for (const key in yearObj) {
        this.projectCycleInfoPlanList[key] = yearObj[key]
      }
      this.sethandleData()
    })
  },
  methods: {
    setEliminate() {
      this.$refs.addForm.clearValidate()
      this.$refs.addForm.resetFields()
      this.$refs.month.setEliminate()
      this.addForm = {}
    },
    createdData() {
      const month = this.$refs.month.addForm
      this.addForm = { ...this.addForm, ...month }
      this.onChange()
      console.log(this.projectCycleInfoPlanList)
      return this.addForm
    },
    verify() {
      return new Promise((resolve, reject) => {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 回显
    detail(val, month, projectCycleInfoPlanList) {
      // this.addForm = val
      Object.keys(this.addForm).forEach(item => {
        this.addForm[item] = val[item]
      })
      this.$refs.month.detail(month)
    },
    detailPlan(val) {
      this.projectCycleInfoPlanObjDetail = val
      // console.log(this.projectCycleInfoPlanObjDetail, '????')
    },
    sethandleData() {
      this.projectCycleInfoPlanObjDetail.forEach(item => {
        if (this.yearObj[item.projectCycleYear]) {
          this.projectCycleInfoPlanList[item.projectCycleYear] = item
        }
      })
    },
    // 处理年份切换
    async onChange(e) {
      if (!this.projectId) {
        this.selectData(e)
      } else {
        this.$refs.addForm.validate(vaild => {
          if (vaild) {
            this.selectData(e)
          } else {
            this.addForm.projectCycleYear = this.yearOld
            return
          }
        })
      }
    },
    // 处理选择
    selectData(e) {
      const year = e || this.addForm.projectCycleYear
      const month = this.$refs.month.addForm
      const oldaddForm = JSON.parse(
        JSON.stringify({ ...this.addForm, ...month })
      )
      oldaddForm.projectCycleYear = this.yearOld
      this.projectCycleInfoPlanList[this.yearOld] = oldaddForm
      const addForm = this.projectCycleInfoPlanList[year]
      this.$nextTick(() => {
        console.log(e, '切花1', year, addForm, this.projectCycleInfoPlanList)
        if (year && addForm) {
          // console.log(addForm, '数？', year, e)
          const capitalInfo = handleEcho(capitalInfoObj, addForm)
          const months = handleEcho(monthObj, addForm)
          this.detail(capitalInfo, months)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .info {
    margin-top: 15px;
    text-align: left;
  }
</style>
