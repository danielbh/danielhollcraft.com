/**
 * Created by danielhollcraft on 4/8/17.
 */
import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import projects from './projects'

import {
  ProfileHeader,
} from '../../components'

import './index.scss'
import Index from './index'

const PortfolioTemplate = (props) => (
  <div className="portfolio-wrapper">
    <Helmet
      title="Daniel Hollcraft | Portfolio"
      meta={[
        {"name": "description", "content": "Blog"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <Grid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} >
          <ProfileHeader subheading="Portfolio"/>
          <Index projects={projects}/>
        </Col>
      </Row>
    </Grid>
  </div>
);

PortfolioTemplate.propTypes = {};
PortfolioTemplate.defaultProps = {};

export default PortfolioTemplate;
