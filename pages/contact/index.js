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

const Contact = (props) => {
  return (
    <div className="portfolio-wrapper">
      <Helmet
        title={config.siteTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <ParticleBackground backgroundColor="#1e3540"/>
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} >

          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Contact.propTypes = {};
Contact.defaultProps = {};

export default Contact;