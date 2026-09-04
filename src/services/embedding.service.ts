export async function createEmbedding(text: string): Promise<number[]> {
  return [text.length, countWords(text)];
}

function countWords(text: string): number {
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}
