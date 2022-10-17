import DomElements from '../../types/types';
import body from '../../variables/dom-variables';
import {
  addClasslist, addTextContent, appendElement, createHtmlElement,
} from '../general-functions/dom-elements';

function createHeader(): void {
  const header: DomElements = <HTMLElement>createHtmlElement('header');
  addClasslist(header, 'header');
  appendElement(body, header);

  const btnGarage: DomElements = <HTMLButtonElement>createHtmlElement('button');
  addClasslist(btnGarage, 'header__btn-garage');
  addClasslist(btnGarage, 'btn');
  addClasslist(btnGarage, 'not-active');
  appendElement(header, btnGarage);
  addTextContent('.header__btn-garage', 'TO GARAGE');

  const btnWinner: DomElements = <HTMLButtonElement>createHtmlElement('button');
  addClasslist(btnWinner, 'header__btn-winner');
  addClasslist(btnWinner, 'btn');
  appendElement(header, btnWinner);
  addTextContent('.header__btn-winner', 'TO WINNERS');
}

export default createHeader;
