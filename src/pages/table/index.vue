<template>
  <div class="table">
    <h2>表格自定义气泡位置</h2>
    <el-table border :data="[{ name: '你好', id: '增加' }]">
      <el-table-column label="测试气泡" prop="name">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            :visible-arrow="true"
            popper-class="db-popover"
            width="200"
            trigger="click"
            transition="fade-in-linear"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <div>我在这里</div>
            <div
              slot="reference"
              @click="dbPopover($event, true)"
              class="reference"
            >
              {{ scope.row.name }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="列" prop="id">
        <template slot-scope="scope">
          <div @click="dbPopover($event, false)">{{ scope.row.id }}</div>
        </template>
      </el-table-column>
    </el-table>
    <formSearch :opts="opts"></formSearch>
    <h2>表格自定义展开和收起</h2>
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
    <h2>表格自定义展开箭头图表</h2>
    <div class="expand">
      <el-table
        border
        :data="dataExpand"
        :expand-row-keys="expands"
        row-key="idCard"
      >
        <el-table-column type="expand" width="1">
          <template slot-scope="scope">
            <div>{{ scope.row.sourceName }}</div>
            <div>{{ scope.row.streetName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="人员类型"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>
              <i
                class="el-icon el-icon-caret-right icon_color"
                :class="[
                  {
                    'el-table__expand-icon--expanded':
                      expandsObj[scope.row.idCard],
                  },
                ]"
                @click="setExpand(scope.row)"
              ></i>
              {{ scope.row.sourceName }}
            </span>
          </template>
        </el-table-column>
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
      </el-table>
    </div>
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
  computed: {
    objStyle () {
      return {
        left: this.left + 'px'
      }
    },
    dataExpand () {
      return this.dataList.slice(6, 10)
    }
  },
  data () {
    return {
      expands: [],
      expandsObj: {},
      popoverFlag: false,
      left: 550,
      popoverSet: 200,
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
    allPack () {
      this.allTable = false;
      this.refTable = false;
      this.$nextTick(() => {
        this.refTable = true;
      });
    },
    // 全部展开
    allExpansion () {
      this.allTable = true;
      this.refTable = false;
      this.$nextTick(() => {
        this.refTable = true;
      });
    },
    // 全部展开方案2
    allExpansions () {
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
    allPacks () {
      const list = document.querySelectorAll(".el-table__expand-icon");
      for (let i = 0; i < list.length; i++) {
        if (!list[i].className.includes("el-table__expand-icon--expanded")) {
          continue;
        } else {
          list[i].click();
        }
      }
    },
    // 气泡跟随
    async dbPopover (e, flag) {
      const dbpopover = document.querySelector('.db-popover')
      if (!flag) return this.popoverFlag = false
      const { offsetX, clientX, offsetLeft } = e
      const x = offsetX + 120
      function init (params) {
        dbpopover.style.left = (clientX - 120) + 'px'
      }

      if (!this.popoverFlag) {
        // let n = await this.dely(offsetX, 120)
        // function init (params) {
        //   dbpopover.style.left = (clientX - 120) + 'px'
        // }
        // requestAnimationFrame(init)
        requestAnimationFrame(init)

      } else {
        // function init (params) {
        //   dbpopover.style.left = (-1000) + 'px'
        // }
        // requestAnimationFrame(init)
        // this.popoverFlag = !this.popoverFlag
      }
      this.popoverFlag = !this.popoverFlag


    },
    dely (x, n) {
      return new Promise(reolve => {
        reolve(x + n)
      })
    },
    // 展开
    setExpand (item) {
      const { idCard } = item
      if (!this.expands.includes(idCard)) {
        this.expands.push(idCard)
        this.expandsObj[idCard] = true
      } else {
        const index = this.expands.indexOf(idCard)
        this.expands.splice(index, 1)
        this.expandsObj[idCard] = false
      }
    }
  },
};
</script>
<style scoped lang="scss">
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
.reference {
  position: relative;
}
.icon_color {
  cursor: pointer;
}
.expand {
  ::v-deep .el-table__expand-icon {
    opacity: 0;
  }
}
</style>
