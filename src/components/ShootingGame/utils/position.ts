export class Position {
  constructor(public x: number, public y: number) {
    Object.assign(this, { x, y });
  }

  set(x: number, y: number) {
    Object.assign(this, { x, y });
  }
}
