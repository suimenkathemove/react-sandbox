import { useEffect, useRef, useState } from 'react';

export const useIsImageLoaded = (src: string) => {
  const imageRef = useRef(new Image());

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    imageRef.current.src = src;

    const onLoad = () => {
      setIsImageLoaded(true);
    };

    imageRef.current.addEventListener('load', onLoad);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      imageRef.current.removeEventListener('load', onLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [imageRef, isImageLoaded] as const;
};
