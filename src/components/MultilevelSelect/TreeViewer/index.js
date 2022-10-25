/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

import { formatTree, isNotEmptyArray } from './utils';
import DefaultNode from './DefaultNode';

const TreeViewer = ({ treeData, CustomNode, onChange }) => {
  const [tree, setTree] = useState({});
  const [selectedNode, setSelectedNode] = useState({});

  const handleClick = useCallback(
    curNode => {
      // Toggle expand node
      const clonedTree = cloneDeep(tree);
      function traversal(node) {
        if (node.id === curNode.id) {
          node.isExpanded = !node.isExpanded;
          return;
        }

        if (isNotEmptyArray(node.children)) {
          node.children.forEach(childNode => traversal(childNode));
        }
      }
      traversal(clonedTree);
      setTree(clonedTree);

      // Change selected node
      if (curNode.id !== selectedNode.id) {
        setSelectedNode(curNode);
        if (onChange) {
          onChange(curNode);
        }
      }
    },
    [onChange, selectedNode.id, tree]
  );

  const renderTree = useCallback(
    (node, level = 0) => {
      const Node = CustomNode ?? DefaultNode;

      return (
        // Node includes node content and a list of its children (if have)
        <Node
          level={level}
          data={node}
          key={node.id}
          onClick={() => {
            handleClick(node);
          }}
          isSelected={selectedNode.id === node.id}
        >
          {isNotEmptyArray(node?.children)
            ? node.children.map(childNode => renderTree(childNode, level + 1))
            : null}
        </Node>
      );
    },
    [CustomNode, handleClick, selectedNode.id]
  );

  useEffect(() => {
    if (treeData) {
      setTree(formatTree(treeData));
    }
  }, [treeData]);

  return <div>{renderTree(tree)}</div>;
};

TreeViewer.propTypes = {
  treeData: PropTypes.shape({}),
  CustomNode: PropTypes.node,
  onChange: PropTypes.func,
};

TreeViewer.defaultProps = {
  treeData: null,
  CustomNode: null,
  onChange: null,
};

export default TreeViewer;
