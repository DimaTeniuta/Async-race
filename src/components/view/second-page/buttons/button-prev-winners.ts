import { DECREASE_PAGE } from '../../../variables/general-var';
import { getNextWinnerPage } from './button-next-winners';

function listenPrevWinBtn(): void {
  const btnNextWin = <HTMLButtonElement>document.querySelector('.btn-prev-win');
  if (!btnNextWin.classList.contains('not-active')) {
    getNextWinnerPage(DECREASE_PAGE);
  }
}

export default listenPrevWinBtn;
