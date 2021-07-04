import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export const BouncingDVD: React.VFC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  useEffect(() => {
    setCanvasSize({
      width: rootRef.current!.clientWidth,
      height: rootRef.current!.clientHeight,
    });
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <canvas width={canvasSize.width} height={canvasSize.height} />
    </div>
  );
};
