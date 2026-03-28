import wrap from "./wrap.js";

describe("object", () => {
  test("basic test", () => {
    const root = wrap();
    expect(root).toEqual({});
  });
});
