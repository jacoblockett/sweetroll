import SweetString from "../wrappers/string"

const string = new SweetString("abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘")

test("SweetString.append('abc') instance check", () => {
	expect(string.append("abc")).toBeInstanceOf(SweetString)
})
test("SweetString.append() instance check", () => {
	expect(string.append()).toBeInstanceOf(SweetString)
})
test("SweetString.append(string) instance check", () => {
	expect(string.append(string)).toBeInstanceOf(SweetString)
})
test("SweetString.append(void 0) throw check", () => {
	expect(() => string.append(void 0)).toThrow()
})
test("SweetString.append('abc') value check", () => {
	expect(string.append("abc").unwrap()).toStrictEqual("abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘abc")
})
test("SweetString.append('🦄💕') value check", () => {
	expect(string.append("🦄💕").unwrap()).toStrictEqual("abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘🦄💕")
})
test("SweetString.append('佫𩷶') value check", () => {
	expect(string.append("佫𩷶").unwrap()).toStrictEqual("abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘佫𩷶")
})
test("SweetString.append(new SweetString('abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘')) value check", () => {
	expect(string.append(string).unwrap()).toStrictEqual(
		"abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘",
	)
})

test("SweetString.convertCodepointIndexToLogicalIndex() value check", () => {
	expect(string.convertCodepointIndexToLogicalIndex()).toBeUndefined()
})
test("SweetString.convertCodepointIndexToLogicalIndex(2) value check", () => {
	expect(string.convertCodepointIndexToLogicalIndex(2)).toStrictEqual(2)
})
test("SweetString.convertCodepointIndexToLogicalIndex(8) value check", () => {
	expect(string.convertCodepointIndexToLogicalIndex(8)).toStrictEqual(7)
})
test("SweetString.convertCodepointIndexToLogicalIndex(16) value check", () => {
	expect(string.convertCodepointIndexToLogicalIndex(16)).toStrictEqual(10)
})
test("SweetString.convertCodepointIndexToLogicalIndex(100) value check", () => {
	expect(string.convertCodepointIndexToLogicalIndex(100)).toBeUndefined()
})

test("SweetString.endsWith('Ǫ̵̹̻̝̳͂̌̌͘') value check", () => {
	expect(string.endsWith("Ǫ̵̹̻̝̳͂̌̌͘")).toStrictEqual(true)
})
test("SweetString.endsWith('🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘') value check", () => {
	expect(string.endsWith("🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘")).toStrictEqual(true)
})
test("SweetString.endsWith('test') value check", () => {
	expect(string.endsWith("test")).toStrictEqual(false)
})
test("SweetString.endsWith(new SweetString('abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘')) value check", () => {
	expect(string.endsWith(string)).toStrictEqual(true)
})
test("SweetString.endsWith(void 0) throw check", () => {
	expect(() => string.endsWith(void 0)).toThrow()
})

test("SweetString.firstIndexOf('a') value check", () => {
	expect(string.firstIndexOf("a")).toStrictEqual(0)
})
test("SweetString.firstIndexOf('💕') value check", () => {
	expect(string.firstIndexOf("💕")).toStrictEqual(8)
})
test("SweetString.firstIndexOf('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘') value check", () => {
	expect(string.firstIndexOf("Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘")).toStrictEqual(10)
})
test("SweetString.firstIndexOf(new SweetString('abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘')) value check", () => {
	expect(string.firstIndexOf(string)).toStrictEqual(0)
})
test("SweetString.firstIndexOf('hola') value check", () => {
	expect(string.firstIndexOf("hola")).toBeUndefined()
})
test("SweetString.firstIndexOf(void 0) throw check", () => {
	expect(() => string.firstIndexOf(void 0)).toThrow()
})

test("SweetString.getChar(0) instance check", () => {
	expect(string.getChar(0)).toBeInstanceOf(SweetString)
})
test("SweetString.getChar(0) value check", () => {
	expect(string.getChar(0).unwrap()).toStrictEqual("a")
})
test("SweetString.getChar(8) value check", () => {
	expect(string.getChar(8).unwrap()).toStrictEqual("💕")
})
test("SweetString.getChar(12) value check", () => {
	expect(string.getChar(12).unwrap()).toStrictEqual("L̠ͨͧͩ͘")
})
test("SweetString.getChar(-1) value check", () => {
	expect(string.getChar(-1).unwrap()).toStrictEqual("Ǫ̵̹̻̝̳͂̌̌͘")
})
test("SweetString.getChar(100) value check", () => {
	expect(string.getChar(100)).toBeUndefined()
})
test("SweetString.getChar(void 0) throw check", () => {
	expect(() => string.getChar(void 0)).toThrow()
})

