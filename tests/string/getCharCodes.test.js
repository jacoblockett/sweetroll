import { SweetString } from "../../index.js"

test("String 1 .getCharCodes", () => {
	const string = "Hello, world!"
	const ss = new SweetString(string)

	expect(ss.getCharCodes(1)).toStrictEqual([101])
	expect(ss.getCharCodes(-1)).toStrictEqual([33])
	expect(ss.getCharCodes(100)).toStrictEqual(void 0)
})
test("String 2 .getCharCodes", () => {
	const string = "Unicorns! 🦄💕"
	const ss = new SweetString(string)

	expect(ss.getCharCodes(11)).toStrictEqual([55357, 56469])
	expect(ss.getCharCodes(-2)).toStrictEqual([55358, 56708])
	expect(ss.getCharCodes(100)).toStrictEqual(void 0)
})
test("String 3 .getCharCodes", () => {
	const string = "Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘"
	const ss = new SweetString(string)

	expect(ss.getCharCodes(0)).toStrictEqual([
		90, 849, 875, 835, 874, 770, 875, 829, 847, 820, 793, 804, 798, 841, 858,
		815, 798, 800, 845,
	])
	expect(ss.getCharCodes(-1)).toStrictEqual([
		79, 834, 780, 780, 856, 808, 821, 825, 827, 797, 819,
	])
	expect(ss.getCharCodes(100)).toStrictEqual(void 0)
})
