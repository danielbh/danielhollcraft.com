import React, { Component } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import { Formik } from 'formik'
import './index.scss'

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      submitSuccess: false,
      formMessage: null
    }
  }

  handleFormSubmitSuccess() {
    this.setState({
      submitSuccess: true,
      formMessage: 'Contact Form Successly Submitted. You will receive a reply to your message within 24 hours.'
    })
  }

  handleFormSubmitError(error) {
    this.setState({
      submitSuccess: false,
      formMessage: 'Error submitting form. Please try again.'
    })
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          message: '',
        }}
        validate={({ email, name, message, subject }) => {

          const errors = {}

          if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = true
          }

          if (!message) errors.message = true

          return errors
        }}
        onSubmit={(
          { email, message },
          { setSubmitting, setErrors, resetForm }
        ) => {

        const endPoint = 'https://ad87zs9n5f.execute-api.us-east-1.amazonaws.com/prod'

          axios.post(endPoint + '/contact', {
           // HACK: Endpoint expects name property
           email, message, name: ''
          })
          .then((response) => {
            if (response.status === 200) {
              this.handleFormSubmitSuccess()
              resetForm()
            } else {
              this.handleFormSubmitError()
            }
          }).catch((error) => {
            this.handleFormSubmitError()
          })
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <section>
            <div className="container">
              <header className="major">
                <h2>Contact</h2>
              </header>
              <p>Have a question? Looking to work together? Want to grab a cup of coffee? Feel free to contact me!</p>
              <form
                onSubmit={handleSubmit}
              >
                <div className="row uniform">
                  <div className="12u">
                    <input
                      className={touched.email && (errors.email ? 'error' : '')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="row uniform">
                  <div className="12u">
                    <textarea
                      className={touched.message && (errors.message ? 'error' : '')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                      name="message"
                      id="message"
                      placeholder="Message"
                      rows="6"
                    />
                  </div>
                </div>
                {
                  this.state.formMessage &&
                  <div className="row uniform">
                    <span
                      style={{
                        color: this.state.submitSuccess ? '#0093BF' : '#d81f44'
                      }}
                    >{this.state.formMessage}
                    </span>
                  </div>
                }
                <div className="row uniform">
                  <div className="12u">
                    <ul className="actions">
                      <li>
                        <input
                          type="submit"
                          className="special"
                          value="Send Message"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}
      />)
  }
}

Contact.propTypes = {}
Contact.defaultProps = {}

export default Contact
