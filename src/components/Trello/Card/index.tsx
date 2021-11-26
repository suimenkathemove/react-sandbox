import styles from './styles.module.scss';

export type Card = {
  id: number;
  title: string;
};

type Props = Card;

export const Card: React.VFC<Props> = (props) => {
  return (
    <div className={styles.base}>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
};
