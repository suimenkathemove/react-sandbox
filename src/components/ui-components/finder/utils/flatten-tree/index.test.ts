import { flattenedTree } from '../../__mocks__/flattened-tree';
import { tree } from '../../__mocks__/tree';

import { flattenTree } from './';

test('flattenTree', () => {
  expect(flattenTree(tree)).toEqual(flattenedTree);
});
