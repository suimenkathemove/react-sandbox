import styles from "./styles.module.scss";

type Props = {
  gap: {
    row: number;
    column: number;
  };
  children: { key: string | number; child: React.ReactNode }[];
};

export const MonospacedZ: React.VFC<Props> = (props) => {
  const halfRowGap = props.gap.row / 2;
  const halfColumnGap = props.gap.column / 2;

  return (
    <ul
      className={styles.base}
      style={{ margin: `${-halfRowGap}px ${-halfColumnGap}px` }}
    >
      {props.children.map(({ key, child }) => (
        <li key={key} style={{ padding: `${halfRowGap}px ${halfColumnGap}px` }}>
          {child}
        </li>
      ))}
    </ul>
  );
};
