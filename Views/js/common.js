!(function (global) {
  if (typeof $ != 'undefined') {
    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    })
  }

  var location = window.location

  // IE 10 没有 window.location.origin
  if (!location.origin) {
    location.origin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
  }

  var PROTOCOL = location.protocol
  var HOSTNAME = location.hostname

  var PROD_HOSTNAME = '192.168.0.187'
  var PROD_PORT = ':8085'
  var PROD_RES_PORT = ':8085'

  var TEST_HOSTNAME = '192.168.0.187'
  var TEST_PORT = ':8085'
  var TEST_RES_PORT = ':8085'

  var DEV_HOSTNAME = '192.168.0.187'
  var DEV_PORT = ':8085'
  var DEV_RES_PORT = ':8085'

  var API_ORIGIN, RES_ORIGIN
  API_ORIGIN = RES_ORIGIN = PROTOCOL + '//'

  if (HOSTNAME === PROD_HOSTNAME) {
    API_ORIGIN += PROD_HOSTNAME + PROD_PORT
    RES_ORIGIN += PROD_HOSTNAME + PROD_RES_PORT
  } else if (HOSTNAME === TEST_HOSTNAME) {
    API_ORIGIN += TEST_HOSTNAME + TEST_PORT
    RES_ORIGIN += TEST_HOSTNAME + TEST_RES_PORT
  } else {
    API_ORIGIN += DEV_HOSTNAME + DEV_PORT
    RES_ORIGIN += DEV_HOSTNAME + DEV_RES_PORT
  }

  global.CURRENCY_HOST = API_ORIGIN // 通用授权
  global.RES_HOST = RES_ORIGIN // 资源

  global.exitFullPage = 10

}(this))
