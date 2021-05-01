import { useState } from "react";

export const useShow = () => {
  const [isShown, setIsShown] = useState(false);
  const show = () => {
    setIsShown(true);
  };
  const hide = () => {
    setIsShown(false);
  };

  return {
    isShown,
    show,
    hide,
  };
};
