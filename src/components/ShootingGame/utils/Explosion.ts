import { range } from "@/utils/range";
import { Position } from "./Position";
import { Size } from "./Size";

class Fire {
  size = new Size(30, 30);

  constructor(public position: Position, public vector: Position) {
    Object.assign(this, { position, vector });
  }
}

export class Explosion {
  private readonly fireCount = 30;
  private fires: Fire[] = [];

  private isAlive = false;

  private startDate: Date | null = null;
  private readonly endSecond = 1;

  private readonly radius = 30;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private position: Position,
  ) {
    Object.assign(this, { ctx, position });

    range(this.fireCount).forEach(() => {
      const randomRadian = 2.0 * Math.PI * Math.random();
      const sin = Math.sin(randomRadian);
      const cos = Math.cos(randomRadian);
      const fire = new Fire(this.position, new Position(cos, sin));
      this.fires.push(fire);
    });

    this.isAlive = true;

    this.startDate = new Date();
  }

  private progress() {
    const elapsedSecond = (Date.now() - this.startDate!.getTime()) / 1000;

    return Math.min(elapsedSecond / this.endSecond, 1.0);
  }

  update() {
    if (!this.isAlive) {
      return;
    }

    this.ctx.fillStyle = "#ff0000";

    this.fires.forEach((f) => {
      const d = this.radius * this.progress();
      const x = f.position.x + f.vector.x * d;
      const y = f.position.y + f.vector.y * d;
      this.ctx.fillRect(
        x - f.size.width / 2,
        y - f.size.height / 2,
        f.size.width,
        f.size.height,
      );
    });

    if (this.progress() >= 1.0) {
      this.isAlive = false;
    }
  }
}
