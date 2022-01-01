import { flattenedTree } from '../../__mocks__/flattened-tree';
import { indentationWidth } from '../../constants';

import { getProjection } from './';

describe('getProjection', () => {
  describe('10 => 11', () => {
    const ids: Parameters<typeof getProjection>[1] = {
      activeId: '10',
      overId: '11',
    };

    test('-1', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * -1)).toEqual({
        depth: 2,
        parentId: '4',
      });
    });

    test('0', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * 0)).toEqual({
        depth: 2,
        parentId: '4',
      });
    });

    test('1', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * 1)).toEqual({
        depth: 3,
        parentId: '11',
      });
    });
  });

  describe('11 => 12', () => {
    const ids: Parameters<typeof getProjection>[1] = {
      activeId: '11',
      overId: '12',
    };

    test('-1', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * -1)).toEqual({
        depth: 1,
        parentId: '1',
      });
    });

    test('0', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * 0)).toEqual({
        depth: 2,
        parentId: '4',
      });
    });

    test('1', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * 1)).toEqual({
        depth: 3,
        parentId: '12',
      });
    });
  });

  describe('12 => 10', () => {
    const ids: Parameters<typeof getProjection>[1] = {
      activeId: '12',
      overId: '10',
    };

    test('-1', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * -1)).toEqual({
        depth: 2,
        parentId: '4',
      });
    });

    test('0', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * 0)).toEqual({
        depth: 2,
        parentId: '4',
      });
    });

    test('1', () => {
      expect(getProjection(flattenedTree, ids, indentationWidth * 1)).toEqual({
        depth: 2,
        parentId: '4',
      });
    });
  });
});
