class GameAudio {
  constructor() {
    this.bgTheme = new Audio("../assets/sounds/bg_theme.mp3");
    this.barrelBlast = new Audio("../assets/sounds/barrel_blast.mp3");
    this.barrelLoad = new Audio("../assets/sounds/barrel_load.mp3");
    this.adjustVolume(0.2);

    this.audioButton = document.getElementById("audio");
    this.addAudioButtonEventListener();
  }

  adjustVolume(volume) {
    this.bgTheme.volume = volume;
    this.barrelBlast.volume = volume;
    this.barrelLoad.volume = volume;
  }

  addAudioButtonEventListener() {
    this.audioButton.addEventListener("click", () => {
      if (this.audioButton.className === "on") {
        this.audioButton.src = "../assets/images/mute.png";
        this.adjustVolume(0.0);
      } else {
        this.audioButton.src = "../assets/images/speaker.png";
        this.adjustVolume(0.2);
      }
      this.audioButton.classList.toggle("on");
    });
  }
}

export default GameAudio;
