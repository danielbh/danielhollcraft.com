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
  ParticleBackground,
} from '../components'

import './index.scss'

const Index = ({props}) => (
  <div>
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
        <Col xs={12} sm={12} md={12} lg={12} >
          <ProfileHeader/>
          <div className="panel">
            Hell test
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
