const SIZE = 4;
const COLOR = 'red';

export const point = (x: number, y: number): void => {
  const element = document.createElement('div');

  element.style.width = `${SIZE}px`;
  element.style.height = `${SIZE}px`;
  element.style.backgroundColor = COLOR;

  element.style.position = 'absolute';
  element.style.top = `${y}px`;
  element.style.left = `${x}px`;

  document.body.appendChild(element);
};
