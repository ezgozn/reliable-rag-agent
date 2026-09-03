import { randomUUID } from "node:crypto";

import {
  DEFAULT_CHUNK_SIZE,
  DEFAULT_CHUNK_OVERLAP,
} from "../config/rag.config.js";
import { chunkText } from "../utils/chunkText.js";

type CreateDocumentInput = {
  title: string;
  content: string;
};

type DocumentChunk = {
  index: number;
  text: string;
  startOffset: number;
  endOffset: number;
};

type CreatedDocument = {
  id: string;
  title: string;
  content: string;
  contentLength: number;
  chunks: DocumentChunk[];
};

const documents: CreatedDocument[] = [];

export function createDocument(input: CreateDocumentInput): CreatedDocument {
  const rawChunks = chunkText(input.content, {
    chunkSize: DEFAULT_CHUNK_SIZE,
    overlap: DEFAULT_CHUNK_OVERLAP,
  });

  const step = DEFAULT_CHUNK_SIZE - DEFAULT_CHUNK_OVERLAP;

  const chunks = rawChunks.map((text, index) => {
    const startOffset = index * step;
    const endOffset = startOffset + text.length;

    return {
      index,
      text,
      startOffset,
      endOffset,
    };
  });

  const document = {
    id: `doc_${randomUUID()}`,
    title: input.title,
    content: input.content,
    contentLength: input.content.length,
    chunks,
  };

  documents.push(document);

  return document;
}

export function getDocumentById(id: string): CreatedDocument | undefined {
  return documents.find((document) => document.id === id);
}
