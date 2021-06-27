import { Character } from "./character";
import { Position } from "./position";

export class Viper extends Character {
  static readonly WIDTH = 64;
  static readonly HEIGHT = 64;

  static readonly ONE_STEP = 10;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position);

    window.addEventListener("keydown", (event) => {
      if (Character.scene !== "play") {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          this.position.y -= Viper.ONE_STEP;
          break;
        case "ArrowDown":
          this.position.y += Viper.ONE_STEP;
          break;
        case "ArrowLeft":
          this.position.x -= Viper.ONE_STEP;
          break;
        case "ArrowRight":
          this.position.x += Viper.ONE_STEP;
          break;
      }
    });
  }

  appearing() {
    this.position.y -= 1;

    if (this.position.y <= Character.CANVAS_HEIGHT - 100) {
      Character.scene = "play";
    }
  }
}
