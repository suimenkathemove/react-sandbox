export class Size {
  constructor(public width: number, public height: number) {
    Object.assign(this, { width, height });
  }

  set(width: number, height: number) {
    Object.assign(this, { width, height });
  }
}
