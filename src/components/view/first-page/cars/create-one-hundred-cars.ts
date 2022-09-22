import { setCar } from '../../../controller/fetch-cars';
import { Cars } from '../../../types/types';
import { serverPath, serverUrl } from '../../../variables/server';
import { listenArea } from '../../general-functions/dom-elements';
import createCarName, {
  checkCurrentGarageLengthOnCurrentPage,
  checkCurrentLengthGarage,
  createCarColor,
} from '../../general-functions/general-functions';
import { getNewCars } from './update-car';

async function setOneHundredCars(): Promise<void> {
  const arr: Partial<Cars>[] = [];
  for (let i = 0; i < 100; i += 1) {
    const carColor: string = createCarColor();
    const carName: string = createCarName();
    const obj: Partial<Cars> = {
      color: carColor,
      name: carName,
    };
    arr.push(obj);
  }

  arr.forEach(async (el) => {
    await setCar(serverUrl, serverPath.garage, el);
  });
}

function listenGenerateButton(): void {
  const btnGenerate = <HTMLButtonElement>document.querySelector('.btn-generate-cars');

  listenArea('.btn-generate-cars', 'click', () => {
    if (!btnGenerate.classList.contains('not-active')) {
      setOneHundredCars();
      getNewCars();
      checkCurrentLengthGarage();
      checkCurrentGarageLengthOnCurrentPage();
    }
  });
}

export default listenGenerateButton;
