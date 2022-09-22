import getWinners from '../../controller/fetch-winners';
import { Winner } from '../../types/types';
import { serverPath, serverUrl } from '../../variables/server';
import createElement, { addClasslistUseClassName } from '../general-functions/dom-elements';

async function createSecondPage(): Promise<void> {
  createElement('section', 'winners', 'body');
  addClasslistUseClassName('.winners', 'not-active');
  const ListWinners: Winner[] = await getWinners(serverUrl, serverPath.winners);
  const winnersLength = <number>ListWinners.length;
  const winners = <HTMLElement>document.querySelector('.winners');
  winners.innerHTML = `
  <h2 class="winners__count">Winners (${winnersLength})</h2>
  <h4 class="winners__page">Page # <span class="winners__page__text">1</span></h4>
  <div class="winners__wrap-titles">
    <div class="number">Number</div>
    <div class="car-winner">Car</div>
    <div class="car-winner-name">Name</div>
    <button class="wins-btn win-btn">
    <span>Wins&nbsp;&nbsp;</span>
    <span class="wins-up">&#8593;</span>
    <span class="wins-down">&#8595;</span>
    </button>
    <button class="best-time win-btn">
    <span>Best times (seconds)&nbsp;&nbsp;</span>
    <span class="time-up">&#8593;</span>
    <span class="time-down">&#8595;</span>
    </button>
  </div>
  <div class="winners-box"></div>
  <div class="wrap-btn-winner">
    <button class="btn-prev-win btn not-active">PREV</button>
    <button class="btn-next-win btn not-active">NEXT</button>
  </div>
  `;
}

export default createSecondPage;
