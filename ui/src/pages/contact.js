import React, { Component } from 'react'
import Helmet from 'react-helmet'

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      submitPressed: false,
      alerts: [],
      email: '',
      name: '',
      message: '',
      subject: ''
    }

    this.submit = this.submit.bind(this)
  }

  submit(evt) {
    evt.preventDefault()
    this.setState({
      submitPressed: true
    })

    if (this.isFormValid()) {
      const body = {
        email: this.state.email,
        name: this.state.name,
        message: this.state.message
      }

      const apiEndpoint = process.env.NODE_ENV === 'production' ? config.apiProduction : config.apiDevelopment

      fetch(apiEndpoint + '/contact', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.handleFormSubmitSuccess()
          } else {
            this.handleFormSubmitError()
          }
        }).catch((error) => {
          this.handleFormSubmitError()
        })
    }
  }

  onAlertDismissed(alert) {
    const alerts = this.state.alerts
    const idx = alerts.indexOf(alert)

    if (idx >= 0) {
      this.setState({
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      })
    }
  }

  handleFormSubmitSuccess() {
    this.setState({
      submitPressed: false,
      email: '',
      name: '',
      message: '',
      subject: '',
      alerts: [
        {
          id: (new Date()).getTime(),
          type: "success",
          headline: `Contact Form Successly Submitted`,
          message: "You will receive a reply to your message within 24 hours. "
        }
      ]
    })
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
    })
  }

  onEmailChange(evt) {
    this.setState({ email: evt.target.value })
  }

  onNameChange(evt) {
    this.setState({ name: evt.target.value })
  }

  onSubjectChange(evt) {
    this.setState({ message: evt.target.value })
  }

  onMessageChange(evt) {
    this.setState({ message: evt.target.value })
  }

  isValidEmail() {
    return /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)
  }

  getEmailValidationState() {
    return (!this.isValidEmail() || this.state.email === '') && this.state.submitPressed ? 'error' : null
  }

  getTextFieldValidationState(fieldValue) { return fieldValue === '' && this.state.submitPressed ? 'error' : null }

  isFormValid() {
    return this.state.subject !== "" && this.state.message !== "" && this.state.name !== "" && this.state.email !== "" && this.isValidEmail()
  }

  render() {
    return (
        <section>
          <div className="container">
            <header className="major">
              <h2>Contact</h2>
            </header>
            <p>Have a question? Looking to work together? Want to grab a cup of coffee? Feel free to contact me!</p>
          <form onSubmit={this.submit}>
              <div className="row uniform">
                <div className="6u 12u(xsmall)"><input type="text" name="name" id="name" placeholder="Name" /></div>
                <div className="6u 12u(xsmall)"><input type="email" name="email" id="email" placeholder="Email" /></div>
              </div>
              <div className="row uniform">
                <div className="12u"><input type="text" name="subject" id="subject" placeholder="Subject" /></div>
              </div>
              <div className="row uniform">
                <div className="12u"><textarea name="message" id="message" placeholder="Message" rows="6"></textarea></div>
              </div>
              <div className="row uniform">
                <div className="12u">
                  <ul className="actions">
                    <li><input type="submit" className="special" value="Send Message" /></li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </section>
    )
  }
}

Contact.propTypes = {}
Contact.defaultProps = {}

export default Contact
