import { SweetString } from "../../index.js"

test("String 1 .convertCodepointIndexToLogicalIndex", () => {
	const string = "Hello, world!"
	const [codepointIndex, logicalIndex] = [4, 4]
	const ss = new SweetString(string)

	expect(ss.convertCodepointIndexToLogicalIndex(codepointIndex)).toStrictEqual(
		logicalIndex,
	)
})
test("String 2 .convertCodepointIndexToLogicalIndex", () => {
	const string = "Unicorns! 🦄💕"
	const [codepointIndex, logicalIndex] = [12, 11]
	const ss = new SweetString(string)

	expect(ss.convertCodepointIndexToLogicalIndex(codepointIndex)).toStrictEqual(
		logicalIndex,
	)
})
