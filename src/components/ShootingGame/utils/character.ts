import { Position } from "./position";

export abstract class Character {
  static readonly CANVAS_WIDTH = 640;
  static readonly CANVAS_HEIGHT = 480;

  static pressedKeyCandidates = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ] as const;

  static pressedKey: Record<
    typeof Character.pressedKeyCandidates[number],
    boolean
  > = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  static scene: "appearance" | "play" = "appearance";

  constructor(
    private ctx: CanvasRenderingContext2D,
    private image: HTMLImageElement,
    public position: Position,
    public life: number,
    public speed: number,
  ) {
    Object.assign(this, { ctx, image, position, life, speed });
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
