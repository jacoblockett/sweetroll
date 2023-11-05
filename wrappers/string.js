import { INVISIBLE_CHARACTER } from "../utils/constants.js"
import { isNumber, isString } from "../utils/is.js"

class PNPString {
	#self

	/**
	 * Creates a PNPString - a String with extra umph.
	 *
	 * PNPStrings will always re-index a given string so that characters outside of the
	 * Basic Multilingual Plane are handled intuitively and interaction with lone surrogates
	 * are kept to a minimum. i.e.
	 *
	 * `new PNPString("💩🦄🍦").length // => 3`
	 *
	 * `new PNPString("💩🦄🍦").getChar(1) // => 🦄`
	 *
	 * @param {String|PNPString} string The string or PNPString to load
	 * @returns {PNPString}
	 */
	constructor(string = "") {
		if (string instanceof PNPString) {
			string = string.unwrap()
		}

		if (!isString(string)) {
			throw new Error(`Expected string to be a string or PNPString`)
		}

		this[INVISIBLE_CHARACTER] = "Use .unwrap() to retrieve the underlying data"
		this.#self = [...string]
	}

	/**
	 * Joins the given string array into a string literal.
	 *
	 * @param {Array<String>} [stringArray]
	 * @returns {String}
	 */
	#join(stringArray = this.#self) {
		let string = ""

		for (let i = 0; i < stringArray.length; i++) {
			string += stringArray[i]
		}

