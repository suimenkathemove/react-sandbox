import { useEffect, useRef } from "react";

import styles from "./styles.module.scss";
import { DVD } from "./utils/DVD";
import { useSpread } from "./utils/useSpread";

import { Position } from "@/utils/Position";
import { onUpdateFrame } from "@/utils/onUpdateFrame";

export const BouncingDVD: React.VFC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasSize = useSpread(rootRef);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const ctx = getContext()!;

    const position = new Position(0, 0);

    const radian = (2.0 * Math.PI * 7) / 8;
    const sin = Math.sin(radian);
    const cos = Math.cos(radian);
    const vector = new Position(cos, -sin);

    const dvd = new DVD(ctx, position, vector);

    onUpdateFrame(() => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      dvd.update();
    });
  }, [canvasSize.height, canvasSize.width]);

  return (
    <div ref={rootRef} className={styles.root}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </div>
  );
};
