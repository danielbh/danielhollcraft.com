/**
 * Created by danielhollcraft on 4/7/17.
 */
import React, {
  PropTypes,
} from 'react';

import {Image, Label} from 'react-bootstrap'
import { Link } from 'react-router';

import {LinkContainer} from 'react-router-bootstrap'
import './index.scss'


const BlogSummary = (props) => {
  return (
    <div className="blog-summary">
      {/*<Image*/}
        {/*className="blog-preview-image"*/}
        {/*src="http://placehold.it/350x150"*/}
        {/*alt="blog preview image"*/}
      {/*/>*/}
      <time>3/20/2016</time>
      <div className="blog-title">
        <Link to="/"><h2>Fake Blog Entry Title That is Moderately Long</h2></Link>
      </div>
      <div className="tags">
        <Label className="tag">Node.js</Label>&nbsp;
        <Label className="tag">React Native</Label> &nbsp;
        <Label className="tag">App Development</Label>
      </div>
      <p>This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry. I want it to be about This is a fake description about the blog entry.
      </p>
      <div className="read-more">
        <Link  to="/">Read More...</Link>
      </div>
    </div>
  );
};

BlogSummary.propTypes = {};
BlogSummary.defaultProps = {};

export default BlogSummary;
