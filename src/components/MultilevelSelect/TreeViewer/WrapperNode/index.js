/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ExpandIcon from './ExpandIcon';

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

const WrapperContent = styled.div`
  background-color: ${props => props.isSelected && 'rgba(25, 118, 210, 0.2) !important'};
  cursor: pointer;
  padding: 0 0.5rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const WrapperNode = ({ nodeContent, children, onClick, isSelected, isRootNode, isExpanded }) => {
  return (
    <>
      <WrapperContent isSelected={isSelected} isRootNode={isRootNode} onClick={onClick}>
        {children ? (
          <Expand isRootNode={isRootNode} isExpanded={isExpanded}>
            <ExpandIcon />
          </Expand>
        ) : (
          <Extra />
        )}

        {nodeContent}
      </WrapperContent>

      {children}
    </>
  );
};

WrapperNode.propTypes = {
  nodeContent: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  isRootNode: PropTypes.bool,
  isExpanded: PropTypes.bool,
};

WrapperNode.defaultProps = {
  nodeContent: null,
  children: null,
  onClick: null,
  isSelected: false,
  isRootNode: false,
  isExpanded: false,
};

export default WrapperNode;
