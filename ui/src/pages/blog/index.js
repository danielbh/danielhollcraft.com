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


export const pageQuery = graphql`
  query BlogIndexBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

const BlogIndex = ({onBlogMainPage, post, route, data}) => {
  let blogComponent;
console.log(data)
  // Display main blog page or blog post depending on what the current url.
  if (onBlogMainPage) {
    blogComponent = <BlogFeed route={route}/>
  } else {
    const {title, date, body, categories} = post.data;
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
  post: PropTypes.object,
  route: PropTypes.object
};
BlogIndex.defaultProps = {};

export default BlogIndex;
