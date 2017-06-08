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
      <Button bsStyle={type || "primary"} bsSize="large"
              href="mailto:hello@danielhollcraft.com?Subject=danielhollcraft%20contact%20form">
        <FontAwesome name="envelope" className='icon' /> {text || "Contact Me"}
      </Button>
  );
};

CTAButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string
};
CTAButton.defaultProps = {};

export default CTAButton;
