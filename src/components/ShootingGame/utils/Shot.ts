import { Character } from './Character';
import { Config } from './Config';
import { Explosion } from './Explosion';

import { Position } from '@/utils/Position';
import { Size } from '@/utils/Size';

export class Shot extends Character {
  private power = 1;

  public targets: Character[] = [];

  private explosions: Explosion[] = [];

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

  private damage(target: Character) {
    target.life -= this.power;

    this.life = 0;
  }

  update() {
    this.explosions.forEach((e) => {
      e.update();
    });

    // 画面外に出た場合は死亡扱いとすることで、無駄な処理を行わないようにする
    if (this.checkOutFlame()) {
      this.life = 0;
    }

    if (this.life <= 0) {
      return;
    }

    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;

    this.targets.forEach((t) => {
      if ([this.life, t.life].some((l) => l <= 0)) {
        return;
      }

      if (this.isCollision(t)) {
        this.damage(t);

        if (t.life <= 0) {
          const explosion = new Explosion(this.ctx, t.centerPosition());
          this.explosions.push(explosion);
        }
      }
    });

    this.rotationDraw();
  }
}
