import { requestLogin, requestLogout, login, logout, getInfo } from '@/api/user'
import { selectCount } from '@/api/table'
import { getToken, setToken, removeToken,getUser,setUser,removeUser,setRole,removeRole,setMenuData,removeMenuData,getRole } from '@/utils/auth'
import { resetRouter } from '@/router'
import jwt from 'jwt-decode';// jwt-decode 解析token
import { get } from '@/utils/request';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    warnNum: 0
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
  },
  SET_WARNNUM: (state, warnNum) => {
    state.warnNum = warnNum
  }
}

const actions = {
  // get warnnum
  getWarnNum({ commit }, state){
    return new Promise((resolve, reject) => {
      let role = JSON.parse(getRole())
      let user = JSON.parse(getUser())
      let para ={}
      para.roleId = role
      para.organizaId = user.organizationId
      para.userId = user.userId
      selectCount(para).then(response => {
        console.log(response)
        const data = response
        let totle = data.data.eCount+data.data.pCount
        let para ={}
        para.totle=totle;
        para.eCount=data.data.eCount;
        para.pCount=data.data.pCount;
        commit('SET_WARNNUM', para)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      requestLogin({ username: username.trim(), password: password }).then(response => {
        const data = response
        console.log(data.data)
        setToken(data.data.token)
        setUser(data.data.user)
        console.log(data.data.data)
        setRole(data.data.roleId)
        setMenuData(data.data.data)
        commit('SET_NAME', data.data.user.name)
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
        const data = JSON.parse(getUser())
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(data)
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
        removeToken() // must remove  token  first
        removeUser() 
        removeRole()
        removeMenuData()
        resetRouter()
        commit('RESET_STATE')
        resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUser() 
      removeRole()
      removeMenuData()
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

