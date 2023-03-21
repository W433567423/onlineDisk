interface IUser {
	id: number
	username: string
	nickname?: string
	email?: string
	avatar?: string
	phone?: string
	sex: string
	desc?: string
	total_size: number
	used_size: number
	created_time: string
	updated_time: string
	token: string
}

export { IUser }
