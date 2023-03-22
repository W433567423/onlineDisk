import { IFileObj } from '@/pages/index/type'
import { ITask } from './type'
const fileModule = {
	namespaced: true,
	state() {
		return {
			uploadTasks: [] as Array<IFileObj>,
			downloadTasks: [] as Array<IFileObj>
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
			const i = state.uploadTasks.findIndex((item: ITask) => item.key === file.key)
			if (i !== -1) {
				state.uploadTasks[i].progress = file.progress
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
		// 更新下载进度
		updateDownLoadProgress({ state, rootState }, file: IFileObj) {
			const i = state.downloadTasks.findIndex((item: ITask) => item.key === file.key)
			if (i !== -1) {
				state.downloadTasks[i].progress = file.progress
				state.downloadTasks[i].status = file.status
				uni.setStorage({
					key: 'downloadTask_' + rootState.userModule.user.id,
					data: JSON.stringify(state.downloadTasks)
				})
			}
		},
		// 初始化任务列表
		initTransmitTask({ state, rootState }) {
			if (rootState.userModule.user) {
				const d = uni.getStorageSync('downloadTask_' + rootState.userModule.user.id)
				const u = uni.getStorageSync('uploadTask_' + rootState.userModule.user.id)
				state.downloadTasks = d ? JSON.parse(d) : []
				state.uploadTasks = u ? JSON.parse(u) : []
			}
		},
		// 清空传输列表
		clearTransmitTasks({ state, rootState }) {
			if (rootState.userModule.user) {
				uni.removeStorageSync('downloadTask_' + rootState.userModule.user.id)
				uni.removeStorageSync('uploadTask_' + rootState.userModule.user.id)
				state.uploadTasks = []
				state.downloadTasks = []
			}
		}
	}
}
export default fileModule
