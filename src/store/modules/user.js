import { requestLogin, requestLogout, login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,getUser,setUser,removeUser,setRole,removeRole } from '@/utils/auth'
import { resetRouter } from '@/router'
import jwt from 'jwt-decode';// jwt-decode 解析token
import { get } from '@/utils/request';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      requestLogin({ username: username.trim(), password: password }).then(response => {
        const data = response
        console.log(data.data)
        setToken(data.data.token)
        setUser(data.data.user)
        console.log(data.data.roleId)
        setRole(data.data.roleId)
        commit('SET_NAME', data.data.data.name)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_TOKEN', data.data.token)
       
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
        const data = getUser()
        console.log(JSON.parse(data))
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(data)
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      requestLogout().then(() => {
        removeToken() // must remove  token  first
        removeUser() 
        removeRole()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUser() 
      removeRole()
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

