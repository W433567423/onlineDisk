interface IUploadTask {
	key: string
	progress: number
	status: boolean
}
interface ISizeObj {
	total_size: number
	used_size: number
}
export { IUploadTask, ISizeObj }
