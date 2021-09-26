// 先安装flyio依赖
import Taro from '@tarojs/taro'

// 
import WEB from 'flyio/dist/npm/fly'
// 
import WX from 'flyio/dist/npm/wx'

let http: any = null

if (Taro.getEnv() === 'WEB') {
	http = new WEB
} else if (Taro.getEnv() === 'WEAPP') {
	http = new WX
}


http.config.baseURL = 'http://localhost:7001/'

http.interceptors.request.use(config => {
	Taro.showLoading({
		title: '加载中...'
	})
	let token = Taro.getStorageSync('token')
	if (token) {
		config.headers.Authorization = token
	}
	return config
}, err => {
	Taro.hideLoading()
	return Promise.reject(err)
})

http.interceptors.response.use(res => {
	Taro.hideLoading()
	return res.data

}, err => {
	Taro.hideLoading()
	// 每次请求失败的状态码
	let status = err.response && err.response.status
	if (status === 400) {
		Taro.showToast({
			title: '参数错误',
			icon: 'none'
		})
	}
	if (status === 401) {
		Taro.showToast({
			title: '登录过期',
			icon: 'none'
		})
		Taro.clearStorage()
		Taro.navigateTo({
			url: '/pages/login/login'
		})
	}
	if (status === 403) {
		Taro.showToast({
			title: '没有权限',
			icon: 'none'
		})
	}
	if (status === 404) {
		Taro.showToast({
			title: '路径错误',
			icon: 'none'
		})
	}
	if (status === 500) {
		Taro.showToast({
			title: '服务器错误',
		})

	}
	if (status === 503) {
		Taro.showToast({
			title: '服务器维护',
			icon: 'none'
		})
	}
	if (status === 422) {
		// 422	当创建一个对象时，发生了一个验证错误
		Taro.showToast({
			title: '验证错误',
			icon: 'none'
		})
	}

	console.log(err)
	return Promise.reject(err)
})

export default http
