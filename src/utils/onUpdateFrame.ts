export const onUpdateFrame = (cb: VoidFunction) => {
  const fn = () => {
    cb();

    requestAnimationFrame(fn);
  };
  fn();
};
