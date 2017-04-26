/**
 * Created by danielhollcraft on 4/25/17.
 */
import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'

import './index.scss'

import {
  Profile,
  BlogPost,
  BlogFeed,
  ProfileHeader,
  ParticleBackground,
  Categories
} from '../../components'

const BlogPageTemplate = ({route, location}) => {

  let blogComponent;

  // Display main blog page or blog post depending on what the current url.
  if (location.pathname !== '/blog/') {
    const post = route.pages.find(p => p.path === location.pathname).data;
    const categoryArray = post.categories.split(",");

    blogComponent = <BlogPost
      title={post.title}
      date={post.date}
      body={post.body}
      categories={categoryArray}
    />
  } else {
    blogComponent = <BlogFeed route={route}/>
  }

  return (
    <div className="blog-wrapper">
      <Helmet
        title={config.siteTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <ParticleBackground backgroundColor="#2e3250"/>
      <Grid>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <ProfileHeader/>
        </Col>
        <Col xs={12} sm={12} md={7} lg={8} className="blog-component">
          {blogComponent}
        </Col>
        <Col lg={3} md={4} xs={0} xsHidden smHidden className="sidebar">
          <Row>
            <Profile/>
          </Row>
          <Row>
            <Categories/>
          </Row>
        </Col>
      </Grid>
    </div>
  );
};

BlogPageTemplate.propTypes = {};
BlogPageTemplate.defaultProps = {};

export default BlogPageTemplate;
