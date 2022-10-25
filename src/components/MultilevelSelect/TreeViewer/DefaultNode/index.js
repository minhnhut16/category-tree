/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { isNotEmptyArray } from '../utils';
import ExpandIcon from './ExpandIcon';

const NodeList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 1rem;
  height: ${props => (!props.isExpanded ? '0' : 'auto')};
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
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

const Extra = styled.span`
  width: 18px;
  display: inline-block;
`;

const NodeContent = styled.div`
  font-size: ${props => (props.isRootNode ? '20px' : '18px')};
  font-size: ${props => (props.isRootNode ? '600' : '400')};
  background-color: ${props => props.isSelected && 'rgba(25, 118, 210, 0.2) !important'};
  cursor: pointer;
  padding: 0 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const DefaultNode = ({ level, data, children, onClick, isSelected }) => {
  if (!data) {
    return null;
  }

  const isRootNode = level === 0;
  const isExpanded = !!data?.isExpanded;

  return (
    <>
      <NodeContent isSelected={isSelected} isRootNode={isRootNode} onClick={onClick}>
        {isNotEmptyArray(children) ? (
          <Expand isRootNode={isRootNode} isExpanded={isExpanded}>
            <ExpandIcon />
          </Expand>
        ) : (
          <Extra />
        )}

        <span>{data.name}</span>
      </NodeContent>

      {isNotEmptyArray(children) && (
        <NodeList isExpanded={isExpanded}>
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
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

DefaultNode.defaultProps = {
  level: 0,
  data: null,
  children: null,
  onClick: null,
  isSelected: false,
};

export default DefaultNode;
