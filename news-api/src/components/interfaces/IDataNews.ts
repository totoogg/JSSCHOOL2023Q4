import { IData } from "./IData";

export interface IDataNews {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
  source: IData;
}