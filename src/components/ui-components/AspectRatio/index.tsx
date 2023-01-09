import styles from './styles.module.scss';

export type AspectRatioProps = {
  ratio: number;
  children: React.ReactNode;
};

export const AspectRatio: React.VFC<AspectRatioProps> = (props) => {
  return (
    <div
      className={styles.outer}
      style={{ paddingBottom: `${props.ratio * 100}%` }}
    >
      <div className={styles.inner}>{props.children}</div>
    </div>
  );
};
