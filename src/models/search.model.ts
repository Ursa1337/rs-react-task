export interface SearchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
}

export interface ResultItem {
  name: string;
  url: string;
}
