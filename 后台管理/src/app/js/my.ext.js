const host = process.env.NODE_ENV === 'production'
  ? 'https://weixin.jcweixiaoyuan.com'
  : process.env.NODE_ENV === 'test-production'
    ? 'https://test-weixin.jcweixiaoyuan.com'
    : 'http://dev-lumen.jcweixiaoyuan.cn'
let consts = {
	cookie_prefix: "jc_schooladmin_",
	cookie_expires: 2, //设置cookie的有效时间
}

module.exports = {
	/**
	 * 获取url参数
	 * @param name  参数名
	 * by wuyi
	 **/
	GetQueryString: function(name) {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let r = window.location.search.substr(1).match(reg);
		if(r != null)
			return decodeURIComponent(r[2]);
		return null;
	},

	/**
	 *转换时间
	 */
	initDate: function (datar,type) {
		let Hours = new Date(datar).getHours();
		if(Hours<10){
			Hours = '0' + Hours
		}
		let Minutes = new Date(datar).getMinutes();
		if(Minutes<10){
			Minutes = '0' + Minutes
		}
		if(type == 1){
			return new Date(datar).getFullYear() + '-' + (new Date(datar).getMonth() + 1) + '-' + new Date(datar).getDate() + ' ' + Hours + ':' + Minutes
		}else{
			return new Date(datar).getFullYear() + '-' + (new Date(datar).getMonth() + 1) + '-' + new Date(datar).getDate()
		}
	},
	// 数组转字符串
	infoValue: function (value) {
	  let info = value.join('/')
	  return info
	},
	//是否是绝对地址
	isFullSite: function(url) {
		if(!~url.indexOf("http")) {
			return host + "/" + url
		} else {
			return url;
		}
	},
	getParam: function() {
		let search = location.search,
			reg = /[^\&]+=[^\&]+/g,
			arr, arrs, result = {};
		if(this.isAndriod() || this.isPhone()) {
			return plus.webview.currentWebview();
		} else {
			if(!search) return {};
			//解析出锚点参数
			search = search.slice(1);
			while(arr = reg.exec(search)) {
				if(arrs = arr[0].match(/[^\=]+/g)) {
					result[arrs[0]] = arrs[1];
				}
			}
			return result;
		}
	},

	/**
	 * 给URL增加参数
	 */
	addURLParam: function(url, param) {
		let p = param || {},
			noP = url.indexOf('?') === -1,
			tpl = '&{0}={1}',
			params = '';
		$.each(param, function(k, v) {
			params += tpl.format(k, v);
		})

		noP && (params = params.replace('&', '?'));

		return url + params;
	},

	//当后台数据库返回为0或者是null的时候将其当做字符串"0"处理
	zeroDisplay: function(Param) {
		for(let key in Param) {
			if(Param[key] == 0 || Param[key] == undefined || Param[key] == null || Param[key] == 0.00) {
				Param[key] = "0";
			}
		}
	},

	//对象数组去重
	removalObj: function(tmp, prop) {
		let result = [],
			hash = {};
		for(let i = 0; i < tmp.length; i++) {
			let elem = tmp[i][prop] ? tmp[i][prop] : tmp[i];
			if(!hash[elem]) {
				result.push(tmp[i]);
				hash[elem] = true;
			}
		}

		return result;
	},
	//去除所有空格，包括中间
	trimAll: function(str) {
		if(typeof str != "string") {
			alert("类型不正确，请重新输入！");
			return;
		}
		let result;
		str = $.trim(str);
		result = str.replace(/\s*/g, function(item) {
			return "";
		})
		return result;
	},
  // 获取当前时间，格式YYYY-MM-DD
  getNowFormatDate: function () {
    var date = new Date()
    var seperator1 = '-'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  }
}
