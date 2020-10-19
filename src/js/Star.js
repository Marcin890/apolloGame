const { SpaceElement } = require("./SpaceElement");

export class Star extends SpaceElement {
  initStartElement() {
    this.setInitElement();
    this.updatePosition();
  }
  setElement() {
    this.element.classList.add(this.className);
    this.gameboard.appendChild(this.element);
    const size = `${this.randomNumber(1, 4)}px`;
    this.element.style.width = size;
    this.element.style.height = size;
    this.element.style.right = "0px";
    this.element.style.top = `${this.randomPosition()}px`;
  }

  setInitElement() {
    this.element.classList.add(this.className);
    this.gameboard.appendChild(this.element);
    const size = `${this.randomNumber(1, 4)}px`;
    this.element.style.width = size;
    this.element.style.height = size;
    this.element.style.right = `${this.randomPositionX()}px`;
    this.element.style.top = `${this.randomPosition()}px`;
  }
}
