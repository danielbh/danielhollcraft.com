/**
 * Created by danielhollcraft on 4/7/17.
 */
import React, {
  PropTypes,
} from 'react';

import {Image, Label} from 'react-bootstrap'

import './index.scss'


const BlogSummary = (props) => {
  return (
    <div className="blog-summary">
      <Image
        className="blog-preview-image"
        src="http://placehold.it/350x150"
        alt="blog-preview-image"
      />
      <time>3/20/2016</time>
      {/*<br/>*/}
      {/*<Label className="tag" bsStyle="info">Node.js</Label>&nbsp;*/}
      {/*<Label className="tag" bsStyle="warning">Project Management</Label> &nbsp;*/}
      {/*<Label className="tag" bsStyle="danger">Marketing</Label>*/}

      <h2> Blog Entry </h2>
      <p>This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about</p>
    </div>
  );
};

BlogSummary.propTypes = {};
BlogSummary.defaultProps = {};

export default BlogSummary;
