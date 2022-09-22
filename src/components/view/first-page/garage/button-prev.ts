import { DECREASE_PAGE, mapUpdate } from '../../../variables/general-var';
import { listenArea } from '../../general-functions/dom-elements';
import { checkCurrentGarageLengthOnCurrentPage } from '../../general-functions/general-functions';
import { getNewCarsFromNextPage } from './button-next';

function decreasePage(): void {
  const btnPrev = <HTMLButtonElement>document.querySelector('.btn-prev-garage');
  if (!btnPrev.classList.contains('not-active')) {
    getNewCarsFromNextPage(DECREASE_PAGE);
  }
}

function listenPrevButton(): void {
  listenArea('.btn-prev-garage', 'click', () => {
    decreasePage();
    checkCurrentGarageLengthOnCurrentPage();
    mapUpdate.clear();
  });
}

export default listenPrevButton;
