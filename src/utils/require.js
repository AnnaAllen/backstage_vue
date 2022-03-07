import axios from 'axios'
import Vue from 'vue'

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token') || '';
    //   const token = '8f9ed1e44fb09c7838aaa2305d981551'
      config.headers['Token'] = token;
      return config;
    },
    (err) => Promise.reject(err)
  );
  
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (err) => {
      if(err.response.data.message) Vue.prototype.$message.error(err.response.data.message);
      return Promise.reject(err);
    }
  );
  
  
  export default instance;