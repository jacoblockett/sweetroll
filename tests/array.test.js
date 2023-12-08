import getType from "../utils/getType"
import SweetArray from "../wrappers/array"
import SweetString from "../wrappers/string"

test(`SweetArray.length value check`, () => {
	expect(new SweetArray([1, 2, 3]).length).toStrictEqual(3)
	expect(new SweetArray([]).length).toStrictEqual(0)
})

test(`SweetArray.from() value check`, () => {
	expect(SweetArray.from().unwrap()).toStrictEqual([])
})
test(`SweetArray.from({ 0: "a", 2: "b", 3: "c" }) value check`, () => {
	expect(SweetArray.from({ 0: "a", 2: "b", 3: "c" }).unwrap()).toStrictEqual([
		"a",
		,
		"b",
		"c",
	])
})
test(`SweetArray.from({ key1: "a", key2: "b" }) value check`, () => {
	expect(SweetArray.from({ key1: "a", key2: "b" }).unwrap()).toStrictEqual([
		["key1", "a"],
		["key2", "b"],
	])
})
test(`SweetArray.from("abc") value check`, () => {
	expect(SweetArray.from("abc").unwrap()).toStrictEqual(["a", "b", "c"])
})
test(`SweetArray.from(new SweetString("abc")) value check`, () => {
	expect(SweetArray.from(new SweetString("abc")).unwrap()).toStrictEqual([
		"a",
		"b",
		"c",
	])
})
test(`SweetArray.from(3) value check`, () => {
	expect(SweetArray.from(3).unwrap()).toStrictEqual([, , ,])
})
test(`SweetArray.from([1, 2, 3]) value check`, () => {
	expect(SweetArray.from([1, 2, 3]).unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.from(new SweetArray([1, 2, 3])) value check`, () => {
	expect(SweetArray.from(new SweetArray([1, 2, 3])).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.from(new Set([1, 2, 3])) value check`, () => {
	expect(SweetArray.from(new Set([1, 2, 3])).unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.from(new Map([["a", 1], ["b", 2]])) value check`, () => {
	expect(
		SweetArray.from(
			new Map([
				["a", 1],
				["b", 2],
			]),
		).unwrap(),
	).toStrictEqual([
		["a", 1],
		["b", 2],
	])
})
test(`SweetArray.from(() => {}) throw check`, () => {
	expect(() => SweetArray.from(() => {})).toThrow()
})

test(`SweetArray.entries value check`, () => {
	expect(getType(new SweetArray([1, 2, 3]).entries)).toStrictEqual(
		"array iterator",
	)
})
test(`SweetArray.keys value check`, () => {
	expect(getType(new SweetArray([1, 2, 3]).keys)).toStrictEqual(
		"array iterator",
	)
})
test(`SweetArray.length value check`, () => {
	expect(new SweetArray([1, 2, 3]).length).toStrictEqual(3)
})

test(`SweetArray.append("a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).append("a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3, "a", "b", "c"])
})

test(`SweetArray.concat() value check`, () => {
	expect(new SweetArray([1, 2, 3]).concat().unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.concat(["a", "b", "c"]) value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).concat(["a", "b", "c"]).unwrap(),
	).toStrictEqual([1, 2, 3, "a", "b", "c"])
})
test(`SweetArray.concat(new SweetArray(["a", "b", "c"])) value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).concat(new SweetArray(["a", "b", "c"])).unwrap(),
	).toStrictEqual([1, 2, 3, "a", "b", "c"])
})

test(`SweetArray.copy() value check`, () => {
	expect(new SweetArray([1, 2, 3]).copy().unwrap()).toStrictEqual([1, 2, 3])
})

test(`SweetArray.every(x => x > 10) value check`, () => {
	expect(new SweetArray([11, 12, 13]).every(x => x > 10)).toStrictEqual(true)
})
test(`SweetArray.every(x => x < 10) value check`, () => {
	expect(new SweetArray([11, 12, 13]).every(x => x < 10)).toStrictEqual(false)
})
test(`SweetArray.every() throw check`, () => {
	expect(() => new SweetArray([11, 12, 13]).every()).toThrow()
})

test(`SweetArray.filter(x => x) value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).filter(x => x).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.filter(x => !x) value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).filter(x => !x).unwrap()).toStrictEqual([
		0,
	])
})
test(`SweetArray.filter((x, i, { breakout }) => x) value check`, () => {
	expect(
		new SweetArray([0, 1, 2, 3, 4, 5])
			.filter((x, i, { breakout }) => {
				if (i > 2) breakout()

				return x
			})
			.unwrap(),
	).toStrictEqual([1, 2, 3, 4, 5])
})
test(`SweetArray.filter((x, i, { breakout }) => x) [destructive=true] value check`, () => {
	expect(
		new SweetArray([0, 1, 2, 3, 4, 5])
			.filter((x, i, { breakout }) => {
				if (i > 2) breakout(true)

				return x
			})
			.unwrap(),
	).toStrictEqual([1, 2])
})

