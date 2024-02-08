import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { Li, Ul } from './styles';
import { BorderOrBackground } from './types';

import { Tree } from '@/components/gui/sortable-tree/types';
import { flattenTree } from '@/components/gui/sortable-tree/utils/flatten-tree';

export interface SortableTreeLikeNotionProps {
  tree: Tree;
}

export const SortableTreeLikeNotion = memo(
  (props: SortableTreeLikeNotionProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tree, setTree] = useState(() => props.tree);

    const flattenedTree = useMemo(() => flattenTree(tree), [tree]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [fromIndex, setFromIndex] = useState<number | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [borderOrBackground, setBorderOrBackground] =
      useState<BorderOrBackground | null>(null);

    const containerElementRef = useRef<HTMLUListElement>(null);

    const onPointerDown = useCallback((index: number) => {
      setFromIndex(index);
    }, []);

    const onPointerMove: React.PointerEventHandler<HTMLUListElement> =
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useCallback((event) => {
        // TODO
      }, []);

    const onPointerUp = useCallback(() => {}, []);

    return (
      <Ul
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        bottomBorder={borderOrBackground?.type === 'bottomBorder'}
        ref={containerElementRef}
      >
        {flattenedTree.map((item, index) => (
          <Li
            key={item.id}
            onPointerDown={() => {
              onPointerDown(index);
            }}
            depth={item.depth}
            border={
              borderOrBackground?.type === 'border' &&
              index === borderOrBackground.index
            }
            background={
              borderOrBackground?.type === 'background' &&
              index === borderOrBackground.index
            }
          >
            {item.id}
          </Li>
        ))}
      </Ul>
    );
  },
);
