import { capitalInfoObj, monthObj } from '@/common/keyproject'
import { fileUpload, fileInfo } from '@/api/upload'
import { Message } from 'element-ui'
export const handleRoule = function(list, form) {
  const rules = {}
  const triggerList = [
    'projectClassification',
    'projectCategory',
    'constructionNature',
    'investmentType',
    'communityId'
  ]
  for (const key in form) {
    rules[key] = [
      {
        required: true,
        message: `请输入${list[key]}`,
        trigger: triggerList.includes(key) ? 'change' : 'blur'
      }
    ]
  }
  return rules
}
export function handleEcho(form, list) {
  const obj = {}
  for (const key in form) {
    if (key === 'createdTime') {
      obj[key] = [
        list['constructionCycleStartYear'],
        list['constructionCycleEndYear']
      ]
    } else if (key === 'belongsYear') {
      obj[key] = list['belongsYear'] + ''
    } else if (list[key] || !list[key]) {
      obj[key] = list[key]
    }
  }
  return obj
}
export function maxminList(min, max) {
  const arr = []
  const addForm = []
  const yearObj = {}
  const time = new Date().getFullYear()
  for (let i = min; i <= max; i++) {
    if (i <= time) {
      arr.push(i)
      addForm.push({
        ...capitalInfoObj,
        ...monthObj,
        update: false,
        projectCycleYear: i
      })
      yearObj[i] = {
        ...capitalInfoObj,
        ...monthObj,
        update: false,
        projectCycleYear: i
      }
    }
  }
  return { arr, addForm, yearObj }
}
// 复制
export function Copy(content) {
  if (!document.queryCommandSupported('copy')) {
    // 不支持
    return false
  }

  const textarea = document.createElement('textarea')
  textarea.value = content
  textarea.readOnly = 'readOnly'
  document.body.appendChild(textarea)
  textarea.select() // 选择对象
  textarea.setSelectionRange(0, content.length) // 核心
  const result = document.execCommand('copy') // 执行浏览器复制命令
  textarea.remove()
  return result
}
// 文件上传
export function setFileUpload(params) {
  if (params) return params
  const input = document.getElementById('file_btn')
  input.removeEventListener('change', e => console.log('a'))
  input.click()
  input.addEventListener(
    'change',
    async function(e) {
      const types = ['rar', 'pdf', 'docx', 'doc', 'jpg', 'png', 'xlsx']
      const files = e.target.files
      const type = files[0].name.split('.')[files[0].name.split('.').length - 1]
      if (files[0].size >= 1024 * 20 * 1024) {
        const options = {
          message: '超出上传文件大小限制20M',
          type: 'warning'
        }
        Message(options)
        return false
      }
      if (!types.includes(type)) {
        const options = {
          message: '文件格式不正确，请重新上传',
          type: 'warning'
        }
        Message(options)
        return false
      }

      const fd = new FormData()
      fd.append('files', files[0])
      fd.append('sourceId', 1)
      const { data } = await fileUpload(fd)
      params = data
    },
    false
  )
  input?.removeEventListener('change', () => console.log('a'))
  const v = input.outerHTML
  input.outerHTML = v
  // return this
}
export async function callback(e) {
  const types = ['rar', 'pdf', 'docx', 'doc', 'jpg', 'png', 'xlsx']
  const files = e.target.files
  const type = files[0].name.split('.')[files[0].name.split('.').length - 1]
  if (files[0].size >= 1024 * 20 * 1024) {
    const options = {
      message: '超出上传文件大小限制20M',
      type: 'warning'
    }
    Message(options)
    return false
  }
  if (!types.includes(type)) {
    const options = {
      message: '文件格式不正确，请重新上传',
      type: 'warning'
    }
    Message(options)
    return false
  }

  const fd = new FormData()
  fd.append('files', files[0])
  fd.append('sourceId', 1)
  const { data } = await fileUpload(fd)
  return data
}
// 数组转字符串
export function mapArrayStr(val, key) {
  if (Array.isArray(val) && val.length > 0) {
    return val.map(item => item[key]).join(',')
  } else {
    return ''
  }
}
// 字符串转数组
export function strArray(str, type) {
  if (!str) return
  return str.split(`${type || ','}`)
}
// 处理文件回显
export function handleFile(obj, keyList) {
  for (const key in keyList) {
    if (obj[key]) {
      const arr = strArray(obj[key])
      if (arr.length <= 0) return
      arr.forEach(async item => {
        const { data } = await fileInfo({ fileIds: item })
        keyList[key].push(data[0])
      })
    }
  }
  return keyList
}
