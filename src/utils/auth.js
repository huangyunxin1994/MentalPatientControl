import Cookies from 'js-cookie'

const TokenKey = 'TokenKey'
const User="User"
const RoleId="roleId"
var millisecond = new Date().getTime();
var expiresTime = new Date(millisecond + 60 * 1000 * 1);
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUser() {
  return Cookies.get(User)
}
export function setUser(user) {
  return Cookies.set(User, user)
}
export function removeUser() {
  return Cookies.remove(User)
}

export function getRole() {
  return Cookies.get(RoleId)
}
export function setRole(roleId) {
  return Cookies.set(RoleId, roleId)
}
export function removeRole() {
  return Cookies.remove(RoleId)
}