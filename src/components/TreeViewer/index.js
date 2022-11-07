import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DefaultNode from './DefaultNode';
import WrapperNode from './WrapperNode';
import WrapperChildren from './WrapperChildren';
import useExpand from './hooks/useExpand';
import useForceRender from './hooks/useForceRender';

const TreeViewer = ({ treeIns, CustomNode, onChange }) => {
  const { expandedNodes, toggleExpandedNode } = useExpand();
  const [selectedNode, setSelectedNode] = useState({});
  const forceRender = useForceRender();

  const { treeData, renderTree } = treeIns || {};
  const Node = CustomNode ?? DefaultNode;

  const handleClick = useCallback(
    curNode => {
      toggleExpandedNode(curNode.id);
      if (curNode.id !== selectedNode.id) {
        setSelectedNode(curNode);
        if (onChange) {
          onChange(curNode);
        }
      }
    },
    [onChange, selectedNode.id, toggleExpandedNode]
  );

  useEffect(() => {
    forceRender();
  }, [forceRender, treeData]);

  return (
    <div>
      {renderTree &&
        renderTree({
          renderNode: ({ isRootNode, node, children }) => {
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
};

TreeViewer.propTypes = {
  treeIns: PropTypes.shape({}),
  CustomNode: PropTypes.node,
  onChange: PropTypes.func,
};

TreeViewer.defaultProps = {
  treeIns: null,
  CustomNode: null,
  onChange: null,
};

export default TreeViewer;
