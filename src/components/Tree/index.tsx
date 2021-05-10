import { useEffect, useState } from "react";

type Datum = { id: number; parentId: number };
type Node = Datum & { children: Node[] };

type Props = {
  data: Datum[];
};

export const Tree: React.VFC<Props> = (props) => {
  const initialNode = (): Node => ({ id: 0, parentId: -1, children: [] });

  const [node, setNode] = useState(initialNode());

  useEffect(() => {
    const dataWithChildren: (Datum & Node)[] = props.data.map((d) => ({
      ...d,
      children: [],
    }));

    dataWithChildren.sort((a, b) =>
      a.parentId !== b.parentId ? a.parentId - b.parentId : a.id - b.id,
    );

    const rootNode: Node = initialNode();

    while (dataWithChildren.length > 0) {
      const last = dataWithChildren.pop()!;
      const parentNode =
        last.parentId === 0
          ? rootNode
          : dataWithChildren.find((d) => d.id === last.parentId)!;
      parentNode.children.unshift(last);
    }

    setNode(rootNode);
  }, [props.data]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderTree = (node: Node, level = 1) => (
    <div key={node.id} style={{ marginTop: level * 4, marginLeft: level * 4 }}>
      <div>{`${node.parentId}-${node.id}`}</div>

      {Array.isArray(node.children) &&
        node.children.map((node) => renderTree(node, level + 1))}
    </div>
  );

  return <div>{renderTree(node)}</div>;
};
