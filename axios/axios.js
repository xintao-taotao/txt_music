import axios from 'axios'
import _this from '../src/main'
import Talert from '../src/views/Components/talert/index.vue'
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
      if (err.request.status == 202) {
        //正确请求但是结果在处理中，请稍后请求
        
      } else if (err.request.status == 301) {
        //地址已被转移！
        _this.$modal.Alert('地址已被转移！','asdasdasdsa','prompt');
        // _this.$VAlert.success('保存成功')
      } else if (err.request.status == 303) {
        //请使用get来请求资源
      } else if (err.request.status == 400) {
        //请求错误
      } else if (err.request.status == 401) {
        //没有认证信息！
      } else if (err.request.status == 403) {
        //没有权限！
      } else if (err.request.status == 404) {
        //内容不存在！
      } else if (err.request.status == 408) {
        //请求超时！
      } else if (err.request.status == 500) {
        //服务器错误！
      } else if (err.request.status == 501) {
        //请求还没有被实现！
      } else if (err.request.status == 502) {
        //网络错误！
      } else if (err.request.status == 503) {
        //服务暂时不可用！
      }

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