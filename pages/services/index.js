/**
 * Created by danielhollcraft on 4/11/17.
 */

import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'

import {
  ParticleBackground,
} from '../../components'

import './index.scss'

const Services = (props) => {
  return (
    <div className="portfolio-wrapper">
      <Helmet
        title={config.siteTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <ParticleBackground backgroundColor="#2E8B57"/>
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} >
            <div className="services">
              <div><span className="font-bold">Type:</span> Freelance</div>
              <div><span className="font-bold">Skills:</span> React Native, Google Places API, Node.js, REST API</div>
              <div>This is a project long description This is a project long description This is a project long description
                This is a project long description This is a project long description This is a project long description This
                is a project long description This is a project long description This is a project long description This is a
                project long description This is a project long description This is a project long description.</div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Services.propTypes = {};
Services.defaultProps = {};

export default Services;
