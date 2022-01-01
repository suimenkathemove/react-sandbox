import { FlattenedTreeItem } from '../types';

export const flattenedTree: FlattenedTreeItem[] = [
  { id: '1', parentId: 'root', depth: 0 },
  { id: '4', parentId: '1', depth: 1 },
  { id: '10', parentId: '4', depth: 2 },
  { id: '11', parentId: '4', depth: 2 },
  { id: '12', parentId: '4', depth: 2 },
  { id: '5', parentId: '1', depth: 1 },
  { id: '6', parentId: '1', depth: 1 },
  { id: '2', parentId: 'root', depth: 0 },
  { id: '7', parentId: '2', depth: 1 },
  { id: '8', parentId: '2', depth: 1 },
  { id: '9', parentId: '2', depth: 1 },
  { id: '3', parentId: 'root', depth: 0 },
];
