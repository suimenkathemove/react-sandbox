import { Li, Ol } from './styles';

export type BreadcrumbListProps = {
  ancestors: { name: string }[];
  currentName: string;
};

export const BreadcrumbList: React.VFC<BreadcrumbListProps> = (props) => {
  return (
    <nav>
      <Ol>
        {props.ancestors.map(({ name }) => (
          <Li key={name}>
            <span>{name}</span>
            &gt;
          </Li>
        ))}
        <Li key={props.currentName}>
          <span>{props.currentName}</span>
        </Li>
      </Ol>
    </nav>
  );
};
