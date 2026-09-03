import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("documents routes", () => {
  it("creates a document", async () => {
    const response = await request(app).post("/documents").send({
      title: "RAG notes",
      content: "hello world",
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("RAG notes");
    expect(response.body.content).toBe("hello world");
    expect(response.body.contentLength).toBe(11);
    expect(response.body.id).toMatch(/^doc_/);
    expect(response.body.chunks).toEqual([
      {
        index: 0,
        text: "hello world",
      },
    ]);
  });

  it("returns 400 for invalid create document payload", async () => {
    const response = await request(app).post("/documents").send({
      title: "RAG notes",
    });

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe("Invalid document payload");
    expect(response.body.error.status).toBe(400);
  });

  it("returns a created document by id", async () => {
    const createResponse = await request(app).post("/documents").send({
      title: "Find me",
      content: "This should be retrievable",
    });

    const documentId = createResponse.body.id;

    const getResponse = await request(app).get(`/documents/${documentId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(documentId);
    expect(getResponse.body.title).toBe("Find me");
    expect(getResponse.body.content).toBe("This should be retrievable");
    expect(getResponse.body.chunks).toEqual([
      {
        index: 0,
        text: "This should be retrievable",
      },
    ]);
  });

  it("returns 404 when document does not exist", async () => {
    const response = await request(app).get("/documents/doc_missing");

    expect(response.status).toBe(404);
    expect(response.body.error.message).toBe("Document not found");
    expect(response.body.error.status).toBe(404);
  });
});
