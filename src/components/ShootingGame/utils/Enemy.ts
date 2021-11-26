import { Character } from './Character';
import { Config } from './Config';

import { Position } from '@/utils/Position';
import { Size } from '@/utils/Size';
import { assertNever } from '@/utils/assertNever';

export class Enemy extends Character {
  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Position,
  ) {
    super(ctx, image, position, new Size(48, 48), 1, 5);
  }

  update() {
    if (this.life <= 0) {
      return;
    }

    switch (Config.scene) {
      case 'appearance':
        break;
      case 'play':
        break;
      default:
        assertNever(Config.scene);
    }

    this.draw();
  }
}
