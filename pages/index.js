/**
 * Created by danielhollcraft on 4/8/17.
 */
import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {Col, Row, Grid} from 'react-bootstrap'
import { config } from 'config'
import {Link} from 'react-router'

import {
  ProfileHeader,
  Background,
  CTAButton
} from '../components'

import './index.scss'

const Index = ({props}) => (
  <div>
    <Helmet
      title={config.siteTitle}
      meta={[
        {"name": "description", "content": "Blog"},
        {"name": "keywords", "content": "sample, something"},
      ]}
    />
    <Background/>
    <Grid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} >
          <ProfileHeader/>
          <div className="panel">
            <p>Hello. I'm Daniel.</p>
            <p>I've been passionately developing software for the past 5 years. I can help make your web or mobile software project awesome. My tools of choice are <strong>React.js</strong> and <strong>React Native</strong> for the front end, and <strong>Node.js</strong> for the back end. Please see <Link to="/portfolio/">my portfolio</Link> for past projects I have done.</p>
            <p>Of all the lessons I've learned over the years, there is one that stands above the rest... Well designed software adheres to the <strong>Cool Software Standard.</strong> It must:</p>
            <ul>
              <li>Be used by many people.</li>
              <li>Be used often.</li>
            </ul>
            <p>In order for software to become cool there are MANY things that need to be done, but a few of the most important are:</p>
            <ul>
              <li>Design with constant feedback from users.</li>
              <li>Deliver superior value at minimal cost.</li>
              <li>Cultivate trust with users through good marketing, user experience, support and security practices.</li>
              <li>Be performant.</li>
              <li>Reduce the onboarding cost of new developers through easy to read and well documented code.</li>
              <li>Develop as inexpensively as possible BUT, users must either never notice, or not care when they do.</li>
              <li>Grow with a set of automated tests that verify functionality on all levels of the code and user interface.</li>
            </ul>
            <p>I strive to bring these principles into every project I work on.</p>
            <p> Interested in working together or want to have a chat?</p>
            <div className="panel-footer">
              <CTAButton type="success"/>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
