import { Character } from "./Character";
import { Config } from "./Config";
import { Enemy } from "./Enemy";
import { Shot } from "./Shot";

import { Position } from "@/utils/Position";
import { Size } from "@/utils/Size";
import { assertNever } from "@/utils/assertNever";

export class Viper extends Character {
  public shots: Shot[] = [];
  private leftSingleShots: Shot[] = [];
  private rightSingleShots: Shot[] = [];

  private isZKeyPressing = false;

  public enemies: Enemy[] = [];

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
      Config.CANVAS_WIDTH - this.size.width,
    );
    const y = Math.min(
      Math.max(this.position.y, 0),
      Config.CANVAS_HEIGHT - this.size.height,
    );
    this.position.set(x, y);
  }

  private appearing() {
    this.position.y -= 1;
  }

  private moving() {
    if (Config.pressedKey.ArrowUp) {
      this.position.y -= this.speed;
    }
    if (Config.pressedKey.ArrowDown) {
      this.position.y += this.speed;
    }
    if (Config.pressedKey.ArrowLeft) {
      this.position.x -= this.speed;
    }
    if (Config.pressedKey.ArrowRight) {
      this.position.x += this.speed;
    }

    this.fitInFrame();
  }

  private fire() {
    const shot = new Shot(this.ctx, this.shotImage, new Position(0, 0));
    shot.position.set(
      this.position.x + this.size.width / 2,
      this.position.y - shot.size.height / 2,
    );
    this.shots.push(shot);

    const leftSingleShot = new Shot(
      this.ctx,
      this.singleShotImage,
      new Position(0, 0),
    );
    leftSingleShot.position.set(
      this.position.x + this.size.width / 2,
      this.position.y - leftSingleShot.size.height / 2,
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
      this.position.y - rightSingleShot.size.height / 2,
    );
    rightSingleShot.setAngle((280 / 180) * Math.PI);
    this.rightSingleShots.push(rightSingleShot);

    this.enemies.forEach((e) => {
      shot.targets.push(e);
      leftSingleShot.targets.push(e);
      rightSingleShot.targets.push(e);
    });
  }

  private firingOne() {
    if (Config.pressedKey.Space && !this.isZKeyPressing) {
      this.fire();

      this.isZKeyPressing = true;
    }

    if (!Config.pressedKey.Space) {
      this.isZKeyPressing = false;
    }
  }

  private firingMultiple() {
    if (Config.pressedKey.Space) {
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

    switch (Config.scene) {
      case "appearance":
        this.appearing();
        break;
      case "play":
        this.controlling();
        break;
      default:
        assertNever(Config.scene);
    }

    if (this.enemies.some((e) => e.life > 0 && this.isCollision(e))) {
      this.life = 0;
    }

    this.draw();
  }
}
