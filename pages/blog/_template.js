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
  ProfileHeader,
  Background,
  Categories
} from '../../components'

import Index from './index.js'

const Blog = ({route, location}) => {

  const onBlogMainPage = location.pathname === '/blog/';
  const blogPost = route.pages.find(p => p.path === location.pathname);
  const pageTitle = onBlogMainPage ? "Daniel Hollcraft | Blog" : blogPost.data.title;

  return (
    <div className="blog-wrapper">
      <Helmet
        title={pageTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <Background/>
      <Grid>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <ProfileHeader/>
        </Col>
        <Col xs={12} sm={12} md={7} lg={8} className="blog-column">
          <Index onBlogMainPage={onBlogMainPage} post={blogPost} route={route} />
        </Col>
        <Col lg={3} md={4} xs={0} xsHidden smHidden className="sidebar">
          <Row>
            <Profile/>
          </Row>
          {/*<Row>*/}
            {/*<Categories/>*/}
          {/*</Row>*/}
        </Col>
      </Grid>
    </div>
  );
};

Blog.propTypes = {};
Blog.defaultProps = {};

export default Blog;
