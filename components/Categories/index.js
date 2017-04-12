/**
 * Created by danielhollcraft on 4/12/17.
 */
import React, {
  PropTypes,
} from 'react';

import {Label} from 'react-bootstrap'
import './index.scss'

const Categories = (props) => {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <div className="categories-list">
        <div className="category">
          <Label className="tag">Node.js</Label>
        </div>
        <div className="category">
          <Label className="tag">React</Label>
        </div>
        <div className="category">
          <Label className="tag">React Native</Label>
        </div>
        <div className="category">
          <Label className="tag">MongoDB</Label>
        </div>
        <div className="category">
          <Label className="tag">App Development</Label>
        </div>
      </div>

    </div>
  );
};

Categories.propTypes = {};
Categories.defaultProps = {};

export default Categories;
