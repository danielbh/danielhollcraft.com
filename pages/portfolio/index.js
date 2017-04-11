/**
 * Created by danielhollcraft on 4/8/17.
 */
import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'

import {
  ProfileHeader,
  ParticleBackground
} from '../../components'

const Portfolio = (props) => (
  <div className="wrapper">
    <Helmet
      title={config.siteTitle}
      meta={[
        {"name": "description", "content": "Blog"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <ParticleBackground backgroundColor="#00688B"/>
    <Grid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <ProfileHeader/>
        </Col>
      </Row>
    </Grid>
  </div>
);

Portfolio.propTypes = {};
Portfolio.defaultProps = {};

export default Portfolio;
