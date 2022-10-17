import {
  addClasslistUseClassName,
  listenArea,
  removeClasslistUseClassName,
} from '../general-functions/dom-elements';
import listenNextWinBtn, {
  checkCurrentLengthWinners,
} from '../second-page/buttons/button-next-winners';
import listenPrevWinBtn from '../second-page/buttons/button-prev-winners';
import listenTimesBtn from '../second-page/sort/sort-by-times';
import listenWinsBtn from '../second-page/sort/sort-by-wins';
import getWinnersForCreateWinners, { changeLengthWinners } from '../second-page/winners/winners';

function listenToWinnersBtn(): void {
  const btnWinners = <HTMLButtonElement>document.querySelector('.header__btn-winner');
  listenArea('.header__btn-winner', 'click', (): void => {
    if (!btnWinners.classList.contains('not-active')) {
      addClasslistUseClassName('.main', 'not-active');
      removeClasslistUseClassName('.winners', 'not-active');
      removeClasslistUseClassName('.header__btn-garage', 'not-active');
      addClasslistUseClassName('.header__btn-winner', 'not-active');
      getWinnersForCreateWinners();
      changeLengthWinners();
      checkCurrentLengthWinners();
      listenArea('.btn-next-win', 'click', listenNextWinBtn);
      listenArea('.btn-prev-win', 'click', listenPrevWinBtn);
      listenArea('.wins-btn', 'click', listenWinsBtn);
      listenArea('.best-time', 'click', listenTimesBtn);
    }
  });
}

export default listenToWinnersBtn;
