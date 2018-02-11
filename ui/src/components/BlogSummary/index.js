/**
 * Created by danielhollcraft on 4/7/17.
 */
import React, {
  PropTypes,
} from 'react';

import {Image, Label} from 'react-bootstrap'
import {
  Link
} from 'gatsby-link';

import './index.scss'


const BlogSummary = ({title, date, categories, summary, path}) => {
  return (

    <div className="blog-summary">
      {/*<Image*/}
      {/*className="blog-preview-image"*/}
      {/*src="http://placehold.it/350x150"*/}
      {/*alt="blog preview image"*/}
      {/*/>*/}
      <time>{date}</time>
      <div className="blog-title">
        <Link to={path}><h2>{title}</h2></Link>
      </div>
      {/*<div className="tags">*/}
        {/*{ categories.map((category, i) => <Label key={i} className="tag">{category}</Label>) }*/}
      {/*</div>*/}
      <p>{summary}</p>
      <div className="read-more">
        <Link  to={path}>Read More...</Link>
      </div>
    </div>
  );
};

BlogSummary.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  summary: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
BlogSummary.defaultProps = {};

export default BlogSummary;

