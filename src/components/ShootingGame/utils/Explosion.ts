import { rangeRandom } from "@/components/ShootingGame/utils/rangeRandom";
import { range } from "@/utils/range";
import { Position } from "./Position";

class Fire {
  constructor(
    public position: Position,
    public vector: Position,
    public size: number,
  ) {
    Object.assign(this, { position, vector, size });
  }
}

export class Explosion {
  private fires: Fire[] = [];
  private readonly fireCount = 30;
  private readonly fireMaxSize = 30;

  private isAlive = false;

  private startDate: Date | null = null;
  private readonly endSecond = 1;

  private readonly radius = 50;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private position: Position,
  ) {
    Object.assign(this, { ctx, position });

    range(this.fireCount).forEach(() => {
      const twoPIRadian = 2.0 * Math.PI;
      const sin = Math.sin(twoPIRadian * Math.random());
      const cos = Math.cos(twoPIRadian * Math.random());
      const vector = new Position(cos, sin);

      // 小さくなり過ぎないように調整する
      const randomSize = this.fireMaxSize * rangeRandom(0.5, 1.0);

      const fire = new Fire(this.position, vector, randomSize);
      this.fires.push(fire);
    });

    this.isAlive = true;

    this.startDate = new Date();
  }

  private progress() {
    const elapsedSecond = (Date.now() - this.startDate!.getTime()) / 1000;

    return Math.min(elapsedSecond / this.endSecond, 1.0);
  }

  private easeProgress() {
    return 1.0 - (1.0 - this.progress()) ** 2;
  }

  update() {
    if (!this.isAlive) {
      return;
    }

    this.ctx.fillStyle = "#ff0000";

    this.fires.forEach((f) => {
      const d = this.radius * this.easeProgress();
      const x = f.position.x + f.vector.x * d;
      const y = f.position.y + f.vector.y * d;

      const size = f.size * (1.0 - this.easeProgress());

      this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
    });

    if (this.easeProgress() >= 1.0) {
      this.isAlive = false;
    }
  }
}
