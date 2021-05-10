import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

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

  const renderTree = (node: Node, level = 0) => (
    <div
      key={node.id}
      className={clsx(styles.node, level >= 2 && styles.child)}
    >
      {level >= 1 && <div>{`${node.parentId}-${node.id}`}</div>}

      {Array.isArray(node.children) &&
        node.children.map((node) => renderTree(node, level + 1))}
    </div>
  );

  return <div>{renderTree(node)}</div>;
};
