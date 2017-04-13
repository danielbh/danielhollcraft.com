/**
 * Created by danielhollcraft on 4/11/17.
 */

import React, {
  PropTypes,
} from 'react';

import Helmet from "react-helmet"
import {
  Col, Row, Grid,
  Form, FormControl,
  FormGroup, ControlLabel,
  Checkbox, Button
} from 'react-bootstrap'
import { config } from 'config'

import {
  ParticleBackground,
} from '../../components'

import './index.scss'


const Contact = (props) => {
  return (
    <div className="contact-wrapper">
      <Helmet
        title={config.siteTitle}
        meta={[
          {"name": "description", "content": "Blog"},
          {"name": "keywords", "content": "sample, something"},
        ]}
      />
      <ParticleBackground backgroundColor="#2F4F4F"/>
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} >
            <div className="contact">
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalMessage">
                  <Col componentClass={ControlLabel} sm={2}>
                    Message
                  </Col>
                  <Col sm={10}>
                    <FormControl componentClass="textarea" placeholder="Your message..." />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      Send
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Contact.propTypes = {};
Contact.defaultProps = {};

export default Contact;