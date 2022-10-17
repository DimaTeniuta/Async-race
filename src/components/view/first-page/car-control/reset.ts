import { arrActiveBtnsPrevAndNext, arrIsWinner, mapDrive } from '../../../variables/general-var';
import {
  addClasslist,
  addClasslistUseClassName,
  listenArea,
  removeClasslist,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import { removeBlockUpdateAfterRace } from '../cars/update-car';
import { stopCar } from './stop-car';

async function returnCars(): Promise<void> {
  const cars = <NodeListOf<Element>>document.querySelectorAll('.car');

  cars.forEach((el) => {
    const id = <string>el.getAttribute('data-car');
    const btnStop = <HTMLButtonElement>document.querySelector(`.stop${id}`);

    mapDrive.set(id, false);
    addClasslist(btnStop, 'not-active');
  });

  cars.forEach(async (el) => {
    const id = <string>el.getAttribute('data-car');

    await stopCar(id);
    const btnStart = <HTMLButtonElement>document.querySelector(`.start${id}`);
    removeClasslist(btnStart, 'drive');
  });
}

function removeNotActiveClassForStartBtn(): void {
  const btnsStart = <NodeListOf<Element>>document.querySelectorAll('.btn-start');
  btnsStart.forEach((el) => {
    removeClasslist(el as HTMLButtonElement, 'not-active');
  });
}

function activeButtonsAfterRace(): void {
  const btnsSelect = <NodeListOf<Element>>document.querySelectorAll('.btn-select');
  const btnsRemove = <NodeListOf<Element>>document.querySelectorAll('.btn-remove');

  btnsSelect.forEach((el) => {
    removeClasslist(el as HTMLButtonElement, 'not-active');
  });

  btnsRemove.forEach((el) => {
    removeClasslist(el as HTMLButtonElement, 'not-active');
  });
  removeClasslistUseClassName('.btn-race', 'not-active');
  addClasslistUseClassName('.btn-reset', 'not-active');
  removeClasslistUseClassName('.btn-create', 'not-active');
  removeClasslistUseClassName('.header__btn-winner', 'not-active');
  removeClasslistUseClassName('.btn-generate-cars', 'not-active');
  removeBlockUpdateAfterRace();
  removeNotActiveClassForStartBtn();

  if (arrActiveBtnsPrevAndNext[0] === true) {
    removeClasslistUseClassName('.btn-prev-garage', 'not-active');
  }

  if (arrActiveBtnsPrevAndNext[1] === true) {
    removeClasslistUseClassName('.btn-next-garage', 'not-active');
  }
  arrActiveBtnsPrevAndNext[0] = false;
  arrActiveBtnsPrevAndNext[1] = false;
}

function checkReadyCars(): void {
  const cars = <NodeListOf<Element>>document.querySelectorAll('.car');
  let isReady = <boolean>true;

  cars.forEach((el) => {
    const id = <string>el.getAttribute('data-car');
    const btnStart = <HTMLButtonElement>document.querySelector(`.start${id}`);
    mapDrive.set(id, true);

    if (btnStart.classList.contains('drive')) {
      isReady = false;
    }
  });

  if (isReady) {
    activeButtonsAfterRace();
  } else {
    setTimeout(() => {
      checkReadyCars();
    }, 500);
  }
}

function stopRace(): void {
  returnCars();
  checkReadyCars();
}

function listenResetBtn(): void {
  listenArea('.btn-reset', 'click', () => {
    const btnReset = <HTMLButtonElement>document.querySelector('.btn-reset');
    if (!btnReset.classList.contains('not-active')) {
      addClasslistUseClassName('.btn-reset', 'not-active');
      stopRace();
      mapDrive.clear();
      setTimeout((): void => {
        arrIsWinner[0] = false;
      }, 1000);
      addClasslistUseClassName('.message-winner', 'not-active');
    }
  });
}

export default listenResetBtn;
