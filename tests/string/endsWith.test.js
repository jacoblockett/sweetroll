import { SweetString } from "../../index.js"

test("String 1 .endsWith", () => {
	const string = "Hello, world!"
	const ss = new SweetString(string)

	expect(ss.endsWith("!")).toStrictEqual(true)
	expect(ss.endsWith("d")).toStrictEqual(false)
})
test("String 2 .endsWith", () => {
	const string = "Unicorns! 🦄💕"
	const ss = new SweetString(string)

	expect(ss.endsWith("💕")).toStrictEqual(true)
	expect(ss.endsWith("🦄")).toStrictEqual(false)
})
test("String 3 .endsWith", () => {
	const string = "Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘"
	const ss = new SweetString(string)

	expect(ss.endsWith("Ǫ̵̹̻̝̳͂̌̌͘")).toStrictEqual(true)
	expect(ss.endsWith("a")).toStrictEqual(false)
})
