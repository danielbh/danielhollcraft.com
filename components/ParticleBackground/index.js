import React, {
  Component,
  PropTypes,
} from 'react';

import particlesConfig from './config'
import './index.scss'

class ParticleBackground extends Component {

  componentDidMount() {
    // TODO: Import particleJS from npm.
    // Particles JS is not built for a universal environment and requires
    // a rewrite to play nice with gatsby.js and npm imports.
    particlesJS('particle', particlesConfig);
  }

  render() {
    return (
      <div
        id="particle"
        className="particle-background"
      />
    );
  }
}

ParticleBackground.propTypes = {
  backgroundColor: PropTypes.string
};
ParticleBackground.defaultProps = {};

export default ParticleBackground;
