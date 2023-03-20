const toGB = (byte: Number) => {
	if (byte === 0) {
		return '0KB'
	}
	const k = 1024
	const size = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(byte) / Math.log(k))
	return (byte / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
}

export { toGB }
