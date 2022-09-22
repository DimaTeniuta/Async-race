import createController from './first-page/remote-control/remote-control';
import createGarage from './first-page/garage/garage';
import createHeader from './header/header';
import createMain from './first-page/garage/main';
import { checkCurrentLengthGarage } from './general-functions/general-functions';
import createSecondPage from './second-page/create-second-page';

function createMainPage(): void {
  createHeader();
  createSecondPage();
  createMain();
  createController();
  createGarage();
  checkCurrentLengthGarage();
}

export default createMainPage;
