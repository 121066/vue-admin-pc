// 重点项目库搜索条件
export const opts = [
  {
    label: '项目名称',
    type: 'input',
    key: 'projectName',
    placeholder: '请输入'
  },
  {
    label: '项目归类',
    type: 'remoteSelect',
    key: 'projectClassification',
    placeholder: '请输入',
    selects: [{ id: 0, name: '全部' }]
  },
  {
    label: '项目类别',
    type: 'select',
    key: 'projectCategory',
    placeholder: '请输入',
    selects: []
  },
  {
    label: '所属社区',
    type: 'select',
    key: 'communityId',
    placeholder: '请输入',
    selects: []
  },
  {
    label: '投资类型',
    type: 'select',
    key: 'investmentType',
    placeholder: '请输入',
    selects: []
  },
  {
    label: '项目年份',
    type: 'date',
    placeholder: '请选择项目年份',
    key: 'belongsYear'
  },
  {
    label: '项目周期',
    type: 'daterange',
    placeholder: '请选择时间',
    key: 'constructionCycleStartYear',
    key2: 'constructionCycleEndYear'
  },
  {
    label: '计划总投资额',
    type: 'inputs',
    placeholder: '请输入',
    key: 'totalPlannedInvestmentStartAmount',
    key1: 'totalPlannedInvestmentEndAmount'
  }
]
export const keyOption = [
  { name: '全部', num: 100, type: '0' },
  { name: '市级', num: 10, type: '1' },
  { name: '区级', num: 120, type: '2' },
  { name: '街道', num: 20, type: '3' },
  { name: '技改', num: 22, type: '4' },
  { name: '政府投资', num: 12, type: '5' },
  { name: '民生实事', num: 21, type: '6' }
]
// 意向项目库搜索条件
export const optsIntention = [
  {
    label: '项目名称',
    type: 'input',
    key: 'projectName',
    placeholder: '请输入'
  },
  {
    label: '项目归类',
    type: 'remoteSelect',
    key: 'projectClassification',
    placeholder: '请输入',
    selects: []
  },
  {
    label: '项目类别',
    type: 'select',
    key: 'projectCategory',
    placeholder: '请输入',
    selects: []
  },
  {
    label: '项目年份',
    type: 'date',
    placeholder: '请选择项目年份',
    key: 'belongsYear'
  }
]
export const ruleList = {
  projectName: '项目名称',
  projectClassification: '项目归类',
  projectCategory: '项目类别',
  remark: '备注',
  constructionNature: '建设性质',
  investmentType: '投资类型',
  communityId: '所属社区',
  communityName: '所属社区',
  constructionUnitName: '建设单位名称',
  constructionUnitContactName: '建设单位联系人',
  constructionUnitContactPhone: '建设单位联系人联系电话',
  belongsYear: '所属年份',
  constructionUnitAddress: '项目建设地点',
  constructionCycleStartYear: '项目建设开始年份',
  constructionCycleEndYear: '项目建设结束年份',
  createdTime: '项目建设开始和结束年份',
  constructionScaleContent: '项目建设规模和内容',
  signingTime: '签约时间',
  landAcquisitionTime: '拿地时间',
  obtainConstructionPermitTime: '领取施工许可证时间',
  completionTime: '竣工时间',
  productionTime: '投产时间',
  includeTime: '列统入库时间',
  projectCycleInfoPlanList: '项目进展',
  projectProgressContent: '项目进展'
}
// 基本信息字段
export const basicInfoObj = {
  projectName: '', // 项目名称
  projectClassification: [], // 项目归类
  projectCategory: '', // 项目类别
  remark: '', // 备注
  constructionNature: '', // 建设性质
  investmentType: '', // 投资类型
  communityName: '', // 社区姓名
  communityId: '', // 社区id
  constructionUnitName: '', // 建设单位名称
  constructionUnitContactName: '', // 建设单位联系人姓名
  constructionUnitContactPhone: '', // 建设单位联系人电话
  belongsYear: '', // 所属年份
  constructionUnitAddress: '', // 项目建设地点
  createdTime: [], // 处理项目开始和结束时间
  constructionCycleStartYear: '', // 项目建设开始年份
  constructionCycleEndYear: '', // 项目建设结束年份
  constructionScaleContent: '', // 项目建设规模和内容
  // projectCycleInfoPlanList: '', // 投资信息及项目计划

  projectProgressContent: '' // 项目进展
}
// 项目投资信息及项目计划
export const capitalInfoObj = {
  projectCycleYear: '', // 年份
  totalPlannedInvestment: '', // 计划投资总额
  yearCumulativeCompletionInvestment: '', // 年度累计完成投资额
  projectCumulativeCompletionInvestment: '', // 项目累计完成投资额
  yearPlanInvestment: '', // 年度计划投资额
  yearTarget: '', // 年目标
  firstQuarterPromotionPlan: '', // 一季度推进计划
  secondQuarterPromotionPlan: '', // 二季度推进计划
  thirdQuarterPromotionPlan: '', // 三季度推进计划
  fourthQuarterPromotionPlan: '' // 四季度推进计划
}
// 月份投资额数据
export const monthObj = {
  id: '',
  january: '', // 一月完成投资额
  february: '', // 二月完成投资额
  march: '', // 三月完成投资额
  april: '', // 四月完成投资额
  may: '', // 五月完成投资额
  june: '', // 六月完成投资额
  july: '', // 七月完成投资额
  august: '', // 八月完成投资额
  september: '', // 九月完成投资额
  october: '', // 十月完成投资额
  november: '', // 十一月完成投资额
  december: '' // 十二月完成投资额
}
// 项目节点完成时间
export const nodeInfoObj = {
  signingTime: '', // 签约时间
  landAcquisitionTime: '', // 拿地时间
  obtainConstructionPermitTime: '', // 领取施工许可证时间
  completionTime: '', // 竣工时间
  productionTime: '', // 投产时间
  includeTime: '' // 入库时间
}
// 文件归档
export const saveFile = {
  completionMaterialFileIds: '项目竣工材料',
  constructionMaterialFileIds: '项目施工材料',
  otherMaterialFileIds: '其他材料',
  signMaterialFileIds: '项目签约材料',
  startWorkMaterialFileIds: '项目开工材料'
}
