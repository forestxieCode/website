// 时间戳 格式 年-月-日
export function initDate(datar, type) {
  // debugger
  let Hours = new Date(datar).getHours()
  if (Hours < 10) {
    Hours = '0' + Hours
  }
  let Minutes = new Date(datar).getMinutes()
  if (Minutes < 10) {
    Minutes = '0' + Minutes
  }
  if (type === 1) {
    return new Date(datar).getFullYear() + '-' + (new Date(datar).getMonth() + 1) + '-' + new Date(datar).getDate() + ' ' + Hours + ':' + Minutes
  } else {
    return new Date(datar).getFullYear() + '-' + (new Date(datar).getMonth() + 1) + '-' + new Date(datar).getDate()
  }
}
// 数组转字符串
export function infoValue(value) {
  let info = value.join('/')
  return info
}
// 获取当前时间，格式YYYY-MM-DD
export function getNowFormatDate() {
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

// 中国标准时间换成年月日
function formatTen(num) {
  return num > 9 ? (num + '') : ('0' + num)
}
export function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + formatTen(month) + '-' + formatTen(day)
}

// 中国标准时间换成年月日时分秒
export function formatDateTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minu = date.getMinutes()
  var sec = date.getSeconds()
  return year + '-' + formatTen(month) + '-' + formatTen(day) + ' ' + formatTen(hour) + ':' + formatTen(minu) + ':' + formatTen(sec)
}
