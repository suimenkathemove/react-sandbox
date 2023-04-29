import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return seconds;
};
