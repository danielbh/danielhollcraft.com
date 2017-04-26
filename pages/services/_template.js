/**
 * Created by danielhollcraft on 4/11/17.
 */

import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';
import { config } from 'config'

import {
  ParticleBackground,
  ProfileHeader,
} from '../../components'

import './index.scss'

const Services = ({children}) => {
  return (
    <div className="services-wrapper">
      <Helmet
        title="Services"
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <ParticleBackground backgroundColor="#2E8B57"/>
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <ProfileHeader/>
            <div className="services">
              {children}
              <div className="panel-footer">
                <a href="mailto:hello@danielhollcraft.com?Subject=danielhollcraft%20contact%20form">
                  <Button bsStyle="primary" bsSize="large">
                    <FontAwesome name="envelope" className='icon' /> Contact me
                  </Button>
                </a>
              </div>

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
