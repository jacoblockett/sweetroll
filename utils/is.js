const isArray = Array.isArray
const isBoolean = value => typeof value === "boolean"
const isFloat = value => {
	if (typeof value === "number" && value % 1 !== 0) return true
	if (typeof value === "string") return /^[0-9]+\.[0-9]+$/.test(value)

	return false
}
const isFunction = value => typeof value === "function"
const isMap = value => value instanceof Map
const isNumber = value => typeof value === "number"
const isNumeric = (value, noFloat = false) => {
	if (noFloat) {
		if (typeof value === "number" && value % 1 === 0) return true
		if (typeof value === "string") return /^[0-9]+$/.test(value)
	}

	if (typeof value === "number") return true
	if (typeof value === "string") return /^[0-9]+(\.[0-9]+)?$/.test(value)

	return false
}
const isObject = value =>
	Object.prototype.toString.call(value) === "[object Object]"
const isPrimitive = value =>
	value === null || (typeof value !== "object" && typeof value !== "function")
const isSet = value => value instanceof Set
const isString = value => typeof value === "string"

export {
	isArray,
	isBoolean,
	isFloat,
	isFunction,
	isMap,
	isNumber,
	isNumeric,
	isObject,
	isPrimitive,
	isSet,
	isString,
}
