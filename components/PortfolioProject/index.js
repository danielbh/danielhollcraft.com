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
        <div>{props.title}</div>
        <div> {props.start} – {props.end}</div>
      </div>

      <Image
        className="project-image"
        src={require("../../pages/portfolio/project-images/"+props.image)}
        alt="project image"
      />
      <div className="project-summary">
        <div><span className="font-bold">Type:</span> {props.type}</div>
        <div><span className="font-bold">Skills:</span> {props.skills}</div>
        <div dangerouslySetInnerHTML={{ __html: props.body }} />
      </div>

      <div className="panel-footer">
        {
          props.website ?
            <Button bsStyle="primary" bsSize="large" href={props.website}>
              <FontAwesome name="external-link" className='icon' />Website
            </Button> : ""
        }

        {
          props.appstore ?
            <Button bsStyle="success" bsSize="large" href={props.appstore}>
              <FontAwesome name="apple" className='icon'/>App Store
            </Button> : ""
        }

        {
          props.googleplay ?
            <Button bsStyle="info" bsSize="large" href={props.googleplay}>
              <FontAwesome name="google" className='icon'/>Google Play
            </Button>: ""
        }

        {
          props.source ?
            <Button bsStyle="warning" bsSize="large" href={props.source}>
              <FontAwesome name="file-code-o" className='icon'/>Source
            </Button>: ""
        }
      </div>
    </div>
  );
};

PortfolioProject.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
  website: PropTypes.string,
  appstore: PropTypes.string,
  googleplay: PropTypes.string,
  source: PropTypes.string
};
PortfolioProject.defaultProps = {};

export default PortfolioProject;
