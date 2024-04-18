const arrayFromArray = (array, mapCallback) => {
	const copy = array.slice(0)

	if (typeof mapCallback === "function") {
		for (let i = 0; i < copy.length; i++) {
			copy[i] = mapCallback(copy[i], i)
		}
	}

	return copy
}
const arrayFromMap = (map, mapCallback) => {
	const array = []

	let index = 0

	if (typeof mapCallback === "function") {
		for (let entry of map) {
			array.push(mapCallback(entry, index))
			index++
		}
	} else {
		for (let entry of map) {
			array.push(entry)
			index++
		}
	}

	return array
}
const arrayFromNumber = (number, mapCallback) => {
	const array = []

	array.length = number

	if (typeof mapCallback === "function") {
		for (let i = 0; i < number; i++) {
			array.push(mapCallback(undefined, i))
		}
	}

	return array
}

const arrayFromObject = (object, mapCallback) => {
	const entries = Object.entries(object)

	if (typeof mapCallback === "function") {
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
	if (typeof mapCallback !== "function") return [...set]

	const array = []

	let index = 0
	for (let value of set) {
		value = mapCallback(value, index)
		array.push(value)
		index++
	}

	return array
}

const arrayFromString = (string, mapCallback) => {
	const segmenter = new Intl.Segmenter()
	const segments = [...segmenter.segment(string)]
	const array = []

	if (typeof mapCallback === "function") {
		for (let i = 0; i < segments.length; i++) {
			let value = segments[i].segment

			value = mapCallback(value, i)
			array.push(value)
		}
	} else {
		for (let i = 0; i < segments.length; i++) {
			let value = segments[i].segment

			array.push(value)
		}
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
