import { Position } from "@/utils/Position";
import { Size } from "@/utils/Size";

export abstract class Character {
  angle = 1.5 * Math.PI;
  vector: Position = new Position(0.0, -1.0);

  constructor(
    protected ctx: CanvasRenderingContext2D,
    private image: HTMLImageElement,
    public position: Position,
    public size: Size,
    public life: number,
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

  centerPosition() {
    const centerX = this.position.x + this.size.width / 2;
    const centerY = this.position.y + this.size.height / 2;

    return new Position(centerX, centerY);
  }

  distance(target: Character) {
    const x = this.centerPosition().x - target.centerPosition().x;
    const y = this.centerPosition().y - target.centerPosition().y;

    return Math.sqrt(x ** 2 + y ** 2);
  }

  isCollision(target: Character) {
    const distance = this.distance(target);

    return distance <= this.size.width / 2 + target.size.width / 2;
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
