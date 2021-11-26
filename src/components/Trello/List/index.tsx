import { Card } from "../Card";

import styles from "./styles.module.scss";

export type List = {
  id: number;
  title: string;
  cards: Card[];
};

type Props = List;

export const List: React.VFC<Props> = (props) => {
  return (
    <div className={styles.base}>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.cardsWrapper}>
          {props.cards.map((c) => (
            <div key={c.id} className={styles.cardWrapper}>
              <Card {...c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
