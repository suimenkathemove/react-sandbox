export type NodeId = string;

export type Node = {
  id: NodeId;
  children: Node[];
};

export type Tree = Node & { id: 'root' };

export type FlattenedTreeItem = {
  id: NodeId;
  parentId: NodeId;
  depth: number;
};
