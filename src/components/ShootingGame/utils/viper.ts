import { Character } from "./character";
import { Position } from "./position";

export class Viper extends Character {
  static readonly WIDTH = 64;
  static readonly HEIGHT = 64;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position, 1, 10);
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

  private appearing() {
    this.position.y -= 1;
  }

  private moving() {
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

  update() {
    if (this.life <= 0) {
      return;
    }

    switch (Character.scene) {
      case "appearance":
        this.appearing();
        break;
      case "play":
        this.moving();
        break;
      default:
        assertNever(Character.scene);
    }

    this.draw();
  }
}
