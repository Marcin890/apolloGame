import { SpaceElement } from "./SpaceElement";

export class Soviet extends SpaceElement {
  constructor(gameboard, className, speed, speedY, explosion) {
    super(gameboard, className, speed);
    this.speedY = speedY;
    this.explosion = explosion;
  }

  setNewPosition() {
    this.element.style.left = `${this.element.offsetLeft - 1}px`;

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // randomNumber % 100 ? null : this.setYposition();
  }

  setYposition() {
    const direction = this.randomYposition();
    if (
      direction === "top" &&
      parseInt(this.element.style.top, 10) >
        this.speedY + this.element.innerHeight
    ) {
      this.element.style.top = `${this.element.offsetTop - this.speedY}px`;
    }
    if (
      direction === "bottom" &&
      this.element.style.bottom < window.innerHeight - this.speedY - 25
    ) {
      this.element.style.top = `${this.element.offsetTop + this.speedY}px`;
    }
  }

  randomYposition() {
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    const direction = randomNumber === 1 ? "top" : "bottom";

    return direction;
  }
  explode() {
    this.explosion.currentTime = 0;
    this.explosion.play();
    this.element.classList.remove(this.className);
    this.element.classList.add("explosion");
    clearInterval(this.interval);
    setTimeout(() => this.element.remove(), 200);
  }
}
