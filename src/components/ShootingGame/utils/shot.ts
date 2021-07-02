import { Character } from "./character";
import { Position } from "./position";

export class Shot extends Character {
  static readonly WIDTH = 32;
  static readonly HEIGHT = 32;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position, 1, 10);
  }

  private checkOutFlame() {
    return (
      this.position.x + Shot.WIDTH < 0 ||
      Character.CANVAS_WIDTH < this.position.x ||
      this.position.y + Shot.HEIGHT < 0 ||
      Character.CANVAS_HEIGHT < this.position.y
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

    this.draw();
  }
}
