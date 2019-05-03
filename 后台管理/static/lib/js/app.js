!(function (global) {
  global.userId = ''
  $.ajax({
		headers: {
        Authorization: sessionStorage.getItem('userToken')
    },
    type: 'GET',
		dataType : 'json',
    url: RES_HOST + '/auth/user/getUser/',
    success: function (result) {
      if (result.code === 401) {
        window.location.href = '../login/login.html'
      } else {
        global.userId = result.data.id
      }
    }
  })
}(this))
