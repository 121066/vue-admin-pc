<template>
  <div class="editor">
    <div class="add_btn">
      <el-button type="primary" size="medium" @click="addPolicy">
        新建
      </el-button>
    </div>
    <el-table :data="columnData" border>
      <el-table-column prop="title" label="政策标题" />
      <el-table-column prop="domainName" label="政策领域" />
      <el-table-column prop="industryName" label="支持产业">
        <template slot-scope="scope">
          <el-tooltip placement="top-end">
            <div slot="content" class="content">
              {{ scope.row.industryName }}
            </div>
            <div class="title">{{ scope.row.industryName }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="isPublish" label="发布状态">
        <template slot-scope="scope">
          <span>{{ isPublishText[scope.row.isPublish] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" sortable label="发布时间" />
      <el-table-column prop="authorDept" label="发文单位" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: red"
            @click="setDetail(scope.row)"
          >
            删除
          </el-button>
          <el-button type="text" @click="getUpdete(scope.row, scope)">
            修改
          </el-button>
          <el-button type="text" @click="seeDetail(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <addeditor
      v-model="addEditorShow"
      :data-options-params="dataOptions"
      @addList="addList"
      ref="addEditor"
    />
  </div>
</template>
<script>
import { columnData, dataOptions } from './data'
import addeditor from './component/addEditor.vue'
export default {
  components: {
    // Editor,
    addeditor,
  },
  data() {
    return {
      content: '',
      columnData: columnData.data.records.slice(0, 5),
      dataOptions: dataOptions.data,
      isPublishText: {
        0: '未发布',
        1: '已发布',
      },
      addEditorShow: false,
    }
  },
  methods: {
    getContent() {
      console.log(this.content, '内容')
    },
    //修改
    getUpdete(row, index) {
      let detail = JSON.parse(JSON.stringify(row))
      this.addEditorShow = true
      this.$refs.addEditor.getDetail(detail, index.$index, 'update')
    },
    //详情
    seeDetail(row) {},
    //新建
    addPolicy() {
      this.addEditorShow = true
    },
    addList(item, val) {
      if (val == null) {
        item.docId = this.columnData.length + 1

        this.columnData.push(item)
      } else {
        this.columnData.splice(val, 1, item)
      }
      console.log(item, '添加')
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  max-height: 70px;
  // overflow: hidden;
  cursor: pointer;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.content {
  max-width: 300px;
}
.add_btn {
  margin: 0 0 10px 0;
}
</style>
