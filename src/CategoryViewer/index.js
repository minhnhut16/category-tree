/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import TreeViewer from './TreeViewer';

const Wrapper = styled(Row).attrs(props => ({
  gutter: [8, 8],
  ...props,
}))`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 20px;
`;

const TreeWrapper = styled(Col).attrs(props => ({
  span: 10,
  ...props,
}))``;

function formatTree(tree) {
  const formatedTree = cloneDeep(tree);

  function travel(node) {
    if (!node.id) {
      throw new Error('some node is missing id');
    }
    node.isExpanded = true;

    if (isArray(node.children)) {
      node.children.forEach(childNode => travel(childNode));
    }
  }

  travel(formatedTree);
  return formatedTree;
}

const CategoryViewer = ({ initialTree }) => {
  const [tree, setTree] = useState({});
  // use activeNodeData for select section @an nguyen
  const [activeNodeData, setActiveNode] = useState({});

  const handleToggle = useCallback(
    id => {
      const clonedTree = cloneDeep(tree);
      function travel(node) {
        if (node.id === id) node.isExpanded = !node.isExpanded;

        if (isArray(node.children)) {
          node.children.forEach(childNode => travel(childNode));
        }
      }
      travel(clonedTree);
      setTree(clonedTree);
    },
    [tree]
  );

  const handleChange = useCallback(node => {
    setActiveNode(node);
  }, []);

  useEffect(() => {
    if (initialTree) {
      setTree(formatTree(initialTree));
    }
  }, [initialTree]);

  return (
    <Wrapper>
      <TreeWrapper>
        <TreeViewer
          tree={tree}
          onToggle={handleToggle}
          onChange={handleChange}
          activeNodeData={activeNodeData}
        />
      </TreeWrapper>

      {/* // An nguyen section */}
      <div>Select</div>
    </Wrapper>
  );
};

CategoryViewer.propTypes = {
  initialTree: PropTypes.shape({}),
};

CategoryViewer.defaultProps = {
  initialTree: null,
};

export default CategoryViewer;
