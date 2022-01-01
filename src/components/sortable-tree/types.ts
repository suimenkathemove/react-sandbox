export type Node = {
  id: string;
  children: Node[];
};

export type Tree = Node & { id: 'root' };

export type FlattenedTreeItem = Pick<Node, 'id'> & {
  parentId: Node['id'];
  depth: number;
};
