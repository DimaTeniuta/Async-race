function addCarInGarage(id: number, color: string, name: string): void {
  const areaCars = <HTMLDivElement>document.querySelector('.wrap-cars');
  areaCars.innerHTML += `
  <div class="wrap-car">
  <div class="wrap-car__btn">
    <button class="btn-select btn" data-select-btn="${id}">SELECT</button>
    <button class="btn-remove btn" data-remove-btn="${id}">REMOVE</button>
    <h4 class="title-car title-car${id}" data-name="${id}">${name}</h4>
  </div>
  <div class="wrap-road">
    <button class="btn-start start${id} btn-car" data-btn-a="${id}">A</button>
    <button class="btn-stop stop${id} btn-car not-active" data-btn-b="${id}">B</button>
    <div class="wrapper-car wrapper-car${id}">
      <div class="car car${id}" data-car="${id}">
        <svg class="icon" data-color="${id}" style="fill: ${color};">
          <use xlink:href="#car"></use>
        </svg>
      </div>
      <div class="flag"></div>
    </div>
  </div>
  <div class="road"></div>
  `;
}

export default addCarInGarage;
