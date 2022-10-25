/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';

export function isNotEmptyArray(arr) {
  return Array.isArray(arr) && arr.length;
}

export function formatTree(tree) {
  const formatedTree = cloneDeep(tree);

  function traversal(node) {
    if (!node.id) {
      throw new Error('some node is missing id');
    }
    node.isExpanded = true;

    if (isNotEmptyArray(node?.children)) {
      node.children.forEach(childNode => traversal(childNode));
    } else {
      delete node.children;
    }
  }

  traversal(formatedTree);
  return formatedTree;
}
