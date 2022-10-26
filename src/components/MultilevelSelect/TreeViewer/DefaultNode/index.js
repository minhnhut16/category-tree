import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.span`
  font-size: ${props => (props.isRootNode ? '20px' : '18px')};
  font-size: ${props => (props.isRootNode ? '600' : '400')};
`;

const DefaultNode = ({ data, isRootNode }) => {
  return <Content isRootNode={isRootNode}>{data.name}</Content>;
};

DefaultNode.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
  isRootNode: PropTypes.bool,
};

DefaultNode.defaultProps = {
  data: null,
  isRootNode: false,
};

export default DefaultNode;
