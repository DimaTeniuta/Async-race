import { getDrive, getSpeed, sendStopCar } from '../../../controller/fetch-cars';
import DomElements, { Shift, Speed } from '../../../types/types';
import {
  arrActiveBtnsPrevAndNext,
  arrBrokenCars,
  arrIsCarOnTheWay,
  arrIsWinner,
  mapDrive,
} from '../../../variables/general-var';
import { DURATION, serverPath, serverUrl } from '../../../variables/server';
import {
  addClasslist,
  addClasslistUseClassName,
  listenArea,
  removeClasslist,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import { checkWhoWinner } from '../../second-page/winners/winner';

async function startCar(id: string): Promise<Speed> {
  const speed = await getSpeed(serverUrl, serverPath.speed, id);
  return speed;
}

function getValuesForFrames(id: string, speed: number, timeDuration: number): Shift {
  const car = <HTMLDivElement>document.querySelector(`.car${id}`);
  const wrapCar = <HTMLDivElement>document.querySelector(`.wrapper-car${id}`);

  const duration: number = timeDuration;
  const currentPosition: number = car.offsetLeft;
  const sizeDivCar: number = car.offsetWidth;
  const sizeAfterStopLine = <number>10;
  const framesCount: number = (duration / 1000) * speed;
  const valueStopLine: number = wrapCar.offsetWidth - (sizeDivCar + sizeAfterStopLine);
  const oneStep: number = (valueStopLine - currentPosition) / framesCount;

  const objDrive: Shift = {
    curPosition: currentPosition,
    shift: oneStep,
    valueStop: valueStopLine,
    flag: (sizeDivCar / 2) + sizeAfterStopLine, // get flag place
  };

  return objDrive;
}

export async function changePlace(id: string): Promise<void> {
  const ObjSpeed: Speed = await startCar(id);
  const speed: number = ObjSpeed.velocity;
  const valuesForDrive: Shift = getValuesForFrames(id, speed, DURATION);
  let isDrive = <boolean>true;
  const response: Promise<boolean> = getDrive(serverUrl, serverPath.speed, id);
  response.then((res) => {
    if (res === false) {
      arrBrokenCars.push(true);
    }
    isDrive = res;
  });

  const startTime: number = Date.now();

  const tact = async (): Promise<void> => {
    const cars = <NodeListOf<Element>>document.querySelectorAll('.car');
    const car = <HTMLDivElement>document.querySelector(`.car${id}`);

    if (cars.length === arrBrokenCars.length) { // if all the cars broke down;
      removeClasslistUseClassName('.btn-reset', 'not-active');
    }

    valuesForDrive.curPosition += valuesForDrive.shift;
    car.style.transform = `translateX(${valuesForDrive.curPosition}px)`;
    const finishTime: number = Date.now();
    const time: number = finishTime - startTime;
    const flag: number = valuesForDrive.valueStop - valuesForDrive.flag;
    checkWhoWinner(id, valuesForDrive.curPosition, flag, time);

    if (valuesForDrive.curPosition < valuesForDrive.valueStop && isDrive && !mapDrive.has(id)) {
      requestAnimationFrame(tact);
    } else {
      await sendStopCar(serverUrl, serverPath.speed, id);
    }
  };
  tact();
}

function addClasslistIteratingArray(array: NodeListOf<Element>): void {
  array.forEach((el) => {
    addClasslist(el as DomElements, 'not-active');
  });
}

function blockButtonsBySingleRace(): void {
  arrIsCarOnTheWay[0] += 1; // increase count cars which is on the way
  const btnsSelect = <NodeListOf<Element>>document.querySelectorAll('.btn-select');
  const btnsRemove = <NodeListOf<Element>>document.querySelectorAll('.btn-remove');
  addClasslistIteratingArray(btnsSelect);
  addClasslistIteratingArray(btnsRemove);
  addClasslistUseClassName('.header__btn-winner', 'not-active');
  addClasslistUseClassName('.btn-create', 'not-active');
  addClasslistUseClassName('.btn-generate-cars', 'not-active');
  addClasslistUseClassName('.btn-race', 'not-active');

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

function listenStartBtn(): void {
  listenArea('.wrap-cars', 'click', (event) => {
    const targ = <HTMLElement>event.target;
    if (targ.classList.contains('btn-start') && !targ.classList.contains('not-active')) {
      const id = <string>targ.getAttribute('data-btn-a');
      const btnStop = <HTMLButtonElement>document.querySelector(`.stop${id}`);
      arrIsWinner[0] = true;
      mapDrive.delete(id);
      blockButtonsBySingleRace();
      changePlace(id);
      addClasslist(targ, 'not-active');
      removeClasslist(btnStop, 'not-active');
      addClasslistUseClassName('.btn-update', 'not-active');
    }
  });
}

export default listenStartBtn;
