import { Tree } from '../types';

export const tree: Tree = {
  id: 'root',
  isLeaf: false,
  children: [
    {
      id: '1',
      isLeaf: false,
      children: [
        {
          id: '4',
          isLeaf: false,
          children: [
            {
              id: '10',
              isLeaf: false,
              children: [
                {
                  id: '13',
                  isLeaf: true,
                },
              ],
              collapsed: true,
            },
            {
              id: '11',
              isLeaf: true,
            },
            {
              id: '12',
              isLeaf: true,
            },
          ],
          collapsed: true,
        },
        {
          id: '5',
          isLeaf: false,
          children: [],
          collapsed: true,
        },
        {
          id: '6',
          isLeaf: true,
        },
      ],
      collapsed: true,
    },
    {
      id: '2',
      isLeaf: false,
      children: [
        {
          id: '7',
          isLeaf: false,
          children: [],
          collapsed: true,
        },
        {
          id: '8',
          isLeaf: true,
        },
        {
          id: '9',
          isLeaf: true,
        },
      ],
      collapsed: true,
    },
    {
      id: '3',
      isLeaf: false,
      children: [],
      collapsed: true,
    },
  ],
  collapsed: true,
};
