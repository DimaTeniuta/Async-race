import getCars from '../../../controller/fetch-cars';
import { Cars } from '../../../types/types';
import { INCREASE_PAGE, mapUpdate } from '../../../variables/general-var';
import { serverPath, serverUrl } from '../../../variables/server';
import { listenArea } from '../../general-functions/dom-elements';
import { checkCurrentGarageLengthOnCurrentPage, checkCurrentLengthGarage } from '../../general-functions/general-functions';
import { updatePage } from '../cars/create-cars';

export async function getNewCarsFromNextPage(valueForGetNextPage: number): Promise<void> {
  const garage = <HTMLDivElement>document.querySelector('.wrap-cars');
  const page = <HTMLElement>document.querySelector('.page-text');
  const numPage = <string>page.textContent;
  const nextPage = <number>(+(numPage) + valueForGetNextPage);
  const arrayCars: Cars[] = await getCars(serverUrl, `${serverPath.somePage}${nextPage}`);
  garage.innerHTML = '';
  await updatePage(arrayCars);
  page.textContent = String(nextPage);
  checkCurrentLengthGarage();
}

async function increasePage() {
  await getNewCarsFromNextPage(INCREASE_PAGE);
  checkCurrentLengthGarage();
}

export function listenNextButton() {
  listenArea('.btn-next-garage', 'click', (): void => {
    const btn = <HTMLButtonElement>document.querySelector('.btn-next-garage');
    if (!btn.classList.contains('not-active')) {
      increasePage();
      checkCurrentGarageLengthOnCurrentPage();
      mapUpdate.clear();
    }
  });
}

export default checkCurrentLengthGarage;
