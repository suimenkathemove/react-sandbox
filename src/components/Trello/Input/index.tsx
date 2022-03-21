import styles from './styles.module.scss';

type Props = JSX.IntrinsicElements['input'];

export const Input: React.VFC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.base} {...props} />
    </div>
  );
};
