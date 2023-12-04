import { SweetString } from "../../index.js"

test("String 1 .length", () => {
	const string = "Hello, world!"
	const ss = new SweetString(string)

	expect(ss.length).toStrictEqual(13)
})
test("String 2 .length", () => {
	const string = "Unicorns! 🦄💕"
	const ss = new SweetString(string)

	expect(ss.length).toStrictEqual(12)
})
test("String 3 .length", () => {
	const string = "Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘"
	const ss = new SweetString(string)

	expect(ss.length).toStrictEqual(5)
})
