import { describe, expect, it } from "vitest";
import {
  createDocument,
  getDocumentById,
} from "../src/services/document.service.js";

describe("createDocument", () => {
  it("creates a document summary from title and content", () => {
    const document = createDocument({
      title: "RAG notes",
      content: "hello world",
    });

    expect(document.chunks).toEqual([
      {
        index: 0,
        text: "hello world",
      },
    ]);
    expect(document.title).toBe("RAG notes");
    expect(document.contentLength).toBe(11);
    expect(document.id).toMatch(/^doc_/);
  });

  it("creates chunks for long document content", () => {
    const content = "a".repeat(600);

    const document = createDocument({
      title: "Long document",
      content,
    });

    expect(document.chunks.length).toBeGreaterThan(1);
    expect(document.chunks[0]).toEqual({
      index: 0,
      text: "a".repeat(500),
    });
    expect(document.chunks[1]).toEqual({
      index: 1,
      text: "a".repeat(150),
    });
  });
});

describe("getDocumentById", () => {
  it("returns a document by its ID", () => {
    const document = createDocument({
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
