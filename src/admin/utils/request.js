import axios from 'axios';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  validateStatus: function(status) {
    return [200, 201, 204, 422, 401, 400, 404, 429, 403].indexOf(status) !== -1; // 默认的
  }
});

service.interceptors.request.use(config => {
  config.headers['authorization'] = 'test'; // 让每个请求携带自定义token 请根据实际情况自行修改
  return config;
});

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const status = response.status;
    const res = response.data;
    if ([200, 201, 204].indexOf(status) !== -1) {
      return response.data;
    }
    if ([422].indexOf(status) !== -1) {
      return Promise.reject(res);
    }
    if ([400, 404, 429, 403].indexOf(status) !== -1) {
      return Promise.reject(res);
    }
    if ([401].indexOf(status) !== -1) {
      return Promise.reject(res);
    }
  },
  error => {
    // 处理错误
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
