<template>
  <div class="wd">
    <cartTitle :title="'项目文件归档'" :width-show="true" class="title">
      <div class="handle">
        <el-button type="primary" icon="el-icon-folder-opened" size="small">
          打包下载
        </el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-d-arrow-left"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
      </div>
      <div class="file">
        <div
          v-for="(val, key, index) in saveFile"
          :key="index"
          class="file_list"
        >
          <div class="file_list_left">
            <div class="file_list_left_l">{{ val }}</div>
            <div class="file_list_left_r">
              <el-button @click="upload(key)">上传</el-button>
              <input
                v-if="fileShow"
                id="file_btn"
                type="file"
                style="display: none"
              >
              <div class="tips">
                注：支持格式为：RAR、PDF、DOCX、DOC、JPG、PNG、XLSX，单文件大小不超过20M
              </div>
            </div>
          </div>
          <div class="file_list_right">
            <div v-if="filesList[key].length <= 0" class="file_list_right_l">
              暂无已上传文件
            </div>
            <div v-else style="width: 100%">
              <div class="file_list_right_l">已上传文件</div>
              <div
                v-for="(item, count) in filesList[key]"
                :key="count"
                class="file_list_right_r"
              >
                <div class="filename">{{ item.fileName }}</div>
                <div>
                  <el-button type="text" @click="operation(item, key, 'down')">
                    下载
                  </el-button>
                  <el-button
                    type="text"
                    style="color: red"
                    @click="operation(item, key, 'delete', count)"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cartTitle>
    <div class="save">
      <el-button type="primary" @click="saveSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
import cartTitle from './components/cardTitle.vue'
import { saveFile } from '@/common/keyproject.js'
import { callback, mapArrayStr, handleFile } from '@/utils/keyproject.js'
import { saveFileList, getFileList } from '@/api/keyproject/index.js'
export default {
  components: {
    cartTitle
  },
  data() {
    return {
      addForm: {
        completionMaterialFileIds: '', // 项目竣工材料
        constructionMaterialFileIds: '', // 项目施工材料
        otherMaterialFileIds: '', // 其他材料
        signMaterialFileIds: '', // 项目签约材料
        startWorkMaterialFileIds: '', // 项目开工材料
        projectId: this.$route.query.projectId || null
      },
      saveFile: saveFile,
      fileShow: true,
      filesList: {
        completionMaterialFileIds: [], // 项目竣工材料
        constructionMaterialFileIds: [], // 项目施工材料
        otherMaterialFileIds: [], // 其他材料
        signMaterialFileIds: [], // 项目签约材料
        startWorkMaterialFileIds: [] // 项目开工材料
      }
    }
  },
  async created() {
    const projectId = this.$route.query.projectId || null
    if (!projectId) return false
    try {
      const { data } = await getFileList({ projectId })
      this.addForm = data
      const res = await handleFile(data, this.filesList)
      this.filesList = res
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async upload(key) {
      const that = this
      const input = document.getElementById('file_btn')
      input.removeEventListener('change', e => console.log('a'))
      input.click()
      input.addEventListener('change', callbacks, false)
        input?.removeEventListener('change', () => console.log('a'))
        const v = input.outerHTML
        input.outerHTML = v
        async function callbacks(e) {
          const data = await callback(e)
          console.log(data)
          that.filesList[key].push(data[0])
        }
    },
    // 操作
    operation(val, key, type, index) {
      switch (type) {
        case 'down':
          window.open(val.fileUrl)
          break
        case 'delete':
          this.filesList[key].splice(index, 1)
          break
      }
    },
    // 保存
    async saveSubmit() {
      const params = {
        completionMaterialFileIds: mapArrayStr(
          this.filesList['completionMaterialFileIds'],
          'fileId'
        ), // 项目竣工材料
        constructionMaterialFileIds: mapArrayStr(
          this.filesList['constructionMaterialFileIds'],
          'fileId'
        ), // 项目施工材料
        otherMaterialFileIds: mapArrayStr(
          this.filesList['otherMaterialFileIds'],
          'fileId'
        ), // 其他材料
        signMaterialFileIds: mapArrayStr(
          this.filesList['signMaterialFileIds'],
          'fileId'
        ), // 项目签约材料
        startWorkMaterialFileIds: mapArrayStr(
          this.filesList['startWorkMaterialFileIds'],
          'fileId'
        ), // 项目开工材料
        projectId: this.$route.query.projectId || null
      }
      if (
        !params['completionMaterialFileIds'] &&
          !params['constructionMaterialFileIds'] &&
          !params['otherMaterialFileIds'] &&
          !params['signMaterialFileIds'] &&
          !params['startWorkMaterialFileIds']
      ) {
        return this.$message.warning('请上传文件材料')
      }
      try {
        const data = await saveFileList(params)
        if (data.code === 0) {
          this.$message.success('保存成功')
          this.$router.push('/keyproject')
        } else {
          this.$message.warning(data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .file {
    margin-top: 15px;
  }
  .file_list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    // padding: 0 15px;
    margin: 10px 10px 0 10px;
    background-color: #f3f3f3;
    box-sizing: border-box;

    .file_list_left {
      flex: 1;
      display: flex;
      flex-direction: row;
      // justify-content: center;
      align-items: center;
      border-right: 1px dashed #d7d7d7;
      .file_list_left_l {
        background-color: #d7d7d7;
        min-height: 120px;
        line-height: 120px;
        font-weight: bold;
        font-size: 14px;
        color: #333;
        flex: 1;
        height: 100%;
        text-align: center;
      }
      .file_list_left_r {
        flex: 1;
        text-align: center;
        padding: 0 20px;
        .tips {
          margin-top: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #edb1d2;
        }
      }
    }
    .file_list_right {
      flex: 1.5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      transition: all ease-in 0.5s;
      .file_list_right_l {
        font-weight: 600;
        font-size: 14px;
        color: #4768c2;
      }
      .file_list_right_r {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // padding: 5px 0;
        .filename {
          color: #4768c2;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }
  .save {
    text-align: center;
  }
  .title {
    position: relative;
  }
  .handle {
    position: absolute;
    right: 0;
  }
</style>
