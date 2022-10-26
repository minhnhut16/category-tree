/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';

import { formatTree, isNotEmptyArray } from './utils';
import DefaultNode from './DefaultNode';
import WrapperNode from './WrapperNode';
import WrapperChildren from './WrapperChildren';

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
    [onChange, selectedNode, tree]
  );

  const renderTree = useCallback(
    (node, level = 0) => {
      const Node = CustomNode ?? DefaultNode;
      const isRootNode = level === 0;
      const isExpanded = !!node?.isExpanded;

      return (
        // WrapperNode includes node content and a list of its children (if have)
        <WrapperNode
          isRootNode={isRootNode}
          isExpanded={isExpanded}
          isSelected={selectedNode.id === node.id}
          onClick={() => {
            handleClick(node);
          }}
          nodeContent={<Node data={node} isRootNode={isRootNode} />}
        >
          {isNotEmptyArray(node?.children) ? (
            <WrapperChildren isExpanded={isExpanded}>
              {node.children.map(child => (
                <WrapperChildren.Item key={child.id}>
                  {renderTree(child, level + 1)}
                </WrapperChildren.Item>
              ))}
            </WrapperChildren>
          ) : null}
        </WrapperNode>
      );
    },
    [CustomNode, handleClick, selectedNode]
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
