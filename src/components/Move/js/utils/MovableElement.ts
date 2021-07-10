type ElementPosition = {
  top: number;
  left: number;
};

type PointerPosition = {
  x: number | null;
  y: number | null;
};

export class MovableElement {
  private element: HTMLElement;

  private elementInitialPosition: ElementPosition;

  private elementStartPosition: ElementPosition | null = null;

  private pointerStartPosition: PointerPosition = {
    x: null,
    y: null,
  };

  constructor(id: string) {
    this.element = document.getElementById(id)!;

    this.elementInitialPosition = this.elementCurrentPosition;

    this.element.addEventListener("mousedown", (event) => {
      this.elementStartPosition = this.elementCurrentPosition;

      this.pointerStartPosition.x = event.clientX;
      this.pointerStartPosition.y = event.clientY;
    });
    this.element.addEventListener("touchstart", (event) => {
      this.elementStartPosition = this.elementCurrentPosition;

      this.pointerStartPosition.x = event.touches[0].clientX;
      this.pointerStartPosition.y = event.touches[0].clientY;
    });

    window.addEventListener("mousemove", (event) => {
      if (
        this.pointerStartPosition.x == null ||
        this.pointerStartPosition.y == null
      )
        return;

      const pointerMovedDistanceX = event.clientX - this.pointerStartPosition.x;
      const pointerMovedDistanceY = event.clientY - this.pointerStartPosition.y;

      this.moveByDistance(pointerMovedDistanceX, pointerMovedDistanceY);
    });
    window.addEventListener(
      "touchmove",
      (event) => {
        if (
          this.pointerStartPosition.x == null ||
          this.pointerStartPosition.y == null
        )
          return;

        event.preventDefault();

        const pointerMovedDistanceX =
          event.touches[0].clientX - this.pointerStartPosition.x;
        const pointerMovedDistanceY =
          event.touches[0].clientY - this.pointerStartPosition.y;

        this.moveByDistance(pointerMovedDistanceX, pointerMovedDistanceY);
      },
      { passive: false },
    );

    window.addEventListener("mouseup", () => {
      this.resetPointerStartPosition();
    });
    window.addEventListener("touchend", () => {
      this.resetPointerStartPosition();
    });
  }

  private get elementCurrentPosition(): ElementPosition {
    const { top, left } = this.element.getBoundingClientRect();

    return { top, left };
  }

  private moveByDistance(distanceX: number, distanceY: number) {
    const startX =
      this.elementStartPosition!.left - this.elementInitialPosition.left;
    const startY =
      this.elementStartPosition!.top - this.elementInitialPosition.top;

    const goalX = startX + distanceX;
    const goalY = startY + distanceY;

    this.element.style.transform = `translate(${goalX}px, ${goalY}px)`;
  }

  private resetPointerStartPosition() {
    this.pointerStartPosition.x = null;
    this.pointerStartPosition.y = null;
  }
}
