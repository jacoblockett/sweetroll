export default value => {
	if (typeof value === "string") return "string"
	if (typeof value === "number" && !isNaN(value)) return "number"
	if (typeof value === "boolean") return "boolean"
	if (typeof value === "function") return "function"
	if (typeof value === "symbol") return "symbol"
	if (typeof value === "bigint") return "bigint"
	if (value instanceof Map) return "map"
	if (value instanceof Set) return "set"
	if (value instanceof WeakMap) return "weakmap"
	if (value instanceof WeakSet) return "weakset"

	return Object.prototype.toString.call(value).toLowerCase().slice(8, -1)
}
