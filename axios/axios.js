import axios from 'axios'
import _this from '../src/main'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 9000,
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
    instance.interceptors.response.use(data => {// 响应成功关闭loading
      console.log(data);
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