const serializeFunctionsInObject = (obj, visited = new WeakMap()) => {
	// Checks for circular references
	if (visited.has(obj)) {
		return visited.get(obj)
	}

	const newObj = {}
	visited.set(obj, newObj)

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === "function") {
				newObj[key] = obj[key].toString()
			} else if (
				Object.prototype.toString.call(data) === "[object Object]" &&
				obj[key] !== null
			) {
				newObj[key] = serializeFunctionsInObject(obj[key], visited)
			} else {
				newObj[key] = obj[key]
			}
		}
	}

	return newObj
}

export default serializeFunctionsInObject
