import React, { PropTypes } from 'react'
import {
  NavigationBar,
  Footer,
  ParticleBackground
} from '../components'
import { Grid } from 'react-bootstrap'
import { rhythm } from '../utils/typography'
import './index.scss'

const Base = ({children}) => (
  <div>
    <NavigationBar/>
    <ParticleBackground/>
    <Grid className="content">
      {children}
      <Footer/>
    </Grid>
    </div>
);

Base.propTypes = {
  children: PropTypes.object,
};

export default Base;