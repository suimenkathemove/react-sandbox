import { Character } from "./Character";
import { Config } from "./Config";
import { Position } from "./Position";
import { Size } from "./Size";

export class Shot extends Character {
  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position, new Size(32, 32), 1, 10);
  }

  private checkOutFlame() {
    return (
      this.position.x + this.size.width < 0 ||
      Config.CANVAS_WIDTH < this.position.x ||
      this.position.y + this.size.height < 0 ||
      Config.CANVAS_HEIGHT < this.position.y
    );
  }

  update() {
    // 画面外に出た場合は死亡扱いとすることで、無駄な処理を行わないようにする
    if (this.checkOutFlame()) {
      this.life = 0;
    }

    if (this.life <= 0) {
      return;
    }

    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    this.rotationDraw();
  }
}
