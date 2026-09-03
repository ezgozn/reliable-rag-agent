import { describe, expect, it } from "vitest";
import { chunkText } from "../src/utils/chunkText.js";

describe("chunkText", () => {
  it("should chunk text correctly with given chunkSize and overlap", () => {
    const text = "This is a sample text for testing the chunkText function.";
    const chunkSize = 10;
    const overlap = 2;

    const result = chunkText(text, { chunkSize, overlap });

    expect(result).toEqual([
      "This is a ",
      "a sample t",
      " text for ",
      "r testing ",
      "g the chun",
      "unkText fu",
      "function.",
      ".",
    ]);
  });

  it("should return an empty array for empty text", () => {
    const result = chunkText("", { chunkSize: 5, overlap: 1 });
    expect(result).toEqual([]);
  });

  it("throws when chunkSize is not positive", () => {
    expect(() => chunkText("text", { chunkSize: 0, overlap: 1 })).toThrow(
      "chunkSize must be positive"
    );
  });

  it("throws when overlap is negative", () => {
    expect(() => chunkText("text", { chunkSize: 5, overlap: -1 })).toThrow(
      "overlap must be zero or positive"
    );
  });

  it("throws when overlap is greater than or equal to chunkSize", () => {
    expect(() => chunkText("text", { chunkSize: 5, overlap: 5 })).toThrow(
      "overlap must be less than chunkSize"
    );
  });

  it("returns one chunk when text is shorter than chunk size", () => {
    const result = chunkText("hello", { chunkSize: 10, overlap: 2 });
    expect(result).toEqual(["hello"]);
  });

  it("returns one chunk when text length equals chunk size", () => {
    const result = chunkText("hello", { chunkSize: 5, overlap: 2 });
    expect(result).toEqual(["hello"]);
  });
});
