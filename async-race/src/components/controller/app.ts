import HeaderView from '../view/headerView/headerView';
import { headerParams, mainParams } from '../view/util/params';

export default class App {
  private header: HeaderView = new HeaderView(headerParams);

  private main: MainView = new MainView(mainParams);

  public createPage() {
    document.body.append(
      this.header.header.getElement() as HTMLElement,
      this.main.main.getElement() as HTMLElement,
    );
  }
}
