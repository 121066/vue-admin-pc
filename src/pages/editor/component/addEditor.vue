<template>
  <div>
    <el-dialog
      :title="title[type]"
      :visible.sync="value"
      :before-close="handleClose"
      append-to-body
      class="addDialog"
      center
      :close-on-click-modal="false"
      @open="open"
    >
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item
          label="政策标题:"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addForm.title"
            style="width: 320px"
            autocomplete="off"
            placeholder="请输入政策标题"
          />
        </el-form-item>
        <el-form-item
          label="政策领域:"
          prop="domain"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addForm.domain"
            class="w_100"
            multiple
            placeholder="请选择政策领域"
          >
            <el-option
              v-for="item in dataOptions['domain']"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="支持产业:"
          prop="industry"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addForm.industry"
            class="w_100"
            multiple
            placeholder="请选择产业"
            @change="changeSelect($event, 'industry')"
          >
            <el-option
              v-for="item in dataOptions['industry']"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="政策级别:"
          prop="level"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addForm.level"
            class="w_100"
            placeholder="请选择政策级别"
          >
            <el-option
              v-for="item in dataOptions['level']"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="支持方式:"
          prop="support"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addForm.support"
            class="w_100"
            multiple
            placeholder="请选择支持方式"
            @change="changeSelect($event, 'support')"
          >
            <el-option
              v-for="item in dataOptions['support']"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="企业阶段:"
          prop="stage"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addForm.stage"
            class="w_100"
            multiple
            placeholder="请选择"
            @change="changeSelect($event, 'stage')"
          >
            <el-option
              v-for="item in dataOptions['stage']"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="营业收入:"
          prop="income"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addForm.income"
            class="w_100"
            multiple
            placeholder="请选择"
            @change="changeSelect($event, 'income')"
          >
            <el-option
              v-for="item in dataOptions['income']"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="发文单位:"
          prop="authorDept"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addForm.authorDept"
            style="width: 320px"
            autocomplete="off"
            placeholder="请输入发文单位"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" style="margin-bottom: 30px">
          <label slot="label">
            <i style="color: red">*&nbsp;</i>
            政策原文:
          </label>
          <Editor v-if="editorShow" v-model="addForm.content" :height="400" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="submit">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Editor from '@/components/editor'
export default {
  components: { Editor },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    dataOptionsParams: {
      type: Object,
      default: () => {},
    },
    detail: {
      type: Object,
      default: () => {},
    },
    docId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      type: 'add',
      checked: false,
      checkedCities: [],
      addForm: {
        title: '',
        content: '',
        source: '',
        authorDept: '', // 发文单位
        domain: [], // 政策领域
        income: [], // 营业收入
        industry: [], // 支持产业
        level: '', // 政策级别
        stage: [], // 企业阶段
        support: [], // 支持方式
        domainName: '',
        industryName: '',
        isPublish: 1,
      },
      formLabelWidth: '100px',
      dialogFormVisible: true,
      isDisabled: false,
      rules: {
        title: [{ required: true, message: '请填写政策标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请上传公告内容', trigger: 'blur' },
        ],
        domain: [
          { required: true, message: '请选择政策领域', trigger: 'change' },
        ],
        income: [
          { required: true, message: '请选择营业收入', trigger: 'change' },
        ],
        industry: [
          { required: true, message: '请选择支持产业', trigger: 'change' },
        ],
        level: [
          { required: true, message: '请选择政策级别', trigger: 'change' },
        ],
        stage: [
          { required: true, message: '请选择企业阶段', trigger: 'change' },
        ],
        support: [
          { required: true, message: '请选择支持方式', trigger: 'change' },
        ],
        authorDept: [
          { required: true, message: '请填写发文单位', trigger: 'blur' },
        ],
      },
      fileList: [],
      dataOptions: {
        domain: [], // 政策领域
        income: [], // 营业收入
        industry: [], // 支持产业
        level: [], // 政策级别
        stage: [], // 企业阶段
        support: [], // 支持方式
      },
      editorShow: false,
      title: {
        add: '添加政策',
        update: '修改政策',
      },
      editor: '',
      index: '',
    }
  },
  watch: {},
  methods: {
    changeSelect(val, type) {
      const data = this.dataOptions[type]
      if (val.includes(1000)) {
        const list = data.map((item) => {
          return item.key
        })
      }
    },
    handleClose() {
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
      this.$emit('input', false)
      this.editorShow = false
      this.isDisabled = false
    },
    // open
    async open() {
      this.addForm = {}
      this.dataOptions = this.dataOptionsParams
      this.editorShow = true
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    // 提交
    submit() {
      if (!this.addForm.content) {
        return this.$message.warning('请填写政策原文')
      }
      // console.log(this.addForm)
      // return
      let params = JSON.parse(JSON.stringify(this.addForm))
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          if (this.type === 'add') {
            this.$message.success('添加政策成功')
            this.handleClose()
            let params = JSON.parse(JSON.stringify(this.addForm))
            this.$emit('addList', params, null)
          } else if (this.type === 'update') {
            this.handleClose()
            this.$emit('addList', params, this.index)
          } else {
            this.$message.warning(data.msg)
          }
        }
      })
    },
    // 获取详情
    async getDetail(row, index, type) {
      console.log(row, '???')
      this.index = index
      this.type = type
      this.$nextTick(() => {
        this.addForm = row
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.w_100 {
  max-width: 350px;
  min-width: 320px;
}
</style>
