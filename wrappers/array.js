import { INVISIBLE_CHARACTER, BREAKOUT } from "../utils/constants.js"
import {
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
} from "../utils/is.js"
import getType from "../utils/getType.js"
import {
	arrayFromArray,
	arrayFromMap,
	arrayFromNumber,
	arrayFromObject,
	arrayFromObjectWithNumberedKeys,
	arrayFromSet,
	arrayFromString,
} from "../utils/arrayFrom.js"
import SweetString from "./string.js"
import SweetObject from "./object.js"

/**
 * Callback function used with the static from method on the SweetArray wrapper.
 *
 * @callback StaticFromCallback
 * @param {any} item The current item
 * @param {number} index The index of the current item
 * @returns {any}
 */

/**
 * A function used to _break_ out of the loop.
 *
 * - Note: When this breakout function is used with the reduce-style methods, the destructive option
 * will do nothing. Reduce-style methods will always return their last calculated accumulator.
 *
 * - Note: This breakout function is unavailable on validation loop methods (every, some, etc.)
 *
 * @callback BreakoutFunction
 * @param {boolean} destructive If `true`, will destroy the remaining items to be processed, returning only
 * the already-processed SweetArray. If `false` (default), will concatenate the remaining items to be processed onto
 * the already-processed SweetArray.
 * @returns {Void}
 */

/**
 * Additional properties that are useful when looping.
 *
 * @typedef {Object} LoopProperties
 * @property {SweetArray} self A reference to the SweetArray being looped over
 * @property {BreakoutFunction} breakout A function used to break out of the loop
 */

/**
 * Callback function to be used with transformative loop methods (map, filter, etc.).
 *
 * @callback LoopCallback
 * @param {any} item The current item
 * @param {number} index The index of the current item
 * @param {LoopProperties} props
 * @returns {any}
 */

/**
 * Callback function to be used with reduce loop methods (reduce, reduceRight).
 *
 * @callback ReduceCallback
 * @param {any} accumulator The current accumulator, or what was returned from the previous iteration
 * @param {any} item The current item
 * @param {number} index The index of the current item
 * @param {LoopProperties} props
 * @returns {any}
 */

class SweetArray {
	#self
	#lookup

	/**
	 * Creates a SweetArray - an array with extra umph.
	 *
	 * SweetArray methods will never affect the original array. Instead, they will always
	 * return an instance of a SweetArray, either the original or a copy, where applicable.
	 * This allows for a pleasant, user-friendly, chainable method experience.
	 *
	 * @param {any[]} [array] The array to initialize the SweetArray with (default = `[]`)
	 * @param {Object} [options] An options object
	 * @returns {SweetArray}
	 */
	constructor(array = [], options = {}) {
		// TODO: implement options object
		// For options, would love to have a typed array feature. Might be heavy to implement though.
		if (array instanceof SweetArray) {
			array = array.unwrap()
		}

		if (!isArray(array)) {
			this.#self = []
		} else {
			this.#self = array.slice(0)
		}

		this[INVISIBLE_CHARACTER] = "Use .unwrap() to retrieve the underlying array"
	}

	/**
	 * Breaks out of a loop immediately by throwing an error. Errors thrown will have the message described by
	 * the `BREAKOUT` constant, and the error object will have a key `.DESTRUCTIVE` representing if the remaining
	 * items to be processed should be destroyed.
	 *
	 * @param {boolean} destructive Describes if the breakout should destroy the remaining items to be processed (default = `false`)
	 */
	#breakout(destructive) {
		const err = new Error(BREAKOUT)

		if (destructive === true) {
			err.DESTRUCTIVE = true
		}

