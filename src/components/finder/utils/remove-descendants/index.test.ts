import { flattenedTree } from '../../__mocks__/flattened-tree';
import { FlattenedTreeItem } from '../../types';

import { removeDescendants } from './';

test('removeDescendants', () => {
  const expected: FlattenedTreeItem[] = [
    { id: '1', parentId: 'root', depth: 0, isLeaf: false, collapsed: true },
    { id: '2', parentId: 'root', depth: 0, isLeaf: false, collapsed: true },
    { id: '7', parentId: '2', depth: 1, isLeaf: false, collapsed: true },
    { id: '8', parentId: '2', depth: 1, isLeaf: true },
    { id: '9', parentId: '2', depth: 1, isLeaf: true },
    { id: '3', parentId: 'root', depth: 0, isLeaf: false, collapsed: true },
  ];

  expect(removeDescendants(flattenedTree, ['1'])).toEqual(expected);
});
