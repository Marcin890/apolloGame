import { Apollo } from "./Apollo";
import { Soviet } from "./Soviet";
import { Meteorite } from "./Meteorite";
import { Star } from "./Star";
import { Nasa } from "./Nasa";

export class Game {
  htmlEl = {
    gameboard: document.querySelector("[data-gameboard]"),
    apollo: document.querySelector("[data-apollo]"),
    live: document.querySelector("[data-live]"),
    liveBar: document.querySelector("[data-live-bar]"),
    score: document.querySelector("[data-score]"),
    startButton: document.querySelector("[data-start-button]"),
    start: document.querySelector("[data-start]"),
    gameoverScore: document.querySelector("[data-gameover-score]"),
    gameover: document.querySelector("[data-gameover]"),
  };

  audio = {
    explosion: document.querySelector("[data-audio-explosion]"),
    missle: document.querySelector("[data-audio-missle]"),
    alarm: document.querySelector("[data-audio-alarm]"),
    mute: document.querySelector("[data-audio-mute]"),
  };

  gameSettings = {
    sovietSpeed: 15,
    sovietYSpeed: 5,
    sovietIntervalTime: 2000,
    nasaIntervalTime: 40000,
    nasaSpeed: 25,
    meteoriteSpeed: 45,
    meteoriteIntervalTime: 5000,
    starSpeed: 80,
    starIntervalTime: 1500,
    starInitNumber: 20,
    gameSpeedIntervalTime: 5000,
  };

  sovietInterval = null;
  meteoriteInterval = null;
  starInterval = null;
  nasaInterval = null;
  collisionInterval = null;
  gameSpeedInterval = null;
  soviets = [];
  meteorites = [];
  stars = [];
  nasas = [];
  live = 5;
  score = 0;
  apollo = null;

  init() {
    this.htmlEl.start.classList.remove("hide");
    this.htmlEl.startButton.addEventListener("click", () => this.startGame());
    this.generateInitStars();
    this.starInterval = setInterval(
      () => this.createStar(),
      this.gameSettings.starIntervalTime
    );
    this.audio.mute.addEventListener("click", () => this.audioMute());
  }

  audioMute() {
    const audios = document.querySelectorAll("audio");
    console.log(audios);
    audios.forEach((audio) => {
      audio.muted = !audio.muted;
      this.audio.mute.classList.toggle("muted");
    });
  }

  startGame() {
    console.log(this.htmlEl.audioExplosion);
    this.htmlEl.start.classList.add("hide");
    this.apollo = new Apollo(
      this.htmlEl.apollo,
      this.htmlEl.gameboard,
      this.audio.missle
    );
    this.htmlEl.live.classList.remove("hide");
    this.htmlEl.score.innerHTML = `Scores: ${this.score}`;
    this.apollo.init();
    this.startIntervals();    
  }

  startIntervals() {
    this.sovietInterval = setInterval(
      () => this.createSoviet(),
      this.gameSettings.sovietIntervalTime
    );
    this.meteoriteInterval = setInterval(
      () => this.createMeteorite(),
      this.gameSettings.meteoriteIntervalTime
    );
    this.nasaInterval = setInterval(
      () => this.createNasa(),
      this.gameSettings.nasaIntervalTime
    );
    this.gameSpeedInterval = setInterval(
      (this.gameSettings.sovietSpeed *= 0.85),
      this.gameSettings.gameSpeedIntervalTime
    );

    this.collisionInterval = setInterval(() => this.checkCollision(), 1);
  }

