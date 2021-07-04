import { useRef } from "react";
import styles from "./styles.module.scss";
import { useSpread } from "./utils/useSpread";

export const BouncingDVD: React.VFC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasSize = useSpread(rootRef);

  return (
    <div ref={rootRef} className={styles.root}>
      <canvas width={canvasSize.width} height={canvasSize.height} />
    </div>
  );
};
