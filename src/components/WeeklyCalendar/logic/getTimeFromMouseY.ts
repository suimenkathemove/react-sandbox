export const getTimeFromMouseY = (mouseY: number, height: number) => {
  const hours = Math.floor(mouseY / height);
  const minutes =
    Math.floor((mouseY - height * hours) / (height / (60 / 15))) * 15;

  return {
    hours,
    minutes,
  };
};
