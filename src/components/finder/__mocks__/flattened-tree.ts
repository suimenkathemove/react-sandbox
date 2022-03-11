import { FlattenedTreeItem } from '../types';

export const flattenedTree: FlattenedTreeItem[] = [
  { id: '1', parentId: 'root', depth: 0, isDirectory: true, collapsed: true },
  { id: '4', parentId: '1', depth: 1, isDirectory: true, collapsed: true },
  { id: '10', parentId: '4', depth: 2, isDirectory: true, collapsed: true },
  { id: '13', parentId: '10', depth: 3, isDirectory: false },
  { id: '11', parentId: '4', depth: 2, isDirectory: false },
  { id: '12', parentId: '4', depth: 2, isDirectory: false },
  { id: '5', parentId: '1', depth: 1, isDirectory: true, collapsed: true },
  { id: '6', parentId: '1', depth: 1, isDirectory: false },
  { id: '2', parentId: 'root', depth: 0, isDirectory: true, collapsed: true },
  { id: '7', parentId: '2', depth: 1, isDirectory: true, collapsed: true },
  { id: '8', parentId: '2', depth: 1, isDirectory: false },
  { id: '9', parentId: '2', depth: 1, isDirectory: false },
  { id: '3', parentId: 'root', depth: 0, isDirectory: true, collapsed: true },
];
