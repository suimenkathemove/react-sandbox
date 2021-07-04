import { Position } from "@/utils/Position";

export class DVD {
  private readonly size = 100;
  private readonly speed = 3;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private position: Position,
    private vector: Position,
  ) {
    Object.assign(this, { ctx, position, vector });
  }

  private readonly isCollision = {
    top: () => this.position.y < 0,
    bottom: () => this.ctx.canvas.height < this.position.y + this.size,
    left: () => this.position.x < 0,
    right: () => this.ctx.canvas.width < this.position.x + this.size,
  };

  update() {
    if (this.isCollision.left() || this.isCollision.right()) {
      this.vector.x *= -1;
    }
    if (this.isCollision.top() || this.isCollision.bottom()) {
      this.vector.y *= -1;
    }

    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    this.ctx.fillStyle = "#ff0000";
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}
