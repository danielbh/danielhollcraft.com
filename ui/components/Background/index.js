/**
 * Created by danielhollcraft on 4/29/17.
 */
import React, {
  Component,
  PropTypes,
} from 'react';

import './index.scss'

const Background = ({color}) => (
  <div
    className="background"
    style={{background: color}}
  />
);


Background.propTypes = {
  color: PropTypes.string
};
Background.defaultProps = {
  color: "#00688B"
};

export default Background;
