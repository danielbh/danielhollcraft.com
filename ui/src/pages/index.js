/**
 * Created by danielhollcraft on 4/8/17.
 */
import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'

import {
  ProfileHeader,
  CTAButton
} from '../components'

import './index.scss'

import 'normalize.css';
import {
  NavigationBar,
  Footer,
  Background
} from '../components'
import { rhythm } from '../utils/typography'

export const config = graphql`
  query SiteMetadataLookup($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
}
`

// import '../stylesheets/global.scss'

// Used to give IE fetch API support
// https://github.com/matthew-andrews/isomorphic-fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

const Index = ({ route, children }) => (
  <div>
    <Helmet
      title={config.title}
      meta={[
        {"name": "description", "content": "Blog"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <div className="base-layout">
      <Background />
      <NavigationBar />
      <Grid className="content">
        {children}
      </Grid>
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} >
            <ProfileHeader />
            <div className="panel">
              <div className="panel-footer">
                <CTAButton type="success" />
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
      <Footer />
    </div>

  </div>
);

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
