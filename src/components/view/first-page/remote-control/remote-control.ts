import createElement, {
  addAttribute,
  addClasslistUseClassName,
  addTextContent,
  addValueINInput,
  createDiv,
} from '../../general-functions/dom-elements';

function createSectionsInContainerController(): void {
  createDiv('container-controller', '.main');
  createDiv('controller-create', '.container-controller');
  createDiv('controller-update', '.container-controller');
  createDiv('controller-btn', '.container-controller');
}

function createLineCreate(): void {
  createElement('input', 'input-text-create', '.controller-create', 'input');
  addAttribute('.input-text-create', 'text', 'type');
  createElement('input', 'input-color-create', '.controller-create', 'input-color');
  addAttribute('.input-color-create', 'color', 'type');
  addValueINInput('.input-color-create', '#ffffff');
  createElement('button', 'btn-create', '.controller-create', 'btn');
  addTextContent('.btn-create', 'CREATE');
}

function createLineUpdate(): void {
  createElement('input', 'input-text-update', '.controller-update', 'input');
  addAttribute('.input-text-update', 'text', 'type');
  addAttribute('.input-text-update', 'true', 'disabled');
  addClasslistUseClassName('.input-text-update', 'not-active');
  createElement('input', 'input-color-update', '.controller-update', 'input-color');
  addAttribute('.input-color-update', 'color', 'type');
  addValueINInput('.input-color-update', '#ffffff');
  createElement('button', 'btn-update', '.controller-update', 'btn');
  addClasslistUseClassName('.btn-update', 'not-active');
  addTextContent('.btn-update', 'UPDATE');
}

function createLineBtn(): void {
  createElement('button', 'btn-race', '.controller-btn', 'btn');
  addTextContent('.btn-race', 'RACE');
  createElement('button', 'btn-reset', '.controller-btn', 'btn');
  addTextContent('.btn-reset', 'RESET');
  addClasslistUseClassName('.btn-reset', 'not-active');
  createElement('button', 'btn-generate-cars', '.controller-btn', 'btn');
  addTextContent('.btn-generate-cars', 'GENERATE CARS');
}

function createController(): void {
  createSectionsInContainerController();
  createLineCreate();
  createLineUpdate();
  createLineBtn();
}

export default createController;
