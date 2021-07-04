import { useEffect, useState } from "react";

export const useSpread = (wrapperRef: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const onResize = () => {
      setSize({
        width: wrapperRef.current!.clientWidth,
        height: wrapperRef.current!.clientHeight,
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
};
