import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'

import {
  Profile,
  BlogSummary,
  ProfileHeader,
  ParticleBackground,
  Categories
} from '../components'

const Index = (props) => (
  <div className="wrapper">
    <Helmet
      title={config.siteTitle}
      meta={[
        {"name": "description", "content": "Blog"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <ParticleBackground backgroundColor="#2e3250"/>
    <Grid>
      <Row>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <ProfileHeader/>
        </Col>
        <Col xs={12} sm={12} md={7} lg={8} className="blog-feed">
          <BlogSummary/>
          <BlogSummary/>
          <BlogSummary/>
          <BlogSummary/>
          <BlogSummary/>
        </Col>

        <Col lg={3} md={4} xs={0} xsHidden smHidden className="sidebar">
          <Row>
            <Profile/>
          </Row>
          <Row>
            <Categories/>
          </Row>
        </Col>
      </Row>
    </Grid>
  </div>
);


export default Index;