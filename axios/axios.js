import axios from 'axios'
import _this from '../src/main'
import {
  toJson
} from '../src/utils/utils'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config;
  }
  distroy(url) {
    delete this.queue[url];
  }
  interceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      let params = !config.params ? {} : config.params;
      config.params = params;
      this.queue[url] = true;
      return config;
    }, (error) => {
      error(getLangStr['networkError']);
      return Promise.reject(error);
    });
    instance.interceptors.response.use(res => {
      res.data.code = parseInt(res.data.code);
      let obj = toJson(res.data);
      if (obj) {
        res.data = obj
      }
      let code = res.data.code;
      let data = res.data;
      let status = res.status;
      return {
        code,
        data,
        status
      };
    }, err => {
      switch (err.request.status) {
        case 202:
          _this.$Message.error('正确请求但是结果在处理中，请稍后请求');
          break;
        case 303:
          _this.$Message.error('请使用get来请求资源');
          break;
        case 401:
          _this.$Message.error('没有认证信息！');
          break;
        case 403:
          _this.$Message.error('没有权限！');
          break;
        case 408:
          _this.$Message.error('请求超时！');
          break;
        case 500:
          _this.$Message.error('服务器错误！');
          break;
        case 501:
          _this.$Message.error('请求还没有被实现！');
          break;
        case 509:
          _this.$Message.error('密码错误超过限制');
          break;
      }
      err.response.data.code = parseInt(err.response.data.code);
      let obj = toJson(err.response.data);
      if (obj) {
        err.response.data = obj
      }
      let code = err.response.data.code;
      let data = err.response.data;
      let status = err.response.status;
      typeof code === 'number' && window.isNaN(code) ? code = 201 : code = code;
      return {
        code,
        data,
        status
      };
    })
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest;