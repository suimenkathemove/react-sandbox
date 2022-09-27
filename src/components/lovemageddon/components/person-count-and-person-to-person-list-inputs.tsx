export type PersonCountAndPersonToPersonListInputsProps = {
  meLabel: string;
  youLabel: string;
  meCount: number;
  onChangeMeCount: React.ChangeEventHandler<HTMLInputElement>;
  youCount: number;
  personToPersonList: Maybe<number>[];
  onChangePersonToPersonList: (targetMe: number, newYou: number) => void;
};

export const PersonCountAndPersonToPersonListInputs: React.VFC<PersonCountAndPersonToPersonListInputsProps> = (
  props,
) => {
  const onChangeYou = (e: React.ChangeEvent<HTMLInputElement>, me: number) => {
    const value = Number(e.target.value);

    if (isNaN(value) || value > props.youCount - 1) {
      return;
    }

    props.onChangePersonToPersonList(me, value);
  };

  return (
    <div>
      <label>
        {`${props.meLabel} count: `}
        <input
          value={props.meCount}
          onChange={props.onChangeMeCount}
          style={{ border: '1px solid black' }}
        />
      </label>
      <div>
        {props.personToPersonList.map((you, me) => (
          <label key={me} style={{ display: 'block' }}>
            {`${props.meLabel}${me}->${props.youLabel}`}
            <input
              value={you ?? ''}
              onChange={(e) => {
                onChangeYou(e, me);
              }}
              style={{ border: '1px solid black' }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
