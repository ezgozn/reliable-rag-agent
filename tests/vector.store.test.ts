import { beforeEach, describe, expect, it } from "vitest";
import {
  addVector,
  clearVectors,
  searchSimilar,
} from "../src/store/vector.store.js";

describe("vector store", () => {
  beforeEach(() => {
    clearVectors();
  });

  it("returns the most similar vectors first", () => {
    addVector({
      documentId: "doc_1",
      chunkIndex: 0,
      text: "about cats",
      embedding: [1, 0],
    });

    addVector({
      documentId: "doc_2",
      chunkIndex: 0,
      text: "about dogs",
      embedding: [0, 1],
    });

    const results = searchSimilar([1, 0], 1);

    expect(results).toHaveLength(1);
    expect(results[0]?.documentId).toBe("doc_1");
    expect(results[0]?.score).toBeCloseTo(1);
  });

  it("returns an empty array when no vectors are stored", () => {
    const results = searchSimilar([1, 0], 1);

    expect(results).toEqual([]);
  });

  it("returns topK results", () => {
    addVector({
      documentId: "doc_1",
      chunkIndex: 0,
      text: "about cats",
      embedding: [1, 0],
    });

    addVector({
      documentId: "doc_2",
      chunkIndex: 0,
      text: "about dogs",
      embedding: [0, 1],
    });

    const results = searchSimilar([1, 0], 2);

    expect(results).toHaveLength(2);
    expect(results[0]?.documentId).toBe("doc_1");
    expect(results[1]?.documentId).toBe("doc_2");
    expect(results[0]?.score).toBeGreaterThan(results[1]!.score);
  });
});
