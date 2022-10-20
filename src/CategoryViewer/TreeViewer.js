import { useCallback } from 'react';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';

import DefaultNode from './DefaultNode';

const TreeViewer = ({ tree, CustomNode, onToggle, onChange, activeNodeData }) => {
  const renderTree = useCallback(
    (node, level = 0) => {
      const Node = CustomNode ?? DefaultNode;

      return (
        <Node
          level={level}
          data={node}
          key={node.id}
          onToggle={() => onToggle && onToggle(node.id)}
          onChange={() => node.id !== activeNodeData?.id && onChange && onChange(node)}
          isActiveNode={activeNodeData?.id === node.id}
        >
          {isArray(node?.children) &&
            node.children.map(childNode => renderTree(childNode, level + 1))}
        </Node>
      );
    },
    [CustomNode, activeNodeData, onChange, onToggle]
  );

  if (!tree) {
    return null;
  }

  return <div>{renderTree(tree)}</div>;
};

TreeViewer.propTypes = {
  tree: PropTypes.shape({}),
  CustomNode: PropTypes.node,
  onToggle: PropTypes.func,
  onChange: PropTypes.func,
  activeNodeData: PropTypes.shape({
    id: PropTypes.string,
  }),
};

TreeViewer.defaultProps = {
  tree: null,
  CustomNode: null,
  onToggle: null,
  onChange: null,
  activeNodeData: null,
};

export default TreeViewer;
