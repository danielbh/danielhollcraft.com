import React, {
  PropTypes,
} from 'react';

import {Image, Label} from 'react-bootstrap'
import { Link } from 'react-router';

import './index.scss'

const BlogEntry = ({title, date, body, categories}) => (
  <div className="blog-post">
    {/*<Image*/}
    {/*className="blog-preview-image"*/}
    {/*src="http://placehold.it/350x150"*/}
    {/*alt="blog preview image"*/}
    {/*/>*/}
    <time>{date}</time>
    <div className="blog-title">
      <Link to="/"><h1>{title}</h1></Link>
    </div>
    <div className="tags">
      { categories.map(category => <Label className="tag">{category}</Label>) }
    </div>
    <div dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

BlogEntry.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired
};
BlogEntry.defaultProps = {};

export default BlogEntry;
