import { describe, expect, it } from "vitest";
import { createEmbedding } from "../src/services/embedding.service.js";

describe("createEmbedding", () => {
  it("creates a deterministic fake embedding from text", async () => {
    const embedding = await createEmbedding("hello world");
    expect(embedding).toEqual([11, 2]);
  });

  it("returns zero word count for blank text", async () => {
    const embedding = await createEmbedding("   ");

    expect(embedding).toEqual([3, 0]);
  });
});
