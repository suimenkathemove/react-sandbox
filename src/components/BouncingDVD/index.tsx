import { Position } from "@/utils/Position";
import { onUpdateFrame } from "@/utils/onUpdateFrame";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { DVD } from "./utils/DVD";
import { useSpread } from "./utils/useSpread";

export const BouncingDVD: React.VFC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasSize = useSpread(rootRef);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const ctx = getContext()!;

    const position = new Position(0, 0);
    const vector = new Position(1.0, 1.0);
    const dvd = new DVD(ctx, position, vector);

    onUpdateFrame(() => {
      ctx.fillStyle = "#000000";
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
