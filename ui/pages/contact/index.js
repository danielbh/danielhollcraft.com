/**
 * Created by danielhollcraft on 4/11/17.
 */

import React, {
  PropTypes,
  Component,
} from 'react';

import Helmet from 'react-helmet'

import {
  Col,
  Row,
  Grid,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap'
import { config } from 'config'

import './index.scss'

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitPressed: false,
      email: '',
      name: '',
      message: ''
    };
  }

  submit (evt) {
    evt.preventDefault();
    this.setState({
      submitPressed: true
    });

    if(this.isFormValid()) {
      const body = {
        email: this.state.email,
        name: this.state.name,
        message: this.state.message
      };

      fetch("http://localhost:3000", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(() => {
        this.setState({
          submitPressed: false,
          email: '',
          name: '',
          message: ''
        });
      });
    }
  }

  handleEmailChange(evt) {
    this.setState({email: evt.target.value});
  }

  handleNameChange(evt) {
    this.setState({name: evt.target.value});
  }

  handleMessageChange(evt) {
    this.setState({message: evt.target.value});
  }

  isValidEmail() {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email);
  }

  getEmailValidationState() {
    return (!this.isValidEmail() || this.state.email === '') && this.state.submitPressed ? 'error' : null
  }

  getTextFieldValidationState(fieldValue) { return fieldValue === '' && this.state.submitPressed ? 'error' : null }

  isFormValid() {
    return this.state.message !== "" && this.state.name !== "" && this.state.email !== "" && this.isValidEmail()
  }

  render() {
    return (
      <div className="contact-wrapper">
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Blog"},
            {"name": "keywords", "content": "sample, something"},
          ]}
        />
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
              <div className="contact">
                <Form horizontal>
                  <FormGroup controlId="formHorizontalEmail" validationState={this.getEmailValidationState()}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Email
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange.bind(this)}
                      />
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalName"
                             validationState={this.getTextFieldValidationState(this.state.name)}
                  >
                    <Col componentClass={ControlLabel} sm={2}>
                      Name
                    </Col>
                    <Col sm={10}>
                      <FormControl type="text" placeholder="Name"
                                   value={this.state.name}
                                   onChange={this.handleNameChange.bind(this)}
                      />
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalMessage"
                             validationState={this.getTextFieldValidationState(this.state.message)}
                  >
                    <Col componentClass={ControlLabel} sm={2}>
                      Message
                    </Col>
                    <Col sm={10}>
                      <FormControl componentClass="textarea" placeholder="Your message..."
                                   value={this.state.message}
                                   onChange={this.handleMessageChange.bind(this)} />
                      <FormControl.Feedback />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button bsStyle="success" bsSize="large" type="submit" onClick={this.submit.bind(this)}>
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
  }
}

Contact.propTypes = {};
Contact.defaultProps = {};

export default Contact;