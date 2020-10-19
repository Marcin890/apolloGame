import { SpaceElement } from "./SpaceElement";

export class Nasa extends SpaceElement {
  setElement() {
    this.element.classList.add(this.className);
    this.gameboard.appendChild(this.element);
    this.element.style.right = "0px";
    this.element.style.transform = `rotate(${this.randomNumber(-45, 45)}deg)`;
    this.element.style.top = `${this.randomPosition()}px`;
  }
}
