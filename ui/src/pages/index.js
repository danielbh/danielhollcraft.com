import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Rocket } from '../components'

class Main extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <header id="homepage-hero">
          <h1>Daniel Hollcraft</h1>
          <Rocket />
        </header>
        <section>
          <article className="container">
            <div>
              <h2>Web Developer</h2>
              <h2>Frontend | React | Node.js</h2>
              <h2 style={{ textDecoration: 'underline' }}>
                <Link to="/portfolio">Check out my work</Link>
              </h2>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

export default Main
