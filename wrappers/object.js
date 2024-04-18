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
	 * Attempts to find the value at the given jpath.
	 *
	 * @param {string|string[]} jpath The jpath to find. Can be a string or an array of strings representing the expected dot notation
	 * @param {any} [defaultReturn] The default return value if the value at the jpath is undefined or if the jpath is unresolveable (default = undefined)
	 * @returns {any}
	 */
	find(jpath, defaultReturn) {
		const jpathError = `Expected jpath to be either a string or an array of strings.`

		if (!isString(jpath) && !isArray(jpath)) {
			throw new Error(pathError)
		} else if (isArray(jpath) && jpath.filter(s => !isString(s)).length) {
			throw new Error(pathError)
		} else if (isString(jpath)) {
			jpath = jpath.split(".")
		}

		try {
			const foundValue = jpath.reduce((p, c) => p[c], this.#self)

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
