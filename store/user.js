import $T from '@/utils/request'
const userModule = {
	namespaced: true,
	state() {
		return {
			user: null,
			token: ''
		}
	},
	mutations: {
		syncSize(state, sizeObj) {
			state.user.total_size = sizeObj.total_size
			state.user.used_size = sizeObj.used_size
		}
	},
	actions: {
		Userlogin({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
			console.log(user.token)
		},
		UserLogout({
			state
		}) {
			$T.get('/user/logout', {
				token: true
			}).then(res => {
				state.user = null
				state.token = null
				uni.removeStorageSync('user')
				uni.removeStorageSync('token')
				uni.reLaunch({
					url: '/pages/login/login'
				})
				uni.showToast({
					title: res,
					icon: 'success'
				})
			})

		},
		initUser({
			state
		}) {
			const user = uni.getStorageSync('user')
			if (user) {
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		}
	}
}
export default userModule
