import Cookies from 'js-cookie'
import setting from '../setting'
export function setCookies(name, val) {
  Cookies.set(setting.tokenKey, val, { expires: 1 })
}
export function getCookies(name) {
  return Cookies.get(setting.tokenKey)
}
export function remoteCookies() {
  Cookies.remove(setting.tokenKey)
}
