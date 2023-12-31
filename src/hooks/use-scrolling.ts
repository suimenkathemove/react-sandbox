import { useEffect, useState } from 'react';

export const useScrolling = (): boolean => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let scrolling = false;

    const onScrollStart = () => {
      setScrolling(true);
    };
    const onScroll = () => {
      if (!scrolling) {
        onScrollStart();
      }

      scrolling = true;
    };

    const onScrollEnd = () => {
      setScrolling(false);

      scrolling = false;
    };

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('scrollend', onScrollEnd, true);

    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('scrollend', onScrollEnd, true);
    };
  }, []);

  return scrolling;
};
