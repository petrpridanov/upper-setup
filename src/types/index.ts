export interface IData {
  Response: ResponseTypes;
  Search: TSearchItem[];
  totalResults: string;
  Error?: string;
}

export type TSearchItem = {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export enum PaginationTypes {
  page = "page",
  dots = "dots",
}

export enum ResponseTypes {
  true = "True",
  false = "False",
}

export interface ISiblings {
  type: PaginationTypes;
  page: number;
}
