<template>
  <div class="table">
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
          label: '集团编码',
          type: 'select',
          key: 'code',
          val: '请输入',
          placeholder: '请输入集团编码',
          selects: [
            { label: '震坤行', value: 0 },
            { label: '金山云', value: 1 },
          ],
        },
        // {
        //   label: '日期',
        //   type: 'daterange',
        //   key: 'daterange',
        //   val: '这是一个默认值',
        //   placeholder: '请选择日期',
        // },
        {
          label: '用户名称',
          type: 'input',
          key: 'username',
          val: '这是一个默认值',
          placeholder: '请输入用户名称',
        },
        {
          label: '所属公司',
          type: 'input',
          key: 'customer',
          val: '这是一个默认值',
          placeholder: '请输入所属公司',
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
.table {
  padding: 20px;
  /* background: #fff; */
  overflow: hidden;
  height: 100%;
}
.green {
  color: greenyellow;
}
.red {
  color: red;
}
</style>
