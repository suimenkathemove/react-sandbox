import { Table as StyledTable, Tbody, Td, Th, Thead, Tr } from './styles';

export type TableProps = {
  data: { id: string; name: string }[];
};

export const Table: React.VFC<TableProps> = (props) => {
  return (
    <StyledTable>
      <Thead>
        <Tr>
          <Th>name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map(({ id, name }) => (
          <Tr key={id}>
            <Td>{name}</Td>
          </Tr>
        ))}
      </Tbody>
    </StyledTable>
  );
};
