import createElement, { addClasslistUseClassName, addTextContent, createDiv } from '../../general-functions/dom-elements';

function createContainerCars(): void {
  createDiv('container-garage', '.main');
}

function createMessageWinner(): void {
  createElement('div', 'message-winner', '.main');
}

function createTitleGarage(): void {
  createElement('h2', 'container-garage__title', '.container-garage');
  addTextContent('.container-garage__title', 'Garage ()');
  createElement('h3', 'page', '.container-garage');
  addTextContent('.page', 'Page # ');
  createElement('span', 'page-text', '.page');
  addTextContent('.page-text', '1');
}

function createDivForCars(): void {
  createElement('div', 'wrap-cars', '.container-garage');
}

function createButtonsGarage(): void {
  createDiv('wrap-btn-garage', '.container-garage');
  createElement('button', 'btn-prev-garage', '.wrap-btn-garage', 'btn');
  addClasslistUseClassName('.btn-prev-garage', 'not-active');
  addTextContent('.btn-prev-garage', 'PREV');
  createElement('button', 'btn-next-garage', '.wrap-btn-garage', 'btn');
  addClasslistUseClassName('.btn-next-garage', 'not-active');
  addTextContent('.btn-next-garage', 'NEXT');
}

function createGarage(): void {
  createContainerCars();
  createMessageWinner();
  createTitleGarage();
  createDivForCars();
  createButtonsGarage();
}

export default createGarage;
