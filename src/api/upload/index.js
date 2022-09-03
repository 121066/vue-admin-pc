import request from '@/utils/axios'
const api = '/user-server'
// 通用文件上传 - 上传文件
export function fileUpload(data) {
  return request({
    url: `/user-server/v1/attachedFile/upload`,
    method: 'post',
    data,
  })
}
// 文件查询fileIds
export function fileInfo(params) {
  return request({
    url: `${api}/v1/attachedFile/fileInfo`,
    method: 'get',
    params,
  })
}
