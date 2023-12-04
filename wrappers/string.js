import { INVISIBLE_CHARACTER } from "../utils/constants.js"
import { isNumber, isString } from "../utils/is.js"
import { arrayFromString } from "../utils/arrayFrom.js"
import SweetArray from "./array.js"

class SweetString {
	#self

	/**
	 * Creates a SweetString - a string with extra umph.
	 *
	 * SweetStrings will always re-index a given string so that characters outside of the
	 * Basic Multilingual Plane are handled intuitively and interaction with lone surrogates
	 * are kept to a minimum. i.e.
	 *
	 * `new SweetString("💩🦄🍦").length // => 3 (not 6)`
	 *
	 * `new SweetString("💩🦄🍦").getChar(1) // => 🦄 (not 💩's sibling surrogate, �)`
	 *
	 * @param {string|SweetString} string The string or SweetString to load
	 * @returns {SweetString}
	 */
	constructor(string = "") {
		if (string instanceof SweetString) {
			string = string.unwrap()
		}

		if (!isString(string)) {
			throw new Error(`Expected string to be a string or SweetString`)
		}

		this[INVISIBLE_CHARACTER] = "Use .unwrap() to retrieve the underlying data"
		this.#self = arrayFromString(string)
	}

	/**
	 * Joins the given string array into a string literal.
	 *
	 * Default stringArray value is this.#self
	 *
	 * @param {string[]} [stringArray]
	 * @returns {string}
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
	 * - Note: Throws the error message if not a string/SweetString.
	 *
	 * @param {any} string The argument to check
	 * @param {string} [errorMsg] The error message to throw if not a string or SweetString
	 * @returns {[OriginalString: string, NormalizedStringLength: number, CharArray: string[]]}
	 */
	#parseStringArgument(string, errorMsg = `Expected a string or SweetString`) {
		if (isString(string)) {
			const split = arrayFromString(string)
			return [string, split.length, split]
		}
		if (string instanceof SweetString) {
			return [string.unwrap(), string.length, string.toArray()]
		}

