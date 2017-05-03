/**
 * Created by danielhollcraft on 5/3/17.
 */
import React, {
  PropTypes,
} from 'react';

import {
  BlogPost,
  BlogFeed,
} from '../../components'

const BlogIndex = ({onBlogMainPage, postObject, route}) => {

  let blogComponent;

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
    <div>{blogComponent}</div>
  );
};

BlogIndex.propTypes = {
  onBlogMainPage: PropTypes.bool,
  postObject: PropTypes.object,
  route: PropTypes.object
};
BlogIndex.defaultProps = {};

export default BlogIndex;
