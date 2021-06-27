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
        (Character.CANVAS_WIDTH - Viper.WIDTH) / 2,
        Character.CANVAS_HEIGHT,
      ),
    );
  }, []);

  useUpdateEffect(() => {
    if (!isViperImageLoaded) {
      return;
    }

    const render = () => {
      context()!.fillStyle = "#000000";
      // NOTE: 直前の描画結果をクリアする
      context()!.fillRect(
        0,
        0,
        Character.CANVAS_WIDTH,
        Character.CANVAS_HEIGHT,
      );

      if (Character.scene === "appearance") {
        viperRef.current!.appearing();
      }

      viperRef.current!.draw();

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
