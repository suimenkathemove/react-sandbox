import styled from 'styled-components';

export const Table = styled.table`
  display: table;
  border-collapse: separate;
  background-color: white;
`;

export const Thead = styled.thead`
  display: table-header-group;
`;

export const Tr = styled.tr`
  display: table-row;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  display: table-cell;
  background-color: white;
  border-bottom: 1px solid black;
`;

export const Tbody = styled.tbody`
  display: table-row-group;
`;

export const Td = styled.td`
  display: table-cell;
`;
