import { Character } from "./character";
import { Position } from "./position";
import { Shot } from "./shot";

export class Viper extends Character {
  static readonly WIDTH = 64;
  static readonly HEIGHT = 64;

  private shots: Shot[] = [];
  private isZKeyPressing = false;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    private shotImage: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position, 1, 10);

    Object.assign(this, { shotImage });
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

  private fire() {
    const shot = new Shot(
      this.ctx,
      this.shotImage,
      new Position(
        this.position.x + Viper.WIDTH / 2 - Shot.WIDTH / 2,
        this.position.y - Shot.HEIGHT,
      ),
    );
    this.shots.push(shot);
  }

  private firingOne() {
    if (Character.pressedKey.z && !this.isZKeyPressing) {
      this.fire();

      this.isZKeyPressing = true;
    }

    if (!Character.pressedKey.z) {
      this.isZKeyPressing = false;
    }
  }

  private firingMultiple() {
    if (Character.pressedKey.z) {
      this.fire();
    }
  }

  private controlling() {
    this.moving();

    this.firingOne();
  }

  update() {
    this.shots.forEach((s) => {
      s.update();
    });

    if (this.life <= 0) {
      return;
    }

    switch (Character.scene) {
      case "appearance":
        this.appearing();
        break;
      case "play":
        this.controlling();
        break;
      default:
        assertNever(Character.scene);
    }

    this.draw();
  }
}
