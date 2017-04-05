import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import FontAwesome from 'react-fontawesome';

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
          <div className="profile-wrapper">
            <div className="profile-items">
              <img
                className="profile-item photo"
                src={require("../images/profile-photo.png")}
                alt="Profile Photo"
              />
              <h2 className="profile-item">{config.siteTitle}</h2>
              <div className="profile-item">
                  <a href={config.githubProfile} >
                    <FontAwesome name="github" size='2x' className="social-link" />
                  </a>
                  <a href={config.linkedinProfile} >
                    <FontAwesome name="linkedin-square" size='2x' className="social-link"/>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
