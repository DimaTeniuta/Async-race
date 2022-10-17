import {
  checkWinnersLength,
  getWinnersForSort,
} from '../../../controller/fetch-winners';
import { ObjForRequest, Winner } from '../../../types/types';
import { INCREASE_PAGE } from '../../../variables/general-var';
import { MAX_LENGTH_WINNERS, serverPath, serverUrl } from '../../../variables/server';
import {
  addClasslistUseClassName,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import { chooseValueForChangePageWinners } from '../../general-functions/findElement';
import { createWinners } from '../winners/winners';

export async function checkCurrentLengthWinners(): Promise<void> {
  const page = <HTMLSpanElement>document.querySelector('.winners__page__text');
  const currentPage = <string>page.textContent;
  const carLength: number = await checkWinnersLength();

  if (+currentPage * MAX_LENGTH_WINNERS < carLength) {
    removeClasslistUseClassName('.btn-next-win', 'not-active');
  } else {
    addClasslistUseClassName('.btn-next-win', 'not-active');
  }

  if (currentPage !== '1') {
    removeClasslistUseClassName('.btn-prev-win', 'not-active');
  } else {
    addClasslistUseClassName('.btn-prev-win', 'not-active');
  }
}

export async function getNextWinnerPage(valueForGetNextPage: number): Promise<void> {
  const page = <HTMLSpanElement>document.querySelector('.winners__page__text');
  const valueNextPage = <string>String(+(<string>page.textContent) + valueForGetNextPage);
  const objForRequest: ObjForRequest = chooseValueForChangePageWinners();
  const winners: Winner[] = await getWinnersForSort(
    serverUrl,
    serverPath.winners,
    objForRequest.sort,
    objForRequest.type,
    valueNextPage,
  );

  const boxWinners = <HTMLDivElement>document.querySelector('.winners-box');
  boxWinners.textContent = '';
  winners.forEach((el) => {
    createWinners(el.id, el.wins, el.time, valueNextPage);
  });
  page.textContent = valueNextPage;
  checkCurrentLengthWinners();
}

function listenNextWinBtn(): void {
  const btnNextWin = <HTMLButtonElement>document.querySelector('.btn-next-win');
  if (!btnNextWin.classList.contains('not-active')) {
    getNextWinnerPage(INCREASE_PAGE);
  }
}

export default listenNextWinBtn;