  checkCollision() {  

    const apolloPosition = this.checkElementPosition(this.apollo);
    
    // Star
    this.stars.forEach((star, starIndex, starArr) => {
      const starPosition = this.checkElementPosition(star);
      if (starPosition.left < 0) {
        starArr.splice(starIndex, 1);
        star.elementRemove();
      }
    });
    
    // Nasa
    this.nasas.forEach((nasa, nasaIndex, nasaArr) => {
      const nasaPosition = this.checkElementPosition(nasa);
      if (nasaPosition.left < 0) {
        nasaArr.splice(nasaIndex, 1);
        nasa.elementRemove();
      }

      if (this.compareElementsPosition(apolloPosition, nasaPosition)) {
        this.increaseLive();
        nasaArr.splice(nasaIndex, 1);
        nasa.elementRemove();
      }
    });

    // Meteorite
    this.meteorites.forEach((meteorite, meteoriteIndex, meteoriteArr) => {
      const meteoritePosition = this.checkElementPosition(meteorite);     

      if (meteoritePosition.left < 0) {
        meteoriteArr.splice(meteoriteIndex, 1);
        meteorite.elementRemove();
      }
      
      if (
        this.compareElementsPosition(apolloPosition, meteoritePosition)
      ) {
        this.apollo.element.classList.contains("damaged") ? null : this.updateLive();
      }

      // Missle
      this.apollo.missles.forEach((missle, missleIndex, missleArr) => {
        const missilePosition = this.checkElementPosition(missle);
        if (missilePosition.right > window.innerWidth) {
          missleArr.splice(missleIndex, 1);
          missle.elementRemove();
        }
        if (
          this.compareElementsPosition(missilePosition, meteoritePosition)
        ) {
          missleArr.splice(missleIndex, 1);
          missle.elementRemove();
        }
      });
    });

    // Soviet
    this.soviets.forEach((soviet, sovietIndex, sovietArr) => {
      const sovietPosition = this.checkElementPosition(soviet);
       if (       
        this.compareElementsPosition(apolloPosition, sovietPosition)
      ) {
        if (!this.apollo.element.classList.contains("damaged")) {
          sovietArr.splice(sovietIndex, 1);
          soviet.elementRemove();
          this.updateLive();
        }
      }  

      if (sovietPosition.left < 0) {
        sovietArr.splice(sovietIndex, 1);
        soviet.elementRemove();
        this.updateLive();
      }

      this.apollo.missles.forEach((missle, missleIndex, missleArr) => {
        const missilePosition = this.checkElementPosition(missle);

        if (
          this.compareElementsPosition(missilePosition, sovietPosition)
        ) {
          soviet.explode();
          sovietArr.splice(sovietIndex, 1);

          missleArr.splice(missleIndex, 1);
          missle.elementRemove();
          this.updateScore();
        }
      });
    });
  }

  compareElementsPosition(el1, el2) {
    if (el1.bottom >= el2.top &&
    el1.top <= el2.bottom &&
    el1.right >= el2.left &&
    el1.left <= el2.right) {
      return true;
    }
  }

  checkElementPosition(element) {
    return {
      top: element.element.offsetTop,
      right: element.element.offsetLeft + element.element.offsetWidth,
      bottom: element.element.offsetTop + element.element.offsetHeight,
      left: element.element.offsetLeft,
    }
  }

 
  generateInitStars() {
    for (let index = 0; index < this.gameSettings.starInitNumber; index++) {
      const star = new Star(
        this.htmlEl.gameboard,
        "star",
        this.gameSettings.starSpeed
      );
      star.initStartElement();
      this.stars.push(star);
    }
  }

  createStar() {
    const star = new Star(
      this.htmlEl.gameboard,
      "star",
      this.gameSettings.starSpeed
    );
    star.init();
    this.stars.push(star);
  }

  createNasa() {
    const nasa = new Nasa(
      this.htmlEl.gameboard,
      "nasa",
      this.gameSettings.nasaSpeed
    );
    nasa.init();
    this.nasas.push(nasa);
  }

  createSoviet() {
    const soviet = new Soviet(
      this.htmlEl.gameboard,
      "soviet",
      this.gameSettings.sovietSpeed,
      this.gameSettings.sovietYSpeed,
      this.audio.explosion
    );
    soviet.init();
    this.soviets.push(soviet);
  }

  createMeteorite() {
    const meteorite = new Meteorite(
      this.htmlEl.gameboard,
      "meteorite",
      this.gameSettings.meteoriteSpeed
    );
    meteorite.init();
    this.meteorites.push(meteorite);
  }

  increaseLive() {
    if (this.live < 5) {
      this.live++;
      this.htmlEl.liveBar.style.width = `${(this.live / 5) * 100}%`;
    } else {
      this.score += 5;
      this.htmlEl.score.innerHTML = `Scores: ${this.score}`;
    }
  }

  updateLive() {
    this.audio.alarm.currentTime = 0;
    this.audio.alarm.play();
    this.apollo.element.classList.add("damaged");
    setTimeout(() => {
      this.apollo.element.classList.remove("damaged");
    }, 4000);
    this.live--;
    this.htmlEl.liveBar.style.width = `${(this.live / 5) * 100}%`;
    if (this.live === 0) {
      this.endGame();
    }
  }

  updateScore() {
    this.score++;
    this.htmlEl.score.innerHTML = `Scores: ${this.score}`;
  }

  endGame() {
    const spaceElements = [...this.soviets, ...this.meteorites, ...this.nasas];
    this.apollo.apolloRemove();
    spaceElements.forEach((el) => el.elementRemove());
    this.clearAllIntervals();
    this.htmlEl.live.style.display = "none";
    this.htmlEl.score.innerHTML = "";
    this.htmlEl.gameover.classList.remove("hide");
    this.htmlEl.gameoverScore.innerHTML = `Your score: ${this.score}`;
  }


  clearAllIntervals() {
    clearInterval(this.collisionInterval);
    clearInterval(this.sovietInterval);
    clearInterval(this.meteoriteInterval);
    clearInterval(this.nasaInterval);
  }
}
