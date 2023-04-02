import { useEffect, useRef } from 'react';

import enemySmallImageSrc from './images/enemy_small.png';
import viperImageSrc from './images/viper.png';
import viperShotImageSrc from './images/viper_shot.png';
import viperSingleShotImageSrc from './images/viper_single_shot.png';
import { Config } from './utils/Config';
import { Enemy } from './utils/Enemy';
import { Viper } from './utils/Viper';
import { useIsImageLoaded } from './utils/useIsImageLoaded';

import { Position } from '@/utils/Position';
import { assert } from '@/utils/assert';
import { includes } from '@/utils/includes';
import { useUpdateEffect } from '@/utils/useUpdateEffect';

export const ShootingGame: React.VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = () => canvasRef.current?.getContext('2d');

  const [viperImageRef, isViperImageLoaded] = useIsImageLoaded(viperImageSrc);
  const [viperShotImageRef, isViperShotImageLoaded] = useIsImageLoaded(
    viperShotImageSrc,
  );
  const [
    viperSingleShotImageRef,
    isViperSingleShotImageLoaded,
  ] = useIsImageLoaded(viperSingleShotImageSrc);
  const [enemySmallImageRef, isEnemySmallImageLoaded] = useIsImageLoaded(
    enemySmallImageSrc,
  );

  const viperRef = useRef<Viper | null>(null);
  const enemySmallRef = useRef<Enemy | null>(null);

  useEffect(() => {
    const ctx = getContext();
    assert<NonNullable<typeof ctx>>(ctx);

    viperRef.current = new Viper(
      ctx,
      viperImageRef.current,
      viperShotImageRef.current,
      viperSingleShotImageRef.current,
      new Position(0, 0),
    );
    viperRef.current.position.set(
      Config.CANVAS_WIDTH / 2 - viperRef.current.size.width / 2,
      Config.CANVAS_HEIGHT,
    );

    enemySmallRef.current = new Enemy(
      ctx,
      enemySmallImageRef.current,
      new Position(0, 0),
    );
    enemySmallRef.current.position.set(
      Config.CANVAS_WIDTH / 2 - enemySmallRef.current.size.width / 2,
      100 - enemySmallRef.current.size.height,
    );

    viperRef.current.enemies.push(enemySmallRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDownOrUp = (event: KeyboardEvent, isDown: boolean) => {
      const { code } = event;
      if (includes(Config.pressedKeyCandidates, code)) {
        Config.pressedKey[code] = isDown;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      onKeyDownOrUp(event, true);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      onKeyDownOrUp(event, false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useUpdateEffect(() => {
    if (
      !isViperImageLoaded ||
      !isViperShotImageLoaded ||
      !isViperSingleShotImageLoaded ||
      !isEnemySmallImageLoaded
    ) {
      return;
    }

    const ctx = getContext();
    assert<NonNullable<typeof ctx>>(ctx);

    const viper = viperRef.current;
    assert<NonNullable<typeof viper>>(viper);

    const enemySmall = enemySmallRef.current;
    assert<NonNullable<typeof enemySmall>>(enemySmall);

    const render = () => {
      ctx.fillStyle = '#000000';
      // 直前の描画結果をクリアする
      ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

      if (viper.position.y <= Config.CANVAS_HEIGHT - 100) {
        Config.scene = 'play';
      }

      viper.update();

      enemySmall.update();

      requestAnimationFrame(render);
    };
    render();
  }, [
    isViperImageLoaded,
    isViperShotImageLoaded,
    isViperSingleShotImageLoaded,
    isEnemySmallImageLoaded,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={Config.CANVAS_WIDTH}
      height={Config.CANVAS_HEIGHT}
    />
  );
};
