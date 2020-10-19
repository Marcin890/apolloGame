import { Missle } from "./Missle";

export class Apollo {
  constructor(apollo, gameboard, missleSound) {
    this.element = apollo;
    this.gameboard = gameboard;
    this.missleSound = missleSound;
  }
  leftArrow = false;
  rightArrow = false;
  topArrow = false;
  downArrow = false;
  modifire = {
    move: 5,
  };
  missles = [];

  init() {
    this.element.classList.remove("hide");
    this.setPosition();
    this.initEventListeners();
    this.initMove();
  }

  setPosition() {
    this.element.style.left = "0px";
    this.element.style.top = `${window.innerHeight / 2 - 10}px`;
  }

  apolloRemove() {
    this.element.remove();
  }

  initMove = () => {
    this.checkKey();
    requestAnimationFrame(this.initMove);
  };

  checkKey() {
    if (this.rightArrow && this.getPositionLeft() < window.innerWidth - 15) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) + this.modifire.move
      }px`;
    }
    if (this.leftArrow && this.getPositionLeft() > 25) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) - this.modifire.move
      }px`;
    }
    if (this.upArrow && this.getPositionTop() > 25) {
      this.element.style.top = `${
        parseInt(this.element.style.top, 10) - this.modifire.move
      }px`;
    }
    if (this.downArrow && this.getPositionTop() < window.innerHeight - 25) {
      this.element.style.top = `${
        parseInt(this.element.style.top, 10) + this.modifire.move
      }px`;
    }
  }
  getPositionLeft() {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }
  getPositionTop() {
    return this.element.offsetTop + this.element.offsetHeight / 2;
  }
  shoot() {
    const missle = new Missle(
      this.gameboard,
      this.element.offsetLeft,
      this.element.offsetTop
    );
    this.missleSound.currentTime = 0;
    this.missleSound.play();
    missle.init();
    this.missles.push(missle);
  }

  initEventListeners() {
    window.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.leftArrow = true;
          break;
        case 39:
          this.rightArrow = true;
          break;
        case 38:
          this.upArrow = true;
          break;
        case 40:
          this.downArrow = true;
          break;
      }
    });

    window.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.leftArrow = false;
          break;
        case 39:
          this.rightArrow = false;

          break;
        case 38:
          this.upArrow = false;
          break;
        case 40:
          this.downArrow = false;
          break;
        case 32:
          this.shoot();
          break;
      }
    });
  }
}
