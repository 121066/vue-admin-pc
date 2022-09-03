<template>
  <div class="wd">
    <!-- 项目统计 -->
    <div class="project_total">
      <div class="left">
        <div class="totalnum">{{ projectObj.projectNum }}</div>
        <div class="p2">项目总数</div>
      </div>
      <div class="right">
        <div class="progressnum">{{ projectObj.monthSaveProgressNum }}</div>
        <div class="p2">本月已更新进展项目数</div>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="dataList">
        <el-table-column label="序号" type="index" />
        <el-table-column
          label="重点项目名称"
          width="140"
          prop="projectName"
        />
        <el-table-column
          label="项目归类"
          width="140"
          prop="projectClassificationDesc"
        />
        <el-table-column
          label="项目类别"
          width="100"
          prop="projectCategoryDesc"
        />
        <el-table-column label="进展更新次数" width="140" prop="saveNum">
          <template slot-scope="scope">
            <span>{{ scope.row.saveNum }}次</span>
          </template>
        </el-table-column>
        <el-table-column
          label="进展最后更新时间"
          width="140"
          prop="lastSaveTime"
        />
        <el-table-column
          label="目前进展"
          prop="currentProgress"
        />
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
import { getStatistics, getStatisticsList } from '@/api/keyproject'
export default {
  data() {
    return {
      paramsForm: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      dataList: [],
      projectObj: {
        monthSaveProgressNum: 0,
        projectNum: 0
      }
    }
  },
  created() {
    this.search()
    this.getTotal()
  },
  methods: {
    async search() {
      const { data } = await getStatisticsList(this.paramsForm)
      if (!data) return
      this.dataList = data.records || []
      this.total = data.total || 0
    },
    async getTotal() {
      const { data } = await getStatistics()
      this.projectObj = data || {}
    }
  }
}
</script>
<style lang="scss" scoped>
  .project_total {
    margin: 10px 0 25px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 15px 0;
    border: 1px solid #dfe6ec;
    border-radius: 5px;
    .left {
      flex: 1;
      text-align: center;
      border-right: 1px dashed #dfe6ec;
      .totalnum {
        color: #4768c2;
        font-size: 32px;
        font-weight: bold;
      }
    }
    .right {
      flex: 1;
      text-align: center;
      .progressnum {
        color: #95f204;
        font-size: 32px;
        font-weight: bold;
      }
    }
    .p2 {
      font-weight: 500;
      font-size: 14px;
      color: #333;
    }
  }
</style>
