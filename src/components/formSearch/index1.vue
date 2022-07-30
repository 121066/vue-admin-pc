<!--
* 参数传入： config(数据配置项)
* 触发方法： search(opt)
            opt: 返回数据
* 注意： 如果有标题，则标题配置项开始，到下一个标题配置项之间的内容为第一个标题配置下的属性
*使用规则:
     1、标题的配置项
        {
          label: 标题名
          type: 'text'
        }
     2、输入框配置项
        {
          key: 键名（一般是设定为接口的字段名）,
          label: 标签项,
          type: 'input',
          val: ''   //默认值,
          placeholder: ''
        }
      3、下拉框配置
        {
          key: 键名（一般是设定为接口的字段名）,
          label: 标签项,
          type: 'select',
          val: '',    //默认值
          selects: []   //模块-集合
          filterable: true //配置下拉选项是否可以搜索 (可全量获取列表) ： true => 可搜， false => 不可搜
          remote: 远程搜索
          selectsParams: {} // 远程查询参数
        }
      4.单选框配置
      {
        key: 键名（一般是设定为接口的字段名）,
        label: 标签项,
        type: 'radio',
        val: 0,  //默认值
        options: [{    //options: radio项
          label: '是',
          value: 1
        },{
          label: '不过滤',
          value: 0,
        }]
      }
      5. 时间配置
      {
        key: 键名（一般是设定为接口的字段名）,
        label: 标签项,
        type: 时间类型： date、 daterange、datetimerange,
        val: 0,  //默认值
      }
*
*示例：
*opts: [
        {
          label: '客户名称',
          type: 'remoteSelect',
          key: 'customerName',
          val: '',
          placeholder: '',
          filterable: true,
          remote: true,
          selects: [],
          action: 'entityEnums/fetchCustomerListForOpt'
        },
        {
          label: '客户编码',
          type: 'input',
          key: 'customerNumber',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '创建日期',
          type: 'date',
          key1: 'startTime',
          key2: 'endTime',
          placeholder1: '开始日期',
          placeholder2: '结束日期',
        },
        {
          label: '客户來源',
          type: 'select',
          key: 'customerSource',
          val: '',
          placeholder: '',
          filterable: true,
          selects: [],
          action: 'enums/fetchEnumOptions',
          enumsType: 'CustomerSource'
        },
        {
          label: '付款账户类型',
          type: 'select',
          key: 'paymentAccountType',
          val: '',
          placeholder: '',
          filterable: true,
          selects: [],
          action: 'enums/fetchEnumOptions',
          enumsType: 'PaymentAccountType'
        },
        {
          label: '开关',
          type: 'switch',
          key: 'customerStatus',
          val: '1',
        },
      ]
 -->
