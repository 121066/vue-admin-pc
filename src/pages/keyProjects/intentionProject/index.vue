<template>
  <div class="wd">
    <!-- 搜索区域 -->
    <formSearch :opts="opts" @formSearch="formSearch" />
    <!-- 操作区域 -->
    <div class="">
      <el-button type="primary" icon="el-icon-plus" @click="addProject('add')">
        新建项目
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-folder-checked"
        @click="addProject('download')"
      >
        导出项目
      </el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="addProject('delete')"
      >
        删除项目
      </el-button>
    </div>
    <!-- 表格区 域 -->
    <div class="my-1">
      <el-table :data="dataList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="意向项目名称" prop="projectName" />
        <el-table-column label="项目归类" prop="projectClassificationDesc" />
        <el-table-column label="项目类别" prop="projectCategoryDesc" />
        <el-table-column label="建设性质" prop="constructionNatureDesc" />
        <el-table-column
          label="计划总投资额(万元)"
          prop="totalPlannedInvestment"
          width="150"
        />
        <el-table-column label="项目建设单位" prop="constructionUnitName" />
        <el-table-column label="项目录入时间" prop="belongsYear" />
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <div class="d-flex flex-column">
              <el-link
                type="primary"
                icon="el-icon-view"
                @click="handleProject(scope.row, 'see')"
              >
                查看项目内容
              </el-link>
              <el-link
                type="primary"
                icon="el-icon-edit"
                @click="handleProject(scope.row, 'edit')"
              >
                更新项目信息
              </el-link>
              <el-link
                type="primary"
                icon="el-icon-folder-checked"
                @click="handleProject(scope.row, 'file')"
              >
                转重点项目库
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="paramsForm.pageNum"
        :page-size.sync="paramsForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="search"
        @size-change="search"
      />
    </div>
  </div>
</template>
<script>
import formSearch from '@/components/formSearch'
import { optsIntention } from '@/common/keyproject'
import { getKeyProject, deleteProject, exportProject } from '@/api/keyproject'
import { mapActions } from 'vuex'
export default {
  components: { formSearch },
  data() {
    return {
      opts: optsIntention, // 搜索参数
      dataList: [],
      multipleSelection: [],
      paramsForm: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      searchObj: {
        projectClassification: 'projectClassificationList', // 项目归类
        projectCategory: 'projectCategoryList' // 项目类别
      }
    }
  },
  async created() {
    const res = await this.getProjectDictionaryList()

    this.search()
    this.handleData(res) // 处理搜索数据
  },
  methods: {
    ...mapActions('keyProject', ['getProjectDictionaryList']),
    // 搜索条件
    formSearch(val) {
      this.paramsForm.pageNum = 1
      const data = val
      if (
        data.projectClassification &&
          data.projectClassification.length > 0
      ) {
        data.projectClassification = data.projectClassification.join(',')
      }
      this.search(data)
    },
    // 表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 搜索请求
    async search(val) {
      const params = {
        ...val,
        ...this.paramsForm,
        majorIntentionCategory: 2
      }
      console.log(params, '查 询参数')
      const { data } = await getKeyProject(params)
      this.dataList = data.records || []
      this.total = data.total || 0
    },
    // 操作
    addProject(type) {
      switch (type) {
        case 'add':
          this.$router.push({
            path: 'addproject',
            query: { majorIntentionCategory: 2 }
          })
          break
        case 'download':
          this.getDownload()
          break
        case 'delete':
          this.getDelete()
          break
      }
    },
    handleData(res) {
      this.$nextTick(() => {
        this.opts.forEach(item => {
          if (this.searchObj[item.key]) {
            item.selects = res[this.searchObj[item.key]]
          }
        })
      })
    },
    handleProject({ projectId }, type) {
      switch (type) {
        case 'see':
          this.$router.push({
            path: 'seeproject',
            query: { projectId, majorIntentionCategory: 2 }
          })
          break
        case 'edit':
          this.$router.push({
            path: '/keyproject/editproject',
            query: { projectId, majorIntentionCategory: 2 }
          })
          break
          // 转重点项目库
        case 'file':
          this.$router.push({
            path: '/keyproject/editproject',
            query: {
              projectId,
              majorIntentionCategory: 1,
              typeinten: 'inten'
            }
          })
          break
      }
    },
    // 下载
    getDownload() {
      const copyForm = this.$refs.formSearch.copyForm
      const searchForm = this.$refs.formSearch.searchForm
      const params = {
        ...this.paramsForm,
        majorIntentionCategory: 1,
        ...copyForm,
        ...searchForm
      }
      exportProject({
        ...params
      }).then(res => {
        const { fileName, data } = res
        const blob = new Blob([data], { type: 'application/octet-stream' })
        const href = window.URL.createObjectURL(blob)
        // 兼容 ie
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = href
        link.download = decodeURIComponent(fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link)
      })
    },
    // 删除
    async getDelete() {
      if (this.multipleSelection <= 0) {
        this.$message.warning('请选择要删除的项目')
        return
      } else {
        this.$confirm('此操作将永久删除选中项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const idList = this.multipleSelection.map(item => item.projectId)
            const res = await deleteProject({ idList })
            if (res.code === 0) {
              this.$message.success('删除成功')
              this.search()
            } else {
              this.$message.warning(res.msg)
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
