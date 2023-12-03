import serializeFunctionsInObject from "./serializeFunctionsInObject.js"
import packer from "./packer.js"

export default data => {
	if (typeof data === "function") return data.toString()
	if (Object.prototype.toString.call(data) === "[object Object]")
		return packer.pack(serializeFunctionsInObject(data)).toString()

	return data
}
