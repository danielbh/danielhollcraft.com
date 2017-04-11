/**
 * Created by danielhollcraft on 4/11/17.
 */

import React, {
  PropTypes,
} from 'react';

import {Image, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';


import './index.scss'

const PortfolioProject = (props) => {
  return (
    <div className="project">
      <div className="project-heading">
        <div> A tour guide app for Paris, France</div>
        <div> Aug 2016 – Present</div>

      </div>

      <Image
        className="project-image"
        src="http://placehold.it/350x150"
        alt="project image"
      />
      <div className="project-summary">
        <div><span className="font-bold">Type:</span> Freelance</div>
        <div><span className="font-bold">Skills:</span> React Native, Google Places API, Node.js, REST API</div>
        <div>This is a project long description This is a project long description This is a project long description
          This is a project long description This is a project long description This is a project long description This
          is a project long description This is a project long description This is a project long description This is a
          project long description This is a project long description This is a project long description.</div>
      </div>

      <div className="project-footer">
        <Button bsStyle="primary" bsSize="large">
          <FontAwesome name="external-link" className='icon'/>Website</Button>
        <Button bsStyle="success" bsSize="large">
          <FontAwesome name="apple" className='icon'/>App Store</Button>
        <Button bsStyle="info" bsSize="large">
          <FontAwesome name="google" className='icon'/>Google Play</Button>
        <Button bsStyle="warning" bsSize="large">
          <FontAwesome name="file-code-o" className='icon'/>Source</Button>
      </div>
    </div>
  );
};

PortfolioProject.propTypes = {};
PortfolioProject.defaultProps = {};

export default PortfolioProject;
