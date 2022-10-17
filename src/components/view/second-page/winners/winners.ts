import getWinners, { getWinnersForSort } from '../../../controller/fetch-winners';
import { ObjForRequest, Winner } from '../../../types/types';
import { INCREASE_PAGE, mapWinner } from '../../../variables/general-var';
import { MAX_LENGTH_WINNERS, serverPath, serverUrl } from '../../../variables/server';
import { chooseValueForChangePageWinners } from '../../general-functions/findElement';
import { checkWinnersInServer } from './add-winner';

export async function createListWinnersOnPageLoad(): Promise<void> {
  const winners: Winner[] = await getWinners(serverUrl, serverPath.winners);
  winners.forEach((el) => {
    let colorCar: string;
    let nameCar: string;

    if (el?.color) {
      colorCar = el.color;
    } else {
      colorCar = <string>(<SVGElement>document.querySelector(`[data-color="${el.id}"]`)).style.fill;
    }

    if (el?.name) {
      nameCar = el.name;
    } else {
      nameCar = <string>(<HTMLSpanElement>document.querySelector(`.title-car${el.id}`)).textContent;
    }

    const obj: Winner = {
      id: el.id,
      wins: el.wins,
      time: el.time,
      color: colorCar,
      name: nameCar,
    };
    mapWinner.set(String(el.id), obj);
  });
}

export async function changeLengthWinners(): Promise<void> {
  const ListWinners: Winner[] = await getWinners(serverUrl, serverPath.winners);
  const winnersLength = <number>ListWinners.length;
  const winners = <HTMLElement>document.querySelector('.winners__count');
  winners.textContent = `Winners (${winnersLength})`;
}

export function createWinners(id: number, wins: number, time: number, page: string) {
  const boxWinners = <HTMLDivElement>document.querySelector('.winners-box');
  const count: number = boxWinners.children.length + INCREASE_PAGE;

  // multiply the current value for the current page
  const currentNumberWinner: number = count + (+page * MAX_LENGTH_WINNERS) - MAX_LENGTH_WINNERS;
  const obj = <Winner>mapWinner.get(String(id));

  boxWinners.innerHTML += `
  <div class="winner">
    <div class="winner__number">${currentNumberWinner}</div>
    <div class="winner__car">
      <svg class="icon winner-svg" data-color="${id}" style="fill: ${obj.color};">
        <use xlink:href="#car"></use>
      </svg>
    </div>
    <div class="winner__name">${obj.name}</div>
    <div class="winner__wins">${wins}</div>
    <div class="winner__time">${time}</div>
  </div>
  `;
}

async function getWinnersForCreateWinners(): Promise<void> {
  await checkWinnersInServer();
  const page = <HTMLSpanElement>document.querySelector('.winners__page__text');
  const valuePage = <string>page.textContent;
  const objForRequest: ObjForRequest = chooseValueForChangePageWinners();
  const winners: Winner[] = await getWinnersForSort(
    serverUrl,
    serverPath.winners,
    objForRequest.sort,
    objForRequest.type,
    valuePage,
  );
  const boxWinners = <HTMLDivElement>document.querySelector('.winners-box');
  boxWinners.textContent = '';
  winners.forEach((el: Winner): void => {
    createWinners(el.id, el.wins, el.time, valuePage);
  });
}

export default getWinnersForCreateWinners;
