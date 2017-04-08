import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'
import particlesConfig from '../scripts/particlesJS/particles.config'
import Profile from '../components/Profile'
import BlogSummary from '../components/BlogSummary'

export default class Index extends React.Component {

  componentDidMount() {
    // TODO: Import particleJS from npm.
    // Particles JS is not built for a universal environment and requires
    // a rewrite to play nice with gatsby.js and npm imports.
    particlesJS('particle', particlesConfig);
  }

  render () {
    return (
      <div className="wrapper">
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Sample"},
            {"name": "keywords", "content": "sample, something"},
          ]}
        />
        <Grid>
          <Row>
            <div id="particle" className="particle-background"></div>
            <Col xs={12} sm={12} md={7} lg={8} className="blog-feed">
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
            </Col>

            <Col lg={3} md={4} xs={0} smOffset={0} xsHidden smHidden className="sidebar">
            <Profile/>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
