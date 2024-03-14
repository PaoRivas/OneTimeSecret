const helpers = require("../public/javascripts/helpers");

describe("generateRandomString", () => {
  test("should generate a string of the specified length", () => {
    const length = 10;
    const result = helpers.generateRandomString(length);
    expect(result).toHaveLength(length);
  });

  test("should only contain characters from the specified character set", () => {
    const length = 10;
    const result = helpers.generateRandomString(length);
    const characters = /^[a-z0-9]+$/;
    expect(result).toMatch(characters);
  });

  test("should return an empty string when length is 0", () => {
    const length = 0;
    const result = helpers.generateRandomString(length);
    expect(result).toBe("");
  });

  test("should return an empty string when length is negative", () => {
    const length = -10;
    const result = helpers.generateRandomString(length);
    expect(result).toBe("");
  });

  test("should return an empty string when length is not an integer", () => {
    const length = 10.2;
    const result = helpers.generateRandomString(length);
    expect(result).toHaveLength(Math.ceil(length));
  });
});
