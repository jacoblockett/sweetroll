const arrayFromArray = (array, mapCallback) => {
	if (mapCallback) {
		for (let i = 0; i < array.length; i++) {
			array[i] = mapCallback(array[i], i)
		}
	}

	return array
}
const arrayFromMap = (map, mapCallback) => {
	const array = []

	let index = 0
	for (let entry of map) {
		if (mapCallback) {
			entry = mapCallback(entry, index)
		}

		array[index] = entry
		index++
	}

	return array
}
const arrayFromNumber = (number, mapCallback) => {
	const array = []

	array.length = number

	if (mapCallback) {
		for (let i = 0; i < number; i++) {
			array[i] = mapCallback(undefined, i)
		}
	}

	return array
}

const arrayFromObject = (object, mapCallback) => {
	const entries = Object.entries(object)

	if (mapCallback) {
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i]
			const key = entry[0]
			const value = entry[1]
			const newValue = mapCallback(entry, i)

			entries[i] = newValue
		}
	}

	return entries
}

const arrayFromObjectWithNumberedKeys = (object, mapCallback) => {
	const array = []
	const entries = Object.entries(object)

	for (let i = 0; i < entries.length; i++) {
		const entry = entries[i]
		const key = entry[0]
		let value = entry[1]

		if (mapCallback) {
			value = mapCallback(entry, i)
		}

		array[key] = value
	}

	return array
}

const arrayFromSet = (set, mapCallback) => {
	const array = []

	let index = 0
	for (let value of set) {
		if (mapCallback) {
			value = mapCallback(value, index)
		}

		array[index] = value
		index++
	}

	return array
}

const arrayFromString = (string, mapCallback) => {
	const array = []

	for (let i = 0; i < string.length; i++) {
		let value = string[i]

		if (mapCallback) {
			value = mapCallback(value, i)
		}

		array[i] = value
	}

	return array
}

export {
	arrayFromArray,
	arrayFromMap,
	arrayFromNumber,
	arrayFromObject,
	arrayFromObjectWithNumberedKeys,
	arrayFromSet,
	arrayFromString,
}
