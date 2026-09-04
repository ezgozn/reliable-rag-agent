import { beforeEach, describe, expect, it } from "vitest";
import {
  createDocument,
  getDocumentById,
} from "../src/services/document.service.js";
import { clearVectors, searchSimilar } from "../src/store/vector.store.js";

beforeEach(() => {
  clearVectors();
});

describe("createDocument", () => {
  it("creates a document summary from title and content", async () => {
    const document = await createDocument({
      title: "RAG notes",
      content: "hello world",
    });

    expect(document.chunks).toEqual([
      {
        index: 0,
        text: "hello world",
        startOffset: 0,
        endOffset: 11,
        embedding: [11, 2],
      },
    ]);
    expect(document.title).toBe("RAG notes");
    expect(document.contentLength).toBe(11);
    expect(document.id).toMatch(/^doc_/);
  });

  it("stores created document chunks in vector store", async () => {
    const document = await createDocument({
      title: "RAG notes",
      content: "hello world",
    });
    const results = searchSimilar(document.chunks[0]!.embedding, 1);

    expect(results).toHaveLength(1);
    expect(results[0]?.score).toBeCloseTo(1);
    expect(results).toEqual([
      {
        documentId: document.id,
        chunkIndex: 0,
        text: "hello world",
        embedding: [11, 2],
        score: expect.any(Number),
      },
    ]);
  });

  it("creates chunks for long document content", async () => {
    const content = "a".repeat(600);

    const document = await createDocument({
      title: "Long document",
      content,
    });

    expect(document.chunks.length).toBeGreaterThan(1);
    expect(document.chunks[0]).toEqual({
      index: 0,
      text: "a".repeat(500),
      startOffset: 0,
      endOffset: 500,
      embedding: [500, 1],
    });
    expect(document.chunks[1]).toEqual({
      index: 1,
      text: "a".repeat(150),
      startOffset: 450,
      endOffset: 600,
      embedding: [150, 1],
    });
  });
});

describe("getDocumentById", () => {
  it("returns a document by its ID", async () => {
    const document = await createDocument({
      title: "Searchable document",
      content: "This document should be found",
    });

    const foundDocument = getDocumentById(document.id);
    expect(foundDocument).toEqual(document);
  });

  it("returns undefined when document does not exist", () => {
    const foundDocument = getDocumentById("doc_missing");

    expect(foundDocument).toBeUndefined();
  });
});
