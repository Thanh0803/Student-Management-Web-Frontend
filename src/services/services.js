import axios from 'axios'
import store from '../store/store'
export function get(url) {
    return axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: false,
    })
  }
  export function put(url, payload) {
    return axios({
      method: 'PUT',
      url: url,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      },
    })
  }
  export function del(url) {
    return axios({
      method: 'DELETE',
      url: url,
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('token'),
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: false,
    })
  }
  export function post(url, payload) {
    return axios({
      method: 'POST',
      url: url,
      data: payload,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
        
      },
      withCredentials: false,
    })
  }