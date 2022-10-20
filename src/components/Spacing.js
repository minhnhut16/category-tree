import React from 'react';
import PropTypes from 'prop-types';

const Spacing = props => {
  const { children, mt, mb, ml, mr, mx, my, pt, pb, pl, pr, px, py } = props;
  const childrenStyle = children.props.style || {};
  const newStyle = {};
  if (mx !== null) {
    newStyle.marginLeft = mx;
    newStyle.marginRight = mx;
  }
  if (my !== null) {
    newStyle.marginTop = my;
    newStyle.marginBottom = my;
  }
  if (mt !== null) {
    newStyle.marginTop = mt;
  }
  if (mb !== null) {
    newStyle.marginBottom = mb;
  }
  if (ml !== null) {
    newStyle.marginLeft = ml;
  }
  if (mr !== null) {
    newStyle.marginRight = mr;
  }

  if (px !== null) {
    newStyle.paddingLeft = px;
    newStyle.paddingRight = px;
  }
  if (py !== null) {
    newStyle.paddingTop = py;
    newStyle.paddingBottom = py;
  }
  if (pt !== null) {
    newStyle.paddingTop = pt;
  }
  if (pb !== null) {
    newStyle.paddingBottom = pb;
  }
  if (pl !== null) {
    newStyle.paddingLeft = pl;
  }
  if (pr !== null) {
    newStyle.paddingRight = pr;
  }
  return React.cloneElement(children, {
    style: { ...childrenStyle, ...newStyle },
  });
};

Spacing.propTypes = {
  mt: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  mx: PropTypes.string,
  my: PropTypes.string,

  pt: PropTypes.string,
  pl: PropTypes.string,
  pr: PropTypes.string,
  pb: PropTypes.string,
  px: PropTypes.string,
  py: PropTypes.string,
};

Spacing.defaultProps = {
  mt: null,
  ml: null,
  mr: null,
  mb: null,
  mx: null,
  my: null,

  pt: null,
  pl: null,
  pr: null,
  pb: null,
  px: null,
  py: null,
};

export default Spacing;
