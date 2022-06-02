export type Node = {
  id: string;
} & (
  | {
      isLeaf: true;
    }
  | {
      isLeaf: false;
      children: Node[];
      collapsed: boolean;
    }
);

export type Tree = Node & { id: 'root' };

export type FlattenedTreeItem = Pick<Node, 'id'> & {
  parentId: Node['id'];
  depth: number;
} & (
    | {
        isLeaf: true;
      }
    | {
        isLeaf: false;
        collapsed: boolean;
      }
  );
