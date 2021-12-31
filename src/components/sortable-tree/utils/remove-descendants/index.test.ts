import { flattenedTree } from '../../__mocks__/flattened-tree';
import { FlattenedTreeItem } from '../../types';

import { removeDescendants } from './';

test('removeDescendants', () => {
  const expected: FlattenedTreeItem[] = [
    { id: 'root', parentId: null, depth: 0 },
    { id: '1', parentId: 'root', depth: 1 },
    { id: '2', parentId: 'root', depth: 1 },
    { id: '7', parentId: '2', depth: 2 },
    { id: '8', parentId: '2', depth: 2 },
    { id: '9', parentId: '2', depth: 2 },
    { id: '3', parentId: 'root', depth: 1 },
  ];

  expect(removeDescendants(flattenedTree, '1')).toEqual(expected);
});
