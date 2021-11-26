import { useState } from "react";

import { Input } from "./Input";
import { List } from "./List";
import styles from "./styles.module.scss";

import { useStateWithReset } from "@/utils/useStateWithReset";

type InputProps = React.ComponentProps<typeof Input>;

type Props = {
  initialLists: List[];
};

export const Trello: React.VFC<Props> = (props) => {
  const [lists, setLists] = useState(props.initialLists);

  const [listCreatedCount, setListCreatedCount] = useState(
    props.initialLists[props.initialLists.length - 1].id,
  );

  const [inputValue, setInputValue, resetInputValue] = useStateWithReset("");
  const onChangeInput: InputProps["onChange"] = (event) => {
    setInputValue(event.target.value);
  };
  const onKeyPressInput: InputProps["onKeyPress"] = (event) => {
    if (event.code !== "Enter") {
      return;
    }

    const newList: List = {
      id: listCreatedCount + 1,
      title: inputValue,
      cards: [],
    };
    setLists((l) => l.concat(newList));

    setListCreatedCount((c) => c + 1);

    resetInputValue();
  };

  return (
    <div className={styles.base}>
      {lists.map((l) => (
        <div key={l.id} className={styles.listWrapper}>
          <List {...l} />
        </div>
      ))}
      <div className={styles.inputWrapper}>
        <Input
          value={inputValue}
          onChange={onChangeInput}
          onKeyPress={onKeyPressInput}
        />
      </div>
    </div>
  );
};
