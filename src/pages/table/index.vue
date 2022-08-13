<template>
  <div>
    <formSearch :opts="opts"></formSearch>
    <el-table :data="dataList" border>
      <el-table-column type="index" label="序号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="idCard" label="证件号" />
      <el-table-column prop="sourceName" label="人员类型" />
      <el-table-column prop="streetName" label="所属街道" />
      <el-table-column prop="communityName" label="所属社区" />
      <el-table-column prop="managementMeasuresName" label="管理措施" />
      <el-table-column prop="currentStateName" label="当前状态" />
      <el-table-column prop="testDate" label="核酸计划采样时间" />
      <el-table-column prop="testDesc" label="社区医院结果">
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
import formSearch from '@/components/formSearch/index'
import { columns } from './data'
export default {
  components: {
    formSearch,
  },
  data() {
    return {
      opts: [
        {
          label: '客户编码1',
          type: 'input',
          key: 'customerNumber1',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码2',
          type: 'input',
          key: 'customerNumber2',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码3',
          type: 'input',
          key: 'customerNumber3',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码4',
          type: 'input',
          key: 'customerNumber4',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码5',
          type: 'input',
          key: 'customerNumber5',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
      ],
      dataList: columns.data.records,
      textColor: {
        已采样: 'green',
        未采样: 'red',
      },
    }
  },
}
</script>
<style scoped>
.main {
}
.green {
  color: greenyellow;
}
.red {
  color: red;
}
</style>
