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
  Background,
  Categories
} from '../../components'

const Blog = ({route, location}) => {

  let blogComponent;
  const onBlogMainPage = location.pathname === '/blog/';
  const postObject = route.pages.find(p => p.path === location.pathname);
  const pageTitle = onBlogMainPage ? "Daniel Hollcraft | Blog" : postObject.data.title

  // Display main blog page or blog post depending on what the current url.
  if (onBlogMainPage) {

    blogComponent = <BlogFeed route={route}/>
  } else {
    const {title, date, body, categories} = postObject.data;
    const categoryArray = categories.split(",");

    blogComponent = <BlogPost
      title={title}
      date={date}
      body={body}
      categories={categoryArray}
    />
  }

  return (
    <div className="blog-wrapper">
      <Helmet
        title={pageTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <Background color="#273744"/>
      <Grid>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <ProfileHeader/>
        </Col>
        <Col xs={12} sm={12} md={7} lg={8} className="blog-column">
          {blogComponent}
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
