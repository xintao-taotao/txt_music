import HttpRequest from './axios';
import config from '../config/config'

const baseUrl = process.env.NODE_ENV === "development" ? config.URL : config.ROOT;
const axios = new HttpRequest(baseUrl)
export default axios;