/**
 * Created by danielhollcraft on 4/11/17.
 */

import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid, Button} from 'react-bootstrap'

import {
  ProfileHeader,
  CTAButton
} from '../../components'

import './index.scss'

const Services = (props) => (
  <div className="services-wrapper">
    <Helmet
      title="Daniel Hollcraft | Services"
      meta={[
        {"name": "description", "content": "Services"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <Grid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <ProfileHeader subheading="Services"/>
          <div className="panel">
            <div dangerouslySetInnerHTML={{__html: require('./index.md').body}}/>
            <div className="panel-footer">
              <CTAButton type="success"/>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);


Services.propTypes = {};
Services.defaultProps = {};

export default Services;
