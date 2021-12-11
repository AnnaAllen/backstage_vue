import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

instance.interceptors.request.use(
    (config) => {
      // const token = sessionStorage.getItem('token') || '';
    //   const token = '8f9ed1e44fb09c7838aaa2305d981551'
      // config.headers['X-Auth0-Token'] = token;
      return config;
    },
    (err) => Promise.reject(err)
  );
  
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (err) => {
      Toast('服务器异常，请稍后再试');
      return Promise.reject(err);
    }
  );
  
  
  export default instance;