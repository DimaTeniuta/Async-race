import { ObjForRequest } from '../../types/types';
import { serverPath } from '../../variables/server';

function findColor(value: string): string {
  const arr = <NodeListOf<Element>>document.querySelectorAll('[data-color]');
  let color = <string>'';
  arr.forEach((el) => {
    const elValue = <string>el.getAttribute('data-color');
    if (value === elValue) {
      color = <string>el.getAttribute('style');
    }
  });

  return color.slice(6, -1);
}

export function findName(value: string): string {
  const arrNameCar = <NodeListOf<Element>>document.querySelectorAll('[data-name]');
  let carName = <string>'';
  arrNameCar.forEach((el: Element) => {
    const elValue = <string>el.getAttribute('data-name');
    if (value === elValue) {
      carName = <string>el.textContent;
    }
  });

  return carName;
}

export function chooseValueForChangePageWinners(): ObjForRequest {
  const btnTime = <HTMLButtonElement>document.querySelector('.best-time');
  const btnWins = <HTMLButtonElement>document.querySelector('.wins-btn');
  let valueSort: string;
  let typeOrder: string;

  if (btnTime.classList.contains('up')) {
    valueSort = serverPath.time;
    typeOrder = serverPath.up;
  } else if (btnTime.classList.contains('down')) {
    valueSort = serverPath.time;
    typeOrder = serverPath.down;
  } else if (btnWins.classList.contains('up')) {
    valueSort = serverPath.wins;
    typeOrder = serverPath.up;
  } else if (btnWins.classList.contains('down')) {
    valueSort = serverPath.wins;
    typeOrder = serverPath.down;
  } else {
    valueSort = serverPath.id;
    typeOrder = serverPath.up;
  }

  const objFoeRequest: ObjForRequest = {
    sort: valueSort,
    type: typeOrder,
  };

  return objFoeRequest;
}

export default findColor;
