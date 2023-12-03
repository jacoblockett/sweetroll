import serialize from "./serialize.js"

export default array => {
	const map = new Map()

	for (let i = 0; i < array.length; i++) {
		const value = array[i]
		const data = { index: i, value }
		const key = serialize(value)
		const existingData = map.get(key)

		if (existingData !== undefined) {
			existingData.push(data)
		} else {
			map.set(key, [data])
		}
	}

	return map
}
