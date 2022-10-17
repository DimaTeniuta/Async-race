import getCars, { updateCar } from '../../../controller/fetch-cars';
import { Cars, Winner } from '../../../types/types';
import { mapUpdate, mapWinner } from '../../../variables/general-var';
import { serverPath, serverUrl } from '../../../variables/server';
import {
  addAttribute,
  addClasslistUseClassName,
  listenArea,
  removeClasslistUseClassName,
} from '../../general-functions/dom-elements';
import findColor, { findName } from '../../general-functions/findElement';
import checkCurrentLengthGarage from '../garage/button-next';
import { updatePage } from './create-cars';

let currentID: string;
let bodyFetch: Partial<Cars>;

function setValueInputText(text: string, color: string): void {
  const inputText = <HTMLInputElement>document.querySelector('.input-text-update');
  const inputColor = <HTMLInputElement>document.querySelector('.input-color-update');
  inputText.removeAttribute('disabled');
  inputText.focus();
  removeClasslistUseClassName('.input-text-update', 'not-active');
  inputText.value = text;
  inputColor.value = color;
  removeClasslistUseClassName('.btn-update', 'not-active');
}

function listenSelectArea(): void {
  listenArea('.wrap-cars', 'click', (event) => {
    const targ = <HTMLButtonElement>event.target;
    if (targ.classList.contains('btn-select') && !targ.classList.contains('not-active')) {
      const id = <string>targ.getAttribute('data-select-btn');
      mapUpdate.set(id, id);
      currentID = `/${id}`;
      const color: string = findColor(id);
      const carName: string = findName(id);
      setValueInputText(carName, color);
    }
  });
}

export function createObjForRequest(nameTextInput: string, nameColorInput: string): Partial<Cars> {
  const inputText = <HTMLInputElement>document.querySelector(nameTextInput);
  const inputColor = <HTMLInputElement>document.querySelector(nameColorInput);
  const obj: Partial<Cars> = {
    name: inputText.value,
    color: inputColor.value,
  };
  return obj;
}

export function removeBlockUpdateAfterRace(): void {
  const inputText = <HTMLInputElement>document.querySelector('.input-text-update');
  if (!inputText.getAttribute('disabled') === true) {
    removeClasslistUseClassName('.btn-update', 'not-active');
  }
}

export function resetValueInUpdateLine(): void {
  const inputText = <HTMLInputElement>document.querySelector('.input-text-update');
  const inputColor = <HTMLInputElement>document.querySelector('.input-color-update');
  inputText.value = '';
  inputColor.value = '#ffffff';
  addAttribute('.input-text-update', 'true', 'disabled');
  addClasslistUseClassName('.input-text-update', 'not-active');
  addClasslistUseClassName('.btn-update', 'not-active');
}

export function blockUpdateLineByDelete(id: string): void {
  if (mapUpdate.has(id)) {
    resetValueInUpdateLine();
    mapUpdate.delete(id);
  }
}

export async function getNewCars(): Promise<void> {
  const garage = <HTMLDivElement>document.querySelector('.wrap-cars');
  const page = <HTMLElement>document.querySelector('.page-text');
  const numPage = <string>page.textContent;
  const arrayCars: Cars[] = await getCars(serverUrl, `${serverPath.somePage}${numPage}`);
  garage.innerHTML = '';
  await updatePage(arrayCars);
  page.textContent = numPage;
}

function setNewValueInMapWinner(id: string): void {
  if (mapWinner.has(id)) {
    const obj = <Winner>mapWinner.get(id);
    const newObj: Partial<Cars> = createObjForRequest('.input-text-update', '.input-color-update');

    obj.name = <string>newObj.name;
    obj.color = <string>newObj.color;

    mapWinner.delete(id);
    mapWinner.set(id, obj);
  }
}

async function createNewCar(): Promise<void> {
  await updateCar(serverUrl, serverPath.garage, currentID, bodyFetch);
  getNewCars();
  const id: string = currentID.slice(1);
  mapUpdate.delete(id);
  setNewValueInMapWinner(id);
  resetValueInUpdateLine();
}

export function listenUpdateButton(): void {
  const btn = <HTMLButtonElement>document.querySelector('.btn-update');
  listenArea('.btn-update', 'click', () => {
    if (!btn.classList.contains('not-active')) {
      bodyFetch = createObjForRequest('.input-text-update', '.input-color-update');
      createNewCar();
      checkCurrentLengthGarage();
    }
  });
}

export default listenSelectArea;
