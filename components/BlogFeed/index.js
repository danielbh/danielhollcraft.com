/**
 * Created by danielhollcraft on 4/26/17.
 */
import React, {
  PropTypes,
} from 'react';

import {orderBy} from 'lodash';

import BlogSummary from '../BlogSummary'

const BlogFeed = ({route}) => {

  // Remove other pages from list
  // TODO: This might require optimization down the road since I'm filtering through ALL the pages
  const blogSummaries = route.pages.filter(p => {
    const path = p.path;
    return path !== '/blog/' && path.includes("blog")
  });

  // Sort blog posts by date descending
  // TODO: This might require optimization down the road since I'm sorting ALL blog entries
  const blogSummariesSortedByDate =
    orderBy(blogSummaries, [s => Date.parse(s.data.date)], ['desc']);

  // Generate blog summary components
  const blogSummaryComponents = blogSummariesSortedByDate.map((p,i) => {
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
  });

  return <div>{blogSummaryComponents}</div>
}



BlogFeed.propTypes = {
  route: PropTypes.object.isRequired
};
BlogFeed.defaultProps = {};

export default BlogFeed;
