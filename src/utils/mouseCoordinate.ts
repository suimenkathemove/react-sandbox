export const mouseCoordinate = {
  yFromElementTop: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    event.pageY -
    (event.currentTarget.getBoundingClientRect().top + window.pageYOffset),
  yFromElementBottom: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    event.pageY -
    (event.currentTarget.getBoundingClientRect().bottom + window.pageYOffset),
};
