import { setWinner, updateWinner } from '../../../controller/fetch-winners';
import DomElements, { Winner } from '../../../types/types';
import { arrIsWinner, mapWinner } from '../../../variables/general-var';
import { serverPath, serverUrl } from '../../../variables/server';
import { removeClasslist, removeClasslistUseClassName } from '../../general-functions/dom-elements';
import { checkWinnersInServer } from './add-winner';

export async function addWinnerInServer(obj: Winner): Promise<void> {
  await setWinner(serverUrl, serverPath.winners, obj);
}

export async function updateWinnerInServer(id: string, obj: Winner): Promise<void> {
  await updateWinner(serverUrl, serverPath.winners, id, obj);
}

function showMessageWinner(id: string, time: number): void {
  const title = <DomElements>document.querySelector(`.title-car${id}`);
  const name = <string>title.textContent;
  const message = <HTMLDivElement>document.querySelector('.message-winner');
  message.textContent = `${name} went first (${time.toFixed(2)}s)!`;
  removeClasslist(message, 'not-active');
}

async function createWinner(id: string, time: number): Promise<void> {
  const colorCar = <string>(<SVGElement>document.querySelector(`[data-color="${id}"]`)).style.fill;
  const nameCar = <string>(<HTMLSpanElement>document.querySelector(`.title-car${id}`)).textContent;
  if (mapWinner.has(id)) {
    const tmp = <Winner>mapWinner.get(id);
    const obj: Winner = {
      id: +id,
      time: +time.toFixed(2) < tmp.time ? +time.toFixed(2) : tmp.time,
      wins: tmp.wins + 1, // increase count wins
      color: colorCar,
      name: nameCar,
    };
    mapWinner.set(id, obj);
    updateWinnerInServer(id, obj);
  } else {
    const obj: Winner = {
      id: +id,
      time: +time.toFixed(2),
      wins: 1,
      color: colorCar,
      name: nameCar,
    };
    mapWinner.set(id, obj);
    addWinnerInServer(obj);
  }
  checkWinnersInServer();
  showMessageWinner(id, time);
}

export function checkWhoWinner(
  id: string,
  currentPosition: number,
  flag: number,
  time: number,
) {
  if (currentPosition >= flag && !arrIsWinner[0]) {
    arrIsWinner[0] = true;
    removeClasslistUseClassName('.btn-reset', 'not-active');
    const finishTime: number = time / 1000; // get seconds from milliseconds
    createWinner(id, finishTime);
  }
}

export default createWinner;
