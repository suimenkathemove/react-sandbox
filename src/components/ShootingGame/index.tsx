import { assert } from "@/utils/assert";
import { includes } from "@/utils/includes";
import { useUpdateEffect } from "@/utils/useUpdateEffect";
import { useEffect, useRef } from "react";
import viperImageSrc from "./images/viper.png";
import viperShotImageSrc from "./images/viper_shot.png";
import viperSingleShotImageSrc from "./images/viper_single_shot.png";
import { Character } from "./utils/character";
import { Position } from "./utils/position";
import { useIsImageLoaded } from "./utils/useIsImageLoaded";
import { Viper } from "./utils/viper";

export const ShootingGame: React.VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = () => canvasRef.current?.getContext("2d");

  const [viperImageRef, isViperImageLoaded] = useIsImageLoaded(viperImageSrc);
  const [viperShotImageRef, isViperShotImageLoaded] = useIsImageLoaded(
    viperShotImageSrc,
  );
  const [
    viperSingleShotImageRef,
    isViperSingleShotImageLoaded,
  ] = useIsImageLoaded(viperSingleShotImageSrc);

  const viperRef = useRef<Viper | null>(null);

  useEffect(() => {
    const ctx = getContext();
    assert<NonNullable<typeof ctx>>(ctx);

    viperRef.current = new Viper(
      ctx,
      viperImageRef.current,
      viperShotImageRef.current,
      viperSingleShotImageRef.current,
      new Position(
        Character.CANVAS_WIDTH / 2 - Viper.WIDTH / 2,
        Character.CANVAS_HEIGHT,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (
      !isViperImageLoaded ||
      !isViperShotImageLoaded ||
      !isViperSingleShotImageLoaded
    ) {
      return;
    }

    const ctx = getContext();
    assert<NonNullable<typeof ctx>>(ctx);

    const viper = viperRef.current;
    assert<NonNullable<typeof viper>>(viper);

    const render = () => {
      ctx.fillStyle = "#000000";
      // 直前の描画結果をクリアする
      ctx.fillRect(0, 0, Character.CANVAS_WIDTH, Character.CANVAS_HEIGHT);

      if (viper.position.y <= Character.CANVAS_HEIGHT - 100) {
        Character.scene = "play";
      }

      viper.update();

      requestAnimationFrame(render);
    };
    render();
  }, [
    isViperImageLoaded,
    isViperShotImageLoaded,
    isViperSingleShotImageLoaded,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={Character.CANVAS_WIDTH}
      height={Character.CANVAS_HEIGHT}
    />
  );
};
