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
