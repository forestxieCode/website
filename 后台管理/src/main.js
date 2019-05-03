// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import '@/app/js/polyfill'

import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import jquery from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/app/js/axiosld'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development-test') {
  require('normalize.css')
  require('font-awesome/css/font-awesome.css')
  // require('element-ui/lib/theme-chalk/index.css')
}

Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('userToken')
// sessionStorage.removeItem('userToken')

if (process.env.NODE_ENV === 'production') {
  axios.defaults.timeout = 5000
} else {
  Vue.use(ElementUI)
}

Vue.use(VueQuillEditor)
Vue.use(jquery)


Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

axios.interceptors.request.use((config) => {
// 	if(config.method == 'post') {
// 		showFullScreenLoading()
// 	}
	return config;
}, (error) => {
	// tryHideFullScreenLoading();
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  const result = response.data
	// tryHideFullScreenLoading();
  // if (!result.success) ElementUI.Notification.error({ title: '接口返回失败信息', message: result.msg })
  return result
}, function (error) {
  // ElementUI.Notification.error({ title: '接口返回错误', message: error.message })
	// tryHideFullScreenLoading()
  return { error, success: false }
  // return Promise.reject(error)
})

// TODO: Delete
// document.cookie = 'pfuserToken=1d851a73b1c181f2e6f7b29ffea185fa8062a3b4'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