		throw new Error(errorMsg)
	}

	/**
	 * TODO!!!
	 * Attempts to coerce the given value into a SweetString.
	 *
	 * @param {any} value The value to create a string from
	 * @returns {SweetString}
	 */
	static from(value) {}

	/**
	 * Retrieves the char length of the SweetString.
	 *
	 * @returns {SweetStringCharLength<number>}
	 */
	get length() {
		return this.#self.length
	}

	/**
	 * Appends strings or SweetStrings to the end of the SweetString.
	 *
	 * @param {...SweetString|string} strings The strings to append
	 * @returns {SweetString}
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

		return new SweetString(newString)
	}

	/**
	 * Converts the given codepoint index to a logical, grapheme-based index.
	 *
	 * Consider the following string `const str = "family 👨‍👩‍👦 emoji"`. If you were to access
	 * a char from this string using traditional indexing, you might get unexpected
	 * results due to the emoji's surrogate siblings. For example, `str[9]` should return "e"
	 * from the word "emoji", but instead would return a broken or lone surrogate from the emoji
	 * since the family emoji actually extends for 8 unicode codepoints long. If you wanted
	 * to access the "e" in "emoji" traditionally, then, you would need to ask for `str[16]`.
	 * This, of course, can be solved by many a library, including this one. But, what if you had
	 * received the codepoint index `16` from some arbitrary function to use with a split array
	 * of logical characters representing the string? The codepoint index no longer applies since
	 * the array representation no longer indexes the string in the same way.
	 *
	 * Enter this verbosely named function. It will convert that codepoint index into the logical
	 * index for use later down the road. In our current example, it would convert `16` into `9`.
	 *
	 * @param {number} codepointIndex
	 * @returns {LogicalIndex<number> | undefined}
	 */
	convertCodepointIndexToLogicalIndex(codepointIndex) {
		if (codepointIndex < 0 || codepointIndex >= this.#join().length)
			return undefined

		let count = 0

		for (let i = 0; i < this.#self.length; i++) {
			const char = this.#self[i]

			count += char.length

			if (count > codepointIndex) return i
		}

		return undefined
	}

	/**
	 * Checks if the provided string or SweetString exists at the end of the SweetString.
	 *
	 * @param {string|SweetString} string The string to check for existence
	 * @returns {boolean}
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
	 * @param {string|SweetString} substring The substring to find the index of
	 * @returns {IndexOfFoundChar<number>|undefined}
	 */
	firstIndexOf(substring) {
		const [substr, len] = this.#parseStringArgument(substring)

		if (this.#join() === substr) return 0
		if (len === 1) {
			for (let i = 0; i < this.#self.length; i++) {
				if (this.#self[i] === substr) {
					return i
				}
			}
		} else {
			for (let i = 0; i < this.#self.length; i++) {
				if (this.#self.length - i < len) {
					return undefined
				}

				const sub = this.#join(this.#self.slice(i, len + i))

				if (sub === substr) return i
			}
		}

		return undefined
	}

	/**
	 * Gets the character at the given index. If the index is negative, this function will count
	 * backwards from the end of the SweetString instead.
	 *
	 * @param {number} index The index of the character to get
	 * @returns {SweetString|undefined}
	 */
	getChar(index) {
		if (!isNumber(index)) {
			throw new Error(`Expected index to be a number`)
		}

		if (index < 0) {
			index = this.#self.length - -index
		}

		const found = this.#self[index]

		if (found === undefined) return undefined

		return new SweetString(found)
	}

	/**
	 * Gets the character codepoint(s) at the given index. If the index is negative, this
	 * function will count backwards from the end of the SweetString instead.
	 *
	 * @param {number} index The index of the character to convert to a codepoint array
	 * @returns {CharCodes<number[]>|undefined}
	 */
	getCharCodes(index) {
		if (!isNumber(index)) {
			throw new Error(`Expected index to be a number`)
		}

		if (index < 0) {
			index = this.#self.length - -index
		}

		const found = this.#self[index]

		if (found === undefined) return undefined

		const codepoints = []

		for (let i = 0; i < found.length; i++) {
			codepoints[codepoints.length] = found[i].codePointAt(0)
		}

		return codepoints
	}

	/**
	 * Checks if the given character exists within the SweetString.
	 *
	 * @param {string|SweetString} character The character to check for existence
	 * @returns {boolean}
	 */
	hasChar(character) {
		const [char, len] = this.#parseStringArgument(character)

		if (len > 1)
			throw new Error(`Expected provided character to be a single character`)

		for (let i = 0; i < this.#self.length; i++) {
			if (this.#self[i] === char) {
				return true
			}
		}

		return false
	}

	/**
	 * Checks if the given substring exists within the SweetString.
	 *
	 * - Note: For checking if a single character exists in a SweetString, it is
	 * recommended to use `hasChar` instead.
	 *
	 * @param {string|SweetString} substring The substring to check for existence
	 * @returns {boolean}
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
	 * Checks if the SweetString is a substring of the given value. Value can be anything,
	 * but in order to return true, value will need to be a string or SweetString of course.
	 *
	 * @param {any} value The comparison value to check the SweetString against
	 * @returns {boolean}
	 */
	isSubstringOf(value) {
		if (!isString(value) && !(value instanceof SweetString)) {
			return false
		}

		if (value instanceof SweetString) {
			return value.hasSubstring(this)
		} else {
			return new SweetString(value).hasSubstring(this)
		}
	}

	/**
	 * Finds the last index of the given substring.
	 *
	 * @param {string|SweetString} substring The substring to find the index of
	 * @returns {number|undefined}
	 */
	lastIndexOf(substring) {
		const [substr, len] = this.#parseStringArgument(substring)

		if (this.#join() === substr) return 0
		if (len === 1) {
			for (let i = this.#self.length - 1; i >= 0; i--) {
				if (this.#self[i] === substr) {
					return i
				}
			}
		} else {
			for (let i = this.#self.length - 1 - len; i >= 0; i--) {
				const sub = this.#join(this.#self.slice(i, len + i))

				if (sub === substr) return i
			}
		}

		return undefined
	}

	/**
	 * Prepends strings or SweetStrings to the beginning of the SweetString.
	 *
	 * @param {...SweetString|string} strings The strings to prepend
	 * @returns {SweetString}
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

		return new SweetString(newString)
	}

	split(substring = "") {
		const str = new SweetString(substring)

		if (str.unwrap() === "") {
			return this.#self
		} else {
			// todo
		}
	}

	/**
	 * Checks if the provided string or SweetString exists at the beginning of the SweetString.
	 *
	 * @param {string} string The string to check for existence
	 * @returns {boolean}
	 */
	startsWith(string) {
		const [str, strLen] = this.#parseStringArgument(string)
		const beginning = this.#join(this.#self.slice(0, strLen))

		if (str !== beginning) return false

		return true
	}

	/**
	 * Returns a traditional array representing the split SweetString.
	 *
	 * @returns {string[]}
	 */
	toArray() {
		return this.#self
	}

	/**
	 * Returns a SweetArray representing the split SweetString.
	 *
	 * @returns {SweetArray}
	 */
	toSweetArray() {
		return new SweetArray(this.#self)
	}

	/**
	 * Returns a traditional array of SweetStrings representing the split SweetString.
	 *
	 * @returns {SweetString[]}
	 */
	toSweetStringArray() {
		return this.#self.map(char => new SweetString(char))
	}

	/**
	 * Returns a SweetArray of SweetStrings representing the split SweetString.
	 *
	 * @returns {SweetArray}
	 */
	toSweetStringSweetArray() {
		return SweetArray.from(this.#self.map(char => new SweetString(char)))
	}

	/**
	 * Returns the underlying data being operated on.
	 *
	 * @returns {string}
	 */
	unwrap() {
		return this.#join()
	}
}

SweetString.prototype.valueOf = SweetString.prototype.unwrap

export default SweetString
