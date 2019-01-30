class GameAudio {
  constructor() {
    this.bgTheme = new Audio("../assets/sounds/bg_theme.mp3");
    this.barrelBlast = new Audio("../assets/sounds/barrel_blast.mp3");
    this.barrelLoad = new Audio("../assets/sounds/barrel_load.mp3");

    this.bgTheme.volume = 0.1;
    this.barrelBlast.volume = 0.2;
    this.barrelLoad.volume = 0.2;

    this.audioButton = document.getElementById("audio");
    this.addAudioButtonEventListener();
  }

  mute() {
    this.audioButton.classList.add("off");
    this.audioButton.classList.remove("on");
    this.audioButton.src = "../assets/images/mute.png";
    this.bgTheme.volume = 0.0;
    this.barrelBlast.volume = 0.0;
    this.barrelLoad.volume = 0.0;
  }

  unmute() {
    this.audioButton.classList.add("on");
    this.audioButton.classList.remove("off");
    this.audioButton.src = "../assets/images/speaker.png";
    this.bgTheme.volume = 0.1;
    this.barrelBlast.volume = 0.2;
    this.barrelLoad.volume = 0.2;
  }

  addAudioButtonEventListener() {
    this.audioButton.addEventListener("click", () => {
      if (this.audioButton.className === "on") {
        this.mute();
      } else {
        this.unmute();
      }
    });
  }
}

export default GameAudio;
