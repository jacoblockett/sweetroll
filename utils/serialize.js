import serializeObject from "./serializeObject.js"
import packer from "./packer.js"

export default data => {
	if (typeof data === "function") return data.toString()
	if (Object.prototype.toString.call(data) === "[object Object]")
		return packer.pack(serializeObject(data)).toString()

	return data
}
