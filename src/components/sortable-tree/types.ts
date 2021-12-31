export type Node = {
  id: string;
  children: Node[];
};

export type Tree = Node & { id: 'root' };

export type FlattenedTreeItem = Node & {
  parentId: Node['id'] | null;
  depth: number;
};
