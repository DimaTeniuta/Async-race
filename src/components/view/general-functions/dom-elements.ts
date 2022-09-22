import DomElements from '../../types/types';

export function createHtmlElement(str: string): HTMLElement {
  return document.createElement(str);
}

export function appendElement(place: DomElements, element: DomElements): void {
  place.append(element);
}

export function addClasslist(element: DomElements, newClass: string): void {
  element.classList.add(newClass);
}

export function removeClasslist(element: DomElements, newClass: string): void {
  element.classList.remove(newClass);
}

export function addClasslistUseClassName(className: string, newClass: string): void {
  const element = <DomElements>document.querySelector(className);
  element.classList.add(newClass);
}

export function removeClasslistUseClassName(className: string, newClass: string): void {
  const element = <DomElements>document.querySelector(className);
  element.classList.remove(newClass);
}

export function addTextContent(classElement: string, text: string) {
  const btnCreate = <DomElements>document.querySelector(classElement);
  btnCreate.textContent = text;
}

export function createDiv(mainClass: string, parentClass: string): void {
  const div = <HTMLDivElement>createHtmlElement('div');
  const parent = <HTMLElement>document.querySelector(parentClass);
  addClasslist(div, mainClass);
  appendElement(parent, div);
}

export function addAttribute(elem: string, valueType: string, type: string): void {
  const element = <DomElements>document.querySelector(elem);
  element.setAttribute(type, valueType);
}

export function addValueINInput(elClass: string, val: string) {
  const element = <HTMLInputElement>document.querySelector(elClass);
  element.value = val;
}

function createElement(el: string, mainClass: string, parent: string, generalClass?: string): void {
  const elem: DomElements = createHtmlElement(el);
  const container = <HTMLElement>document.querySelector(parent);
  addClasslist(elem, mainClass);
  if (generalClass) {
    addClasslist(elem, generalClass);
  }
  appendElement(container, elem);
}

export function listenArea(
  nameArea: string,
  event: string,
  callback: (e: Event) => void,
): void {
  const area = <DomElements>document.querySelector(nameArea);
  area.addEventListener(event, callback);
}

export function removeListenArea(
  nameArea: string,
  event: string,
  callback: (e: Event) => void,
): void {
  const area = <DomElements>document.querySelector(nameArea);
  area.removeEventListener(event, callback);
}

export default createElement;
