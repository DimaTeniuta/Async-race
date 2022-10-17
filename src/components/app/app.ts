import listenRaceBtn from '../view/first-page/car-control/race';
import listenResetBtn from '../view/first-page/car-control/reset';
import listenStartBtn from '../view/first-page/car-control/start-car';
import listenStopBtn from '../view/first-page/car-control/stop-car';
import createCars from '../view/first-page/cars/create-cars';
import listenCreateButton from '../view/first-page/cars/create-new-car';
import listenGenerateButton from '../view/first-page/cars/create-one-hundred-cars';
import listenRemoveButton from '../view/first-page/cars/delete-car';
import listenSelectArea, { listenUpdateButton } from '../view/first-page/cars/update-car';
import { listenNextButton } from '../view/first-page/garage/button-next';
import listenPrevButton from '../view/first-page/garage/button-prev';
import { checkCurrentGarageLengthOnCurrentPage } from '../view/general-functions/general-functions';
import listenToGarageBtn from '../view/header/to-garage-btn';
import listenToWinnersBtn from '../view/header/to-winners-btn';
import createMainPage from '../view/main-page';
import { createListWinnersOnPageLoad } from '../view/second-page/winners/winners';

function app() {
  document.addEventListener('DOMContentLoaded', () => {
    createMainPage();
    createCars();
    createListWinnersOnPageLoad();

    listenSelectArea();
    listenUpdateButton();

    listenCreateButton();
    listenRemoveButton();
    listenGenerateButton();

    listenNextButton();
    listenPrevButton();

    listenStartBtn();
    listenStopBtn();

    listenRaceBtn();
    listenResetBtn();

    listenToWinnersBtn();
    listenToGarageBtn();

    checkCurrentGarageLengthOnCurrentPage();
  });
}

export default app;
