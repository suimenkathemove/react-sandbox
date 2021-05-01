import clsx from "clsx";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

type Props = {
  trigger: React.ReactNode;
  placement: "left" | "right";
  isShown: boolean;
  hide: VoidFunction;
  children: React.ReactNode;
};

export const Popover: React.VFC<Props> = (props) => {
  const childrenWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutsideContainer = (event: MouseEvent) => {
      if (
        props.isShown &&
        !childrenWrapperRef.current?.contains(event.target as Node)
      ) {
        props.hide();
      }
    };

    window.addEventListener("click", onClickOutsideContainer);

    return () => {
      window.removeEventListener("click", onClickOutsideContainer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isShown]);

  return (
    <div className={styles.container}>
      {props.trigger}

      {props.isShown && (
        <div
          className={clsx(styles.childrenWrapper, styles[props.placement])}
          ref={childrenWrapperRef}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
