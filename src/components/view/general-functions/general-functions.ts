import { checkGarageLength } from '../../controller/fetch-cars';
import { carBrand, carColor, carModal } from '../../variables/arrays-create-name-car';
import { MINIMAL_COUNT_CARS_FOR_RACE } from '../../variables/general-var';
import { MAX_LENGTH_PAGE } from '../../variables/server';
import { addClasslistUseClassName, removeClasslistUseClassName } from './dom-elements';

function createCarName(): string {
  let tmp: number = Math.round(Math.random() * (carBrand.length - 1));
  let value = <string>`${carBrand[tmp]}`;
  tmp = Math.round(Math.random() * (carModal.length - 1));
  value += <string>` ${carModal[tmp]}`;
  return value;
}

export function createCarColor(): string {
  const tmp: number = Math.round(Math.random() * (carColor.length - 1));
  const value: string = carColor[tmp];
  return value;
}

export function checkCurrentPage(): string {
  const page = <HTMLSpanElement>document.querySelector('.page-text');
  const value = <string>page.textContent;
  return value;
}

export function checkCurrentGarageLengthOnCurrentPage(): void {
  setTimeout(() => {
    const currentGarageLength = <number>(
      (<HTMLDivElement>document.querySelector('.wrap-cars')).children.length
    );

    if (currentGarageLength < MINIMAL_COUNT_CARS_FOR_RACE) {
      addClasslistUseClassName('.btn-race', 'not-active');
    } else {
      removeClasslistUseClassName('.btn-race', 'not-active');
    }
  }, 500);
}

export async function checkCurrentLengthGarage(): Promise<void> {
  const page = <HTMLSpanElement>document.querySelector('.page-text');
  const currentPage = <string>page.textContent;
  const carLength: number = await checkGarageLength();

  if (+currentPage * MAX_LENGTH_PAGE < carLength) {
    removeClasslistUseClassName('.btn-next-garage', 'not-active');
  } else {
    addClasslistUseClassName('.btn-next-garage', 'not-active');
  }

  if (currentPage !== '1') {
    removeClasslistUseClassName('.btn-prev-garage', 'not-active');
  } else {
    addClasslistUseClassName('.btn-prev-garage', 'not-active');
  }
}

export default createCarName;
