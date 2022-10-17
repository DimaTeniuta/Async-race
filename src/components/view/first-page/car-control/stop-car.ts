import { sendStopCar } from '../../../controller/fetch-cars';
import DomElements from '../../../types/types';
import {
  arrActiveBtnsPrevAndNext,
  arrIsCarOnTheWay,
  mapDrive,
  MINIMAL_COUNT_CARS_FOR_RACE,
} from '../../../variables/general-var';
import { serverPath, serverUrl } from '../../../variables/server';
import {
  addClasslist,
  listenArea,
  removeClasslist,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import { removeBlockUpdateAfterRace } from '../cars/update-car';

export async function stopCar(id: string): Promise<void> {
  await sendStopCar(serverUrl, serverPath.speed, id);
  const car = <HTMLDivElement>document.querySelector(`.car${id}`);
  car.style.transform = 'translateX(0)';
}

function removeClasslistIteratingArray(array: NodeListOf<Element>): void {
  array.forEach((el) => {
    removeClasslist(el as DomElements, 'not-active');
  });
}

function removeBlockButtonsBySingleRace(): void {
  arrIsCarOnTheWay[0] -= 1; // decrease count cars which is on the way

  if (!arrIsCarOnTheWay[0]) {
    const btnsSelect = <NodeListOf<Element>>document.querySelectorAll('.btn-select');
    const btnsRemove = <NodeListOf<Element>>document.querySelectorAll('.btn-remove');
    const currentGarageLength = <number>(
      (<HTMLDivElement>document.querySelector('.wrap-cars')).children.length
    );

    removeClasslistIteratingArray(btnsSelect);
    removeClasslistIteratingArray(btnsRemove);
    removeClasslistUseClassName('.header__btn-winner', 'not-active');
    removeClasslistUseClassName('.btn-create', 'not-active');
    removeClasslistUseClassName('.btn-generate-cars', 'not-active');
    if (currentGarageLength >= MINIMAL_COUNT_CARS_FOR_RACE) {
      removeClasslistUseClassName('.btn-race', 'not-active');
    }

    removeBlockUpdateAfterRace();
    if (arrActiveBtnsPrevAndNext[0] === true) {
      removeClasslistUseClassName('.btn-prev-garage', 'not-active');
    }

    if (arrActiveBtnsPrevAndNext[1] === true) {
      removeClasslistUseClassName('.btn-next-garage', 'not-active');
    }
    arrActiveBtnsPrevAndNext[0] = false;
    arrActiveBtnsPrevAndNext[1] = false;
  }
}

function listenStopBtn(): void {
  listenArea('.wrap-cars', 'click', (event) => {
    const targ = <HTMLElement>event.target;
    if (targ.classList.contains('btn-stop') && !targ.classList.contains('not-active')) {
      const id = <string>targ.getAttribute('data-btn-b');
      const btnStart = <HTMLButtonElement>document.querySelector(`.start${id}`);
      mapDrive.set(id, false);
      removeBlockButtonsBySingleRace();
      stopCar(id);
      addClasslist(targ, 'not-active');
      removeClasslist(btnStart, 'not-active');
    }
  });
}

export default listenStopBtn;
