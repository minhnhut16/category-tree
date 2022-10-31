/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DefaultNode from './DefaultNode';
import WrapperNode from './WrapperNode';
import WrapperChildren from './WrapperChildren';
import useExpand from './hooks/useExpand';

const TreeViewer = ({ treeData, CustomNode, onChange }) => {
  const [tree, setTree] = useState({});
  const { expandedNodes, togleExpandedNode } = useExpand();
  const [selectedNode, setSelectedNode] = useState({});

  const handleClick = useCallback(
    curNode => {
      // Toggle expand node
      function traversal(node) {
        if (node.id === curNode.id) {
          togleExpandedNode(node.id);
          return;
        }

        if (node.children?.length) {
          node.children.forEach(childNode => traversal(childNode));
        }
      }
      traversal(tree);

      // Change selected node
      if (curNode.id !== selectedNode.id) {
        setSelectedNode(curNode);
        if (onChange) {
          onChange(curNode);
        }
      }
    },
    [onChange, selectedNode.id, togleExpandedNode, tree]
  );

  const renderTree = useCallback(
    (node, level = 0) => {
      const Node = CustomNode ?? DefaultNode;
      const isRootNode = level === 0;
      const isExpanded = expandedNodes.includes(node.id);

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
          {node.children?.length ? (
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
    [CustomNode, expandedNodes, handleClick, selectedNode.id]
  );

  useEffect(() => {
    if (treeData) {
      setTree(treeData);
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
