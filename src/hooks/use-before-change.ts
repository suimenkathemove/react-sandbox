import { useEffect, useRef } from 'react';

export const useBeforeChange = <T>(value: T) => {
  const beforeChangeRef = useRef<T>();
  const prevRef = useRef<T>();

  useEffect(() => {
    if (value !== prevRef.current) {
      beforeChangeRef.current = prevRef.current;
    }
    prevRef.current = value;
  });

  return value !== prevRef.current ? prevRef.current : beforeChangeRef.current;
};
