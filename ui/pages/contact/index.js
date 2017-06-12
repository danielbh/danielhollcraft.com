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

import { AlertList } from 'react-bs-notifier';

import './index.scss'

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitPressed: false,
      alerts: [],
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

      const apiEndpoint =
        process.env.NODE_ENV === 'production' ? config.apiProduction : config.apiDevelopment

      fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if(response.status === 200) {
            this.handleFormSubmitSuccess()
          } else {
            this.handleFormSubmitError()
          }
        }).catch((error) => {
        this.handleFormSubmitError()
      });
    }
  }

  onAlertDismissed(alert) {
    const alerts = this.state.alerts;
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
  }

  handleFormSubmitSuccess() {
    this.setState({
      submitPressed: false,
      email: '',
      name: '',
      message: '',
      alerts: [
        {
          id: (new Date()).getTime(),
          type: "success",
          headline: `Contact Form Successly Submitted`,
          message: "You will receive a reply to your message within 24 hours. "
        }
      ]
    });
  }

  handleFormSubmitError() {
    this.setState({
      alerts: [
        {
          id: (new Date()).getTime(),
          type: "danger",
          headline: `Contact Form Submit Failure`,
          message: "Please try again."
        }
      ]
    });
  }

  onEmailChange(evt) {
    this.setState({email: evt.target.value});
  }

  onNameChange(evt) {
    this.setState({name: evt.target.value});
  }

  onMessageChange(evt) {
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
        <AlertList
          position="top-left"
          alerts={this.state.alerts}
          timeout={5000}
          dismissTitle="Dismiss Alert"
          onDismiss={this.onAlertDismissed.bind(this)}
        />
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
              <div className="contact-form">
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
                        onChange={this.onEmailChange.bind(this)}
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
                      <FormControl
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onNameChange.bind(this)}
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
                      <FormControl
                        componentClass="textarea"
                        placeholder="Your message..."
                        value={this.state.message}
                        onChange={this.onMessageChange.bind(this)}
                      />
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