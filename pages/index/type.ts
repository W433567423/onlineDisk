export interface IRawlistItem {
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
export interface IlistItem {
	type: string
	name: string
	data: string
	created_time: string
	checked: boolean
}
export interface IselectE {
	index: number
	value: boolean
}
export interface IactionItem {
	text: string
	icon: string
}
export interface IaddItem {
	text: string
	icon: string
	color: string
}
