/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash/cloneDeep';

export const ADDITIONAL_FIELDS = {
  IS_EXPANDED: 'isExpanded',
};

export function isNotEmptyArray(arr) {
  return Array.isArray(arr) && arr.length;
}

export function formatTree(tree) {
  const formatedTree = cloneDeep(tree);

  function traversal(node) {
    if (!node.id) {
      throw new Error('some node is missing id');
    }

    if (typeof node[ADDITIONAL_FIELDS.IS_EXPANDED] !== 'boolean') {
      node[ADDITIONAL_FIELDS.IS_EXPANDED] = false;
    }

    if (isNotEmptyArray(node?.children)) {
      node.children.forEach(childNode => traversal(childNode));
    } else {
      delete node.children;
    }
  }

  traversal(formatedTree);
  return formatedTree;
}

export function exportTree(tree) {
  function traversal(node) {
    // eslint-disable-next-line guard-for-in
    for (const key in ADDITIONAL_FIELDS) {
      delete node[ADDITIONAL_FIELDS[key]];
    }

    if (isNotEmptyArray(node?.children)) {
      node.children.forEach(childNode => traversal(childNode));
    }
  }

  traversal(tree);
  return tree;
}
