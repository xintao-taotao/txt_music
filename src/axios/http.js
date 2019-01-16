import HttpRequest from './axios'

const baseUrl = 'http://localhost:3000';
const axios = new HttpRequest(baseUrl)
export default axios