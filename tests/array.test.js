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
