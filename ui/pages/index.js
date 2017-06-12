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
  CTAButton
} from '../components'

import './index.scss'

// Used to give IE fetch API support
// https://github.com/matthew-andrews/isomorphic-fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

const Index = ({route}) => (
  <div>
    <Helmet
      title={config.siteTitle}
      meta={[
        {"name": "description", "content": "Blog"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <Grid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} >
          <ProfileHeader/>
          <div className="panel">
            <div dangerouslySetInnerHTML={{__html: require('./introduction.md').body}}/>
            <div className="panel-footer">
              <CTAButton type="success"/>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
