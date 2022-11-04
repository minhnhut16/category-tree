/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Empty, Modal } from 'antd';

import { useConfig } from 'contexts/config';

import TreeViewer from 'components/TreeViewer';
import { Tree } from 'entities/Tree';
import SelectBoard from './SelectBoard';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
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

const MultilevelSelect = ({ treeData, onFinish }) => {
  const treeIns = useRef(new Tree())?.current;
  const [activeNode, setActiveNode] = useState();
  const { config } = useConfig();

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
      treeIns.updateNode(curNode);
      setActiveNode(curNode);
    },
    [treeIns]
  );

  const handleFinish = useCallback(() => {
    if (onFinish) {
      onFinish(treeIns.treeData);
    }
  }, [onFinish, treeIns]);

  useEffect(() => {
    if (treeData) {
      treeIns.setTree(treeData);
    }
  }, [treeData, treeIns]);

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
          <TreeViewer treeIns={treeIns} onChange={handleChange} />
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
  treeData: PropTypes.shape({}),
  onFinish: PropTypes.func,
};

MultilevelSelect.defaultProps = {
  treeData: null,
  onFinish: null,
};

export default MultilevelSelect;
