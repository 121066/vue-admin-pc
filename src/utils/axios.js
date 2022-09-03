import axios from 'axios'
import Config from '@/setting'
import { getCookies, remoteCookies } from '@/utils/cookies'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/',
  timeout: Config.timeout,
})
request.interceptors.request.use(
  (config) => {
    if (getCookies()) {
      config.headers['Authorization'] = getCookies()
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
request.interceptors.response.use(
  (resopnse) => {
    // if (resopnse.data.code !== 0) {
    //   Message.error(`请求失败${response.data.msg || resopnse.data.message}`)
    // } else {
    //   return new Promise.resolve((resolve, reject) => {
    //     resolve(response.data)
    //   })
    // }
    return resopnse.data
  },
  (error) => {
    if (axios.isCancel(error)) {
      throw error.message
    } else if (error.resopnse) {
      let code = error.resopnse.status
      switch (code) {
        case 401:
          remoteCookies()
          window.location.href = window.location.href
          break
        case 502:
          Message.error(error.resopnse.message || '服务器错误')
      }
    } else {
      Message.error(error || '请求超时')
    }
    return Promise.reject()
  }
)
export default request