		throw err
	}

	/**
	 * Converts the given array into a beautified string; none of that nasty "Oh, I'll just
	 * stick some commas with no spaces in there, and remove any bracket notation that would
	 * be helpful in datatype discernment" bullshit.
	 *
	 * @param {any[]} array
	 * @returns {string}
	 */
	#toStringHelper(array = this.#self) {
		const newArray = []

		for (let i = 0; i < array.length; i++) {
			const item = array[i]

			if (isString(item)) {
				newArray[newArray.length] = `'${item}'`
			} else if (item instanceof SweetArray) {
				newArray[newArray.length] = item.toString()
			} else if (isObject(item)) {
				newArray[newArray.length] = `{ Record }`
			} else if (isArray(item)) {
				const stringArray = this.#toStringHelper(item)

				let newString = "["

				for (let i = 0; i < stringArray.length; i++) {
					if (i === stringArray.length - 1) {
						newString += `${stringArray[i]}`
					} else {
						newString += `${stringArray[i]}, `
					}
				}

				newArray[newArray.length] = `${newString}]`
			} else {
				newArray[newArray.length] = item.toString()
			}
		}

		return newArray
	}

	/**
	 * Attempts to coerce a given input into a SweetArray.
	 *
	 * TODO: add a reference to docs detailing behavior thoroughly
	 *
	 * @param {any} input The value to coerce into a SweetArray
	 * @param {StaticFromCallback} [callback] A mapping callback to iterate over the SweetArray during creation
	 * @returns {SweetArray}
	 */
	static from(input, callback) {
		if (input === undefined) return new SweetArray()
		if (!isFunction(callback)) {
			callback = undefined
		}
		if (
			input instanceof SweetArray ||
			input instanceof SweetString ||
			input instanceof SweetObject
		) {
			input = input.unwrap()
		}

		if (isObject(input)) {
			const keysAreNumbers = !Object.keys(input).filter(
				([key]) => !isNumeric(key, true),
			).length

			if (keysAreNumbers) {
				return new SweetArray(arrayFromObjectWithNumberedKeys(input, callback))
			} else {
				return new SweetArray(arrayFromObject(input, callback))
			}
		} else if (isString(input)) {
			return new SweetArray(arrayFromString(input, callback))
		} else if (isNumber(input)) {
			return new SweetArray(arrayFromNumber(input, callback))
		} else if (isArray(input)) {
			return new SweetArray(arrayFromArray(input, callback))
		} else if (isSet(input)) {
			return new SweetArray(arrayFromSet(input, callback))
		} else if (isMap(input)) {
			return new SweetArray(arrayFromMap(input, callback))
		}

		throw new Error(`Cannot coerce the given input into a SweetArray`)
	}

	/**
	 * Retrieves the entries iterable of the SweetArray.
	 *
	 * @returns {IterableIterator<[number, any]>}
	 */
	get entries() {
		return this.#self.entries()
	}

	/**
	 * Retrieves the keys iterable of the SweetArray.
	 *
	 * @returns {IterableIterator<number>}
	 */
	get keys() {
		return this.#self.keys()
	}

	/**
	 * Retrieves the length of the SweetArray.
	 *
	 * @returns {number}
	 */
	get length() {
		return this.#self.length
	}

	/**
	 * Retrieves the values iterable of the SweetArray.
	 *
	 * @returns {IterableIterator<any>}
	 */
	get values() {
		return this.#self.values()
	}

	/**
	 * Appends items of any type to the end of the SweetArray.
	 *
	 * @param {...any} items The items to append, or "push", to the end of the SweetArray
	 * @returns {SweetArray}
	 */
	append(...items) {
		const copy = this.#self.slice(0)

		for (let i = 0; i < items.length; i++) {
			copy[copy.length] = items[i]
		}

		return new SweetArray(copy)
	}

	/**
	 * Concatenates the SweetArray with the passed in SweetArray(s) or array(s).
	 *
	 * @param {...SweetArray|any} arrays The arrays to append
	 * @returns {SweetArray}
	 */
	concat(...arrays) {
		if (arrays.length === 0) return this

		let newArray = this.#self

		for (let i = 0; i < arrays.length; i++) {
			let array = arrays[i]

			if (!isArray(array) && !(array instanceof SweetArray)) {
				continue
			}

			if (array instanceof SweetArray) {
				array = array.unwrap()
			}

			newArray = newArray.concat(array)
		}

		return new SweetArray(newArray)
	}

	/**
	 * Copys the SweetArray, returning a new SweetArray instance
	 *
	 * @returns {SweetArray}
	 */
	copy() {
		return SweetArray.from(this.#self)
	}

	/**
	 * Tests if every item in the SweetArray passes the test implemented by the provided callback
	 * function. For a test to pass, the callback function must return a truthy value.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {boolean}
	 */
	every(callback) {
		if (!isFunction(callback)) {
			throw new TypeError(`Expected callback to be a function`)
		}

		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]
			const bool = callback(item, i, { self: this })

			if (!bool) return false
		}

		return true
	}

	/**
	 * Loops over each item in the SweetArray, returning a SweetArray of any items that
	 * returned truthy when the callback function was applied to that item.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {SweetArray}
	 */
	filter(callback) {
		if (!isFunction(callback)) return this

		const array = []

		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]
			let bool

			try {
				bool = !!callback(item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					if (error.DESTRUCTIVE === true) {
						break
					}

					const remainingItems = this.#self.slice(i)
					return new SweetArray(array.concat(remainingItems))
				} else {
					throw error
				}
			}

			if (bool) array[array.length] = item
		}

		return new SweetArray(array)
	}

	/**
	 * Loops over each item in the SweetArray in reverse order, returning a SweetArray
	 * of any items that returned truthy when the callback function was applied to
	 * that item.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {SweetArray}
	 */
	filterRight(callback) {
		if (!isFunction(callback)) return this

		const array = []

		for (let i = this.#self.length - 1; i >= 0; i--) {
			const item = this.#self[i]
			let bool

			try {
				bool = !!callback(item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					if (error.DESTRUCTIVE === true) {
						break
					}

					const remainingItems = this.#self.slice(0, i + 1)
					return new SweetArray(remainingItems.concat(array))
				} else {
					throw error
				}
			}

			if (bool) array.unshift(item)
		}

		return new SweetArray(array)
	}

	/**
	 * Finds the first index of the given item. Can find the index of non-primitives as well.
	 *
	 * @param {any} item The item to find the index of
	 * @returns {number|undefined}
	 */
	firstIndexOf(item) {
		if (isPrimitive(item)) {
			const result = this.#self.indexOf(item)

			return result === -1 ? undefined : result
		}

		return undefined
	}

	/**
	 * Flattens an array based on the passed in depth.
	 *
	 * - Pass in `Infinity` to depth argument to recursively flatten the array to the maximum depth.
	 *
	 * - Depths of 100 or more must have the `I_KNOW_WHAT_IM_DOING` argument set to `true`.
	 * - Arrays with 10000 or more items must have the `I_KNOW_WHAT_IM_DOING` argument set to `true`.
	 *
	 * The `I_KNOW_WHAT_IM_DOING` argument is here as a check against potentially performance-busting operations
	 * you might not be aware exist, especially if working with arrays from arbitray sources. This is a
	 * minor inconvenience for a bit of extra performance/memory safety.
	 *
	 * @param {number} [depth] The depth to flatten by (default = `1`)
	 * @param {boolean} [I_KNOW_WHAT_IM_DOING] Setting this to true will disable thrown warnings about potential memory/call stack issues with large depth numbers or arrays
	 * @returns {SweetArray}
	 */
	flatten(depth = 1, I_KNOW_WHAT_IM_DOING = false) {
		if (!isNumber(depth)) depth = 1
		if (!isBoolean(I_KNOW_WHAT_IM_DOING)) I_KNOW_WHAT_IM_DOING = false

		if (!I_KNOW_WHAT_IM_DOING && depth >= 100) {
			throw new Error(
				`Man, that number is deeeeeeeeep. This might seem desirable, but there are potential concerns about reaching maximum call stack size and memory limits if a depth this large is passed (and warranted for that matter). If you're unconcerned with this and have faith in that beautiful machine of yours, you can disable this "warning" by passing true to the I_KNOW_WHAT_IM_DOING argument, i.e. .flatten(${depth}, true).`,
			)
		}

		if (!I_KNOW_WHAT_IM_DOING && this.#self.length >= 10000) {
			throw new Error(
				`Whoa Nelly! This array you have here is quite the specimen! There are potential concerns about reaching maximum call stack size and memory limits with an array of this size (size=${
					this.#self.length
				}). If you're unconcerned with this and have faith in that beautiful machine of yours, you can disable this "warning" by passing true to the I_KNOW_WHAT_IM_DOING argument, i.e. .flatten(${depth}, true).`,
			)
		}

		return new SweetArray(this.#self.flat(depth))
	}

	/**
	 * Loops over each item in the SweetArray, executing the provided callback function for each
	 * iteration.
	 *
	 * - Breakout note: The breakout function, regardless of the options argument passed in, will
	 * not affect the array returned. This function will always return the original array, unaffected.
	 * This is a logical side-effect of the forEach loop not manipulating the underlying array.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {SweetArray}
	 */
	forEach(callback) {
		if (!isFunction(callback)) return this

		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]

			try {
				callback(item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					return this
				} else {
					throw error
				}
			}
		}

		return this
	}

	/**
	 * Loops over each item in the SweetArray in reverse order, executing the provided
	 * callback function for each iteration.
	 *
	 * - Breakout note: The breakout function, regardless of the options argument passed in, will
	 * not affect the array returned. This function will always return the original array, unaffected.
	 * This is a logical side-effect of the forEach loop not manipulating the underlying array.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {SweetArray}
	 */
	forEachRight(callback) {
		if (!isFunction(callback)) return this

		for (let i = this.#self.length - 1; i >= 0; i--) {
			const item = this.#self[i]

			try {
				callback(item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					return this
				} else {
					throw error
				}
			}
		}

		return this
	}

	/**
	 * Retrieves the first number of items within the SweetArray specified by the number you
	 * pass in.
	 *
	 * @param {number} [numberOfItems] The number of items you want returned (default = `1`)
	 * @returns {SweetArray}
	 */
	getFirst(numberOfItems) {
		if (!isNumber(numberOfItems)) {
			numberOfItems = 1
		}

		if (numberOfItems < 1) return new SweetArray()

		if (!this.#self.length || numberOfItems >= this.#self.length) return this

		return new SweetArray(this.#self.slice(0, numberOfItems))
	}

	/**
	 * Returns a "tuple" of the first item and its index from the SweetArray in which the provided
	 * callback returns a truthy value.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {[item: any, index: number]|undefined}
	 */
	getFirstMatch(callback) {
		if (!isFunction(callback)) return undefined

		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]
			const bool = callback(item, i, { self: this })

			if (bool) return [item, i]
		}

		return undefined
	}

	/**
	 * Gets the item at the given index. If the index is negative, this function will count
	 * backwards from the end of the SweetArray instead. Will return undefined if the index
	 * is out of bounds.
	 *
	 * @param {number} index The index of the item to get
	 * @returns {any}
	 */
	getItem(index) {
		if (!isNumber(index)) {
			throw new Error(`Expected index to be a number`)
		}

		if (index < 0) {
			index = this.#self.length - -index
		}

		return this.#self[index]
	}

	/**
	 * Retrieves the last number of items within the SweetArray specified by the number you
	 * pass in.
	 *
	 * @param {number} [numberOfItems] The number of items you want returned (default = `1`)
	 * @returns {SweetArray}
	 */
	getLast(numberOfItems) {
		if (!isNumber(numberOfItems)) {
			numberOfItems = 1
		}

		if (numberOfItems < 1) return new SweetArray()

		if (!this.#self.length || numberOfItems >= this.#self.length) return this

		return new SweetArray(this.#self.slice(-numberOfItems))
	}

	/**
	 * Returns the last item from the SweetArray in which the provided callback returns a truthy value.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {[item: any, index: number]|undefined}
	 */
	getLastMatch(callback) {
		if (!isFunction(callback)) return undefined

		for (let i = this.#self.length - 1; i >= 0; i--) {
			const item = this.#self[i]
			const bool = callback(item, i, { self: this })

			if (bool) return [item, i]
		}

		return undefined
	}

	/**
	 * Checks if all of the provided items exist within the SweetArray.
	 *
	 * @param  {...any} items The items to check against the SweetArray
	 * @returns {boolean}
	 */
	hasAllItems(...items) {
		if (!items.length) items[0] = undefined

		for (let i = 0; i < items.length; i++) {
			if (!this.#self.includes(items[i])) return false
		}

		return true
	}

	/**
	 * Checks if the item provided exists within the SweetArray.
	 *
	 * @param  {any} item The item to check against the SweetArray
	 * @returns {boolean}
	 */
	hasItem(item) {
		return this.#self.includes(item)
	}

	/**
	 * Checks if at least one of the provided items exist within the SweetArray.
	 *
	 * @param  {...any} items The items to check against the SweetArray
	 * @returns {boolean}
	 */
	hasSomeItems(...items) {
		if (!items.length) items[0] = undefined

		for (let i = 0; i < items.length; i++) {
			if (this.#self.includes(items[i])) return true
		}

		return false
	}

	/**
	 * Inserts the given items directly after the given `index`. If the index is negative,
	 * this function will count backwards from the end of the SweetArray instead. If the index is
	 * out of bounds, the array will be filled with empty indices until the desired index is reached.
	 *
	 * @param {number} index The index after which you want to start inserting
	 * @param  {...any} items The items to insert
	 */
	insert(index, ...items) {
		if (!isNumber(index)) return this

		let copy = this.#self.slice(0)
		let trueIndex = index

		if (index < 0) {
			trueIndex = copy.length - -index
		}

		if (trueIndex < -1) {
			const temp = []

			temp.length = Math.abs(trueIndex) - 1

			return new SweetArray(items.concat(temp).concat(copy))
		} else if (trueIndex >= copy.length) {
			copy.length += trueIndex - copy.length + 1
		}

		copy.splice(trueIndex + 1, 0, ...items)

		return new SweetArray(copy)
	}

	/**
	 * Inserts the given items directly before the given `index`. If the index is negative,
	 * this function will count backwards from the end of the SweetArray instead. If the index is
	 * out of bounds, the array will be filled with empty indices until the desired index is reached.
	 *
	 * @param {number} index The index before which you want to start inserting
	 * @param  {...any} items The items to insert
	 */
	insertBefore(index, ...items) {
		if (!isNumber(index)) return this

		let copy = this.#self.slice(0)
		let trueIndex = index

		if (index < 0) {
			trueIndex = copy.length - -index
		}

		if (trueIndex < 0) {
			const temp = []

			temp.length = Math.abs(trueIndex)

			return new SweetArray(items.concat(temp).concat(copy))
		} else if (trueIndex >= copy.length) {
			copy.length += trueIndex - copy.length
		}

		copy.splice(trueIndex, 0, ...items)

		return new SweetArray(copy)
	}

	/**
	 * Joins the elements within the SweetArray into a string value, inserting the string value
	 * between each of the elements.
	 *
	 * @param {string} [string] The string to join the array with (default = `""`)
	 * @returns {string}
	 */
	join(string) {
		if (!isString(string)) {
			string = ""
		}

		return this.#self.join(string)
	}

	/**
	 * Finds the last index of the given item. Can find the index of non-primitives as well.
	 *
	 * @param {any} item The item to find the index of
	 * @returns {number|undefined}
	 */
	lastIndexOf(item) {
		if (isPrimitive(item)) {
			const result = this.#self.lastIndexOf(item)

			return result === -1 ? undefined : result
		}

		return undefined
	}

	/**
	 * Loops over each item in the SweetArray, replacing the items with the return value
	 * of the callback function provided.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {SweetArray}
	 */
	map(callback) {
		if (!isFunction(callback)) return this

		const array = []

		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]
			let newItem

			try {
				newItem = callback(item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					if (error.DESTRUCTIVE) {
						break
					}

					const remainingItems = this.#self.slice(i)
					return new SweetArray(array.concat(remainingItems))
				} else {
					throw error
				}
			}

			array[array.length] = newItem
		}

		return new SweetArray(array)
	}

	/**
	 * Loops over each item in the SweetArray in reverse order, replacing the items with
	 * the return value of the callback function provided.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @returns {SweetArray}
	 */
	mapRight(callback) {
		if (!isFunction(callback)) return this

		const array = []

		for (let i = this.#self.length - 1; i >= 0; i--) {
			const item = this.#self[i]
			let newItem

			try {
				newItem = callback(item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					if (error.DESTRUCTIVE) {
						break
					}

					const remainingItems = this.#self.slice(0, i + 1)
					return new SweetArray(remainingItems.concat(array))
				} else {
					throw error
				}
			}

			array.unshift(newItem)
		}

		return new SweetArray(array)
	}

	/**
	 * Prepends items of any type to the beginning of the SweetArray.
	 *
	 * @param {...any} items The items to prepend, or "unshift", to the beginning of the SweetArray
	 * @returns {SweetArray}
	 */
	prepend(...items) {
		const copy = this.#self.slice(0)

		copy.unshift(...items)

		return new SweetArray(copy)
	}

	/**
	 * Loops over each item in the SweetArray, reducing the item into an accumulator.
	 * The return value for the provided callback will replace the accumulator on
	 * each iteration.
	 *
	 * - Note: Unlike transformative loop methods, calling breakout, regardless of any options passed in,
	 * will always break the loop and return whatever the accumulator is at that moment.
	 *
	 * @param {ReduceCallback} callback The callback function to run on each iteration
	 * @param {any} [accumulator] The value to use as the accumulator in the beginning
	 * (default = the first item of the SweetArray)
	 * @returns {SweetArray}
	 */
	reduce(callback, accumulator) {
		if (!isFunction(callback)) return this

		const start = accumulator === undefined ? 1 : 0
		accumulator = accumulator === undefined ? this.#self[0] : accumulator

		for (let i = start; i < this.#self.length; i++) {
			const item = this.#self[i]
			let evaluated

			try {
				evaluated = callback(accumulator, item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					return accumulator
				} else {
					throw error
				}
			}

			accumulator = evaluated
		}

		return accumulator
	}

	/**
	 * Loops over each item in the SweetArray in reverse order, reducing the item into an accumulator.
	 * The return value for the provided callback will replace the accumulator on
	 * each iteration.
	 *
	 * - Note: Unlike transformative loop methods, calling breakout, regardless of any options passed in,
	 * will always break the loop and return whatever the accumulator is at that moment.
	 *
	 * @param {ReduceCallback} callback The callback function to run on each iteration
	 * @param {any} [accumulator] The value to use as the accumulator in the beginning (default = the last item of the SweetArray)
	 * @returns {SweetArray}
	 */
	reduceRight(callback, accumulator) {
		if (!isFunction(callback)) return this

		const start = this.#self.length - (accumulator === undefined ? 2 : 1)
		accumulator =
			accumulator === undefined
				? this.#self[this.#self.length - 1]
				: accumulator
		for (let i = start; i >= 0; i--) {
			const item = this.#self[i]
			let evaluated

			try {
				evaluated = callback(accumulator, item, i, {
					self: this,
					breakout: this.#breakout.bind(this),
				})
			} catch (error) {
				if (error.message === BREAKOUT) {
					return accumulator
				} else {
					throw error
				}
			}

			accumulator = evaluated
		}

		return accumulator
	}

	/**
	 * Removes duplicate items from the SweetArray. Any items, including objects, will be deduped.
	 *
	 * @returns {SweetArray}
	 */
	removeDuplicates() {
		if (this.#self.length < 2) return this

		return SweetArray.from(new Set(this.#self))
	}

	/**
	 * Removes falsey items from the SweetArray.
	 *
	 * @returns {SweetArray}
	 */
	removeFalsey() {
		return new SweetArray(this.#self.filter(s => s))
	}

	/**
	 * Removes the specified number of items from the end of the SweetArray.
	 *
	 * @param {number} [numberOfItems] The number of items to remove, or "pop", from the
	 * end of the SweetArray (default = `1`)
	 * @returns {SweetArray}
	 */
	removeFromEnd(numberOfItems) {
		numberOfItems =
			isNumber(numberOfItems) && numberOfItems > 0 ? numberOfItems : 1

		const copy = this.#self.slice(0)
		while (numberOfItems > 0 && copy.length > 0) {
			numberOfItems -= 1
			copy.pop()
		}

		return new SweetArray(copy)
	}

	/**
	 * Removes the specified number of items from the beginning of the SweetArray.
	 *
	 * @param {number} [numberOfItems] The number of items to remove, or "shift", from
	 * the beginning of the SweetArray (default = `1`)
	 * @returns {SweetArray}
	 */
	removeFromFront(numberOfItems) {
		numberOfItems =
			isNumber(numberOfItems) && numberOfItems > 0 ? numberOfItems : 1

		const copy = this.#self.slice(0)
		while (numberOfItems > 0 && copy.length > 0) {
			numberOfItems -= 1
			copy.shift()
		}

		return new SweetArray(copy)
	}

	/**
	 * Removes the specified items from the SweetArray.
	 *
	 * @param  {...any} items The items to remove
	 * @returns {SweetArray}
	 */
	removeItem(...items) {
		if (!items.length) {
			throw new Error(`Expected at least one item to remove`)
		}

		items = items.map(s => serialize(s))

		const newArray = []

		for (let i = 0; i < this.#self.length; i++) {
			const item = serialize(this.#self[i])

			if (items.includes(item)) continue

			newArray[newArray.length] = item
		}

		return new SweetArray(newArray)
	}

	/**
	 * Removes all of the items the arrays have in common and returns the items that were
	 * unique among each array.
	 *
	 * @param {...any[]} arrays The comparison arrays. Can be any array literals or SweetArrays
	 * @returns {SweetArray}
	 */
	removeSharedItems(...arrays) {
		if (!arrays.length) return this

		let anchor = this

		for (let i = 0; i < arrays.length; i++) {
			const array = arrays[i]

			if (!isArray(array) && !(array instanceof SweetArray)) {
				continue
			}

			const comparisonArray =
				array instanceof SweetArray ? array : new SweetArray(array)
			const filteredPrimary = anchor.filter(
				item => !comparisonArray.hasItem(item),
			)
			const filteredComparison = comparisonArray.filter(
				item => !anchor.hasItem(item),
			)

			anchor = filteredPrimary.concat(filteredComparison)
		}

		return anchor.removeDuplicates()
	}

	/**
	 * Removes truthy items from the SweetArray.
	 *
	 * @returns {SweetArray}
	 */
	removeTruthy() {
		return new SweetArray(this.#self.filter(s => !s))
	}

	/**
	 * Removes the specified datatypes from the SweetArray.
	 *
	 * @param  {...("string"|"number"|"boolean"|"function"|"symbol"|"bigint"|"map"|"set"|"weakmap"|"weakset"|"array"|"object"|"array iterator"|"promise"|"undefined"|"null")} datatypes The datatypes to remove
	 * @returns {SweetArray}
	 */
	removeType(...datatypes) {
		if (!items.length) return this

		datatypes = datatypes.map(s => (isString(s) ? s.toLowerCase() : s))

		const newArray = []

		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]
			const type = getType(item)

			if (datatypes.includes(type)) continue

			newArray[newArray.length] = item
		}

		return new SweetArray(newArray)
	}

	/**
	 * Removes all of the items unique to both arrays and returns the items that were
	 * shared among each array.
	 *
	 * @param {...any[]} arrays The comparison arrays. Can be any array literals or SweetArrays
	 * @returns {SweetArray}
	 */
	removeUniqueItems(...arrays) {
		if (!arrays.length) return this

		let anchor = this

		for (let i = 0; i < arrays.length; i++) {
			const array = arrays[i]

			if (!isArray(array) && !(array instanceof SweetArray)) {
				continue
			}

			const comparisonArray =
				array instanceof SweetArray ? array : new SweetArray(array)
			const filteredPrimary = anchor.filter(item =>
				comparisonArray.hasItem(item),
			)
			const filteredComparison = comparisonArray.filter(item =>
				anchor.hasItem(item),
			)

			anchor = filteredPrimary.concat(filteredComparison)
		}

		return anchor.removeDuplicates()
	}

	/**
	 * Replaces items starting at the fromIndex.
	 *
	 * @param {number} fromIndex The index where you want to start replacing (inclusive)
	 * @param {...any} items The items to use as a replacement for items starting at fromIndex
	 * @returns {SweetArray}
	 */
	replace(fromIndex, ...items) {
		if (!isNumber(fromIndex) || !items.length) return this

		fromIndex = fromIndex < 0 ? this.#self.length + fromIndex : fromIndex

		if (fromIndex >= this.#self.length) return this

		const copy = this.#self.slice(0)

		copy.splice(fromIndex, items.length, ...items)

		return new SweetArray(copy)
	}

	/**
	 * Reverses the items in the SweetArray.
	 *
	 * @returns {SweetArray}
	 */
	reverse() {
		const copy = this.#self.slice(0)

		return new SweetArray(copy.reverse())
	}

	/**
	 * Tests if at least one item in the SweetArray passes the test implemented by the
	 * provided callback function. For a test to pass, the callback function must return a truthy value.
	 *
	 * @param {LoopCallback} callback The callback function to run on each iteration
	 * @param {number} [minimum] The minimum number of passes needed for some to return true (default = `1`)
	 * @returns {boolean}
	 */
	some(callback, minimum) {
		if (!isNumber(minimum)) {
			minimum = 1
		}

		let passed = 0
		for (let i = 0; i < this.#self.length; i++) {
			const item = this.#self[i]
			const bool = callback(item, i, { self: this })

			if (bool) {
				passed++

				if (passed === minimum) return true
			}
		}

		return false
	}

	/**
	 * Sorts the SweetArray according to the method provided.
	 *
	 * - Note: this method, aside from the convenient string method names, strictly follows the
	 * native `.sort()` function found on native arrays.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort Array.prototype.sort on MDN}
	 *
	 * @param {function|SortString<"asc"|"desc"|"lenAsc"|"lenDesc"|"dateAsc"|"dateDesc"|"alphanumAsc"|"alphanumDesc">} [method] Either a callback
	 * function used for item comparison or a string representing a commonly used sort method
	 * @returns {SweetArray}
	 */
	sort(method) {
		const copy = this.#self.slice(0)

		if (!isString(method) && !isFunction(method)) {
			return new SweetArray(copy.sort())
		}

		if (isString(method)) {
			const otherSortMethods = {
				asc: (a, b) => a - b,
				desc: (a, b) => b - a,
				lenAsc: (a, b) => a.length - b.length,
				lenDesc: (a, b) => b.length - a.length,
				dateAsc: (a, b) => a.getTime() - b.getTime(),
				dateDesc: (a, b) => b.getTime() - a.getTime(),
				alphanumAsc: (a, b) =>
					a.toString().localeCompare(b.toString(), undefined, {
						numeric: true,
						sensitivity: "base",
					}),
				alphanumDesc: (a, b) =>
					b.toString().localeCompare(a.toString(), undefined, {
						numeric: true,
						sensitivity: "base",
					}),
			}

			if (!Object.hasOwn(otherSortMethods, method)) {
				throw new Error(
					`The method "${method}" doesn't exist. Supported methods are ${Object.keys(
						otherSortMethods,
					).join(", ")}`,
				)
			}

			method = otherSortMethods[method]
		}

		return new SweetArray(copy.sort(method))
	}

	/**
	 * Converts the SweetArray into a JSON serialized string.
	 *
	 * @returns {string}
	 */
	toJSON() {
		return JSON.stringify(this.#self)
	}

	/**
	 * Converts the SweetArray into a Map.
	 *
	 * @returns {Map}
	 */
	toMap() {
		const map = new Map()

		for (let i = 0; i < this.#self.length; i++) {
			map.set(i, this.#self[i])
		}

		return map
	}

	/**
	 * Converts the SweetArray into an object, mapping indices as keys and items as values to
	 * those keys.
	 *
	 * @returns {Record<number, any>}
	 */
	toObject() {
		// Object.assign must be doing some magic under the hood because a simple for loop
		// is somehow 10x faster.
		const obj = {}

		for (let i = 0; i < this.#self.length; i++) {
			obj[i] = this.#self[i]
		}

		return obj
	}

	/**
	 * Converts the SweetArray into a Set.
	 *
	 * @returns {Set}
	 */
	toSet() {
		return new Set(this.#self)
	}

	/**
	 * Returns a string representation of the SweetArray
	 *
	 * @returns {string}
	 */
	toString() {
		// recursively convert all items to a string
		const stringArray = this.#toStringHelper()
		let newString = "SweetArray ["

		for (let i = 0; i < stringArray.length; i++) {
			if (i === stringArray.length - 1) {
				newString += `${stringArray[i]}`
			} else {
				newString += `${stringArray[i]}, `
			}
		}

		return `${newString}]`
	}

	/**
	 * Returns the underlying data being operated on.
	 *
	 * @returns {any[]}
	 */
	unwrap() {
		return this.#self
	}
}

SweetArray.prototype.all = SweetArray.prototype.every
SweetArray.prototype.any = SweetArray.prototype.some
SweetArray.prototype.valueOf = SweetArray.prototype.unwrap

export default SweetArray
