import object from "./wrap.js";

describe("object", () => {
  test("basic test", () => {
    const root = object();
    expect(root).toEqual({});
  });
});
