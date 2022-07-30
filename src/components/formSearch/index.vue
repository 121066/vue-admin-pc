<template>
  <div class="form-search">
    <el-row :gutter="10">
      <template v-for="item in opts">
        <el-col :span="6" :key="item.key">
          <el-row class="e_row" v-if="item.type === 'input'">
            <el-col :span="8"
              ><label>{{ item.label }}:</label></el-col
            >
            <el-col :span="16">
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
            <el-col :span="8"
              ><label>{{ item.label }}:</label></el-col
            >
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
            <el-col :span="8"
              ><label>{{ item.label }}:</label></el-col
            >
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
            <el-col :span="8"
              ><label>{{ item.label }}:</label></el-col
            >
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
              >
              </el-date-picker>
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
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="e_row" v-if="item.type === 'daterange'">
            <el-col :span="8"
              ><label>{{ item.label }}:</label></el-col
            >
            <el-col :span="16">
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
            <el-col :span="8"
              ><label>{{ item.label }}:</label></el-col
            >
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
      <el-col :span="3">
        <div class="g-box-title-btn">
          <el-button type="primary" plain size="small" @click="search"
            >查询</el-button
          >
          <el-button type="info" plain size="small" @click="reset"
            >重置</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    opts: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      isshow: false,
      searchForm: {},
    }
  },
  methods: {
    search() {
      this.$emit('formSearch', this.searchForm)
    },
    reset() {
      this.searchForm = {}
      this.$emit('formSearch', this.searchForm)
    },
  },
}
</script>
<style lang="scss" scoped>
.form-search {
  // width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  background: #fff;
  flex-wrap: wrap;
  .e_row {
    flex: 1;
    margin: 10px 0;
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
    font-size: 14px;
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
</style>
