export const getMouseYFromElementTop = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
) =>
  event.pageY -
  (event.currentTarget.getBoundingClientRect().top + window.pageYOffset);
