import { Position } from "./Position";
import { Size } from "./Size";

export abstract class Character {
  angle = 1.5 * Math.PI;
  vector: Position = new Position(0.0, -1.0);

  constructor(
    protected ctx: CanvasRenderingContext2D,
    private image: HTMLImageElement,
    public position: Position,
    public size: Size,
    protected life: number,
    protected speed: number,
  ) {
    Object.assign(this, { ctx, image, position, size, life, speed });
  }

  setAngle(angle: number) {
    this.angle = angle;

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this.vector.set(cos, sin);
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  rotationDraw() {
    this.ctx.save();

    this.ctx.translate(this.position.x, this.position.y);

    this.ctx.rotate(this.angle - 1.5 * Math.PI);

    this.ctx.drawImage(
      this.image,
      -this.size.width / 2,
      -this.size.height / 2,
      this.size.width,
      this.size.height,
    );

    this.ctx.restore();
  }
}
