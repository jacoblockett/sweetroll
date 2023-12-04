import { SweetString } from "../../index.js"

test("String 1 .getChar", () => {
	const string = "Hello, world!"
	const ss = new SweetString(string)

	expect(ss.getChar(5).unwrap()).toStrictEqual(",")
	expect(ss.getChar(-1).unwrap()).toStrictEqual("!")
	expect(ss.getChar(100)).toStrictEqual(void 0)
})
test("String 2 .getChar", () => {
	const string = "Unicorns! 🦄💕"
	const ss = new SweetString(string)

	expect(ss.getChar(11).unwrap()).toStrictEqual("💕")
	expect(ss.getChar(-2).unwrap()).toStrictEqual("🦄")
	expect(ss.getChar(100)).toStrictEqual(void 0)
})
test("String 3 .getChar", () => {
	const string = "Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘"
	const ss = new SweetString(string)

	expect(ss.getChar(2).unwrap()).toStrictEqual("L̠ͨͧͩ͘")
	expect(ss.getChar(-1).unwrap()).toStrictEqual("Ǫ̵̹̻̝̳͂̌̌͘")
	expect(ss.getChar(100)).toStrictEqual(void 0)
})
