export interface FeedType {
  id: number;
  title: string;
}

export interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[]): void;
}
