import { useUpdateEffect } from "@/utils/useUpdateEffect";
import { useEffect, useRef, useState } from "react";
import viperImageSrc from "./images/viper.png";

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;

const VIPER_WIDTH = 64;
const VIPER_HEIGHT = 64;

const VIPER_ONE_STEP = 10;

export const ShootingGame: React.VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = () => canvasRef.current?.getContext("2d");

  const viperImageRef = useRef(new Image());
  const [viperImage, setImage] = useState<
    { isLoaded: false } | { isLoaded: true; data: HTMLImageElement }
  >({ isLoaded: false });

  const viperPosition = useRef<{ x: number; y: number }>({
    x: (CANVAS_WIDTH - VIPER_WIDTH) / 2,
    y: (CANVAS_HEIGHT - VIPER_HEIGHT) / 2,
  });

  useEffect(() => {
    viperImageRef.current.src = viperImageSrc;

    viperImageRef.current.addEventListener("load", () => {
      setImage({ isLoaded: true, data: viperImageRef.current });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          viperPosition.current.y -= VIPER_ONE_STEP;
          break;
        case "ArrowDown":
          viperPosition.current.y += VIPER_ONE_STEP;
          break;
        case "ArrowLeft":
          viperPosition.current.x -= VIPER_ONE_STEP;
          break;
        case "ArrowRight":
          viperPosition.current.x += VIPER_ONE_STEP;
          break;
      }
    });
  }, []);

  useUpdateEffect(() => {
    if (!viperImage.isLoaded) {
      return;
    }

    const render = () => {
      context()!.fillStyle = "#000000";
      // NOTE: 直前の描画結果をクリアする
      context()!.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      context()!.drawImage(
        viperImage.data,
        viperPosition.current.x,
        viperPosition.current.y,
      );

      requestAnimationFrame(render);
    };
    render();
  }, [viperImage]);

  return <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />;
};
