/**
 * Created by danielhollcraft on 4/25/17.
 */
import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'

import {
  Profile,
  BlogPost,
  ProfileHeader,
  ParticleBackground,
  Categories
} from '../../components'

const BlogPageTemplate = ({route, location}) => {

  const post = route.pages.find(p => p.path === location.pathname).data;
  // Convert categories string field into array split by commmas.
  // TODO: Put logic in separate function with validation to help blog user.
  const categories = post.categories.split(",");

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
        <Col xs={12} sm={12} md={7} lg={8} className="blog-feed">
          <BlogPost
            title={post.title}
            date={post.date}
            body={post.body}
            categories={categories}
          />
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
