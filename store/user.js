const userModule = {
	namespaced: true,
	state() {
		return {
			user: null,
			token: '1'
		}
	},
	actions: {
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		}
	}
}
export default userModule
