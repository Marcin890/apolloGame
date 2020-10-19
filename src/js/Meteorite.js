import { SpaceElement } from "./SpaceElement";

export class Meteorite extends SpaceElement {
  setElement() {
    this.element.classList.add(this.className);
    this.gameboard.appendChild(this.element);
    const size = `${this.randomNumber(25, 80)}px`;
    this.element.style.width = size;
    this.element.style.height = size;
    this.element.style.right = "0px";
    this.element.style.transform = `rotate(${this.randomNumber(0, 360)}deg)`;
    this.element.style.top = `${this.randomPosition()}px`;
  }
}
