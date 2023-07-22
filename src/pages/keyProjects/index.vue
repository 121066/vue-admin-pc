<template>
  <div class="wd">
    <!-- 搜索区域 -->
    <formSearch ref="formSearch" :opts="opts" @formSearch="formSearch" />
    <!-- 操作区域 -->
    <div class="" style="margin-bottom: 20px">
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
    <!-- tab切换区域 -->
    <div class="my-2">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in keyOption"
          :key="index"
          :label="
            tabIndex === item.id + ''
              ? item.name +
                (dataTotal[tabIndex] === 0 ? '' : ` (${dataTotal[tabIndex]}) `)
              : item.name
          "
          :name="item.id + ''"
        />
      </el-tabs>
    </div>
    <!-- 表格区域 -->
    <div>
      <el-table
        :data="dataObjList[tabIndex]"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="项目名称" prop="projectName" />
        <el-table-column label="项目归类" prop="projectClassificationDesc" />
        <el-table-column label="项目类别" prop="projectCategoryDesc" />
        <el-table-column label="建设性质" prop="constructionNatureDesc" />
        <el-table-column label="所属社区" prop="communityName" />
        <el-table-column
          label="计划总投资额(万元)"
          prop="totalPlannedInvestment"
          width="150"
        />
        <el-table-column
          label="累计完成投资额(万元)"
          prop="projectCumulativeCompletionInvestment"
          width="170"
        />
        <el-table-column label="项目年份" prop="belongsYear" />
        <el-table-column label="最新进展">
          <template slot-scope="scope">
            <el-button type="text" @click="getSeeProject(scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="提醒" prop="remind">
          <template slot-scope="scope">
            <span v-if="scope.row.remind" style="color: red">
              {{ scope.row.remind }}
            </span>
            <span v-else>无</span>
          </template>
        </el-table-column>
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
                项目文件归档
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="paramsForm.pageNum"
        :page-size.sync="paramsForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal[tabIndex]"
        @current-change="search"
        @size-change="search"
      />
    </div>
    <copyProcess ref="copyProcess" v-model="copyProcessShow" />
  </div>
</template>
<script>
import {
  deleteProject,
  exportProject,
  getKeyProject,
  getProjectDictionary,
  getSqList,
} from "@/api/keyproject";
import { opts } from "@/common/keyproject";
import formSearch from "@/components/formSearch";
import { mapActions } from "vuex";
import copyProcess from "./components/copyProcess.vue";
export default {
  components: { formSearch, copyProcess },
  data() {
    return {
      opts: opts, // 搜索参数
      activeName: 0, // 默认tab选中
      keyOption: [{ id: "0", name: "全部" }], // tab选项
      tabIndex: "0",
      dataObjList: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      },
      dataTotal: [0, 0, 0, 0, 0, 0, 0],
      multipleSelection: [],
      paramsForm: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      searchObj: {
        projectClassification: "projectClassificationList", // 项目归类
        investmentType: "projectInvestmentTypeList", // 投资类型
        projectCategory: "projectCategoryList", // 项目类别
      },
      copyProcessShow: false,
    };
  },
  async created() {
    const { data } = await getProjectDictionary();
    console.log(data, "???/");
    this.keyOption.push(...data.projectClassificationList);
    const { result } = await getSqList();
    this.search();
    this.handleData(data, result); // 处理搜索数据
  },
  methods: {
    ...mapActions("keyProject", ["getProjectDictionaryList"]),
    // 搜索条件
    formSearch(val) {
      this.paramsForm.pageNum = 1;
      const data = val;
      if (data.projectClassification && data.projectClassification.length > 0) {
        data.projectClassification = data.projectClassification.join(",");
      }
      this.search(data);
    },
    // 点击tab切换
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      this.search();
    },
    // 表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 搜索请求
    async search(val) {
      const params = {
        projectClassification: this.tabIndex === "0" ? "" : this.tabIndex - 0,
        ...val,
        ...this.paramsForm,
        majorIntentionCategory: 1,
      };
      console.log(params, "查询参数");
      const { data } = await getKeyProject(params);
      if (!data) return;
      this.dataObjList[this.tabIndex] = data.records || [];
      this.dataTotal[this.tabIndex] = data.total || 0;
    },
    // 操作
    addProject(type) {
      switch (type) {
        case "add":
          this.$router.push({
            path: "addproject",
            query: { majorIntentionCategory: 1 },
          });
          break;
        case "download":
          this.getDownload();
          break;
        case "delete":
          this.getDelete();
          break;
      }
    },
    // 处理搜索数据
    handleData(res, result) {
      this.$nextTick(() => {
        this.opts.forEach((item) => {
          if (this.searchObj[item.key]) {
            item.selects = res[this.searchObj[item.key]];
          }
          if (item.key === "communityId") {
            item.selects = result;
          }
        });
      });
    },
    // 项目操作&查看&编辑&归档
    handleProject({ projectId }, type) {
      switch (type) {
        case "see":
          this.$router.push({
            path: "seeproject",
            query: { projectId, majorIntentionCategory: 1 },
          });
          break;
        case "edit":
          this.$router.push({
            path: "/keyproject/editproject",
            query: { projectId, majorIntentionCategory: 1 },
          });
          break;
        case "file":
          this.$router.push({ path: "projectfile", query: { projectId } });
          break;
      }
    },
    // 下载
    getDownload() {
      const copyForm = this.$refs.formSearch.copyForm;
      const searchForm = this.$refs.formSearch.searchForm;
      const params = {
        ...this.paramsForm,
        majorIntentionCategory: 1,
        ...copyForm,
        ...searchForm,
      };
      exportProject({
        ...params,
      }).then((res) => {
        const { fileName, data } = res;
        const blob = new Blob([data], { type: "application/octet-stream" });
        const href = window.URL.createObjectURL(blob);
        // 兼容 ie
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = href;
        link.download = decodeURIComponent(fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link);
      });
    },
    // 删除
    async getDelete() {
      if (this.multipleSelection <= 0) {
        this.$message.warning("请选择要删除的项目");
        return;
      } else {
        this.$confirm("此操作将永久删除选中项目, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const idList = this.multipleSelection.map((item) => item.projectId);
            const res = await deleteProject({ idList });
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.search();
            } else {
              this.$message.warning(res.msg);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 查看项目进展
    getSeeProject({ projectId }) {
      this.copyProcessShow = !this.copyProcessShow;
      this.$nextTick(() => {
        this.$refs.copyProcess.open(projectId);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.link {
  color: #1890ff;
  text-decoration: #1890ff;
  cursor: pointer;
}
</style>
