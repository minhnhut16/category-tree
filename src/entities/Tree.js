import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

export class Tree {
  constructor(treeData) {
    this.treeData = cloneDeep(treeData);
  }

  setTree = treeData => {
    this.treeData = cloneDeep(treeData);
  };

  updateNode = curNode => {
    const clonedTree = cloneDeep(this.treeData);

    function traversal(node) {
      if (node.id === curNode.id) {
        Object.assign(node, cloneDeep(curNode));
        return;
      }

      if (!isEmpty(node?.children)) {
        node.children.forEach(childNode => traversal(childNode));
      }
    }
    traversal(clonedTree);
    this.treeData = clonedTree;
  };

  renderTree = ({ renderNode = null }) => {
    const ctx = this;

    function traversal(node, level = 0) {
      const transformedChildren = !isEmpty(node?.children)
        ? node.children.map(item => traversal(item, level + 1))
        : null;

      if (renderNode) {
        return renderNode({ node, children: transformedChildren, isRootNode: level === 0 });
      }

      return null;
    }

    if (!ctx.treeData) {
      return null;
    }

    return traversal(ctx.treeData);
  };
}
