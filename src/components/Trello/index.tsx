import { useState } from "react";
import { Input } from "./Input";
import { List } from "./List";
import styles from "./styles.module.scss";

type Props = {
  lists: List[];
};

export const Trello: React.VFC<Props> = (props) => {
  const [addListInputValue, setAddListInputValue] = useState("");
  type InputProps = React.ComponentProps<typeof Input>;
  const onChangeAddListInput: InputProps["onChange"] = (event) => {
    setAddListInputValue(event.target.value);
  };

  return (
    <div className={styles.base}>
      {props.lists.map((l) => (
        <div key={l.id} className={styles.listWrapper}>
          <List {...l} />
        </div>
      ))}
      <div className={styles.inputWrapper}>
        <Input value={addListInputValue} onChange={onChangeAddListInput} />
      </div>
    </div>
  );
};
