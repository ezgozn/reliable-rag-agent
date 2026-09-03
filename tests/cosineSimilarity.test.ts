import { describe, expect, it } from "vitest";
import { cosineSimilarity } from "../src/utils/cosineSimilarity.js";

describe("cosineSimilarity", () => {
  it("calculates the cosine similarity between two vectors", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const similarity = cosineSimilarity(a, b);
    expect(similarity).toBeCloseTo(0.9746318461970762);
  });

  it("returns 1 for identical vectors", () => {
    expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
  });

  it("returns 0 for orthogonal vectors", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("throws when vectors have different lengths", () => {
    expect(() => cosineSimilarity([1, 2], [1])).toThrow(
      "Vectors must have the same length"
    );
  });

  it("throws when vectors are empty", () => {
    expect(() => cosineSimilarity([], [])).toThrow("Vectors must not be empty");
  });

  it("throws when one vector is a zero vector", () => {
    expect(() => cosineSimilarity([0, 0], [1, 2])).toThrow(
      "Vectors must not be zero vectors"
    );
  });
});
