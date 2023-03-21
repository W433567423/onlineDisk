import { IFileObj } from '@/pages/index/type'
import { IUploadTask } from './type'
const fileModule = {
	namespaced: true,
	state() {
		return {
			uploadTasks: [] as Array<IUploadTask>
		}
	},
	mutations: {},
	actions: {
		// 创建上传任务
		createUploadTask({ state, rootState }, file: IFileObj) {
			state.uploadTasks.unshift(file)
			uni.setStorage({
				key: 'uploadTask_' + rootState.userModule.user.id,
				data: JSON.stringify(state.uploadTasks)
			})
		},
		// 更新上传进度
		updateUploadProgress({ state, rootState }, file: IFileObj) {
			const i = state.uploadTasks.findIndex((item: IUploadTask) => item.key === file.key)
			if (i !== -1) {
				state.uploadTasks[i].progress = file.process
				state.uploadTasks[i].status = file.status
				uni.setStorage({
					key: 'uploadTask_' + rootState.userModule.user.id,
					data: JSON.stringify(state.uploadTasks)
				})
			}
		}
	}
}
export default fileModule
