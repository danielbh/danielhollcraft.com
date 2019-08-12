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
              <h2>Web Developer</h2>
              <p>
                Hello. My name is Daniel. I 've been working in the
                software industry since 2008, and have been a professional
                software developer since 2011. I've worked in e-learning,
                agricultural monitoring, tourism, and fintech. My current focus
                is building microservices in a cloud native environment.
                In my spare time I enjoy experimenting and creating new and
                exciting things with the Go Programming Language. I'm in the
                middle of updating this website. For the time being if you want
                to learn more about me, I recommend <a href="https://github.com/danielbh">checking out my github</a> or <a href="https://www.linkedin.com/in/daniel-hollcraft/">my linkedin profile</a>.

              </p>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

export default Main
