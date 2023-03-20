import App from './App'
import uniStatusBar from '@/components/uniStatusBar'
import navBar from '@/components/navBar'
import fileList from '@/components/fileList'
import fDialog from '@/components/fDialog'
import separateLine from '@/components/separateLine'
import $T from '@/utils/request'
import store from '@/store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App
})

// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	//全局组件
	app.component('uniStatusBar', uniStatusBar)
	app.component('navBar', navBar)
	app.component('fileList', fileList)
	app.component('fDialog', fDialog)
	app.component('separateLine', separateLine)
	app.use(store)
	app.config.globalProperties.$T = $T
	app.config.globalProperties.$store = store
	return {
		app
	}
}
// #endif
