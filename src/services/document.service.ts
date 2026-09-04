import { randomUUID } from "node:crypto";

import {
  DEFAULT_CHUNK_SIZE,
  DEFAULT_CHUNK_OVERLAP,
} from "../config/rag.config.js";
import { createEmbedding } from "./embedding.service.js";
import { chunkText } from "../utils/chunkText.js";
import { addVector } from "../store/vector.store.js";

type CreateDocumentInput = {
  title: string;
  content: string;
};

type DocumentChunk = {
  index: number;
  text: string;
  startOffset: number;
  endOffset: number;
  embedding: number[];
};

type CreatedDocument = {
  id: string;
  title: string;
  content: string;
  contentLength: number;
  chunks: DocumentChunk[];
};

const documents: CreatedDocument[] = [];

export async function createDocument(
  input: CreateDocumentInput
): Promise<CreatedDocument> {
  const rawChunks = chunkText(input.content, {
    chunkSize: DEFAULT_CHUNK_SIZE,
    overlap: DEFAULT_CHUNK_OVERLAP,
  });

  const step = DEFAULT_CHUNK_SIZE - DEFAULT_CHUNK_OVERLAP;

  const chunks = rawChunks.map(async (text, index) => {
    const startOffset = index * step;
    const endOffset = startOffset + text.length;
    const embedding = await createEmbedding(text);

    return {
      index,
      text,
      startOffset,
      endOffset,
      embedding,
    };
  });

  const document = {
    id: `doc_${randomUUID()}`,
    title: input.title,
    content: input.content,
    contentLength: input.content.length,
    chunks: await Promise.all(chunks),
  };

  for (const chunk of document.chunks) {
    addVector({
      documentId: document.id,
      chunkIndex: chunk.index,
      text: chunk.text,
      embedding: chunk.embedding,
    });
  }

  documents.push(document);

  return document;
}

export function getDocumentById(id: string): CreatedDocument | undefined {
  return documents.find((document) => document.id === id);
}
