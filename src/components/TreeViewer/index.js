/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DefaultNode from './DefaultNode';
import WrapperNode from './WrapperNode';
import WrapperChildren from './WrapperChildren';
import useExpand from './hooks/useExpand';

const TreeViewer = ({ treeIns, CustomNode, onChange }) => {
  const { expandedNodes, toggleExpandedNode } = useExpand();
  const [selectedNode, setSelectedNode] = useState({});
  const forceRender = useForceRender();

  const { treeData, traversalByNode, renderTree } = treeIns || {};
  const Node = CustomNode ?? DefaultNode;

  const handleClick = useCallback(
    curNode => {
      if (traversalByNode) {
        traversalByNode(curNode, () => {
          togleExpandedNode(curNode.id);

      if (curNode.id !== selectedNode.id) {
        setSelectedNode(curNode);
        if (onChange) {
          onChange(curNode);
        }
      }
    },
    [onChange, selectedNode.id, toggleExpandedNode]
  );

  const renderTree = useCallback(
    (node, level = 0) => {
      const Node = CustomNode ?? DefaultNode;
      const isRootNode = level === 0;
      const isExpanded = expandedNodes.includes(node.id);

            return (
              <WrapperNode
                isRootNode={isRootNode}
                isExpanded={isExpanded}
                isSelected={selectedNode.id === node.id}
                onClick={() => {
                  handleClick(node);
                }}
                nodeContent={<Node data={node} isRootNode={isRootNode} />}
                key={node?.id}
              >
                {children ? (
                  <WrapperChildren isExpanded={isExpanded}>
                    {children.map(childNode => (
                      <WrapperChildren.Item key={childNode?.key}>{childNode}</WrapperChildren.Item>
                    ))}
                  </WrapperChildren>
                ) : null}
              </WrapperNode>
            );
          },
        })}
    </div>
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
