import { Character } from "./character";
import { Position } from "./position";

export class Viper extends Character {
  static readonly WIDTH = 64;
  static readonly HEIGHT = 64;

  speed = 10;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position);
  }

  private fitInFrame() {
    const x = Math.min(
      Math.max(this.position.x, 0),
      Character.CANVAS_WIDTH - Viper.WIDTH,
    );
    const y = Math.min(
      Math.max(this.position.y, 0),
      Character.CANVAS_HEIGHT - Viper.HEIGHT,
    );
    this.position.set(x, y);
  }

  appearing() {
    this.position.y -= 1;

    if (this.position.y <= Character.CANVAS_HEIGHT - 100) {
      Character.scene = "play";
    }
  }

  moving() {
    if (Character.pressedKey.ArrowUp) {
      this.position.y -= this.speed;
    }
    if (Character.pressedKey.ArrowDown) {
      this.position.y += this.speed;
    }
    if (Character.pressedKey.ArrowLeft) {
      this.position.x -= this.speed;
    }
    if (Character.pressedKey.ArrowRight) {
      this.position.x += this.speed;
    }

    this.fitInFrame();
  }
}
