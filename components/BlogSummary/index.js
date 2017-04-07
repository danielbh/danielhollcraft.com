/**
 * Created by danielhollcraft on 4/7/17.
 */
import React, {
  PropTypes,
} from 'react';

import './index.scss'


const BlogSummary = (props) => {
  return (
    <div className="blog-summary">
      <h2> Blog Entry </h2>
      <time>3/20/2016</time>
      <p>This is a fake description about the blog entry. I want it to be about 400 characters long so I will continue This is a fake description about the blog entry. I want it to be about 400 characters long so I will continue This is a fake description about the blog entry. I want it to be about 400 characters long so I will continue This is a fake description about the blog entry. I want it to be about 400 characters long so I will continue </p>
    </div>
  );
};

BlogSummary.propTypes = {};
BlogSummary.defaultProps = {};

export default BlogSummary;
