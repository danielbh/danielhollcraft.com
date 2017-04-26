/**
 * Created by danielhollcraft on 4/26/17.
 */
import React, {
  PropTypes,
} from 'react';

import BlogSummary from '../BlogSummary'

const BlogFeed = ({route}) => {
  const blogSummaries = route.pages.map((p,i) => {
    const path = p.path;
    if(path !== '/blog/' && path.includes("blog")) {
      const {title, date, categories, summary} = p.data;
      const categoryArray = categories.split(",");
      return (
        <BlogSummary
          key={i}
          title={title}
          date={date}
          summary={summary}
          categories={categoryArray}
          path={p.path}
        />
      )
    }
  })

  return <div>{blogSummaries}</div>
}



BlogFeed.propTypes = {
  route: PropTypes.object.isRequired
};
BlogFeed.defaultProps = {};

export default BlogFeed;
