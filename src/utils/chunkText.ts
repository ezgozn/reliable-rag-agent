type ChunkTextOptions = {
  chunkSize: number;
  overlap: number;
};

export function chunkText(text: string, options: ChunkTextOptions): string[] {
  const { chunkSize, overlap } = options;

  if (chunkSize <= 0) {
    throw new Error("chunkSize must be positive");
  }

  if (overlap < 0) {
    throw new Error("overlap must be zero or positive");
  }

  if (overlap >= chunkSize) {
    throw new Error("overlap must be less than chunkSize");
  }

  if (text.length === 0) {
    return [];
  }

  if (text.length <= chunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  const step = chunkSize - overlap;

  for (let start = 0; start < text.length; start += step) {
    chunks.push(text.slice(start, start + chunkSize));
  }

  return chunks;
}
