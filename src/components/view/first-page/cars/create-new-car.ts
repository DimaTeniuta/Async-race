import { serverPath, serverUrl } from '../../../variables/server';
import { listenArea } from '../../general-functions/dom-elements';
import { getNewCars } from './update-car';
import { setCar } from '../../../controller/fetch-cars';
import { Cars } from '../../../types/types';
import createCarName, {
  checkCurrentGarageLengthOnCurrentPage,
  checkCurrentLengthGarage,
  createCarColor,
} from '../../general-functions/general-functions';

function resetValueInCreateLine(): void {
  const inputText = <HTMLInputElement>document.querySelector('.input-text-create');
  const inputColor = <HTMLInputElement>document.querySelector('.input-color-create');
  inputText.value = '';
  inputColor.value = '#ffffff';
}

export function createObjForPostRequest(
  nameTextInput: string,
  nameColorInput: string,
): Partial<Cars> {
  const inputText = <HTMLInputElement>document.querySelector(nameTextInput);
  const inputColor = <HTMLInputElement>document.querySelector(nameColorInput);

  const obj: Partial<Cars> = {
    name: inputText.value,
    color: inputColor.value,
  };

  if (inputText.value === '') {
    const valueName: string = createCarName();
    const valueColor: string = createCarColor();
    obj.name = valueName;
    obj.color = valueColor;
  }

  return obj;
}

async function createBodyForRequest(): Promise<void> {
  const obj: Partial<Cars> = createObjForPostRequest('.input-text-create', '.input-color-create');
  await setCar(serverUrl, serverPath.garage, obj);
  await getNewCars();
  resetValueInCreateLine();
  checkCurrentLengthGarage();
}

function listenCreateButton(): void {
  const btnCreate = <HTMLButtonElement>document.querySelector('.btn-create');
  listenArea('.btn-create', 'click', (): void => {
    if (!btnCreate.classList.contains('not-active')) {
      createBodyForRequest();
      checkCurrentGarageLengthOnCurrentPage();
    }
  });
}

export default listenCreateButton;
