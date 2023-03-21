import { IFileObj } from '@/pages/index/type'
import { IUploadTask, IDownloadTask } from './type'
const fileModule = {
	namespaced: true,
	state() {
		return {
			uploadTasks: [] as Array<IUploadTask>,
			downloadTasks: [] as Array<IDownloadTask>
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
		},
		// 创建下载任务
		createDownloadTask({ state, rootState }, file: IFileObj) {
			state.downloadTasks.unshift(file)
			uni.setStorage({ key: 'downloadTask_' + rootState.userModule.user.id, data: JSON.stringify(state.downloadTasks) })
		},
		updateDownLoadProgress({ state, rootState }, file: IFileObj) {
			const i = state.downloadTasks.findIndex((item: IDownloadTask) => item.key === file.key)
			if (i !== -1) {
				state.downloadTasks[i].progress = file.process
				state.downloadTasks[i].status = file.status
				uni.setStorage({
					key: 'downloadTask_' + rootState.userModule.user.id,
					data: JSON.stringify(state.downloadTasks)
				})
			}
		}
	}
}
export default fileModule
