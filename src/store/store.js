import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    role : null
  },
  plugins: [createPersistedState()],
  mutations: {
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, {token, user, role}){
        state.status = 'success'
        state.token = token
        state.user = user
        state.role = role
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = '' 
        state.role = null
        state.user = null
      },
  },
  actions: {
    loginUser({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:8000/api/system/login', data: user, method: 'POST' })
          .then(resp => {
              if(resp.data.status_code!=200){
                // console.log("response", resp)
                commit('auth_error')
                localStorage.removeItem('token')
                console.log("err",err);
                console.log("err",resp);
                reject(resp.data.message)
              }
              else{
            const token = resp.data.data.access_token
            const user = resp.data.data.user
            const role = resp.data.data.role
            // console.log("user",user)
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            localStorage.setItem('user',user.id)
            axios.defaults.headers.common['Authorization'] = token
            axios.defaults.headers.common['Authorization'] = "Bearer " + token
            commit('auth_success', {token, user, role})
            
            resolve(resp)
            console.log("response",resp)
              }
          })
          .catch(
            
          )
        })
    }, 
    registerAdmin({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:8000/api/admin/register', data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
    registerStudent({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:8000/api/student/register', data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
    registerTeacher({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://localhost:8000/api/user/register', data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
    logout({commit}){
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user : state => state.user,
    role : state => state.role
  }
})