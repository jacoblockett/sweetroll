import { INVISIBLE_CHARACTER } from "../utils/constants.js"
import { isObject, isArray, isString } from "../utils/is.js"

class SweetObject {
	#self

	/**
	 * Creates a SweetObject - an Object with extra umph.
	 *
	 * @param {Record<String|Number, any>} value The object to initialize the SweetObject with
	 * @returns {SweetObject}
	 */
	constructor(value) {
		if (!isObject(value)) {
			throw new Error(`Expected value to be an object.`)
		}

		this[INVISIBLE_CHARACTER] = "Use .unwrap() to retrieve the underlying data"
		this.#self = value
	}

	/**
	 * Attempts to find the value at the given path.
	 *
	 * @param {string|string[]} path The path to find. Can be a string or an array of strings representing the expected dot notation
	 * @param {any} [defaultReturn] The default return value if the value at the path is undefined or if the path is unresolveable (default = undefined)
	 * @returns {any}
	 */
	getValue(path, defaultReturn) {
		const pathError = `Expected path to be either a string or an array of strings.`

		if (!isString(path) && !isArray(path)) {
			throw new Error(pathError)
		} else if (isArray(path) && path.filter(s => !isString(s)).length) {
			throw new Error(pathError)
		} else if (isString(path)) {
			path = path.split(".")
		}

		try {
			const foundValue = path.reduce((p, c) => p[c], this.#self)

			return foundValue === undefined ? defaultReturn : foundValue
		} catch {
			return defaultReturn
		}
	}

	/**
	 * Returns the underlying data being operated on.
	 *
	 * @returns {Array}
	 */
	unwrap() {
		return this.#self
	}
}

export default SweetObject
