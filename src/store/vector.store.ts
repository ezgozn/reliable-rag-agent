import { cosineSimilarity } from "../utils/cosineSimilarity.js";

type StoredVector = {
  documentId: string;
  chunkIndex: number;
  text: string;
  embedding: number[];
};

type SearchResult = StoredVector & {
  score: number;
};

const vectors: StoredVector[] = [];

export function addVector(vector: StoredVector): void {
  vectors.push(vector);
}

export function clearVectors(): void {
  vectors.length = 0;
}

export function searchSimilar(
  queryEmbedding: number[],
  topK: number
): SearchResult[] {
  return vectors
    .map((vector) => ({
      ...vector,
      score: cosineSimilarity(queryEmbedding, vector.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
