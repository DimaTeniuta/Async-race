import {
  addClasslistUseClassName,
  listenArea,
  removeClasslistUseClassName,
  removeListenArea,
} from '../general-functions/dom-elements';
import { checkCurrentGarageLengthOnCurrentPage } from '../general-functions/general-functions';
import listenNextWinBtn from '../second-page/buttons/button-next-winners';
import listenPrevWinBtn from '../second-page/buttons/button-prev-winners';
import listenWinsBtn from '../second-page/sort/sort-by-wins';

function listenToGarageBtn(): void {
  const btnGarage = <HTMLButtonElement>document.querySelector('.header__btn-garage');
  listenArea('.header__btn-garage', 'click', (): void => {
    if (!btnGarage.classList.contains('not-active')) {
      addClasslistUseClassName('.winners', 'not-active');
      removeClasslistUseClassName('.main', 'not-active');
      removeClasslistUseClassName('.header__btn-winner', 'not-active');
      addClasslistUseClassName('.header__btn-garage', 'not-active');
      removeListenArea('.btn-next-win', 'click', listenNextWinBtn);
      removeListenArea('.btn-prev-win', 'click', listenPrevWinBtn);
      removeListenArea('.wins-btn', 'click', listenWinsBtn);
      checkCurrentGarageLengthOnCurrentPage();
    }
  });
}

export default listenToGarageBtn;
