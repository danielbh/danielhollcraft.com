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

      <div className="project-preview">
        { props.mobilePreview ?
          <Image
            className="mobile-preview"
            src={props.mobilePreview}
            alt={props.previewCaption + "mobile"}
          /> : ""
        }

        { props.desktopPreview ?
          <Image
            className="desktop-preview"
            src={props.desktopPreview}
            alt={props.previewCaption + " desktop"}
          /> : ""
        }
      </div>


      <div className="project-summary">
        <div><span className="font-bold">Type:</span> {props.type}</div>
        <div><span className="font-bold">Skills:</span> {props.skills}</div>
        <div><span className="font-bold">Platform:</span> {props.platform}</div>
        { props.summary.map((paragraph, i) => (<p key={i}>{paragraph}</p> ))}
      </div>

      <div className="panel-footer">
        {
          props.website ?
            <Button bsStyle="primary" bsSize="large" href={props.website}>
              <FontAwesome name="external-link" className='icon' />Website
            </Button> : ""
        }

        {
          props.appStore ?
            <Button bsStyle="success" bsSize="large" href={props.appStore}>
              <FontAwesome name="apple" className='icon'/>App Store
            </Button> : ""
        }

        {
          props.googlePlay ?
            <Button bsStyle="info" bsSize="large" href={props.googlePlay}>
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
  mobilePreview: PropTypes.string,
  desktopPreview: PropTypes.string,
  previewDesc: PropTypes.string,
  type: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  website: PropTypes.string,
  appStore: PropTypes.string,
  googlePlay: PropTypes.string,
  source: PropTypes.string,
  // This allows for multi-line project summaries if desired
  summary:PropTypes.array
};
PortfolioProject.defaultProps = {};

export default PortfolioProject;
