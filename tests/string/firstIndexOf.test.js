import { SweetString } from "../../index.js"

test("String 1 .firstIndexOf", () => {
	const string = "Hello, world!"
	const ss = new SweetString(string)

	expect(ss.firstIndexOf("l")).toStrictEqual(2)
	expect(ss.firstIndexOf("a")).toStrictEqual(void 0)
})
test("String 2 .firstIndexOf", () => {
	const string = "Unicorns! 🦄💕"
	const ss = new SweetString(string)

	expect(ss.firstIndexOf("💕")).toStrictEqual(11)
	expect(ss.firstIndexOf("x")).toStrictEqual(void 0)
})
test("String 3 .firstIndexOf", () => {
	const string = "Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘"
	const ss = new SweetString(string)

	expect(ss.firstIndexOf("L̠ͨͧͩ͘")).toStrictEqual(2)
	expect(ss.firstIndexOf("a")).toStrictEqual(void 0)
})
