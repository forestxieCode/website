import { Loading } from 'element-ui'

let loading

function startLoading() {
	loading = Loading.service({
		lock: true,
		text: '拼命加载中',
		background: 'rgba(0, 0, 0, 0.7)'
	})
}

function endLoading() {
	loading.close()
}

let needLoadingRequestCount = 0

export function showFullScreenLoading() {
	if(needLoadingRequestCount === 0) {
		startLoading()
	}
	needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
	if(needLoadingRequestCount <= 0) return
		needLoadingRequestCount--
	if(needLoadingRequestCount === 0) {
		endLoading()
	}
}