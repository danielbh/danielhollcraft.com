/**
 * Created by danielhollcraft on 4/8/17.
 */

import React, {
  PropTypes,
} from 'react';

import FontAwesome from 'react-fontawesome';
import {Image} from 'react-bootstrap';
import { config } from 'config'

import './index.scss'


const Profile = (props) => {
  return (
    <div className="profile">
      <Image
        className="profile-photo"
        src={require("../../images/profile-photo.png")}
        alt="Daniel Hollcraft"
        circle
      />
      <h2>{config.siteTitle}</h2>
      <div className="about">Full-stack Javascript Developer specializing in Node.js, MongoDB, React, and React Native.</div>
      <div className="social-links">
        <a href={config.githubProfile} >
          <FontAwesome name="github" size='2x' className="social-link" />
        </a>
        <a href={config.linkedinProfile} >
          <FontAwesome name="linkedin-square" size='2x' className="social-link"/>
        </a>
      </div>
    </div>
  );
};

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
