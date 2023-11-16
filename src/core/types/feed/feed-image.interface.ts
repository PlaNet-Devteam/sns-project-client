export interface FeedImageIndexType extends FeedImageType {
  secIndex: number;
  firIndex: number;
}

export interface FeedFileType {
  sortOrder: number;
  image: string;
  file: File;
}

export interface FeedImageCreateType {
  sortOrder: number;
  image: string;
}

export interface FeedImageType {
  feedId: number;
  sortOrder: number;
  image: string;
}
