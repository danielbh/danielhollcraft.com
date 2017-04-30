import React, {
  PropTypes,
} from 'react';

import {Image, Label} from 'react-bootstrap'
import { Link } from 'react-router';

import './index.scss'

const BlogPost = ({title, date, body, categories, route}) => (
  <div className="blog-post">
    {/*<Image*/}
    {/*className="blog-preview-image"*/}
    {/*src="http://placehold.it/350x150"*/}
    {/*alt="blog preview image"*/}
    {/*/>*/}
    <time>{date}</time>
    <div className="blog-title">
      <h1>{title}</h1>
    </div>
    {/*<div className="tags">*/}
      {/*{ categories.map((category, i) => <Label key={i} className="tag">{category}</Label>) }*/}
    {/*</div>*/}
    <div dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
};
BlogPost.defaultProps = {};

export default BlogPost;
