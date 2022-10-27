/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Empty, Modal } from 'antd';
import { cloneDeep } from 'lodash';

import { useConfig } from 'contexts/config';

import TreeViewer, {
  ADDITIONAL_FIELDS,
  exportTree,
  formatTree,
  isNotEmptyArray,
} from 'components/TreeViewer';
import SelectBoard from './SelectBoard';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const MultilevelSelect = ({ defaultTreeData, open, onCancel, onFinish }) => {
  const [treeData, setTreeData] = useState(defaultTreeData ? formatTree(defaultTreeData) : {});
  const [activeNode, setActiveNode] = useState();
  const { config } = useConfig();

  const handleFinish = useCallback(() => {
    if (onFinish) {
      onFinish(exportTree(treeData));
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
          // always expand this node
          node[ADDITIONAL_FIELDS.IS_EXPANDED] = true;
          return;
        }

        if (isNotEmptyArray(node?.children)) {
          node.children.forEach(childNode => traversal(childNode));
        }
      }

      traversal(clonedTree);
      setTreeData(clonedTree);
      setActiveNode(curNode);
    },
    [treeData]
  );

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width="100%"
      closable={false}
      title={
        <Header>
          <div>Multilevel select</div>
          <Button type="primary" onClick={handleFinish}>
            Finish
          </Button>
        </Header>
      }
    >
      <Wrapper>
        <TreeWrapper>
          <TreeViewer
            treeData={treeData}
            onChange={handleChange}
            onToggle={(_, tree) => setTreeData(tree)}
          />
        </TreeWrapper>

        <BoardWrapper>
          {activeNode ? (
            <SelectBoard node={activeNode} apiFn={fakeApi} onSave={handleSave} />
          ) : (
            <StyledEmpty description="Please select a parent node" />
          )}
        </BoardWrapper>
      </Wrapper>
    </Modal>
  );
};

MultilevelSelect.propTypes = {
  defaultTreeData: PropTypes.shape({}),
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
};

MultilevelSelect.defaultProps = {
  defaultTreeData: null,
  open: false,
  onCancel: null,
  onFinish: null,
};

export default MultilevelSelect;
