import {
  arrActiveBtnsPrevAndNext,
  arrBrokenCars,
  arrIsWinner,
  mapDrive,
} from '../../../variables/general-var';
import {
  addClasslist,
  addClasslistUseClassName,
  listenArea,
} from '../../general-functions/dom-elements';
import { changePlace } from './start-car';

async function startRace(): Promise<void> {
  const cars = <NodeListOf<Element>>document.querySelectorAll('.car');

  cars.forEach((el) => {
    const id = <string>el.getAttribute('data-car');
    changePlace(id);

    const btnStart = <HTMLButtonElement>document.querySelector(`.start${id}`);
    const btnStop = <HTMLButtonElement>document.querySelector(`.stop${id}`);
    addClasslist(btnStart, 'not-active');
    addClasslist(btnStart, 'drive');
    addClasslist(btnStop, 'not-active');
  });
}

function blockButtonsForRaceTime(): void {
  const btnsSelect = <NodeListOf<Element>>document.querySelectorAll('.btn-select');
  const btnsRemove = <NodeListOf<Element>>document.querySelectorAll('.btn-remove');

  btnsSelect.forEach((el) => {
    addClasslist(el as HTMLButtonElement, 'not-active');
  });

  btnsRemove.forEach((el: Element): void => {
    addClasslist(el as HTMLButtonElement, 'not-active');
  });

  addClasslistUseClassName('.btn-create', 'not-active');
  addClasslistUseClassName('.header__btn-winner', 'not-active');
  addClasslistUseClassName('.btn-generate-cars', 'not-active');

  const btnPrev = <HTMLButtonElement>document.querySelector('.btn-prev-garage');
  if (!btnPrev.classList.contains('not-active')) {
    addClasslistUseClassName('.btn-prev-garage', 'not-active');
    arrActiveBtnsPrevAndNext[0] = true;
  }

  const btnNext = <HTMLButtonElement>document.querySelector('.btn-next-garage');
  if (!btnNext.classList.contains('not-active')) {
    addClasslistUseClassName('.btn-next-garage', 'not-active');
    arrActiveBtnsPrevAndNext[1] = true;
  }
}

function listenRaceBtn(): void {
  listenArea('.btn-race', 'click', () => {
    const btnRace = <HTMLButtonElement>document.querySelector('.btn-race');
    if (!btnRace.classList.contains('not-active')) {
      startRace();
      blockButtonsForRaceTime();
      mapDrive.clear();
      arrIsWinner[0] = false;
      arrBrokenCars.length = 0;
      addClasslistUseClassName('.btn-race', 'not-active');
      addClasslistUseClassName('.btn-reset', 'not-active');
      addClasslistUseClassName('.btn-update', 'not-active');
    }
  });
}

export default listenRaceBtn;
