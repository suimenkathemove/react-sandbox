import styles from "./styles.module.scss";

export type Event = {
  id: number;
  startDate: Date;
  endDate: Date;
};

type Props = {
  event: Event;
  height: number;
};

export const Event: React.VFC<Props> = (props) => {
  const hoursDiff =
    props.event.endDate.getHours() - props.event.startDate.getHours();
  const minutesDiff =
    props.event.endDate.getMinutes() - props.event.startDate.getMinutes();
  const height = props.height * hoursDiff + props.height * (minutesDiff / 60);

  const top =
    props.height * props.event.startDate.getHours() +
    props.height * (props.event.startDate.getMinutes() / 60);

  return (
    <div
      className={styles.base}
      style={{
        height,
        top,
      }}
    ></div>
  );
};
