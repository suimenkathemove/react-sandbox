import { List } from "./List";
import styles from "./styles.module.scss";

type Props = {
  lists: List[];
};

export const Trello: React.VFC<Props> = (props) => {
  return (
    <div className={styles.base}>
      {props.lists.map((l) => (
        <div key={l.id} className={styles.listWrapper}>
          <List {...l} />
        </div>
      ))}
    </div>
  );
};
