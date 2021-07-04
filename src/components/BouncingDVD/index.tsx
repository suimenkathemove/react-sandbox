import { onUpdateFrame } from "@/utils/onUpdateFrame";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useSpread } from "./utils/useSpread";

export const BouncingDVD: React.VFC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasSize = useSpread(rootRef);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const ctx = getContext()!;

    onUpdateFrame(() => {
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
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