test("SweetString.getCharCodes(0) value check", () => {
	expect(string.getCharCodes(0)).toStrictEqual([97])
})
test("SweetString.getCharCodes(8) value check", () => {
	expect(string.getCharCodes(8)).toStrictEqual([55357, 56469])
})
test("SweetString.getCharCodes(12) value check", () => {
	expect(string.getCharCodes(12)).toStrictEqual([76, 872, 871, 873, 856, 800])
})
test("SweetString.getCharCodes(-1) value check", () => {
	expect(string.getCharCodes(-1)).toStrictEqual([
		79, 834, 780, 780, 856, 808, 821, 825, 827, 797, 819,
	])
})
test("SweetString.getCharCodes(100) value check", () => {
	expect(string.getCharCodes(100)).toBeUndefined()
})
test("SweetString.getCharCodes(void 0) throw check", () => {
	expect(() => string.getCharCodes(void 0)).toThrow()
})

test("SweetString.hasChar('a') value check", () => {
	expect(string.hasChar("a")).toStrictEqual(true)
})
test("SweetString.hasChar('💕') value check", () => {
	expect(string.hasChar("💕")).toStrictEqual(true)
})
test("SweetString.hasChar('💩') value check", () => {
	expect(string.hasChar("💩")).toStrictEqual(false)
})
test("SweetString.hasChar(new SweetString('💩')) value check", () => {
	expect(string.hasChar(new SweetString("💩"))).toStrictEqual(false)
})
test("SweetString.hasChar(void 0) throw check", () => {
	expect(() => string.hasChar(void 0)).toThrow()
})
test("SweetString.hasChar('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘') throw check", () => {
	expect(() => string.hasChar("Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘")).toThrow()
})

test("SweetString.hasSubstring('a') value check", () => {
	expect(string.hasSubstring("a")).toStrictEqual(true)
})
test("SweetString.hasSubstring('abcdef ') value check", () => {
	expect(string.hasSubstring("abcdef ")).toStrictEqual(true)
})
test("SweetString.hasSubstring('🦄💕') value check", () => {
	expect(string.hasSubstring("🦄💕")).toStrictEqual(true)
})
test("SweetString.hasSubstring('💕🦄') value check", () => {
	expect(string.hasSubstring("💕🦄")).toStrictEqual(false)
})
test("SweetString.hasSubstring('🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘') value check", () => {
	expect(string.hasSubstring("🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘")).toStrictEqual(true)
})
test("SweetString.hasSubstring(new SweetString('💩')) value check", () => {
	expect(string.hasSubstring(new SweetString("💩"))).toStrictEqual(false)
})
test("SweetString.hasSubstring(void 0) throw check", () => {
	expect(() => string.hasSubstring(void 0)).toThrow()
})

test("SweetString.isSubstringOf('a') value check", () => {
	expect(string.isSubstringOf("a")).toStrictEqual(false)
})
test("SweetString.isSubstringOf('abcdef ') value check", () => {
	expect(string.isSubstringOf("abcdef ")).toStrictEqual(false)
})
test("SweetString.isSubstringOf('🦄💕') value check", () => {
	expect(string.isSubstringOf("🦄💕")).toStrictEqual(false)
})
test("SweetString.isSubstringOf(new SweetString('💩')) value check", () => {
	expect(string.isSubstringOf(new SweetString("💩"))).toStrictEqual(false)
})
test("SweetString.isSubstringOf(new SweetString('abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘')) value check", () => {
	expect(string.isSubstringOf(string)).toStrictEqual(true)
})
test("SweetString.isSubstringOf(void 0) value check", () => {
	expect(string.isSubstringOf(void 0)).toStrictEqual(false)
})

test("SweetString.lastIndexOf('a') value check", () => {
	expect(string.lastIndexOf("a")).toStrictEqual(0)
})
test("SweetString.lastIndexOf('💕') value check", () => {
	expect(string.lastIndexOf("💕")).toStrictEqual(8)
})
test("SweetString.lastIndexOf('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘') value check", () => {
	expect(string.lastIndexOf("Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘")).toStrictEqual(10)
})
test("SweetString.lastIndexOf(new SweetString('abcdef 🦄💕 Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘')) value check", () => {
	expect(string.lastIndexOf(string)).toStrictEqual(0)
})
test("SweetString.lastIndexOf('hola') value check", () => {
	expect(string.lastIndexOf("hola")).toBeUndefined()
})
test("SweetString.lastIndexOf(void 0) throw check", () => {
	expect(() => string.lastIndexOf(void 0)).toThrow()
})
