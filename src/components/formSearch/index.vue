<template>
  <div class="form-search">
    <div class="form-list">
      <div v-for="(item, index) in formOpt" :key="index" class="form-item">
        <!-- 输入框 -->
        <div v-if="item.type === 'input'" class="form-content">
          <div class="form-title">{{ item.label }}:</div>
          <div class="form-value">
            <el-input
              v-model="searchForm[item.key]"
              :placeholder="
                item.placeholder ? item.placeholder : '请输入' + item.label
              "
              size="small"
              clearable
            />
          </div>
        </div>
        <!-- 选择框 -->
        <div v-if="item.type === 'select'" class="form-content">
          <div class="form-title">{{ item.label }}:</div>
          <div class="form-value">
            <el-select
              v-model="searchForm[item.key]"
              :multiple="item.multiple"
              :filterable="!!item.filterable"
              :clearable="!!item.clearable"
              style="width: 100%"
              :placeholder="
                item.placeholder ? item.placeholder : '请输入' + item.label
              "
              size="small"
            >
              <el-option
                v-for="el in item.selects"
                :key="el.id"
                :label="el.name"
                :value="el.id"
              />
            </el-select>
          </div>
        </div>
        <!-- 时间选择 -->
        <div v-if="item.type === 'daterange'" class="form-content">
          <div class="form-title">{{ item.label }}:</div>
          <div class="form-value">
            <el-row :gutter="6">
              <el-col :span="6" :xl="6">
                <el-date-picker
                  v-model="searchForm[item.key]"
                  style="width: 100%; min-width: calc(100% + 135px)"
                  type="daterange"
                  size="small"
                  :value-format="item.format || 'yyyy-MM-dd'"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="change(item.key, item.key2 || '')"
                />
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 日期选择 -->
        <div v-if="item.type === 'date'" class="form-content">
          <div class="form-title">{{ item.label }}:</div>
          <div class="form-value">
            <el-date-picker
              v-model="searchForm[item.key]"
              style="width: 100%"
              type="year"
              size="small"
              :value-format="item.format || 'yyyy'"
              :placeholder="item.placeholder"
              @change="change(item.key)"
            />
          </div>
        </div>
        <!-- 多选 -->
        <div v-if="item.type === 'remoteSelect'" class="form-content">
          <div class="form-title">{{ item.label }}:</div>
          <div class="form-value">
            <el-select
              v-model="searchForm[item.key]"
              multiple
              :filterable="!!item.filterable"
              style="width: 100%"
              :placeholder="
                item.placeholder ? item.placeholder : '请输入' + item.label
              "
              :clearable="!!item.clearable"
              :remote="!!item.remote"
              size="small"
            >
              <el-option
                v-for="el in item.selects"
                :key="el.id"
                :label="el.name"
                :value="el.id"
              />
            </el-select>
          </div>
        </div>
        <!-- 区域输入 -->
        <div v-if="item.type === 'inputs'" class="form-content">
          <div class="form-title">{{ item.label }}:</div>
          <div class="form-value">
            <div class="ints" style="width: 100%">
              <el-input
                v-model="searchForm[item.key]"
                type="number"
                :min="0"
                style="width: calc(50% - 12px)"
                :placeholder="item.placeholder || '请输入'"
              />
              <span style="margin: 0 10px">~</span>
              <el-input
                v-model="searchForm[item.key1]"
                type="number"
                style="width: calc(50% - 12px)"
                :placeholder="item.placeholder || '请输入'"
                @blur="blurChange($event, item.key, item.key1)"
              />
            </div>
          </div>
        </div>
      </div>
      <div :class="formOpt.length % 4 === 0 ? 'form-fixed' : 'form-btn'">
        <el-button type="primary" size="small" @click="search">查询</el-button>
        <el-button type="info" plain size="small" @click="reset">
          重置
        </el-button>
      </div>
    </div>
    <!-- <el-row :gutter="0">
      <template v-for="item in opt">
        <el-col :key="item.key">
          <el-row :gutter="0" class="e_row" v-if="item.type === 'input'">
            <el-col :span="3">
              <label>{{ item.label }}:</label>
            </el-col>
            <el-col :span="6">
              <el-input
                :placeholder="
                  item.placeholder ? item.placeholder : '请输入' + item.label
                "
                v-model="searchForm[item.key]"
                size="small"
                clearable
              ></el-input>
            </el-col>
          </el-row>
          <el-row class="e_row" v-if="item.type === 'remoteSelect'">
            <el-col :span="8">
              <label>{{ item.label }}:</label>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="searchForm[item.key]"
                :multiple="item.multiple"
                :filterable="!!item.filterable"
                style="width: 100%"
                :placeholder="
                  item.placeholder ? item.placeholder : '请输入' + item.label
                "
                :clearable="!!item.clearable"
                :remote="!!item.remote"
                :remote-method="remoteMethod(item)"
                size="small"
                @focus="handleRemoteSelectFocus(item)"
                :loading="optionLoading"
              >
                <el-option
                  v-for="el in item.selects"
                  :key="el.value"
                  :label="el.label"
                  :value="el.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="e_row" v-if="item.type === 'select'">
            <el-col :span="8">
              <label>{{ item.label }}:</label>
            </el-col>
            <el-col :span="16">
              <el-select
                v-model="searchForm[item.key]"
                :multiple="item.multiple"
                :filterable="!!item.filterable"
                :clearable="!!item.clearable"
                style="width: 100%"
                :placeholder="
                  item.placeholder ? item.placeholder : '请输入' + item.label
                "
                size="small"
                @focus="handleSelectFocus(item)"
              >
                <el-option
                  v-for="el in item.selects"
                  :key="el.value"
                  :label="el.label"
                  :value="el.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="e_row" v-if="item.type === 'date'">
            <el-col :span="8">
              <label>{{ item.label }}:</label>
            </el-col>
            <el-col :span="7">
              <el-date-picker
                v-model="searchForm[item.key1]"
                type="date"
                size="small"
                @change="change(item.key1)"
                :value-format="item.format || 'yyyy-MM-dd'"
                :picker-options="item.pickerOptionsStart || pickerOptionsStart"
                :placeholder="
                  item.placeholder1 ? item.placeholder1 : item.label
                "
              ></el-date-picker>
            </el-col>
            <el-col :span="2"><label>至</label></el-col>
            <el-col :span="7">
              <el-date-picker
                v-model="searchForm[item.key2]"
                type="date"
                size="small"
                @change="change(item.key2)"
                :value-format="item.format || 'yyyy-MM-dd'"
                :picker-options="item.pickerOptionsEnd || pickerOptionsEnd"
                :placeholder="
                  item.placeholder2 ? item.placeholder2 : item.label
                "
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row class="e_row" v-if="item.type === 'daterange'">
            <el-col :span="5">
              <label>{{ item.label }}:</label>
            </el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="searchForm[item.key]"
                type="daterange"
                size="small"
                @change="change(item.key)"
                :value-format="item.format || 'yyyy-MM-dd'"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-col>
          </el-row>
          <el-row class="e_row" v-if="item.type === 'switch'">
            <el-col :span="8">
              <label>{{ item.label }}:</label>
            </el-col>
            <el-col :span="16">
              <g-switch
                v-model="searchForm[item.key]"
                active-value="1"
                inactive-value="0"
                size="small"
              ></g-switch>
            </el-col>
          </el-row>
        </el-col>
      </template>
      <el-col :span="5">
        <div class="g-box-title-btn">
          <el-button type="primary" plain size="small" @click="search">
            查询
          </el-button>
          <el-button type="info" plain size="small" @click="reset">
            重置
          </el-button>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
