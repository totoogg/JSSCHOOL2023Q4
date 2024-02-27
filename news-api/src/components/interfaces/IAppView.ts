import { IData } from "./IData";
import { IDataNews } from "./IDataNews";
import { ISources } from "./ISources";
import { IDrawNewsData } from "./IDrawNewsData";
import { IDrawSourcesData } from "./IDrawSourcesData";

export interface IAppView {
  news: ISources<IDataNews>;
  sources: ISources<IData>;
  drawNews(data: IDrawNewsData): void;
  drawSources(data: IDrawSourcesData): void;
}