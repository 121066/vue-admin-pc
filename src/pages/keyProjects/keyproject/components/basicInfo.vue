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
            <el-input
              v-model="addForm.projectName"
              placeholder="请输入项目名称"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目归类:" prop="projectClassification">
            <!-- <el-input
              v-model="addForm.projectClassification"
              placeholder="请输入项目归类"
            /> -->
            <el-select
              v-model="addForm.projectClassification"
              style="width: 100%"
              placeholder="请选择项目归类"
              multiple
            >
              <el-option
                v-for="item in dictionaryObj['projectClassificationList']"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目类别:" prop="projectCategory">
            <!-- <el-input
              v-model="addForm.projectCategory"
              placeholder="请输入项目类别"
            /> -->
            <el-select
              v-model="addForm.projectCategory"
              style="width: 100%"
              placeholder="请选择项目类别"
            >
              <el-option
                v-for="item in dictionaryObj['projectCategoryList']"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:" prop="remark">
            <el-input
              v-model="addForm.remark"
              placeholder="请输入备注"
              maxlength="200"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设性质:" prop="constructionNature">
            <!-- <el-input
              v-model="addForm.constructionNature"
              placeholder="请选择建设性质"
            /> -->
            <el-select
              v-model="addForm.constructionNature"
              style="width: 100%"
              placeholder="请选择建设性质"
            >
              <el-option
                v-for="item in dictionaryObj['projectConstructionNatureList']"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投资类型:" prop="investmentType">
            <!-- <el-input
              v-model="addForm.investmentType"
              placeholder="请选择投资类型"
            /> -->
            <el-select
              v-model="addForm.investmentType"
              style="width: 100%"
              placeholder="请选择投资类型"
            >
              <el-option
                v-for="item in dictionaryObj['projectInvestmentTypeList']"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属社区:" prop="communityId">
            <!-- <el-input
              v-model="addForm.communityName"
              placeholder="请选择所属社区"
            /> -->
            <el-select
              v-model="addForm.communityId"
              style="width: 100%"
              placeholder="请选择所属社区"
              @change="change($event, 'communityList')"
            >
              <el-option
                v-for="item in dictionaryObj['communityList']"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建设单位:" prop="constructionUnitName">
            <el-input
              v-model="addForm.constructionUnitName"
              placeholder="请输入建设单位"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="建设单位联系人:"
            prop="constructionUnitContactName"
            maxlength="11"
          >
            <el-input
              v-model="addForm.constructionUnitContactName"
              placeholder="请输入建设单位联系人"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="建设单位联系人联系电话:"
            prop="constructionUnitContactPhone"
            maxlength="11"
          >
            <el-input
              v-model="addForm.constructionUnitContactPhone"
              placeholder="请输入建设单位联系人联系电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目所属年份:" prop="belongsYear">
            <el-date-picker
              v-model="addForm.belongsYear"
              style="width: 100%"
              type="year"
              value-format="yyyy"
              placeholder="请选择所属年份"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目建设地点:" prop="constructionUnitAddress">
            <el-input
              v-model="addForm.constructionUnitAddress"
              placeholder="请输入项目建设地点"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目建设周期:" prop="createdTime">
            <el-date-picker
              v-model="addForm.createdTime"
              style="width: 100%"
              type="monthrange"
              range-separator="至"
              start-placeholder="项目开始日期"
              end-placeholder="项目结束日期"
              value-format="yyyy"
              format="yyyy"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item
            label="项目建设规模和内容:"
            prop="constructionScaleContent"
          >
            <el-input
              v-model="addForm.constructionScaleContent"
              type="textarea"
              maxlength="500"
              show-word-limit
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入项目建设规模和内容"
            />
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

            <el-input
              v-model="addForm.projectProgressContent"
              type="textarea"
              maxlength="500"
              show-word-limit
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入项目进展"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 历史进展弹窗表格 -->
    <el-dialog
      :visible.sync="dialogTableVisible"
      center
      width="600px"
      class="addDialog"
    >
      <span slot="title" class="addDialogTitle">历史进展</span>
      <el-table :data="gridData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="createTime" label="填报时间" width="180" />
        <el-table-column prop="content" label="内容" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { handleRoule, maxminList } from '@/utils/keyproject.js'
import { ruleList } from '@/common/keyproject.js'
import { mapActions } from 'vuex'
import { projectProgress } from '@/api/keyproject/index.js'
export default {
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
      dialogTableVisible: false,
      gridData: []
    }
  },
  computed: {
    rulesObj() {
      return handleRoule(ruleList, this.addForm)
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
      const { data } = await projectProgress({ projectId: this.projectId })
      this.gridData = data
      this.dialogTableVisible = !this.dialogTableVisible
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
</style>
