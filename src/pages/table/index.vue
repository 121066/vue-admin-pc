<template>
  <div class="table">
    <formSearch :opts="opts"></formSearch>
    <div>
      <el-button type="primary" size="small" @click="allExpansion"
        >全部展开</el-button
      >
      <el-button type="primary" size="small" @click="allPack"
        >全部收起</el-button
      >
      <el-button type="primary" size="small" @click="allExpansions"
        >全部展开(2)</el-button
      >
      <el-button type="primary" size="small" @click="allPacks"
        >全部收起(2)</el-button
      >
    </div>
    <el-table
      :data="dataList"
      row-key="idCard"
      border
      v-if="refTable"
      :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
      :default-expand-all="allTable"
    >
      <el-table-column type="" prop="index" label="序号" />
      <el-table-column prop="name" label="姓名" min-width="140" />
      <el-table-column prop="idCard" label="证件号" show-overflow-tooltip />
      <el-table-column
        prop="sourceName"
        label="人员类型"
        show-overflow-tooltip
      />
      <el-table-column
        prop="streetName"
        label="所属街道"
        show-overflow-tooltip
      />
      <el-table-column
        prop="communityName"
        label="所属社区"
        show-overflow-tooltip
      />
      <el-table-column
        prop="managementMeasuresName"
        label="管理措施"
        show-overflow-tooltip
      />
      <el-table-column
        prop="currentStateName"
        label="当前状态"
        show-overflow-tooltip
      />
      <el-table-column
        prop="testDate"
        label="核酸计划采样时间"
        show-overflow-tooltip
      />
      <el-table-column
        prop="testDesc"
        label="社区医院结果"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span :class="textColor[scope.row.testDesc]">{{
            scope.row.testDesc
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sampleDate" label="采样时间(社区)" />
      <el-table-column prop="lingXiResult" label="市级查询结果">
        <template slot-scope="scope">
          <span :class="textColor[scope.row.lingXiResult]">{{
            scope.row.lingXiResult
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lingXiCollectTime" label="采样时间(市级)" />
    </el-table>
  </div>
</template>
<script>
import formSearch from "@/components/formSearch/index";
import { indexData } from "@/utils/index";
import { columns } from "./data";
export default {
  components: {
    formSearch,
  },
  data() {
    return {
      refTable: true,
      allTable: false,
      opts: [
        {
          label: "客户编码",
          type: "input",
          key: "customerNumber1",
          val: "这是一个默认值",
          placeholder: "请输入客户编码",
        },
        {
          label: "集团编码",
          type: "select",
          key: "code",
          val: "请输入",
          placeholder: "请输入集团编码",
          selects: [
            { label: "震坤行", value: 0 },
            { label: "金山云", value: 1 },
          ],
        },
        {
          label: "用户名称",
          type: "input",
          key: "username",
          val: "这是一个默认值",
          placeholder: "请输入用户名称",
        },
      ],
      dataList: indexData(columns.data.records),
      textColor: {
        已采样: "green",
        未采样: "red",
      },
    };
  },
  methods: {
    // 全部收起
    allPack() {
      this.allTable = false;
      this.refTable = false;
      this.$nextTick(() => {
        this.refTable = true;
      });
    },
    // 全部展开
    allExpansion() {
      this.allTable = true;
      this.refTable = false;
      this.$nextTick(() => {
        this.refTable = true;
      });
    },
    // 全部展开方案2
    allExpansions() {
      const list = document.querySelectorAll(".el-table__expand-icon");
      for (let i = 0; i < list.length; i++) {
        if (!list[i].className.includes("el-table__expand-icon--expanded")) {
          list[i].click();
        } else {
          continue;
        }
      }
    },
    // 全部收起方案2
    allPacks() {
      const list = document.querySelectorAll(".el-table__expand-icon");
      for (let i = 0; i < list.length; i++) {
        if (!list[i].className.includes("el-table__expand-icon--expanded")) {
          continue;
        } else {
          list[i].click();
        }
      }
    },
  },
};
</script>
<style scoped>
.table {
  /* margin: 20px; */
  /* background: #fff; */
  overflow: hidden;
  /* height: 100%; */
  /* padding: 10px; */
}
.green {
  color: greenyellow;
}
.red {
  color: red;
}
</style>
