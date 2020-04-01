import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
var millisecond = new Date().getTime();
var expiresTime = new Date(millisecond + 60 * 1000 * 1);
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,expiresTime)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