		return string
	}

	/**
	 * Verifies and returns an array containing the string literal and re-indexed length of the string.
	 *
	 * - Note: Throws the error message if not a string/PNPString.
	 *
	 * @param {any} string The argument to check
	 * @param {String} [errorMsg] The error message to throw if not a string or PNPString
	 * @returns {Array<[string: String, length: Number, indexedString: Array]>}
	 */
	#parseStringArgument(string, errorMsg = `Expected a string or PNPString`) {
		if (isString(string)) {
			const split = [...string]
			return [string, split.length, split]
		}
		if (string instanceof PNPString) {
			const unwrappedSplit = [...string.unwrap()]
			return [string.unwrap(), string.length, unwrappedSplit]
		}

		throw new Error(errorMsg)
	}

	/**
	 * TODO!!!
	 * Attempts to coerce the given value into a PNPString.
	 *
	 * @param {any} value The value to create a string from
	 * @returns {PNPString}
	 */
	static from(value) {}

	/**
	 * Retrieves the length of the PNPString.
	 *
	 * @returns {Number}
	 */
	get length() {
		return this.#self.length
	}

	/**
	 * Appends strings or PNPStrings to the end of the PNPString.
	 *
	 * @param {...PNPString|String} strings The strings to append
	 * @returns {PNPString}
	 */
	append(...strings) {
		if (strings.length === 0) {
			return this
		}

		let newString = this.#join()

		for (let i = 0; i < strings.length; i++) {
			const [string] = this.#parseStringArgument(strings[i])

			newString += string
		}

		return new PNPString(newString)
	}

	/**
	 * Checks if the provided string or PNPString exists at the end of the PNPString.
	 *
	 * @param {String|PNPString} string The string to check for existence
	 * @returns {Boolean}
	 */
	endsWith(string) {
		const [str, strLen] = this.#parseStringArgument(string)
		const startIndex = this.#self.length - strLen

		if (startIndex < 0) return false

		const end = this.#join(this.#self.slice(startIndex))

		if (str !== end) return false

		return true
	}

	/**
	 * Finds the first index of the given substring.
	 *
	 * @param {String|PNPString} substring The substring to find the index of
	 * @returns {Number|undefined}
	 */
	firstIndexOf(substring) {
		const [str, strLen] = this.#parseStringArgument(substring)

		if (strLen === 1) {
			for (let i = 0; i < this.#self.length; i++) {
				if (this.#self[i] === str) {
					return i
				}
			}
		} else {
			for (let i = 0; i < this.#self.length; i++) {
				if (this.#self.length - i < strLen) {
					return undefined
				}

				const sub = this.#join(this.#self.slice(i, strLen + i))

				if (sub === str) return i
			}
		}

		return undefined
	}

	/**
	 * Gets the character at the given index. If the index is negative, this function will count
	 * backwards from the end of the PNPString instead.
	 *
	 * @param {Number} index The index of the character to get
	 * @returns {PNPString|undefined}
	 */
	getChar(index) {
		if (!isNumber) {
			throw new Error(`Expected index to be a number`)
		}

		if (index < 0) {
			index = this.#self.length - -index
		}

		const found = this.#self[index]

		return found === undefined ? undefined : new PNPString(this.#self[index])
	}

	/**
	 * Gets the character codepoint at the given index. If the index is negative, this
	 * function will count backwards from the end of the PNPString instead.
	 *
	 * @param {Number} index The index of the character to convert to a codepoint
	 * @returns {Number|undefined}
	 */
	getCharCode(index) {
		if (!isNumber) {
			throw new Error(`Expected index to be a number`)
		}

		if (index < 0) {
			index = this.#self.length - -index
		}

		const found = this.#self[index]

		return found === undefined ? undefined : this.#self[index].codePointAt(0)
	}

	/**
	 * Checks if the given character exists within the PNPString.
	 *
	 * @param {String|PNPString} character The character to check for existence
	 * @returns {Boolean}
	 */
	hasChar(character) {
		const [char] = this.#parseStringArgument(character)

		for (let i = 0; i < this.#self.length; i++) {
			if (this.#self[i] === char) {
				return true
			}
		}

		return false
	}

	/**
	 * Checks if the given substring exists within the PNPString.
	 *
	 * - Note: This is pretty much a bit more powerful a version of `.hasChar()`. Might show a
	 * teeny eensy weensy itty bitty performance gain using that method for single characters, but
	 * probably not.
	 *
	 * @param {String|PNPString} substring The substring to check for existence
	 * @returns {Boolean}
	 */
	hasSubstring(substring) {
		const [str, strLen] = this.#parseStringArgument(substring)

		if (strLen === 1) {
			for (let i = 0; i < this.#self.length; i++) {
				if (this.#self[i] === str) {
					return true
				}
			}
		} else {
			for (let i = 0; i < this.#self.length; i++) {
				if (this.#self.length - i < strLen) {
					return false
				}

				const sub = this.#join(this.#self.slice(i, strLen + i))

				if (sub === str) return true
			}
		}

		return false
	}

	/**
	 * Checks if the PNPString is a substring of the given value. Value can be anything,
	 * but in order to return true, value will need to be a string or PNPString of course.
	 *
	 * @param {any} value The comparison value to check the PNPString against
	 * @returns {Boolean}
	 */
	isSubstringOf(value) {
		if (!isString(value) && !(value instanceof PNPString)) {
			return false
		}

		if (value instanceof PNPString) {
			return value.hasSubstring(this)
		} else {
			return new PNPString(value).hasSubstring(this)
		}
	}

	/**
	 * Finds the last index of the given substring.
	 *
	 * @param {String|PNPString} substring The substring to find the index of
	 * @returns {Number|undefined}
	 */
	lastIndexOf(substring) {
		const string = new PNPString(substring)
		const stringLiteral = string.unwrap()
		const indexed = string.split()

		let hasNonstandard = false
		for (let i = 0; i < indexed.length; i++) {
			if (indexed[i].length > 1) {
				hasNonstandard = true
				break
			}
		}

		if (!hasNonstandard) {
			const found = this.unwrap().lastIndexOf(stringLiteral)

			return found < 0 ? undefined : found
		}

		if (string.length === 1) {
			for (let i = this.#self.length - 1; i >= 0; i--) {
				if (this.#self[i] === stringLiteral) return i
			}
		} else {
			const firstChar = indexed[0]
			let buffer
			for (let i = this.#self.length - string.length; i >= 0; i--) {
				if (this.#self[i] === firstChar) {
					buffer = ""

					for (let j = i; j <= i + string.length - 1; j++) {
						buffer = buffer + this.#self[j]
					}

					if (buffer === stringLiteral) return i
				}
			}
		}

		return undefined
	}

	/**
	 * Prepends strings or PNPStrings to the beginning of the PNPString.
	 *
	 * @param {...PNPString|String} strings The strings to prepend
	 * @returns {PNPString}
	 */
	prepend(...strings) {
		if (strings.length === 0) {
			throw new Error(`Expected at least one string to be passed in`)
		}

		let newString = this.#join()

		for (let i = 0; i < strings.length; i++) {
			const [string] = this.#parseStringArgument(strings[i])

			newString = string + newString
		}

		return new PNPString(newString)
	}

	split(substring = "") {
		const str = new PNPString(substring)

		if (str.unwrap() === "") {
			return this.#self
		} else {
			// todo
		}
	}

	/**
	 * Checks if the provided string or PNPString exists at the beginning of the PNPString.
	 *
	 * @param {String} string The string to check for existence
	 * @returns {Boolean}
	 */
	startsWith(string) {
		const [str, strLen] = this.#parseStringArgument(string)
		const beginning = this.#join(this.#self.slice(0, strLen))

		if (str !== beginning) return false

		return true
	}

	/**
	 * Returns the underlying data being operated on.
	 *
	 * @returns {String}
	 */
	unwrap() {
		return this.#join()
	}
}

PNPString.prototype.valueOf = PNPString.prototype.unwrap

export default PNPString
