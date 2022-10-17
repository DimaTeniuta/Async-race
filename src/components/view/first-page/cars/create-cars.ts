import getCars, { checkGarageLength } from '../../../controller/fetch-cars';
import { Cars } from '../../../types/types';
import { serverPath, serverUrl } from '../../../variables/server';
import { addTextContent } from '../../general-functions/dom-elements';
import addCarInGarage from '../garage/road-track';

export async function changeGarageLength(): Promise<void> {
  const carsLength: number = await checkGarageLength();
  addTextContent('.container-garage__title', `Garage ( ${carsLength} )`);
}

async function createCars(): Promise<void> {
  const arrayCars: Cars[] = await getCars(serverUrl, serverPath.firstPage);
  arrayCars.forEach((el) => {
    addCarInGarage(el.id, el.color, el.name);
  });
  changeGarageLength();
}

export async function updatePage(arr: Cars[]): Promise<void> {
  arr.forEach((el) => {
    addCarInGarage(el.id, el.color, el.name);
  });
  changeGarageLength();
}

export default createCars;
