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

test(`SweetArray.append() value check`, () => {
	expect(new SweetArray([1, 2, 3]).append().unwrap()).toStrictEqual([1, 2, 3])
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
	expect(new SweetArray([0, 1, 1, 2, 3]).firstIndexOf(1)).toStrictEqual(1)
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

test(`SweetArray.hasAllItems(1, "a") value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasAllItems(1, "a"),
	).toStrictEqual(true)
})
test(`SweetArray.hasAllItems(1, "c") value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasAllItems(1, "c"),
	).toStrictEqual(false)
})
test(`SweetArray.hasAllItems() value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasAllItems(),
	).toStrictEqual(false)
})
test(`SweetArray.hasAllItems() value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", undefined]).hasAllItems(),
	).toStrictEqual(true)
})

test(`SweetArray.hasItem(1) value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasItem(1),
	).toStrictEqual(true)
})
test(`SweetArray.hasItem("c") value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasItem("c"),
	).toStrictEqual(false)
})
test(`SweetArray.hasItem() value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasItem(),
	).toStrictEqual(false)
})
test(`SweetArray.hasItem() value check`, () => {
	expect(new SweetArray([1, 2, "a", "b", undefined]).hasItem()).toStrictEqual(
		true,
	)
})

test(`SweetArray.hasSomeItems(1, "a") value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasSomeItems(1, "a"),
	).toStrictEqual(true)
})
test(`SweetArray.hasSomeItems(1, "c") value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasSomeItems(1, "c"),
	).toStrictEqual(true)
})
test(`SweetArray.hasSomeItems(3, "c") value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasSomeItems(3, "c"),
	).toStrictEqual(false)
})
test(`SweetArray.hasSomeItems() value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", { a: "test" }]).hasSomeItems(),
	).toStrictEqual(false)
})
test(`SweetArray.hasSomeItems() value check`, () => {
	expect(
		new SweetArray([1, 2, "a", "b", undefined]).hasSomeItems(),
	).toStrictEqual(true)
})

test(`SweetArray.insert(0, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(0, "a", "b", "c").unwrap(),
	).toStrictEqual([1, "a", "b", "c", 2, 3])
})
test(`SweetArray.insert(1, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(1, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, "a", "b", "c", 3])
})
test(`SweetArray.insert(2, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(2, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3, "a", "b", "c"])
})
test(`SweetArray.insert(3, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(3, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3, , "a", "b", "c"])
})
test(`SweetArray.insert(-1, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(-1, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3, "a", "b", "c"])
})
test(`SweetArray.insert(-2, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(-2, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, "a", "b", "c", 3])
})
test(`SweetArray.insert(-4, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(-4, "a", "b", "c").unwrap(),
	).toStrictEqual(["a", "b", "c", 1, 2, 3])
})
test(`SweetArray.insert(-5, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert(-5, "a", "b", "c").unwrap(),
	).toStrictEqual(["a", "b", "c", , 1, 2, 3])
})
test(`SweetArray.insert("a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insert("a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3])
})

