// 原始数据列表
interface IRawlistItem {
	id: number
	name: string
	ext: string
	md: string
	file_id: number
	user_id: number
	size: number
	url: string
	isdir: number
	created_time: string
	updated_time: string
}
// 数据列表
interface IlistItem {
	type: string
	name: string
	data: string
	created_time: string
	checked: boolean
	id?: number
	size?: number
}
// 选择
interface IselectE {
	index: number
	value: boolean
}
// 顶部更多菜单操作块
interface IactionItem {
	text: string
	icon: string
}
// 顶部加号菜单的操作块
interface IaddItem {
	text: string
	icon: string
	color: string
}
// dirs的类型
interface IDirs {
	id: number
	name: string
}
// 上传的临时图片的类型
interface ITempFile {
	path: string
	size: number
	name?: string
}
// 上传的临时视频的类型
interface ITempVideo {
	errMsg: string
	tempFilePath: string
	size: number
	duration: number
	width: number
	height: number
}
// 上传下载对象的类型
interface IFileObj {
	name?: string
	type?: string
	size?: number
	key: string
	process: number
	status: boolean
	created_time?: number
}

export { IselectE, IactionItem, IaddItem, IlistItem, IRawlistItem, IDirs, ITempFile, ITempVideo, IFileObj }
