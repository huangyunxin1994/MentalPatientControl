import {get,post} from '@/utils/request'
let base = '';
export const requestLogin = params => { return post(`${base}/login`, params, {emulateJSON: true}); };
export const requestLogout = params => { return get(`${base}/loginOut`, params); };

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
