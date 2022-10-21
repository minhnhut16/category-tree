import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

import TreeViewer from './TreeViewer';
import SelectBoard from './SelectBoard';

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

const MultilevelSelect = ({ treeData }) => {
  const [activeNode, setActiveNode] = useState({});
  const fakeApi = () => {};

  const handleChange = useCallback(node => {
    setActiveNode(node);
  }, []);

  return (
    <Wrapper>
      <TreeWrapper>
        <TreeViewer treeData={treeData} onChange={handleChange} />
      </TreeWrapper>

      <Col span={14}>{activeNode && <SelectBoard node={activeNode} apiFn={fakeApi} />}</Col>
    </Wrapper>
  );
};

MultilevelSelect.propTypes = {
  treeData: PropTypes.shape({}),
};

MultilevelSelect.defaultProps = {
  treeData: null,
};

export default MultilevelSelect;
