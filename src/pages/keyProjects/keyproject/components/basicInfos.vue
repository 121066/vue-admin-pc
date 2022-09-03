<template>
  <div class="info">
    <el-form
      ref="addForm"
      :model="addForm"
      :label-position="'left'"
      label-width="185px"
      :rules="rulesObj"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="项目名称:" prop="projectName">
            <div class="value">{{ addForm.projectName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目归类:" prop="projectClassification">
            <div class="value">
              {{
                detailObj &&
                  detailObj['projectClassification'] &&
                  detailObj['projectClassification'].slice(0, -1)
              }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目类别:" prop="projectCategory">
            <div class="value">
              {{
                detailObj &&
                  detailObj['projectCategory'][0] &&
                  detailObj['projectCategory'][0].name
              }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:" prop="remark">
            <div class="value">{{ addForm.remark }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设性质:" prop="constructionNature">
            <div class="value">
              {{
                detailObj &&
                  detailObj['constructionNature'][0] &&
                  detailObj['constructionNature'][0].name
              }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投资类型:" prop="investmentType">
            <div class="value">
              {{
                detailObj &&
                  detailObj['investmentType'][0] &&
                  detailObj['investmentType'][0].name
              }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属社区:" prop="communityId">
            <div class="value">{{ addForm.communityName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设单位:" prop="constructionUnitName">
            <div class="value">{{ addForm.constructionUnitName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="建设单位联系人:"
            prop="constructionUnitContactName"
          >
            <div class="value">{{ addForm.constructionUnitContactName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="建设单位联系人联系电话:"
            prop="constructionUnitContactPhone"
          >
            <div class="value">{{ addForm.constructionUnitContactPhone }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目所属年份:" prop="belongsYear">
            <div class="value">{{ addForm.belongsYear }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目建设地点:" prop="constructionUnitAddress">
            <div class="value">{{ addForm.constructionUnitAddress }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目建设周期:" prop="createdTime">
            <div class="value">
              {{ addForm.createdTime[0] }}至{{ addForm.createdTime[1] }}
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item
            label="项目建设规模和内容:"
            prop="constructionScaleContent"
          >
            <div class="value hd">{{ addForm.constructionScaleContent }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="项目进展:"
            prop="projectProgressContent"
            class="progress"
          >
            <label slot="label">
              项目进展:
              <div v-if="projectId" class="history">
                <el-button
                  type="primary"
                  icon="el-icon-time"
                  size="small"
                  @click="getHistory"
                >
                  历史进展
                </el-button>
              </div>
            </label>
            <div class="value hd">{{ addForm.projectProgressContent }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 历史进展弹窗表格 -->
    <historyDialog v-model="historyDialogShow" />
  </div>
</template>
<script>
import { handleRoule, maxminList } from '@/utils/keyproject.js'
import { ruleList } from '@/common/keyproject.js'
import { mapActions } from 'vuex'

import historyDialog from './historyDialog.vue'
export default {
  components: {
    historyDialog
  },
  data() {
    return {
      addForm: {
        projectName: '', // 项目名称
        projectClassification: [], // 项目归类
        projectCategory: '', // 项目类别
        remark: '', // 备注
        constructionNature: '', // 建设性质
        investmentType: '', // 投资类型
        communityName: '', // 社区姓名
        communityId: '', // 社区id
        constructionUnitName: '', // 建设单位名称
        constructionUnitContactName: '', // 建设单位联系人姓名
        constructionUnitContactPhone: '', // 建设单位联系人电话
        belongsYear: '', // 所属年份
        constructionUnitAddress: '', // 项目建设地点
        constructionCycleStartYear: '', // 项目建设开始年份
        constructionCycleEndYear: '', // 项目建设结束年份
        constructionScaleContent: '', // 项目建设规模和内容
        projectCycleInfoPlanList: '', // 投资信息及项目计划
        createdTime: [], // 处理项目开始和结束时间
        projectProgressContent: '' // 项目进展
      },
      // 校验规则
      dictionaryObj: {
        projectCategoryList: [], // 项目类别
        projectClassificationList: [], // 项目归类
        projectConstructionNatureList: [],
        projectInvestmentTypeList: [], // 投资类型
        communityList: [] // 所属社区
      },
      projectId: this.$route.query.projectId,
      historyDialogShow: false
    }
  },
  computed: {
    rulesObj() {
      return handleRoule(ruleList, this.addForm)
    },
    detailObj() {
      const obj = {
        projectClassification: 'projectClassificationList', // 项目归类
        projectCategory: 'projectCategoryList', // 项目类别
        constructionNature: 'projectConstructionNatureList', // 建设性质
        investmentType: 'projectInvestmentTypeList' // 投资类型
      }
      const detailObj = {
        projectClassification: [],
        projectCategory: [],
        constructionNature: [],
        investmentType: []
      }
      for (const key in obj) {
        const arr = this.dictionaryObj[obj[key]]
        if (key === 'projectClassification') {
          const arrAy = this.addForm['projectClassification'] || []
          const ication = {}
          arrAy.forEach(item => {
            ication[item] = true
          })
          arr.forEach(item => {
            if (ication[item.id]) {
              detailObj[key] += item.name + ','
            }
          })
        } else if (arr.length > 0) {
          detailObj[key] = arr.filter(item => this.addForm[key] === item.id)
        }
      }
      return detailObj
    }
  },
  watch: {
    'addForm.createdTime': {
      handler(val) {
        this.createdTimeObj(val)
      },
      deep: true,
      immediate: false
    }
  },
  async created() {
    const data = await this.getProjectDictionaryList()
    const res = await this.getCommunityList()
    this.dictionaryObj = data
    this.dictionaryObj['communityList'] = res
    this.createdTimeObj(this.addForm.createdTime)
  },
  methods: {
    ...mapActions('keyProject', [
      'getProjectDictionaryList',
      'getCommunityList'
    ]),
    setEliminate() {
      this.$refs.addForm.clearValidate()
      this.$refs.addForm.resetFields()
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
    submit() {
      this.$emit('submit', this.addForm)
    },
    // 社区选中
    change(e, type) {
      const data = this.dictionaryObj[type].filter(item => item.id === e)
      this.addForm.communityName = data[0].name
    },
    detail(val) {
      // console.log(val, '回显的数据')
      // this.$refs.addForm.clearValidate()
      Object.keys(this.addForm).forEach(item => {
        this.addForm[item] = val[item]
      })
    },
    // 获取历史进展
    async getHistory() {
      this.historyDialogShow = !this.historyDialogShow
    },
    createdTimeObj(val) {
      if (val && val.length > 0) {
        this.addForm.constructionCycleStartYear = val[0].slice(0, 4)
        this.addForm.constructionCycleEndYear = val[1].slice(0, 4)
        const year = maxminList(val[0], val[1])
        this.$bus.$emit('handle_year', year)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .info {
    margin-top: 15px;
  }
  .progress {
    position: relative;
  }
  .history {
    left: 0;
    position: absolute;
  }
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
  .value {
    text-align: left;
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
  .hd {
    min-height: 80px;
  }
</style>
