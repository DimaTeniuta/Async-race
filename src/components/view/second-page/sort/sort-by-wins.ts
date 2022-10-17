import { getWinnersForSort } from '../../../controller/fetch-winners';
import { Winner } from '../../../types/types';
import { serverPath, serverUrl } from '../../../variables/server';
import {
  addClasslistUseClassName,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import { createWinners } from '../winners/winners';

export function getNewWinners(array: Winner[]): void {
  const boxWinners = <HTMLDivElement>document.querySelector('.winners-box');
  boxWinners.innerHTML = '';
  const page = <HTMLSpanElement>document.querySelector('.winners__page__text');
  const valuePage = <string>page.textContent;

  array.forEach((el: Winner): void => {
    createWinners(el.id, el.wins, el.time, valuePage);
  });
}

function toggleClassWinsBtn(): void {
  const btn = <HTMLButtonElement>document.querySelector('.wins-btn');

  if (btn.classList.contains('up')) {
    removeClasslistUseClassName('.wins-btn', 'up');
    addClasslistUseClassName('.wins-btn', 'down');
    removeClasslistUseClassName('.wins-up', 'active');
    addClasslistUseClassName('.wins-down', 'active');
  } else if (!btn.classList.contains('up')) {
    removeClasslistUseClassName('.wins-btn', 'down');
    addClasslistUseClassName('.wins-btn', 'up');
    removeClasslistUseClassName('.wins-down', 'active');
    addClasslistUseClassName('.wins-up', 'active');
  }
}

function removeClasslistTimeBtn(): void {
  removeClasslistUseClassName('.best-time', 'up');
  removeClasslistUseClassName('.best-time', 'down');
  removeClasslistUseClassName('.time-up', 'active');
  removeClasslistUseClassName('.time-down', 'active');
}

async function sortByWins(): Promise<void> {
  addClasslistUseClassName('.wins-btn', 'not-active');
  const btnWin = <HTMLButtonElement>document.querySelector('.wins-btn');
  const page = <string>(<HTMLSpanElement>document.querySelector('.winners__page__text')).textContent;
  let path: string = serverPath.down;

  if (!btnWin.classList.contains('up')) {
    path = serverPath.up;
  }

  const winners: Winner[] = await getWinnersForSort(
    serverUrl,
    serverPath.winners,
    serverPath.wins,
    path,
    page,
  );
  getNewWinners(winners);
  removeClasslistUseClassName('.wins-btn', 'not-active');
}

function listenWinsBtn(): void {
  const btnWins = <HTMLButtonElement>document.querySelector('.wins-btn');
  const btnTime = <HTMLButtonElement>document.querySelector('.best-time');
  if (!btnWins.classList.contains('not-active') && !btnTime.classList.contains('not-active')) {
    sortByWins();
    toggleClassWinsBtn();
    removeClasslistTimeBtn();
  }
}

export default listenWinsBtn;
