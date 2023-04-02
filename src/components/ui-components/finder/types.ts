export type Node = {
  id: string;
  children: Node[];
  isLeaf: boolean;
  collapsed: boolean;
};

export type Tree = Node & { id: 'root' };

export type FlattenedTreeItem = Pick<Node, 'id'> & {
  parentId: Node['id'];
  depth: number;
  isLeaf: boolean;
  collapsed: boolean;
};
