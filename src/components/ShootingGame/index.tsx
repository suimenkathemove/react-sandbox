import { includes } from "@/utils/includes";
import { useUpdateEffect } from "@/utils/useUpdateEffect";
import { useEffect, useRef, useState } from "react";
import viperImageSrc from "./images/viper.png";
import { Character } from "./utils/character";
import { Position } from "./utils/position";
import { Viper } from "./utils/viper";

export const ShootingGame: React.VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = () => canvasRef.current?.getContext("2d");

  const viperImageRef = useRef(new Image());
  const [isViperImageLoaded, setIsViperImageLoaded] = useState(false);

  const viperRef = useRef<Viper | null>(null);

  useEffect(() => {
    viperImageRef.current.src = viperImageSrc;

    viperImageRef.current.addEventListener("load", () => {
      setIsViperImageLoaded(true);
    });
  }, []);

  useEffect(() => {
    viperRef.current = new Viper(
      context()!,
      viperImageRef.current,
      new Position(
        Character.CANVAS_WIDTH / 2 - Viper.WIDTH / 2,
        Character.CANVAS_HEIGHT,
      ),
    );
  }, []);

  useEffect(() => {
    const onKeyDownOrUp = (event: KeyboardEvent, isDown: boolean) => {
      const { key } = event;
      if (includes(Character.pressedKeyCandidates, key)) {
        Character.pressedKey[key] = isDown;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      onKeyDownOrUp(event, true);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      onKeyDownOrUp(event, false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useUpdateEffect(() => {
    if (!isViperImageLoaded) {
      return;
    }

    const render = () => {
      context()!.fillStyle = "#000000";
      // 直前の描画結果をクリアする
      context()!.fillRect(
        0,
        0,
        Character.CANVAS_WIDTH,
        Character.CANVAS_HEIGHT,
      );

      if (viperRef.current!.position.y <= Character.CANVAS_HEIGHT - 100) {
        Character.scene = "play";
      }

      viperRef.current!.update();

      requestAnimationFrame(render);
    };
    render();
  }, [isViperImageLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={Character.CANVAS_WIDTH}
      height={Character.CANVAS_HEIGHT}
    />
  );
};