export default {
  props: {
    opts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isshow: false,
      searchForm: {},
      opt: [],
      formOpt: [],
      copyForm: {},
    }
  },
  watch: {
    opts: {
      handler(val) {
        this.handlerData(val)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.handlerData()
  },
  methods: {
    handlerData() {
      const formOpt = []
      const form = {}
      this.opts.forEach((item) => {
        const opt = Object.assign({}, item)
        formOpt.push(opt)
        // 设置默认值
        if (item.val !== null && item.val !== undefined && item.val !== '') {
          form[item.key] = item.val
        } else if (
          item.val1 !== null &&
          item.val1 !== undefined &&
          item.val1 !== '' &&
          item.val2 !== null &&
          item.val2 !== undefined &&
          item.val2 !== ''
        ) {
          form[item.key1] = item.val1
          form[item.key2] = item.val2
        }
      })
      this.formOpt = formOpt
      this.searchForm = form
    },
    search() {
      const params = {
        ...this.searchForm,
        ...this.copyForm,
      }
      console.log(params)
      this.$emit('formSearch', params)
    },
    reset() {
      this.searchForm = {}
      this.copyForm = {}
      this.$emit('formSearch', this.searchForm)
    },
    handleSelectFocus(item) {},
    change(key, key2) {
      const val = JSON.parse(JSON.stringify(this.searchForm[key]))
      if (key2) {
        this.copyForm[key] = val[0]
        this.copyForm[key2] = val[1]
      }
      console.log(key, '?????', this.searchForm[key])
      // this.$emit("update", {
      //   [key]: this.searchForm[key],
      // });
    },
    blurChange(e, key, key1) {
      console.log(e, key, key1)
    },
  },
}
</script>
<style lang="scss" scoped>
.form-search {
  width: 100%;
  margin: 0 0 0 0;
  height: 100%;
  display: flex;
  .form-list {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: row;
    margin: 0 0 10px 0;
    background: #fff;
    flex-wrap: wrap;
    justify-content: flex-start;
    float: left;
    // height: 50px;
    .form-item {
      width: 22%;
      max-width: 23%;
      padding-right: 10px;
      align-items: center;
      margin: 10px 10px 10px 0;
      overflow: hidden;
      .form-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .form-title {
          line-height: 32px;
          text-align: left;
          display: block;
          color: #606266;
          vertical-align: middle;
          font-weight: 700;
          font-size: 12px;
          min-width: 75px;
        }
        .form-value {
          flex: 1;
          padding: 0 10px;
        }
      }
    }
    .form-btn {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      min-width: 200px;
      align-self: center;
    }
  }
}
.el-col {
  label {
    line-height: 32px;
    text-align: center;
    display: block;
    color: #606266;
    vertical-align: middle;
    font-weight: 700;
    font-size: 12px;
  }
}
.g-box-title-btn {
  padding: 10px 0;
  i {
    vertical-align: top;
    font-size: 22px;
    cursor: pointer;
    line-height: 40px;
  }
}
.ints {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.form-fixed {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  top: 10px;
}
</style>
