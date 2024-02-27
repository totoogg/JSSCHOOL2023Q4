import { IDrawNewsData } from "./IDrawNewsData";
import { IDrawSourcesData } from "./IDrawSourcesData";

export interface IAppView {
  drawNews(data: IDrawNewsData): void;
  drawSources(data: IDrawSourcesData): void;
}