test(`SweetArray.filterRight(x => x) value check`, () => {
	expect(
		new SweetArray([0, 1, 2, 3]).filterRight(x => x).unwrap(),
	).toStrictEqual([1, 2, 3])
})
test(`SweetArray.filterRight(x => !x) value check`, () => {
	expect(
		new SweetArray([0, 1, 2, 3]).filterRight(x => !x).unwrap(),
	).toStrictEqual([0])
})
test(`SweetArray.filterRight((x, i, { breakout }) => x) value check`, () => {
	expect(
		new SweetArray([0, 1, 2, 3, 4, 5])
			.filterRight((x, i, { breakout }) => {
				if (i < 3) breakout()

				return x
			})
			.unwrap(),
	).toStrictEqual([0, 1, 2, 3, 4, 5])
})
test(`SweetArray.filterRight((x, i, { breakout }) => x) [destructive=true] value check`, () => {
	expect(
		new SweetArray([0, 1, 2, 3, 4, 5])
			.filterRight((x, i, { breakout }) => {
				if (i < 3) breakout(true)

				return x
			})
			.unwrap(),
	).toStrictEqual([3, 4, 5])
})

test(`SweetArray.firstIndexOf(1) value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).firstIndexOf(1)).toStrictEqual(1)
})
test(`SweetArray.firstIndexOf() value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).firstIndexOf()).toBeUndefined()
})
test(`SweetArray.firstIndexOf(9) value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).firstIndexOf(9)).toBeUndefined()
})

test(`SweetArray.flatten() value check`, () => {
	const array = [[0], [1], [2]]
	const expected = array.flat()

	expect(new SweetArray(array).flatten().unwrap()).toStrictEqual(expected)
})
test(`SweetArray.flatten(1) value check`, () => {
	const array = [[0], [1], [2]]
	const expected = array.flat(1)

	expect(new SweetArray(array).flatten(1).unwrap()).toStrictEqual(expected)
})
test(`SweetArray.flatten(1) value check`, () => {
	const array = [[0], [1], [2], [[3]]]
	const expected = array.flat(1)

	expect(new SweetArray(array).flatten(1).unwrap()).toStrictEqual(expected)
})
test(`SweetArray.flatten(2) value check`, () => {
	const array = [[0], [1], [2], [[3]]]
	const expected = array.flat(2)

	expect(new SweetArray(array).flatten(2).unwrap()).toStrictEqual(expected)
})
test(`SweetArray.flatten(100, true) throw check`, () => {
	expect(() => new SweetArray(Array(10)).flatten(100, true)).not.toThrow()
})
test(`SweetArray.flatten(3, true) [array.length=10000] throw check`, () => {
	expect(() => new SweetArray(Array(10000)).flatten(3, true)).not.toThrow()
})
test(`SweetArray.flatten(100) throw check`, () => {
	expect(() => new SweetArray(Array(10)).flatten(100)).toThrow()
})
test(`SweetArray.flatten() [array.length=10000] throw check`, () => {
	expect(() => new SweetArray(Array(10000)).flatten()).toThrow()
})

test(`SweetArray.forEach() value check`, () => {
	const array = new SweetArray([1, 2, 3, 4, 5])
	const container = []

	array.forEach(x => (container[container.length] = x))

	expect(container).toStrictEqual([1, 2, 3, 4, 5])
	expect(array.unwrap()).toStrictEqual([1, 2, 3, 4, 5])
})
test(`SweetArray.forEach(with breakout) value check`, () => {
	const array = new SweetArray([1, 2, 3, 4, 5])
	const container = []

	array.forEach((x, i, { breakout }) => {
		if (i > 3) breakout()

		container[container.length] = x
	})

	expect(container).toStrictEqual([1, 2, 3, 4])
	expect(array.unwrap()).toStrictEqual([1, 2, 3, 4, 5])
})

test(`SweetArray.forEachRight() value check`, () => {
	const array = new SweetArray([1, 2, 3, 4, 5])
	const container = []

	array.forEachRight(x => (container[container.length] = x))

	expect(container).toStrictEqual([5, 4, 3, 2, 1])
	expect(array.unwrap()).toStrictEqual([1, 2, 3, 4, 5])
})
test(`SweetArray.forEachRight(with breakout) value check`, () => {
	const array = new SweetArray([1, 2, 3, 4, 5])
	const container = []

	array.forEachRight((x, i, { breakout }) => {
		if (i < 3) breakout()

		container[container.length] = x
	})

	expect(container).toStrictEqual([5, 4])
	expect(array.unwrap()).toStrictEqual([1, 2, 3, 4, 5])
})

test(`SweetArray.getFirst() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getFirst().unwrap()).toStrictEqual([1])
})
test(`SweetArray.getFirst(1) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getFirst(1).unwrap()).toStrictEqual([
		1,
	])
})
test(`SweetArray.getFirst(3) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getFirst(3).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.getFirst(0) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getFirst(0).unwrap()).toStrictEqual([])
})
test(`SweetArray.getFirst(-1) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getFirst(-1).unwrap()).toStrictEqual(
		[],
	)
})

test(`SweetArray.getFirstMatch() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getFirstMatch()).toBeUndefined()
})
test(`SweetArray.getFirstMatch(callback) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5]).getFirstMatch(x => x > 3),
	).toStrictEqual([4, 3])
})
test(`SweetArray.getFirstMatch(callback with obj) value check`, () => {
	expect(
		new SweetArray([1, 2, { a: "test" }, 4, 5]).getFirstMatch(
			x => x?.a === "test",
		),
	).toStrictEqual([{ a: "test" }, 2])
})
test(`SweetArray.getFirstMatch(callback no match) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5]).getFirstMatch(x => x > 10),
	).toBeUndefined()
})

