import styles from "./styles.module.scss";

type Props = {
  ratio: number;
  children: React.ReactNode;
};

export const AspectRatio: React.VFC<Props> = (props) => {
  return (
    <div
      className={styles.outer}
      style={{ paddingBottom: `${props.ratio * 100}%` }}
    >
      <div className={styles.inner}>{props.children}</div>
    </div>
  );
};
