import App from './components/app/app';
import './global.css';
import { IApp } from './components/interfaces/AllInterfaces';

const app: IApp = new App();
app.start();
