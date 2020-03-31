import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: "http://192.168.1.3:8080", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      
      config.headers={'Content-Type':'application/x-www-form-urlencoded'}
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    switch (response.data.error) {
      case 401:
        response.data.msg = '未授权，请登录'
        break
      default:
        break
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
  // response => {
  //   const res = response.data
  //   // if the custom code is not 20000, it is judged as an error.
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message || 'Error',
  //       type: 'error',
  //       duration: 5 * 1000
  //     })

  //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // to re-login
  //       MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
  //         confirmButtonText: 'Re-Login',
  //         cancelButtonText: 'Cancel',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('user/resetToken').then(() => {
  //           location.reload()
  //         })
  //       })
  //     }
  //     return Promise.reject(new Error(res.message || 'Error'))
  //   } else {
  //     return res
  //   }
  // },
  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
)

export default service

/**
 * post 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
      service.post(url, Qs.stringify(data))
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
}
/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {params: data})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
