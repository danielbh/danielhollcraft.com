import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import {Image} from 'react-bootstrap'
import { config } from 'config'
import particlesConfig from '../scripts/particlesJS/particles.config'

export default class Index extends React.Component {

  componentDidMount() {
    // TODO: Import particleJS from npm.
    // Particles JS is not built for a universal environment and requires
    // a rewrite to play nice with gatsby.js and npm imports.
    particlesJS('particle', particlesConfig);
  }

  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Sample"},
            {"name": "keywords", "content": "sample, something"},
          ]}
        />
        <div className="wrapper">
          <div id="particle" className="particle-background"></div>
          <div className="about">
              <Image
                className="photo"
                src={require("../images/profile-photo.png")}
                alt="Daniel Hollcraft"
                circle
              />

              <div>
                <p>Hello, I'm Daniel.</p>
                I have been working in the software industry since 2008. I have a background in both Software Engineering and Marketing. My experience has made me understand that real and profitable innovation is the result of these two areas working tightly togetherTherefore when I work with someone on a project I prefer to do more than just help them from a technical stand point. I make it my purpose to help them achieve a superior market position as well.

              </div>
          </div>
        </div>
      </div>
    )
  }
}