test(`SweetArray.insertBefore(0, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(0, "a", "b", "c").unwrap(),
	).toStrictEqual(["a", "b", "c", 1, 2, 3])
})
test(`SweetArray.insertBefore(1, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(1, "a", "b", "c").unwrap(),
	).toStrictEqual([1, "a", "b", "c", 2, 3])
})
test(`SweetArray.insertBefore(2, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(2, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, "a", "b", "c", 3])
})
test(`SweetArray.insertBefore(3, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(3, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3, "a", "b", "c"])
})
test(`SweetArray.insertBefore(-1, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(-1, "a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, "a", "b", "c", 3])
})
test(`SweetArray.insertBefore(-2, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(-2, "a", "b", "c").unwrap(),
	).toStrictEqual([1, "a", "b", "c", 2, 3])
})
test(`SweetArray.insertBefore(-4, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(-4, "a", "b", "c").unwrap(),
	).toStrictEqual(["a", "b", "c", , 1, 2, 3])
})
test(`SweetArray.insertBefore(-5, "a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore(-5, "a", "b", "c").unwrap(),
	).toStrictEqual(["a", "b", "c", , , 1, 2, 3])
})
test(`SweetArray.insertBefore("a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).insertBefore("a", "b", "c").unwrap(),
	).toStrictEqual([1, 2, 3])
})

test(`SweetArray.join() value check`, () => {
	expect(new SweetArray([1, 2, 3]).join()).toStrictEqual("123")
})
test(`SweetArray.join("") value check`, () => {
	expect(new SweetArray([1, 2, 3]).join("")).toStrictEqual("123")
})
test(`SweetArray.join("x") value check`, () => {
	expect(new SweetArray([1, 2, 3]).join("x")).toStrictEqual("1x2x3")
})
test(`SweetArray.join(5) value check`, () => {
	expect(new SweetArray([1, 2, 3]).join(5)).toStrictEqual("123")
})

test(`SweetArray.lastIndexOf(1) value check`, () => {
	expect(new SweetArray([0, 1, 1, 2, 3]).lastIndexOf(1)).toStrictEqual(2)
})
test(`SweetArray.lastIndexOf() value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).lastIndexOf()).toBeUndefined()
})
test(`SweetArray.lastIndexOf(9) value check`, () => {
	expect(new SweetArray([0, 1, 2, 3]).lastIndexOf(9)).toBeUndefined()
})

test(`SweetArray.map() value check`, () => {
	expect(new SweetArray([1, 2, 3]).map().unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.map(1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).map(1).unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.map(x => x) value check`, () => {
	expect(new SweetArray([1, 2, 3]).map(x => x).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.map(x => x + 1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).map(x => x + 1).unwrap()).toStrictEqual([
		2, 3, 4,
	])
})
test(`SweetArray.map(breakout) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5])
			.map((x, i, { breakout }) => {
				if (i === 2) breakout()

				return x + 1
			})
			.unwrap(),
	).toStrictEqual([2, 3, 3, 4, 5])
})
test(`SweetArray.map(breakout destructive) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5])
			.map((x, i, { breakout }) => {
				if (i === 2) breakout(true)

				return x + 1
			})
			.unwrap(),
	).toStrictEqual([2, 3])
})

test(`SweetArray.mapRight() value check`, () => {
	expect(new SweetArray([1, 2, 3]).mapRight().unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.mapRight(1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).mapRight(1).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.mapRight(x => x) value check`, () => {
	expect(new SweetArray([1, 2, 3]).mapRight(x => x).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.mapRight(x => x + 1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).mapRight(x => x + 1).unwrap()).toStrictEqual(
		[2, 3, 4],
	)
})
test(`SweetArray.mapRight(breakout) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5])
			.mapRight((x, i, { breakout }) => {
				if (i === 2) breakout()

				return x + 1
			})
			.unwrap(),
	).toStrictEqual([1, 2, 3, 5, 6])
})
test(`SweetArray.mapRight(breakout destructive) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5])
			.mapRight((x, i, { breakout }) => {
				if (i === 2) breakout(true)

				return x + 1
			})
			.unwrap(),
	).toStrictEqual([5, 6])
})

test(`SweetArray.prepend() value check`, () => {
	expect(new SweetArray([1, 2, 3]).prepend().unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.prepend("a", "b", "c") value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).prepend("a", "b", "c").unwrap(),
	).toStrictEqual(["a", "b", "c", 1, 2, 3])
})

