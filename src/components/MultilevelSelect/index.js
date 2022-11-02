/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Empty } from 'antd';
import { cloneDeep } from 'lodash';

import { useConfig } from 'contexts/config';
import TreeViewer from 'components/TreeViewer';

import SelectBoard from './SelectBoard';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 1rem;
`;

const Wrapper = styled.div`
  display: flex;
`;

const TreeWrapper = styled.div`
  min-width: 300px;
  max-width: 500px;
  margin-right: 1rem;
`;

const BoardWrapper = styled.div`
  width: 100%;
`;

const StyledEmpty = styled(Empty)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const fakeApi = () => {};

const MultilevelSelect = ({ initTreeData, onFinish }) => {
  const [treeData, setTreeData] = useState({});
  const [activeNode, setActiveNode] = useState();
  const { config } = useConfig();

  const handleFinish = useCallback(() => {
    if (onFinish) {
      onFinish(treeData);
    }
  }, [onFinish, treeData]);

  const handleChange = useCallback(
    node => {
      if (config.levels[node?.type]?.nextLevel) {
        setActiveNode(node);
      } else {
        setActiveNode(null);
      }
    },
    [config.levels]
  );

  const handleSave = useCallback(
    curNode => {
      const clonedTree = cloneDeep(treeData);

      function traversal(node) {
        if (node.id === curNode.id) {
          Object.assign(node, curNode);
          return;
        }

        if (node?.children?.length) {
          node.children.forEach(childNode => traversal(childNode));
        }
      }

      traversal(clonedTree);
      setTreeData(clonedTree);
      setActiveNode(curNode);
    },
    [treeData]
  );

  useEffect(() => {
    if (initTreeData) {
      setTreeData(initTreeData);
    }
  }, [initTreeData]);

  return (
    <div>
      <Header>
        <h2>Multilevel select</h2>
        <Button type="primary" onClick={handleFinish}>
          Finish
        </Button>
      </Header>

      <Wrapper>
        <TreeWrapper>
          <TreeViewer treeData={treeData} onChange={handleChange} />
        </TreeWrapper>

        <BoardWrapper>
          {activeNode ? (
            <SelectBoard node={activeNode} apiFn={fakeApi} onSave={handleSave} />
          ) : (
            <StyledEmpty description="Please select a parent node" />
          )}
        </BoardWrapper>
      </Wrapper>
    </div>
  );
};

MultilevelSelect.propTypes = {
  initTreeData: PropTypes.shape({}),
  onFinish: PropTypes.func,
};

MultilevelSelect.defaultProps = {
  initTreeData: null,
  onFinish: null,
};

export default MultilevelSelect;