test(`SweetArray.getItem(0) value check`, () => {
	expect(new SweetArray([1, 2, 3]).getItem(0)).toStrictEqual(1)
})
test(`SweetArray.getItem(-2) value check`, () => {
	expect(new SweetArray([1, 2, 3]).getItem(-2)).toStrictEqual(2)
})
test(`SweetArray.getItem(10) value check`, () => {
	expect(new SweetArray([1, 2, 3]).getItem(10)).toBeUndefined()
})
test(`SweetArray.getItem() throw check`, () => {
	expect(() => new SweetArray([1, 2, 3]).getItem()).toThrow()
})

test(`SweetArray.getLast() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getLast().unwrap()).toStrictEqual([5])
})
test(`SweetArray.getLast(1) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getLast(1).unwrap()).toStrictEqual([5])
})
test(`SweetArray.getLast(3) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getLast(3).unwrap()).toStrictEqual([
		3, 4, 5,
	])
})
test(`SweetArray.getLast(0) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getLast(0).unwrap()).toStrictEqual([])
})
test(`SweetArray.getLast(-1) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getLast(-1).unwrap()).toStrictEqual([])
})

test(`SweetArray.getLastMatch() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).getLastMatch()).toBeUndefined()
})
test(`SweetArray.getLastMatch(callback) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5]).getLastMatch(x => x > 3),
	).toStrictEqual([5, 4])
})
test(`SweetArray.getLastMatch(callback with obj) value check`, () => {
	expect(
		new SweetArray([1, 2, { a: "test" }, { a: "test" }, 4, 5]).getLastMatch(
			x => x?.a === "test",
		),
	).toStrictEqual([{ a: "test" }, 3])
})
test(`SweetArray.getLastMatch(callback no match) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5]).getLastMatch(x => x > 10),
	).toBeUndefined()
})
