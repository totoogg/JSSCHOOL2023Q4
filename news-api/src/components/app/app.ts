import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApp, IAppView, IController } from '../interfaces/AllInterfaces';

class App implements IApp {
    private controller: IController = new AppController();

    private view: IAppView = new AppView();

    public start(): void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
