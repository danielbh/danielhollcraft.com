/**
 * Created by danielhollcraft on 4/29/17.
 */
import React, {
  PropTypes,
} from 'react';

import FontAwesome from 'react-fontawesome'
import {Button} from 'react-bootstrap'

const CTAButton = ({type, text}) => {
  return (
    <a href="mailto:hello@danielhollcraft.com?Subject=danielhollcraft%20contact%20form">
      <Button bsStyle={type || "primary"} bsSize="large">
        <FontAwesome name="envelope" className='icon' /> {text || "Contact Me"}
      </Button>
    </a>
  );
};

CTAButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string
};
CTAButton.defaultProps = {};

export default CTAButton;
