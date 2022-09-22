import { deleteCar } from '../../../controller/fetch-cars';
import { DECREASE_PAGE } from '../../../variables/general-var';
import { serverPath, serverUrl } from '../../../variables/server';
import { listenArea } from '../../general-functions/dom-elements';
import { checkCurrentGarageLengthOnCurrentPage, checkCurrentPage } from '../../general-functions/general-functions';
import checkWinnerInGarage, { checkWinnersInServer } from '../../second-page/winners/add-winner';
import checkCurrentLengthGarage, { getNewCarsFromNextPage } from '../garage/button-next';
import { blockUpdateLineByDelete, getNewCars } from './update-car';

export function checkLengthGarage(): void {
  const valuePage: string = checkCurrentPage();
  const garage = <HTMLDivElement>document.querySelector('.wrap-cars');
  if (garage.children.length === 0 && valuePage !== '1') {
    getNewCarsFromNextPage(DECREASE_PAGE);
  }
}

async function deleteCarFromGarage(id: string): Promise<void> {
  await deleteCar(serverUrl, serverPath.garage, id);
  await getNewCars();
  checkCurrentLengthGarage();
  checkLengthGarage();
}

function listenRemoveButton(): void {
  listenArea('.wrap-cars', 'click', (event) => {
    const targ = <HTMLButtonElement>event.target;
    if (targ.classList.contains('btn-remove') && !targ.classList.contains('not-active')) {
      const currentId = <string>targ.getAttribute('data-remove-btn');
      deleteCarFromGarage(currentId);
      checkWinnerInGarage(currentId);
      blockUpdateLineByDelete(currentId);
      checkCurrentGarageLengthOnCurrentPage();
      checkWinnersInServer();
    }
  });
}

export default listenRemoveButton;
