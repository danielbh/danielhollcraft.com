/**
 * Created by danielhollcraft on 4/8/17.
 */

import React, {
  PropTypes,
} from 'react';

import { config } from 'config'
import {Image} from 'react-bootstrap'

import './index.scss'

const ProfileHeader = (props) => {
  return (
    <div className="profile-header">
      <Image
        className="photo"
        src={require("../../images/profile-photo.png")}
        alt="Daniel Hollcraft"
        circle
      />
      <h1>{config.siteTitle}</h1>
      <h3>Full-stack Javascript Developer</h3>
    </div>
  );
};

ProfileHeader.propTypes = {};
ProfileHeader.defaultProps = {};

export default ProfileHeader;
