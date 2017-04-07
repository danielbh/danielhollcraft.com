import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import {Image, Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'
import particlesConfig from '../scripts/particlesJS/particles.config'
import FontAwesome from 'react-fontawesome';
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
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Sample"},
            {"name": "keywords", "content": "sample, something"},
          ]}
        />
        <Grid>
          <Row className="wrapper">
            <div id="particle" className="particle-background"></div>

            <Col xs={12} sm={12} md={7} lg={8} className="blog-feed">
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
              <BlogSummary/>
            </Col>

            <Col lg={4} md={4} xsHidden smHidden className="profile">
              <Image
                className="photo"
                src={require("../images/profile-photo.png")}
                alt="Daniel Hollcraft"
                circle
              />
              <h2>{config.siteTitle}</h2>
              <p>Full-stack Javascript Developer</p>
              <div className="social-links">
                <a href={config.githubProfile} >
                  <FontAwesome name="github" size='2x' className="social-link" />
                </a>
                <a href={config.linkedinProfile} >
                  <FontAwesome name="linkedin-square" size='2x' className="social-link"/>
                </a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
