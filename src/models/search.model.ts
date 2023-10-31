export interface SearchResult {
  count: number;
  next: number | null;
  previous: null | null;
  results: ResultItem[];
}

export interface ResultItem {
  name: string;
  url: string;
}