<template>
  <div class="drop-box g-box">
    <slot name="title">
      <div class="g-box-title customer-list-title">
        <i class="el-icon-search"></i>
        查询条件
        <div class="g-box-title-btn">
          <el-button type="success" size="mini" @click="search()">搜索</el-button>
          <el-button type="warning" size="mini" @click="reset()">重置</el-button>
        </div>
      </div>
    </slot>
    <div class="form-search">
      <div class="content">
        <el-row :gutter="10">
          <template v-for="(item,index) in formOpt">
            <el-col v-if="isshow || (!isshow && index < 3)" :span="8" :key="item.key" class="list" v-show="!item.hidden">
              <!-- 增加hidden参数 -->
              <el-row v-if="item.type === 'input'">
                <el-col :span="8"><label>{{item.label}}:</label></el-col>
                <el-col :span="16">
                  <el-input :placeholder="item.placeholder ? item.placeholder : '请输入'+item.label" v-model="searchForm[item.key]" size="small" :clearable="!!item.clearable"></el-input>
                </el-col>
              </el-row>
              <el-row v-if="item.type === 'remoteSelect'">
                <el-col :span="8"><label>{{item.label}}:</label></el-col>
                <el-col :span="16">
                  <el-select v-model="searchForm[item.key]" :multiple="item.multiple" :filterable="!!item.filterable" style="width: 100%;" :placeholder="item.placeholder ? item.placeholder : '请输入'+item.label" :clearable="!!item.clearable" :remote="!!item.remote" :remote-method="remoteMethod(item)" size="small" @focus="handleRemoteSelectFocus(item)" :loading="optionLoading">
                    <el-option v-for="el in item.selects" :key="el.value" :label="el.label" :value="el.value"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row v-if="item.type === 'select'">
                <el-col :span="8"><label>{{item.label}}:</label></el-col>
                <el-col :span="16">
                  <el-select v-model="searchForm[item.key]" :multiple="item.multiple" :filterable="!!item.filterable" :clearable="!!item.clearable" style="width: 100%;" :placeholder="item.placeholder ? item.placeholder : '请输入'+item.label" size="small" @focus="handleSelectFocus(item)">
                    <el-option v-for="el in item.selects" :key="el.value" :label="el.label" :value="el.value"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row v-if="item.type === 'date'">
                <el-col :span="8"><label>{{item.label}}:</label></el-col>
                <el-col :span="7">
                  <el-date-picker v-model="searchForm[item.key1]" type="date" size="small" @change="change(item.key1)" :value-format="item.format || 'yyyy-MM-dd'" :picker-options="item.pickerOptionsStart || pickerOptionsStart" :placeholder="item.placeholder1 ? item.placeholder1 : item.label">
                  </el-date-picker>
                </el-col>
                <el-col :span="2"><label>至</label></el-col>
                <el-col :span="7">
                  <el-date-picker v-model="searchForm[item.key2]" type="date" size="small" @change="change(item.key2)" :value-format="item.format || 'yyyy-MM-dd'" :picker-options="item.pickerOptionsEnd || pickerOptionsEnd" :placeholder="item.placeholder2 ? item.placeholder2 : item.label">
                  </el-date-picker>
                </el-col>
              </el-row>
              <el-row v-if="item.type === 'daterange'">
                <el-col :span="8"><label>{{item.label}}:</label></el-col>
                <el-col :span="16">
                  <el-date-picker v-model="searchForm[item.key]" type="daterange" size="small" @change="change(item.key)" :value-format="item.format || 'yyyy-MM-dd'" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
                </el-col>
              </el-row>
              <el-row v-if="item.type === 'switch'">
                <el-col :span="8"><label>{{item.label}}:</label></el-col>
                <el-col :span="16">
                  <g-switch v-model="searchForm[item.key]" active-value="1" inactive-value="0" size="small"></g-switch>
                </el-col>
              </el-row>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
    <div v-if="formOpt.length > 3" class="drop-font" @click="dropDown()">
      <slot name="footer"></slot>
      <i v-if="isshow" class="el-icon-caret-top"></i>
      <i v-else class="el-icon-caret-bottom"></i>
      <span v-if="isshow">隐藏</span>
      <span v-else>更多</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opts: {
      type: Array,
      default: []
    },
    extraParams: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    }
  },
  data() {
    return {
      isshow: false,
      searchForm: {},
      defaultForm: {},
      formOpt: [],
      optionLoading: false,
      pickerOptionsStart: {
        disabledDate: this.disabledDateStart
      },
      pickerOptionsEnd: {
        disabledDate: this.disabledDateEnd
      }
    }
  },
  mounted() {
    this.process();
  },
  methods: {
    // props 数据处理
    process() {
      let formOpt = [];
      let form = {}
      this.opts.forEach((item) => {
        let opt = Object.assign({}, item);
        formOpt.push(opt);
        // 设置默认值
        if (item.val !== null && item.val !== undefined && item.val !== '') {
          form[item.key] = item.val
        } else if (item.val1 !== null && item.val1 !== undefined && item.val1 !== ''
          && item.val2 !== null && item.val2 !== undefined && item.val2 !== '') {
          form[item.key1] = item.val1;
          form[item.key2] = item.val2;
        }
      })
      this.formOpt = formOpt;
      this.searchForm = form
      this.defaultForm = { ...form }
    },
    change(key) {
      this.$emit('update', {
        [key]: this.searchForm[key]
      })
    },
    handleRemoteSelectFocus(item) {
      if (!item.selects || item.selects.length === 0) {
        this.getOptions(null, item)
      }
    },
    handleSelectFocus(item) {
      if (!item.selects || item.selects.length === 0) {
        this.getEnumOptions(item)
      }
    },
    // 远程查询
    remoteMethod(item) {
      return (val) => {
        // console.log(val, item)
        this.getOptions(val, item)
      }
    },
    async getOptions(val, item) {
      this.optionLoading = true
      let params = {
        value: val,
        ...item.params
      }
      const result = await this.$store.dispatch(item.action, params)
      this.optionLoading = false
      item.selects = result
    },
    async getEnumOptions(item) {
      const result = await this.$store.dispatch(item.action, item)
      item.selects = result
    },
    // 搜索数据处理
    search() {
      this.$emit('search', this.searchForm)
    },
    reset() {
      this.searchForm = { ...this.defaultForm }
      this.$emit('search', this.searchForm)
    },
    dropDown() {
      this.isshow = !this.isshow;
    },
    disabledDateStart(time) {
      if (this.searchForm.endTime) {
        return time.getTime() > new Date(this.searchForm.endTime).getTime()
      } else {
        return false
      }
    },
    disabledDateEnd(time) {
      if (this.searchForm.startTime) {
        return time.getTime() < (new Date(this.searchForm.startTime).getTime() - 3600000 * 8)
      } else {
        return false
      }
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
.form-search {
  .content {
    padding: 10px 10px 0;
    font-size: 14px;
    .con-tit {
      line-height: 26px;
      text-indent: 5px;
    }
    .el-col {
      margin-bottom: 10px;
      label {
        line-height: 32px;
        text-align: center;
        display: block;
      }
    }
    .el-radio__label {
      font-size: 14px;
    }
    .el_radio_title {
      font-size: 14px;
    }
    .text {
      border-bottom: 1px solid #e5e5e5;
      font-size: 14px;
      padding-bottom: 10px;
    }
    .btn {
      text-align: center;
    }
    .el-date-editor {
      width: 100%;
    }
  }
  .form-list-title {
    .g-box-title-btn {
      i {
        vertical-align: top;
        font-size: 22px;
        cursor: pointer;
        line-height: 40px;
      }
    }
  }
}
</style>