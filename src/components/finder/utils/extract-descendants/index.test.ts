import { flattenedTree } from '../../__mocks__/flattened-tree';
import { FlattenedTreeItem } from '../../types';

import { extractDescendants } from './';

test('extractDescendants', () => {
  const expected: FlattenedTreeItem[] = [
    { id: '4', parentId: '1', depth: 1, isLeaf: false, collapsed: true },
    { id: '10', parentId: '4', depth: 2, isLeaf: false, collapsed: true },
    { id: '13', parentId: '10', depth: 3, isLeaf: true, collapsed: true },
    { id: '11', parentId: '4', depth: 2, isLeaf: true, collapsed: true },
    { id: '12', parentId: '4', depth: 2, isLeaf: true, collapsed: true },
    { id: '5', parentId: '1', depth: 1, isLeaf: false, collapsed: true },
    { id: '6', parentId: '1', depth: 1, isLeaf: true, collapsed: true },
  ];

  expect(extractDescendants(flattenedTree, '1')).toEqual(expected);
});
