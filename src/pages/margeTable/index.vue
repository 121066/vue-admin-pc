<template>
  <div>
    <div class="table">
      <el-table
        :header-row-style="{
          height: '40px',
        }"
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '1px', background: '#oldlace' }"
        :data="tableData1"
        style="width: 100%"
        :span-method="arraySpanMethod"
        empty-text="统计中"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          align="center"
          prop="v0"
          label="名称"
        ></el-table-column>
        <el-table-column
          algin="center"
          prop="leader"
          label="市领导"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="v1"
          label="问题数量"
        ></el-table-column>
        <el-table-column align="center" label="问题类型">
          <el-table-column align="center" prop="v2" label="基础设施">
          </el-table-column>
          <el-table-column
            align="center"
            prop="v3"
            label="民生保障"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="v4"
            label="社会治理"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="v5"
            label="生产经营"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="v6"
            label="生态环保"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="v7"
          label="办结数量"
        ></el-table-column>
        <el-table-column align="center" prop="v8" label="办结率">
          <template slot-scope="scope">
            <span>{{ scope.row | rate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="群众满意度">
          <el-table-column
            align="center"
            prop="v9"
            label="满意"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="v10"
            label="一般"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="v11"
            label="不满意"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { column1, column2, column3, column4 } from './tableData'
export default {
  name: 'margeTable',
  data() {
    return {
      tableData1: [...column1, ...column2, ...column3, ...column4],
    }
  },
  filters: {
    rate(val) {
      let { v1, v7 } = val
      return (v7 / v1).toFixed(2) <= 0
        ? '0'
        : ((v7 / v1) * 100).toFixed(2) + '%'
    },
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //同济医院
      if (columnIndex === 0 && rowIndex <= 11) {
        console.log(rowIndex % 12)
        if (rowIndex === 0) {
          return {
            rowspan: 12,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
      //同济医院第二行合并
      if (columnIndex === 1 && rowIndex <= 9) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
      //协和医院
      if (columnIndex === 0 && rowIndex > 11 && rowIndex <= 19) {
        // if (rowIndex % 4 === 0) {
        //   return [4, 1]
        // } else {
        //   return [0, 0]
        // }
        if ((rowIndex - 4) % 8 === 0) {
          return [8, 1]
        } else {
          return [0, 0]
        }
      }
      //妇幼保健院
      if (columnIndex === 0 && rowIndex > 19 && rowIndex <= 29) {
        if (rowIndex % 10 === 0) {
          return [10, 1]
        } else {
          return [0, 0]
        }
      }
      //人民医院
      if (columnIndex === 0 && rowIndex > 29 && rowIndex <= 35) {
        if (rowIndex % 6 === 0) {
          return [6, 1]
        } else {
          return [0, 0]
        }
      }
    },
    //隔行换色
    tableRowClassName({ row, rowIndex, columnIndex }) {
      if (rowIndex <= 11) {
        return 'warning-row'
      } else if (rowIndex > 11 && rowIndex <= 19) {
        return 'success-row'
      }
    },
  },
}
</script>
