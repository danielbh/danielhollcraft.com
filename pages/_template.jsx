import React, { PropTypes } from 'react'
import NavigationBar from '../components/NavigationBar'
import { Grid } from 'react-bootstrap'
import { rhythm } from '../utils/typography'
import './index.scss'

const Base = ({children}) => (
  <div>
    <NavigationBar/>
    {children}
  </div>
);


Base.propTypes = {
  children: PropTypes.object,
};

export default Base;