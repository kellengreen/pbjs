import camelToKebab from "./camelToKebab.js";

describe("camelToKebab tests", () => {
  test("basic test", () => {
    expect(camelToKebab("FooBar")).toBe("foo-bar");
  });
});
