import * as axios from 'axios'
import webConf from '../constant/web'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  // options.baseURL = `http://${webConf.nuxt.host}:${webConf.nuxt.port}`
  options.baseURL = process.env.baseUrl
}
export default axios.create(options)
