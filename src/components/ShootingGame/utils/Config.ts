export class Config {
  static readonly CANVAS_WIDTH = 640;
  static readonly CANVAS_HEIGHT = 480;

  static scene: "appearance" | "play" = "appearance";

  static pressedKeyCandidates = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "z",
  ] as const;

  static pressedKey: Record<
    typeof Config.pressedKeyCandidates[number],
    boolean
  > = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    z: false,
  };
}
