export default value => {
	if (typeof value === "boolean") return "boolean"
	if (value instanceof Map) return "map"
	if (typeof value === "function") return "function"
	if (typeof value === "number") return "number"
	if (value instanceof Set) return "set"
	if (typeof value === "string") return "string"

	return Object.prototype.toString.call(value).toLowerCase().slice(8, -1)
}
