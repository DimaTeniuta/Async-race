import { getWinnersForSort } from '../../../controller/fetch-winners';
import { Winner } from '../../../types/types';
import { serverPath, serverUrl } from '../../../variables/server';
import {
  addClasslistUseClassName,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import { getNewWinners } from './sort-by-wins';

function toggleClassTimesBtn(): void {
  const btn = <HTMLButtonElement>document.querySelector('.best-time');

  if (btn.classList.contains('up')) {
    removeClasslistUseClassName('.best-time', 'up');
    addClasslistUseClassName('.best-time', 'down');
    removeClasslistUseClassName('.time-up', 'active');
    addClasslistUseClassName('.time-down', 'active');
  } else if (!btn.classList.contains('up')) {
    removeClasslistUseClassName('.best-time', 'down');
    addClasslistUseClassName('.best-time', 'up');
    removeClasslistUseClassName('.time-down', 'active');
    addClasslistUseClassName('.time-up', 'active');
  }
}

function removeClasslistWinBtn(): void {
  removeClasslistUseClassName('.wins-btn', 'up');
  removeClasslistUseClassName('.wins-btn', 'down');
  removeClasslistUseClassName('.wins-up', 'active');
  removeClasslistUseClassName('.wins-down', 'active');
}

async function sortByTimes(): Promise<void> {
  addClasslistUseClassName('.best-time', 'not-active');
  const btnTime = <HTMLButtonElement>document.querySelector('.best-time');
  const page = <string>(<HTMLSpanElement>document.querySelector('.winners__page__text')).textContent;
  let path: string = serverPath.down;

  if (!btnTime.classList.contains('up')) {
    path = serverPath.up;
  }
  const winners: Winner[] = await getWinnersForSort(
    serverUrl,
    serverPath.winners,
    serverPath.time,
    path,
    page,
  );

  getNewWinners(winners);
  removeClasslistUseClassName('.best-time', 'not-active');
}

function listenTimesBtn(): void {
  const btnTime = <HTMLButtonElement>document.querySelector('.best-time');
  const btnWins = <HTMLButtonElement>document.querySelector('.wins-btn');
  if (!btnTime.classList.contains('not-active') && !btnWins.classList.contains('not-active')) {
    sortByTimes();
    toggleClassTimesBtn();
    removeClasslistWinBtn();
  }
}

export default listenTimesBtn;
