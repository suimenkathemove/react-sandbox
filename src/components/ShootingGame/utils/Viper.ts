import { Character } from "./Character";
import { Position } from "./Position";
import { Shot } from "./Shot";
import { Size } from "./Size";

export class Viper extends Character {
  private shots: Shot[] = [];
  private leftSingleShots: Shot[] = [];
  private rightSingleShots: Shot[] = [];

  private isZKeyPressing = false;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    private shotImage: HTMLImageElement,
    private singleShotImage: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position, new Size(64, 64), 1, 10);

    Object.assign(this, { shotImage, singleShotImage });
  }

  private fitInFrame() {
    const x = Math.min(
      Math.max(this.position.x, 0),
      Character.CANVAS_WIDTH - this.size.width,
    );
    const y = Math.min(
      Math.max(this.position.y, 0),
      Character.CANVAS_HEIGHT - this.size.height,
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
    const shot = new Shot(this.ctx, this.shotImage, new Position(0, 0));
    shot.position.set(
      this.position.x + this.size.width / 2,
      this.position.y - shot.size.height,
    );
    this.shots.push(shot);

    const leftSingleShot = new Shot(
      this.ctx,
      this.singleShotImage,
      new Position(0, 0),
    );
    leftSingleShot.position.set(
      this.position.x + this.size.width / 2,
      this.position.y - leftSingleShot.size.height,
    );
    leftSingleShot.setAngle((260 / 180) * Math.PI);
    this.leftSingleShots.push(leftSingleShot);

    const rightSingleShot = new Shot(
      this.ctx,
      this.singleShotImage,
      new Position(0, 0),
    );
    rightSingleShot.position.set(
      this.position.x + this.size.width / 2,
      this.position.y - rightSingleShot.size.height,
    );
    rightSingleShot.setAngle((280 / 180) * Math.PI);
    this.rightSingleShots.push(rightSingleShot);
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
    this.leftSingleShots.forEach((s) => {
      s.update();
    });
    this.rightSingleShots.forEach((s) => {
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
