const { test, describe, it } = require("node:test");
const assert = require("node:assert");

const reverse = require("../utils/for_testing").reverse;

test("reverse of a", () => {
  const result = reverse("a");

  assert.strictEqual(result, "a");
});

test("reverse of react", () => {
  const result = reverse("react");

  assert.strictEqual(result, "tcaer");
});

test("reverse of saippuakauppias", () => {
  const result = reverse("saippuakauppias");

  assert.strictEqual(result, "saippuakauppias");
});

//My own tests
describe("group math operations", () => {
  it("should add numberc correctly", () => {
    assert.strictEqual(2 + 2, 4);
  });

  it("Should multiply numbers", () => {
    assert.strictEqual(5 * 5, 25);
  });
});

describe("should return correct strings", () => {
  it("should reverse strings", () => {
    const reverseString = () => {
      return ["Junior", "Santos"].join(" ");
    };
    assert.strictEqual(reverseString(), "Junior Santos");
  });
});
