import { useEffect, useRef } from 'react';

export const GameOfLife: React.VFC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { Universe } = await import('wasm');
      const universe = Universe.new();

      const renderLoop = () => {
        canvasRef.current!.textContent = universe.render();
        universe.tick();

        requestAnimationFrame(renderLoop);
      };
      requestAnimationFrame(renderLoop);
    })();
  }, []);

  return <div ref={canvasRef} />;
};
