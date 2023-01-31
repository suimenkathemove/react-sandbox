import DVDLogoSrc from '../images/DVD_logo.svg';

import { Position } from '@/utils/Position';
import { Size } from '@/utils/Size';

export class DVD {
  private image = new Image();
  private readonly size = new Size(512, 261);
  private readonly speed = 3;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private position: Position,
    private vector: Position,
  ) {
    Object.assign(this, { ctx, position, vector });

    this.image.src = DVDLogoSrc;
  }

  private readonly isCollision = {
    top: () => this.position.y < 0,
    bottom: () => this.ctx.canvas.height < this.position.y + this.size.height,
    left: () => this.position.x < 0,
    right: () => this.ctx.canvas.width < this.position.x + this.size.width,
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

    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
  }
}
