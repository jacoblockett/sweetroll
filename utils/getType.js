export default value => {
	if (value === null) return "null"
	if (value === void 0) return "undefined"

	const typeVal = typeof value

	if (typeVal === "string") return "string"
	if (typeVal === "number" && !isNaN(value)) return "number"
	if (typeVal === "boolean") return "boolean"
	if (typeVal === "function") return "function"
	if (typeVal === "symbol") return "symbol"
	if (typeVal === "bigint") return "bigint"
	if (value instanceof Map) return "map"
	if (value instanceof Set) return "set"
	if (value instanceof WeakMap) return "weakmap"
	if (value instanceof WeakSet) return "weakset"

	return Object.prototype.toString.call(value).toLowerCase().slice(8, -1)
}
