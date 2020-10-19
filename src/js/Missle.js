export class Missle {
  constructor(gameboard, apolloLeft, apolloTop) {
    this.gameboard = gameboard;
    this.apolloLeft = apolloLeft + 100;
    this.apolloTop = apolloTop + 10;
    this.element = document.createElement("div");
    this.interval = null;
  }
  init() {
    this.setMissle();
    this.updatePosition();
  }
  updatePosition() {
    this.interval = setInterval(() => this.setNewPosition(), 5);
  }
  setNewPosition() {
    this.element.style.left = `${this.element.offsetLeft + 3}px`;
  }

  setMissle() {
    this.element.classList.add("missle");
    this.gameboard.appendChild(this.element);
    this.element.style.left = `${this.apolloLeft}px`;
    this.element.style.top = `${this.apolloTop}px`;
  }

  elementRemove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
