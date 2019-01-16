import axios from 'axios'


class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 90000,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config;
  }
  distroy(url) {
    delete this.queue[url];
    // if (!Object.keys(this.queue).length) {

    // }
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options)
    return instance(options)
  }
}
export default HttpRequest