import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';

const DURATION = 300;

const NodeList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 1rem;
`;

const WrapperChildren = ({ children, isExpanded }) => {
  return (
    <AnimateHeight duration={DURATION} height={isExpanded ? 'auto' : 0}>
      <NodeList>{children}</NodeList>
    </AnimateHeight>
  );
};

WrapperChildren.propTypes = {
  children: PropTypes.node,
  isExpanded: PropTypes.bool,
};

WrapperChildren.defaultProps = {
  children: null,
  isExpanded: false,
};

export default WrapperChildren;

WrapperChildren.Item = styled.li``;
