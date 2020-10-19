export class SpaceElement {
  constructor(gameboard, className, speed) {
    this.gameboard = gameboard;
    this.element = document.createElement("div");
    this.className = className;
    this.interval = null;
    this.speed = speed;
  }
  init() {
    this.setElement();
    this.updatePosition();
  }
  updatePosition() {
    this.interval = setInterval(() => this.setNewPosition(), this.speed);
  }
  setNewPosition() {
    this.element.style.left = `${this.element.offsetLeft - 1}px`;
  }

  setElement() {
    this.element.classList.add(this.className);
    this.gameboard.appendChild(this.element);
    this.element.style.right = "0px";
    this.element.style.top = `${this.randomPosition()}px`;
  }

  elementRemove() {
    clearInterval(this.interval);
    this.element.remove();
  }
  randomPosition() {
    return Math.floor(
      Math.random() * (window.innerHeight - this.element.offsetHeight)
    );
  }
  randomPositionX() {
    return Math.floor(
      Math.random() * (window.innerWidth - this.element.offsetWidth)
    );
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