test(`SweetArray.reduce() value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduce().unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.reduce(1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduce(1).unwrap()).toStrictEqual([1, 2, 3])
})
test(`SweetArray.reduce(() => {}) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduce(() => {})).toBeUndefined()
})
test(`SweetArray.reduce((p, c) => p + c) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduce((p, c) => p + c)).toStrictEqual(6)
})
test(`SweetArray.reduce((p, c) => p + c, 1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduce((p, c) => p + c, 1)).toStrictEqual(7)
})
test(`SweetArray.reduce(breakout) value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).reduce((p, c, _, { breakout }) => {
			if (p >= 3) breakout()

			return p + c
		}, 1),
	).toStrictEqual(4)
})

test(`SweetArray.reduceRight() value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduceRight().unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.reduceRight(1) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduceRight(1).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.reduceRight(() => {}) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduceRight(() => {})).toBeUndefined()
})
test(`SweetArray.reduceRight((p, c) => p + c) value check`, () => {
	expect(new SweetArray([1, 2, 3]).reduceRight((p, c) => p + c)).toStrictEqual(
		6,
	)
})
test(`SweetArray.reduceRight((p, c) => p + c, 1) value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).reduceRight((p, c) => p + c, 1),
	).toStrictEqual(7)
})
test(`SweetArray.reduceRight(breakout) value check`, () => {
	expect(
		new SweetArray([1, 2, 3]).reduceRight((p, c, _, { breakout }) => {
			if (p >= 3) breakout()

			return p + c
		}),
	).toStrictEqual(3)
})

test(`SweetArray.removeDuplicates() value check`, () => {
	expect(
		new SweetArray([1, 2, 2, 3]).removeDuplicates().unwrap(),
	).toStrictEqual([1, 2, 3])
})
test(`SweetArray.removeDuplicates() value check`, () => {
	expect(new SweetArray([1]).removeDuplicates().unwrap()).toStrictEqual([1])
})

test(`SweetArray.removeFalsey() value check`, () => {
	expect(
		new SweetArray([0, 1, 2, false]).removeFalsey().unwrap(),
	).toStrictEqual([1, 2])
})

test(`SweetArray.removeFromEnd() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4]).removeFromEnd().unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.removeFromEnd(1) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4]).removeFromEnd(1).unwrap()).toStrictEqual([
		1, 2, 3,
	])
})
test(`SweetArray.removeFromEnd(2) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4]).removeFromEnd(2).unwrap()).toStrictEqual([
		1, 2,
	])
})
test(`SweetArray.removeFromEnd(-1)) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4]).removeFromEnd(-1).unwrap()).toStrictEqual(
		[1, 2, 3, 4],
	)
})
test(`SweetArray.removeFromEnd(5)) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4]).removeFromEnd(5).unwrap()).toStrictEqual(
		[],
	)
})

test(`SweetArray.removeFromFront() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4]).removeFromFront().unwrap()).toStrictEqual(
		[2, 3, 4],
	)
})
test(`SweetArray.removeFromFront(1) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4]).removeFromFront(1).unwrap(),
	).toStrictEqual([2, 3, 4])
})
test(`SweetArray.removeFromFront(2) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4]).removeFromFront(2).unwrap(),
	).toStrictEqual([3, 4])
})
test(`SweetArray.removeFromFront(-1)) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4]).removeFromFront(-1).unwrap(),
	).toStrictEqual([1, 2, 3, 4])
})
test(`SweetArray.removeFromFront(5)) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4]).removeFromFront(5).unwrap(),
	).toStrictEqual([])
})

test(`SweetArray.removeItem() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).removeItem().unwrap()).toStrictEqual([
		1, 2, 3, 4, 5,
	])
})
test(`SweetArray.removeItem(3) value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).removeItem(3).unwrap()).toStrictEqual([
		1, 2, 4, 5,
	])
})
test(`SweetArray.removeItem(1, 4) value check`, () => {
	expect(
		new SweetArray([1, 2, 3, 4, 5]).removeItem(1, 4).unwrap(),
	).toStrictEqual([2, 3, 5])
})

test(`SweetArray.removeTruthy() value check`, () => {
	expect(new SweetArray([1, 2, 3, 4, 5]).removeTruthy().unwrap()).toStrictEqual(
		[],
	)
})
test(`SweetArray.removeTruthy() value check`, () => {
	expect(
		new SweetArray([0, 1, 2, undefined, 3, 4, 5]).removeTruthy().unwrap(),
	).toStrictEqual([0, undefined])
})
