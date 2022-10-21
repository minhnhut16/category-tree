/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

import ExpandIcon from './ExpandIcon';

const NodeList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: ${props => (props.isRootNode ? '0' : '1.5rem')};
  height: ${props => !props.isExpanded && '0'};
  transition: height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow-y: hidden;
`;

const WrapperChild = styled.li``;

const Expand = styled.span`
  svg {
    width: ${props => (props.isRootNode ? '13px' : '10px')};
    height: ${props => (props.isRootNode ? '13px' : '10px')};
    transform: ${props => props.isExpanded && 'rotate(90deg)'};
    transition: transform 0.24s;
    margin-right: 8px;
  }
`;

const NodeContent = styled.div`
  font-size: ${props => (props.isRootNode ? '20px' : '16px')};
  font-size: ${props => (props.isRootNode ? '600' : '400')};
  color: ${props => props.isActiveNode && 'blue'};
  cursor: pointer;
`;

const DefaultNode = ({ level, data, children, onToggle, onChange, isActiveNode }) => {
  if (!data) {
    return null;
  }

  const isRootNode = level === 0;
  const isExpanded = !!data?.isExpanded;

  return (
    <>
      <NodeContent isActiveNode={isActiveNode} isRootNode={isRootNode}>
        <Expand onClick={onToggle} isRootNode={isRootNode} isExpanded={isExpanded}>
          <ExpandIcon />
        </Expand>

        <span onClick={onChange}>{data.name}</span>
      </NodeContent>

      {isArray(children) && (
        <NodeList isExpanded={isExpanded} isRootNode={isRootNode}>
          {children.map(child => (
            <WrapperChild key={child.key}>{child}</WrapperChild>
          ))}
        </NodeList>
      )}
    </>
  );
};

DefaultNode.propTypes = {
  level: PropTypes.number,
  data: PropTypes.shape({
    name: PropTypes.string,
    isExpanded: PropTypes.bool,
  }),
  children: PropTypes.arrayOf(PropTypes.node),
  onToggle: PropTypes.func,
  onChange: PropTypes.func,
  isActiveNode: PropTypes.bool,
};

DefaultNode.defaultProps = {
  level: 0,
  data: null,
  children: null,
  onToggle: null,
  onChange: null,
  isActiveNode: false,
};

export default DefaultNode;
