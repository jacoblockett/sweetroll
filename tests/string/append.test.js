import { SweetString } from "../../index.js"

const appendString1 = "abc"
const appendString2 = "💩"
const appendString3 = "佫𩷶"

test("String 1 .append", () => {
	const string = "Hello, world!"
	const ss = new SweetString(string)

	expect(ss.append(appendString1).unwrap()).toStrictEqual(
		`${string}${appendString1}`,
	)
	expect(ss.append(appendString2).unwrap()).toStrictEqual(
		`${string}${appendString2}`,
	)
	expect(ss.append(appendString3).unwrap()).toStrictEqual(
		`${string}${appendString3}`,
	)
})
test("String 2 .append", () => {
	const string = "Unicorns! 🦄💕"
	const ss = new SweetString(string)

	expect(ss.append(appendString1).unwrap()).toStrictEqual(
		`${string}${appendString1}`,
	)
	expect(ss.append(appendString2).unwrap()).toStrictEqual(
		`${string}${appendString2}`,
	)
	expect(ss.append(appendString3).unwrap()).toStrictEqual(
		`${string}${appendString3}`,
	)
})
test("String 3 .append", () => {
	const string = "Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘"
	const ss = new SweetString(string)

	expect(ss.append(appendString1).unwrap()).toStrictEqual(
		`${string}${appendString1}`,
	)
	expect(ss.append(appendString2).unwrap()).toStrictEqual(
		`${string}${appendString2}`,
	)
	expect(ss.append(appendString3).unwrap()).toStrictEqual(
		`${string}${appendString3}`,
	)
})
