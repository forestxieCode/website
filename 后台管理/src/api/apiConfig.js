// 配置接口信息

// 这里写的是vue页面所用到的接口地址，静态页面像注册、登录等页面的接口需要修改static/lib/js/common.js里面的接口地址

// 配置后台接口地址

// 182.48.119.121   10.96.6.45
// http://182.48.119.121
const ORIGIN = process.env.NODE_ENV === 'production' ?
  'http://182.48.119.121:8085' :
  process.env.NODE_ENV === 'test-production' ?
  'http://182.48.119.121:8085' :
  process.env.NODE_ENV === 'development-test' ?
  'http://182.48.119.121:8085' :
  'http://182.48.119.121:8085'

// 配置后台资源地址
const ASSET_ORIGIN = process.env.NODE_ENV === 'production' ?
  'http://182.48.119.121:8085' :
  process.env.NODE_ENV === 'test-production' ?
  'http://182.48.119.121:8085' :
  process.env.NODE_ENV === 'development-test' ?
  'http://182.48.119.121:8085' :
  'http://182.48.119.121:8085'

const apiHost = {
  ORIGIN: ORIGIN,
  ASSET_ORIGIN: ASSET_ORIGIN
}
export default apiHost
