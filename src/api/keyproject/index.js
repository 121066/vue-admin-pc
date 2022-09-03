import request from '@/utils/axios'
const api = '/edmp-api'
// 获取重点项目列表
export function getKeyProject(params) {
  return request({
    url: `./json_data/page.json`,
    method: 'get',
    params,
  })
}
// 查询项目字典
export function getProjectDictionary() {
  return request({
    url: `./json_data/dictionary.json`,
    method: 'get',
  })
}
// 获取扬名街道社区
export function getSqList() {
  return request({
    url: `./json_data/getSubGroup.json`,
    method: 'get',
  })
}
// 导出项目
export function exportProject(params) {
  return request({
    url: `/edmp-api/v1/projectLibrary/export`,
    method: 'get',
    responseType: 'blob',
    params,
  })
}
// 新增和修改项目
export function addProject(data) {
  return request({
    url: `/edmp-api/v1/projectLibrary/saveOrUpdate`,
    method: 'post',
    data,
  })
}
// 查看详情
export function seeDetail(params) {
  return request({
    url: `./json_data/detail.json`,
    method: 'get',
    params,
  })
}
// 删除项目
export function deleteProject(data) {
  return request({
    url: `/edmp-api/v1/projectLibrary/delete`,
    method: 'post',
    data,
  })
}
// 项目进展
export function projectProgress(params) {
  return request({
    url: `/edmp-api/v1/projectProgress/list`,
    method: 'get',
    params,
  })
}
// 项目进展统计概览
export function getStatistics() {
  return request({
    url: `/edmp-api/v1/projectProgress/statistics`,
    method: 'get',
  })
}
// 项目进展统计列表查询
export function getStatisticsList(params) {
  return request({
    url: `/edmp-api/v1/projectProgress/page`,
    method: 'get',
    params,
  })
}
// 查看项目文件归档
export function getFileList(params) {
  return request({
    url: `/edmp-api/v1/projectLibrary/getFileArchived`,
    method: 'get',
    params,
  })
}
// 保存项目文件归档
export function saveFileList(data) {
  return request({
    url: `/edmp-api/v1/projectLibrary/saveFileArchived`,
    method: 'post',
    data,
  })
}
