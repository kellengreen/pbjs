import untag from "./untag.js";

describe("untag tests", () => {
  test("without expressions", () => {
    expect(untag`foobar`).toBe("foobar");
  });

  test("with expressions", () => {
    expect(untag`foo${"-"}bar`).toBe("foo-bar");
  });

  test("with undefined expression", () => {
    expect(untag`foo-${undefined}-bar`).toBe("foo-undefined-bar");
  });
});
