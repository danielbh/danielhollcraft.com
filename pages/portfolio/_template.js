/**
 * Created by danielhollcraft on 4/8/17.
 */
import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'

import {
  ProfileHeader,
  Background,
  PortfolioProject
} from '../../components'

import './index.scss'

const PortfolioTemplate = ({route}) => {
  const projectDataArray = route.childRoutes.map(r => r.page.data);
  const projects = projectDataArray.map((p, i) => <PortfolioProject key={i} {...p}/>);

  return (
    <div className="portfolio-wrapper">
      <Helmet
        title={config.siteTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <Background color="#2e3250"/>
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} >
            <ProfileHeader/>
            {projects}
          </Col>
        </Row>
      </Grid>
    </div>
  )
};

PortfolioTemplate.propTypes = {};
PortfolioTemplate.defaultProps = {};

export default PortfolioTemplate;
