export class Position {
  constructor(public x: number, public y: number) {
    Object.assign(this, { x, y });
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
