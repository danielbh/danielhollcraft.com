import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Rocket } from '../components'
import './index.scss'

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
            <div id="homepage-description">
              <br/>
              <h2>Software Engineer</h2>
              <p>
                Hello. My name is Daniel, software developer since 2011, with experience in
                e-learning, agricultural monitoring, tourism, and fintech. My current focus is building backend solutions in a Cloud Native environment. In my spare time I contribute to open source golang projects. To see what I've been up to lately, <a href="blog">check-out my blog</a>.
              </p>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

export default Main
