const mouseYFromScreenTop = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => event.pageY - window.pageYOffset;

export const mouseCoordinate = {
  yFromElementTop: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    mouseYFromScreenTop(event) -
    event.currentTarget.getBoundingClientRect().top,
  yFromElementBottom: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    mouseYFromScreenTop(event) -
    event.currentTarget.getBoundingClientRect().bottom,
};
